import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

import { GoogleGenAI } from "@google/genai";
import { FALLBACK_TOPICS, FALLBACK_ANSWERS } from './src/fallbackData';

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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasKey: !!process.env.GEMINI_API_KEY });
});

// Helper to ensure AI is configured
const getAIResponse = async (params: any) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in the Secrets panel.');
  }
  try {
    return await ai.models.generateContent(params);
  } catch (error: any) {
    console.error('getAIResponse Error:', {
      message: error.message,
      status: error.status,
      params: { model: params.model }
    });
    throw error;
  }
};

// AI Endpoints
app.post('/api/ai/explain', async (req, res) => {
  const { concept, context } = req.body;
  if (!concept) return res.status(400).json({ error: 'Concept is required' });

  // Fallback check
  const fallbackMatch = Object.keys(FALLBACK_TOPICS).find(key => 
    concept.toLowerCase().includes(key) || (context && context.toLowerCase().includes(key))
  );

  if (fallbackMatch && !process.env.GEMINI_API_KEY) {
    console.log('Using Fallback for Explain:', fallbackMatch);
    return res.json({ explanation: FALLBACK_TOPICS[fallbackMatch].explanation });
  }

  try {
    console.log('AI Explain request:', { concept, context });
    const response = await getAIResponse({
      model: "gemini-3-flash-preview",
      contents: `Explain "${concept}" in the context of: ${context}. Keep it concise, focused on engineering exams, and use simple analogies.`,
      config: {
        systemInstruction: "You are a senior engineering professor focused on helping students pass JNTUK university exams. Format with Markdown."
      }
    });

    console.log('AI Explain response received');
    res.json({ explanation: response.text });
  } catch (error: any) {
    if (fallbackMatch) {
      console.log('API failed, using Fallback for Explain');
      return res.json({ explanation: FALLBACK_TOPICS[fallbackMatch].explanation });
    }
    console.error('AI Error:', error);
    res.status(500).json({ error: error.message || 'AI failed to generate explanation' });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const msgLower = message.toLowerCase();
  
  // 1. Direct answer fallback
  const directMatch = Object.keys(FALLBACK_ANSWERS).find(key => msgLower.includes(key));
  if (directMatch && !process.env.GEMINI_API_KEY) {
    return res.json({ text: FALLBACK_ANSWERS[directMatch] });
  }

  // 2. Topic explanation fallback
  const topicMatch = Object.keys(FALLBACK_TOPICS).find(key => msgLower.includes(key));
  if (topicMatch && !process.env.GEMINI_API_KEY) {
    return res.json({ text: FALLBACK_TOPICS[topicMatch].explanation });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      if (directMatch) return res.json({ text: FALLBACK_ANSWERS[directMatch] });
      if (topicMatch) return res.json({ text: FALLBACK_TOPICS[topicMatch].explanation });
      
      console.error('Chat Error: GEMINI_API_KEY missing');
      return res.status(401).json({ error: 'GEMINI_API_KEY is not configured in the Secrets panel.' });
    }
    
    console.log('AI Chat request starting...', { messageLength: message.length });
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are 'EngiPrep Professor', a helpful AI tutor for JNTUK engineering students. Your goal is to explain complex concepts simply, provide exam tips, and encourage students. Be encouraging but professional. Use Markdown for formatting equations and lists."
      }
    });

    const result = await chat.sendMessage({ message });
    console.log('AI Chat result received successfully');
    res.json({ text: result.text });
  } catch (error: any) {
    if (directMatch) return res.json({ text: FALLBACK_ANSWERS[directMatch] });
    if (topicMatch) return res.json({ text: FALLBACK_TOPICS[topicMatch].explanation });

    console.error('Chat Error Details:', {
      message: error.message,
      stack: error.stack,
      status: error.status
    });
    res.status(500).json({ error: error.message || 'Chat failed' });
  }
});

app.post('/api/ai/quiz', async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  const fallbackMatch = Object.keys(FALLBACK_TOPICS).find(key => 
    topic.toLowerCase().includes(key)
  );

  if (fallbackMatch && !process.env.GEMINI_API_KEY) {
    console.log('Using Fallback for Quiz:', fallbackMatch);
    return res.json({ quiz: FALLBACK_TOPICS[fallbackMatch].quiz });
  }

  try {
    console.log('AI Quiz request:', topic);
    const response = await getAIResponse({
      model: "gemini-3-flash-preview",
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
    if (fallbackMatch) {
      console.log('API failed, using Fallback for Quiz');
      return res.json({ quiz: FALLBACK_TOPICS[fallbackMatch].quiz });
    }
    console.error('Quiz Gen Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate quiz' });
  }
});

app.post('/api/ai/summary', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  const fallbackMatch = Object.keys(FALLBACK_TOPICS).find(key => 
    content.toLowerCase().includes(key)
  );

  if (fallbackMatch && !process.env.GEMINI_API_KEY) {
    console.log('Using Fallback for Summary:', fallbackMatch);
    return res.json({ summary: FALLBACK_TOPICS[fallbackMatch].summary });
  }

  try {
    console.log('AI Summary request length:', content.length);
    const response = await getAIResponse({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following engineering note content into high-yield bullet points for quick revision:\n\n${content}`,
      config: {
        systemInstruction: "You are an expert at creating 'cheat sheets' for engineering students. Focus on formulas, key definitions, and likely exam questions. Use Markdown."
      }
    });

    console.log('AI Summary response received');
    res.json({ summary: response.text });
  } catch (error: any) {
    if (fallbackMatch) {
      console.log('API failed, using Fallback for Summary');
      return res.json({ summary: FALLBACK_TOPICS[fallbackMatch].summary });
    }
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
