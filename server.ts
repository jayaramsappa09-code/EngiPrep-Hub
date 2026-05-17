import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to ensure AI is configured
const getAIResponse = async (params: any) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in the Secrets panel.');
  }
  return ai.models.generateContent(params);
};

// AI Endpoints
app.post('/api/ai/explain', async (req, res) => {
  const { concept, context } = req.body;
  if (!concept) return res.status(400).json({ error: 'Concept is required' });

  try {
    console.log('AI Explain request:', { concept, context });
    const response = await getAIResponse({
      model: "gemini-flash-latest",
      contents: `Explain "${concept}" in the context of: ${context}. Keep it concise, focused on engineering exams, and use simple analogies.`,
      config: {
        systemInstruction: "You are a senior engineering professor focused on helping students pass JNTUK university exams. Format with Markdown."
      }
    });

    console.log('AI Explain response received');
    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error('AI Error:', error);
    res.status(500).json({ error: error.message || 'AI failed to generate explanation' });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured.');
    }
    console.log('AI Chat request:', message);
    const chat = ai.chats.create({
      model: "gemini-flash-latest",
      config: {
        systemInstruction: "You are 'EngiPrep Professor', a helpful AI tutor for JNTUK engineering students. Your goal is to explain complex concepts simply, provide exam tips, and encourage students. Be encouraging but professional. Use Markdown for formatting equations and lists."
      }
    });

    const response = await chat.sendMessage({ message });
    console.log('AI Chat response received');
    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: error.message || 'Chat failed' });
  }
});

app.post('/api/ai/quiz', async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  try {
    console.log('AI Quiz request:', topic);
    const response = await getAIResponse({
      model: "gemini-flash-latest",
      contents: `Generate a 5-question multiple choice quiz about "${topic}". For each question, provide 4 options, the correct answer, and a brief explanation.`,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Format the output as a JSON array of objects. Each object should have: 'question' (string), 'options' (array of 4 strings), 'answer' (string, matching one option exactly), and 'explanation' (string).",
      }
    });

    const quiz = JSON.parse(response.text);
    console.log('AI Quiz response received');
    res.json({ quiz });
  } catch (error: any) {
    console.error('Quiz Gen Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate quiz' });
  }
});

app.post('/api/ai/summary', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  try {
    console.log('AI Summary request length:', content.length);
    const response = await getAIResponse({
      model: "gemini-flash-latest",
      contents: `Summarize the following engineering note content into high-yield bullet points for quick revision:\n\n${content}`,
      config: {
        systemInstruction: "You are an expert at creating 'cheat sheets' for engineering students. Focus on formulas, key definitions, and likely exam questions. Use Markdown."
      }
    });

    console.log('AI Summary response received');
    res.json({ summary: response.text });
  } catch (error: any) {
    console.error('Summary Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate summary' });
  }
});

// API hooks for analytics or simple contact forms can go here

// Vite Middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
