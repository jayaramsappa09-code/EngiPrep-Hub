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

// AI Endpoint
app.post('/api/ai/explain', async (req, res) => {
  const { concept, context } = req.body;
  if (!concept) return res.status(400).json({ error: 'Concept is required' });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain "${concept}" in the context of: ${context}. Keep it concise, focused on engineering exams, and use simple analogies.`,
      config: {
        systemInstruction: "You are a senior engineering professor focused on helping students pass JNTUK university exams. Format with Markdown."
      }
    });

    res.json({ explanation: response.text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'AI failed to generate explanation' });
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
