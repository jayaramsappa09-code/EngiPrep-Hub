import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

import { GoogleGenAI } from "@google/genai";
import { PREDEFINED_EXPLANATIONS, PREDEFINED_ANSWERS, PREDEFINED_QUIZZES } from './src/predefinedData';

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
  const hasKey = !!process.env.GEMINI_API_KEY;
  console.log('Health check:', { hasKey });
  res.json({ status: 'ok', hasKey });
});

// AI Endpoints
app.post('/api/ai/explain', async (req, res) => {
  const { concept, context } = req.body;
  if (!concept) return res.status(400).json({ error: 'Concept is required' });

  // Predefined check
  const lowerConcept = concept.toLowerCase();
  const predefinedMatch = Object.keys(PREDEFINED_EXPLANATIONS).find(key => lowerConcept.includes(key));
  if (predefinedMatch && !process.env.GEMINI_API_KEY) {
    return res.json({ explanation: PREDEFINED_EXPLANATIONS[predefinedMatch] });
  }

  try {
    console.log('AI Explain request:', { concept, context });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Explain "${concept}" in the context of: ${context}. Keep it concise, focused on engineering exams, and use simple analogies.` }] }],
      config: {
        systemInstruction: "You are an expert study assistant focused on helping students pass JNTUK university engineering exams. Format with Markdown."
      }
    });

    console.log('AI Explain response received successfully');
    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error('AI Explain Error:', error);
    res.status(500).json({ error: error.message || 'AI failed to generate explanation' });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const msgLower = message.toLowerCase();
  
  // Predefined check
  const directMatch = Object.keys(PREDEFINED_ANSWERS).find(key => msgLower.includes(key));
  if (directMatch && !process.env.GEMINI_API_KEY) {
    return res.json({ text: PREDEFINED_ANSWERS[directMatch] });
  }

  const topicMatch = Object.keys(PREDEFINED_EXPLANATIONS).find(key => msgLower.includes(key));
  if (topicMatch && !process.env.GEMINI_API_KEY) {
    return res.json({ text: PREDEFINED_EXPLANATIONS[topicMatch] });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      if (directMatch) return res.json({ text: PREDEFINED_ANSWERS[directMatch] });
      if (topicMatch) return res.json({ text: PREDEFINED_EXPLANATIONS[topicMatch] });
      return res.status(401).json({ error: 'AI Assistant is not configured.' });
    }
    
    console.log('AI Chat request starting...', { messageLength: message.length, historyLength: history?.length });
    
    // Format history for SDK
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      content: msg.content
    }));

    const chat = ai.chats.create({
      model: "gemini-1.5-flash",
      config: {
        systemInstruction: "You are 'EngiPrep AI Assistant', a helpful study helper for JNTUK engineering students. Your goal is to explain complex concepts simply, provide exam tips, and encourage students. Be encouraging but professional. Use Markdown for formatting equations and lists."
      },
      history: formattedHistory
    });

    const result = await chat.sendMessage(message);
    
    console.log('AI Chat result received successfully');
    res.json({ text: result.text });
  } catch (error: any) {
    console.error('Chat Error details:', error);
    res.status(500).json({ error: error.message || 'Chat failed' });
  }
});

app.post('/api/ai/quiz', async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  // Predefined check
  const lowerTopic = topic.toLowerCase();
  const quizMatch = Object.keys(PREDEFINED_QUIZZES).find(key => lowerTopic.includes(key));
  if (quizMatch && !process.env.GEMINI_API_KEY) {
    return res.json({ quiz: PREDEFINED_QUIZZES[quizMatch] });
  }

  try {
    console.log('AI Quiz request:', topic);
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Generate a 5-question multiple choice quiz about "${topic}". For each question, provide 4 options, the correct answer, and a brief explanation. Format as JSON array.` }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    let text = response.text || "[]";
    
    // Clean potential markdown blocks
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const quiz = JSON.parse(text);
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
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Summarize the following engineering note content into high-yield bullet points for quick revision:\n\n${content}` }] }],
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
