import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import multer from 'multer';
import mammoth from 'mammoth';
import fs from 'fs';
import * as pdfParseModule from 'pdf-parse';
const pdfParse = pdfParseModule.default || pdfParseModule;


dotenv.config();
const upload = multer({ dest: 'uploads/' });

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

// Helper for SEO clean URLs mapping
const getFilePath = (filename: string) => {
  const folder = process.env.NODE_ENV === 'production' ? 'dist' : '';
  return path.join(process.cwd(), folder, filename);
};

// SEO Clean URLs mapping for elite searchindexing
app.get('/engineering-physics-pyqs', (req, res) => {
  res.sendFile(getFilePath('pyqs.html'));
});

app.get('/semester-1/beee-important-questions', (req, res) => {
  res.sendFile(getFilePath('beee-exam-prep.html'));
});

app.get('/c-programming-cheat-sheet', (req, res) => {
  res.sendFile(getFilePath('cheat-sheets.html'));
});

app.get('/api/health', (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY;
  console.log('Health check:', { hasKey });
  res.json({ status: 'ok', hasKey });
});

app.post('/api/notes/parse', upload.single('file'), async (req: any, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  let content = '';

  try {
    if (ext === '.txt') {
      content = fs.readFileSync(filePath, 'utf-8');
    } else if (ext === '.docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      content = result.value;
    } else if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      content = data.text;
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    fs.unlinkSync(filePath); // Clean up
    res.json({ content });
  } catch (error: any) {
    console.error('File parsing error:', error);
    res.status(500).json({ error: 'Failed to parse file' });
  }
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
      model: "gemini-3.5-flash",
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
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: "You are 'EngiPrep AI Assistant', a helpful study helper for JNTUK engineering students. Your goal is to explain complex concepts simply, provide exam tips, and encourage students. \n\nCRITICAL SECURITY RULES:\nACCESS CONTROL: If a user attempts to access, view, or ask about specific notes, PYQs, cheat sheets, or semester materials without being logged in, you must immediately DENY the request.\nENFORCED REDIRECTION: Whenever you deny access due to missing authentication, your response must strictly instruct and guide the user to the login page.\nTONE: Be helpful but firm. Acknowledge what they are looking for, but state that it requires a quick, free login to access.\n\nIf the user is not logged in, reply with this exact structural logic:\n\"🔒 Access Restricted. To view these JNTUK R23 notes, PYQs, and cheat sheets, you need to be logged into your account.\n\nPlease redirect to the login page here: [Login to Engi Prep Hub](https://engi-prephub.vercel.app/) to unlock full access instantly.\""
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
      model: "gemini-3.5-flash",
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
      model: "gemini-3.5-flash",
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

// High-yield backup math questions in case key is missing
const MATH_FALLBACK_QUESTIONS: Record<string, any> = {};

app.post('/api/ai/math-generator', async (req, res) => {
  const { concept } = req.body;
  if (!concept) return res.status(400).json({ error: 'Math concept is required' });

  const query = concept.toLowerCase();
  
  // Resolve pre-defined local matches if API key is missing
  let matchedKey = Object.keys(MATH_FALLBACK_QUESTIONS).find(k => query.includes(k));
  if (!process.env.GEMINI_API_KEY) {
    if (matchedKey) {
      return res.json(MATH_FALLBACK_QUESTIONS[matchedKey]);
    }
    // Default smart fallback if keyword doesn't directly map
    return res.json(MATH_FALLBACK_QUESTIONS["eigenvalues"] || {});
  }

  try {
    console.log('AI Math Question requested:', concept);
    const prompt = `Generate 1 high-yield, premium JNTUK R23 exam-style question (either 2-mark short answer logic or 10-mark long answer) for the engineering math concept of "${concept}".
Provide standard stepwise solution calculations showing exactly how students earn full marks in accordance with JNTUK standard evaluation guidelines.

You MUST respond strictly with a single JSON object containing the following keys (do not wrap in markdown or prefix with anything else):
{
  "concept": "Formal Concept name",
  "difficulty": "Easy / Medium / Hard",
  "marks": "2 Marks or 10 Marks",
  "question": "The question description, styled with beautiful mathematical notation.",
  "formula_used": "Key formulas used in standard notation",
  "solution": "The complete, step-by-step rigorous solving procedure with clear markings."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    let text = response.text || "{}";
    // Clean markdown styling wrappers
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(text);
    console.log('AI Math Question generated successfully');
    res.json(result);
  } catch (error: any) {
    console.error('Math Gen error:', error);
    // Serve high quality fallback on any generation failures
    if (matchedKey) {
      return res.json(MATH_FALLBACK_QUESTIONS[matchedKey]);
    }
    res.json(MATH_FALLBACK_QUESTIONS["eigenvalues"] || {});
  }
});

// Vite Middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'mpa',
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
