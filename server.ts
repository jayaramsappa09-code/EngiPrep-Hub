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
const MATH_FALLBACK_QUESTIONS: Record<string, any> = {
  "eigenvalues": {
    concept: "Eigenvalues & Eigenvectors",
    difficulty: "Hard",
    marks: "10 Marks",
    question: "Find the characteristic equation and the eigenvalues of the matrix A = \\begin{pmatrix} 8 & -6 & 2 \\\\ -6 & 7 & -4 \\\\ 2 & -4 & 3 \\end{pmatrix}.",
    formula_used: "Characteristic Equation: |A - \\lambda I| = 0",
    solution: `**Step 1: Write down the characteristic equation**
The characteristic equation is given by $|A - \\lambda I| = 0$.
$$\\det\\begin{pmatrix} 8-\\lambda & -6 & 2 \\\\ -6 & 7-\\lambda & -4 \\\\ 2 & -4 & 3-\\lambda \\end{pmatrix} = 0$$

**Step 2: Expand the determinant and simplify**
Expanding this determinant yields:
$$(8-\\lambda)[(7-\\lambda)(3-\\lambda) - 16] + 6[-6(3-\\lambda) + 8] + 2[24 - 2(7-\\lambda)] = 0$$
$$\\lambda^3 - 18\\lambda^2 + 45\\lambda = 0$$

**Step 3: Solve the characteristic polynomial**
Factorizing the cubic equation:
$$\\lambda(\\lambda^2 - 18\\lambda + 45) = 0$$
$$\\lambda(\\lambda - 3)(\\lambda - 15) = 0$$

The eigenvalues are **$\\lambda = 0, 3, 15$**.
*(Verification: Sum of eigenvalues = $0 + 3 + 15 = 18$. Trace of matrix = $8 + 7 + 3 = 18$. Matches!)*`
  },
  "cayley": {
    concept: "Cayley-Hamilton Theorem Verification",
    difficulty: "Hard",
    marks: "10 Marks",
    question: "Verify Cayley-Hamilton Theorem for the matrix A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} and find its inverse, $A^{-1}$.",
    formula_used: "A^2 - \\text{tr}(A)A + \\det(A)I = 0",
    solution: `**Step 1: Determine the characteristic equation**
The characteristic equation of a $2\\times2$ matrix is $\\lambda^2 - \\text{tr}(A)\\lambda + \\det(A) = 0$.
Trace $\\text{tr}(A) = 2 + 2 = 4$.
Determinant $\\det(A) = (2)(2) - (1)(1) = 3$.
Characteristic polynomial:
$$\\lambda^2 - 4\\lambda + 3 = 0$$

**Step 2: Verify Cayley-Hamilton Theorem ($A^2 - 4A + 3I = O$)**
Compute $A^2$:
$$A^2 = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} = \\begin{pmatrix} 5 & 4 \\\\ 4 & 5 \\end{pmatrix}$$
Substitute matrix $A$ into the polynomial expression:
$$A^2 - 4A + 3I = \\begin{pmatrix} 5 & 4 \\\\ 4 & 5 \\end{pmatrix} - 4\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} + 3\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$$
$$= \\begin{pmatrix} 5 & 4 \\\\ 4 & 5 \\end{pmatrix} - \\begin{pmatrix} 8 & 4 \\\\ 4 & 8 \\end{pmatrix} + \\begin{pmatrix} 3 & 0 \\\\ 0 & 3 \\end{pmatrix} = \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix} = O$$
Thus, Cayley-Hamilton is verified!

**Step 3: Calculate Inverse of the matrix ($A^{-1}$)**
Multiply the equation by $A^{-1}$:
$$A^{-1}(A^2 - 4A + 3I) = O \\implies A - 4I + 3A^{-1} = O$$
$$3A^{-1} = 4I - A = \\begin{pmatrix} 4 & 0 \\\\ 0 & 4 \\end{pmatrix} - \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} = \\begin{pmatrix} 2 & -1 \\\\ -1 & 2 \\end{pmatrix}$$
$$A^{-1} = \\frac{1}{3} \\begin{pmatrix} 2 & -1 \\\\ -1 & 2 \\end{pmatrix}$$`
  },
  "rolle": {
    concept: "Rolle's Theorem Verification",
    difficulty: "Medium",
    marks: "10 Marks",
    question: "Verify Rolle's Theorem for $f(x) = x(x-3)^2$ in the interval $[0, 3]$.",
    formula_used: "f'(c) = 0, \\text{ where } c \\in (a,b)",
    solution: `**Step 1: Check continuous and differentiable properties**
$f(x) = x(x^2 - 6x + 9) = x^3 - 6x^2 + 9x$ is a polynomial.
Since all polynomial functions are continuous and differentiable everywhere:
1. $f(x)$ is continuous on the interval $[0, 3]$
2. $f(x)$ is differentiable on the interval $(0, 3)$ with $f'(x) = 3x^2 - 12x + 9$

**Step 2: Check endpoint values $f(a) = f(b)$**
Evaluate at boundary points $a=0, b=3$:
$$f(0) = 0(0-3)^2 = 0$$
$$f(3) = 3(3-3)^2 = 0$$
Since $f(0) = f(3) = 0$, the third condition of Rolle's Theorem is satisfied.

**Step 3: Solve for stationary point $c \\in (0,3)$ where $f'(c) = 0$**
$$3c^2 - 12c + 9 = 0 \\implies 3(c^2 - 4c + 3) = 0$$
$$(c-1)(c-3) = 0 \\implies c = 1 \\text{ or } c = 3$$
Since Rolle's requires $c \\in (0,3)$ strictly under open bounds, we choose **$c = 1$**.
Since $1 \\in (0, 3)$, Rolle's Theorem is successfully verified.`
  },
  "lagrange": {
    concept: "Lagrange's Mean Value Theorem (LMVT)",
    difficulty: "Medium",
    marks: "10 Marks",
    question: "Verify Lagrange's Mean Value Theorem for $f(x) = x^3 - x$ in the closed interval $[1, 3]$.",
    formula_used: "f'(c) = \\frac{f(b) - f(a)}{b - a}",
    solution: `**Step 1: Establish continuity and differentiability**
$f(x) = x^3 - x$ is a polynomial.
1. It is continuous on the closed interval $[1, 3]$.
2. It is differentiable on the open interval $(1, 3)$ with $f'(x) = 3x^2 - 1$.

**Step 2: Calculate average slope of chord**
Calculate function values on boundaries:
$$f(1) = 1^3 - 1 = 0$$
$$f(3) = 3^3 - 3 = 24$$
Substitute values into the chord slope equation:
$$\\frac{f(b)-f(a)}{b-a} = \\frac{24 - 0}{3 - 1} = 12$$

**Step 3: Find $c \\in (1,3)$ satisfying $f'(c) = 12$**
$$3c^2 - 1 = 12 \\implies 3c^2 = 13 \\implies c = \\sqrt{\\frac{13}{3}} \\approx 2.08$$
Since $2.08 \\in (1, 3)$ strictly, Lagrange's Mean Value Theorem is verified!`
  },
  "jacobian": {
    concept: "Jacobian Transformation Determinant",
    difficulty: "Easy",
    marks: "2 Marks",
    question: "If $u = x(1-y)$ and $v = xy$, evaluate the Jacobian transform determinant $J = \\frac{\\partial(u,v)}{\\partial(x,y)}$.",
    formula_used: "J = \\frac{\\partial u}{\\partial x}\\frac{\\partial v}{\\partial y} - \\frac{\\partial u}{\\partial y}\\frac{\\partial v}{\\partial x}",
    solution: `**Step 1: Compute partial derivatives for term variables**
Evaluate derivatives of $u = x - xy$:
$$\\frac{\\partial u}{\\partial x} = 1 - y, \\quad \\frac{\\partial u}{\\partial y} = -x$$
Evaluate derivatives of $v = xy$:
$$\\frac{\\partial v}{\\partial x} = y, \\quad \\frac{\\partial v}{\\partial y} = x$$

**Step 2: Formulate Jacobian Matrix determinant**
$$J = \\begin{vmatrix} \\frac{\\partial u}{\\partial x} & \\frac{\\partial u}{\\partial y} \\\\ \\frac{\\partial v}{\\partial x} & \\frac{\\partial v}{\\partial y} \\end{vmatrix} = \\begin{vmatrix} 1-y & -x \\\\ y & x \\end{vmatrix}$$

**Step 3: Solve the determinant**
$$J = (1-y)(x) - (-x)(y) = x - xy + xy = x$$
Hence, the Jacobian of $u, v$ with respect to $x, y$ is **$x$**.`
  },
  "integration": {
    concept: "Change of Order of Integration",
    difficulty: "Hard",
    marks: "10 Marks",
    question: "Evaluate the double integral by changing the order of integration: $\\int_{0}^{4} \\int_{x^2}^{4x} f(x,y) \\, dy \\, dx$.",
    formula_used: "Horizontal Strip integration boundary transition",
    solution: `**Step 1: Identify standard boundary curves**
The given boundaries are:
Lower limit $y = x^2$ (Parabola opening upwards with vertex at origin)
Upper limit $y = 4x$ (Straight line passing through origin)
Outer bounds limits are $x = 0$ to $x = 4$.

Intersection points:
$$x^2 = 4x \\implies x(x-4) = 0 \\implies (0,0) \\text{ and } (4,16)$$

**Step 2: Change stripe configuration**
Currently, limits integrate vertically: $y$ ranges from $x^2$ to $4x$.
To change the order, we integrate horizontally first. Draw a horizontal strip from the line boundary to the parabola.
Left bound (the straight line): $y = 4x \\implies x = y/4$
Right bound (the parabola): $y = x^2 \\implies x = \\sqrt{y}$
Outer vertical bounds for $y$ range from $0$ to $16$.

**Step 3: Formulate the swapped integrated boundary equation**
$$\\int_{0}^{16} \\int_{y/4}^{\\sqrt{y}} f(x,y) \\, dx \\, dy$$`
  },
  "beta": {
    concept: "Beta & Gamma Integral Calculations",
    difficulty: "Medium",
    marks: "10 Marks",
    question: "Evaluate the definite calculus integral $\\int_{0}^{\\pi/2} \\sin^5 \\theta \\cos^4 \\theta \\, d\\theta$ using Beta and Gamma functions.",
    formula_used: "\\int_{0}^{\\pi/2} \\sin^{2m-1}\\theta \\cos^{2n-1}\\theta \\, d\\theta = \\frac{1}{2} B(m,n)",
    solution: `**Step 1: Align exponents with the canonical trigonometric form**
Formula matches: $2m-1 = 5 \\implies m = 3$, and $2n-1 = 4 \\implies n = 2.5 = 5/2$.
Therefore, the integral is equivalent to:
$$I = \\frac{1}{2} B\\left(3, \\frac{5}{2}\\right)$$

**Step 2: Align Beta definitions with Gamma relations**
Apply formula $B(m,n) = \\frac{\\Gamma(m)\\Gamma(n)}{\\Gamma(m+n)}$:
$$B\\left(3, \\frac{5}{2}\\right) = \\frac{\\Gamma(3)\\Gamma(5/2)}{\\Gamma(11/2)}$$

**Step 3: Evaluate factors recursively**
$$\\Gamma(3) = 2! = 2$$
$$\\Gamma(5/2) = \\frac{3}{2} \\cdot \\frac{1}{2} \\Gamma(1/2) = \\frac{3}{4}\\sqrt{\\pi}$$
$$\\Gamma(11/2) = \\frac{9}{2} \\cdot \\frac{7}{2} \\cdot \\frac{5}{2} \\cdot \\frac{3}{2} \\cdot \\frac{1}{2} \\Gamma(1/2) = \\frac{945}{32}\\sqrt{\\pi}$$

Substitute back to find the result:
$$B = \\frac{2 \\cdot \\frac{3}{4}\\sqrt{\\pi}}{\\frac{945}{32}\\sqrt{\\pi}} = \\frac{3/2}{945/32} = \\frac{3}{2} \\cdot \\frac{32}{945} = \\frac{16}{315}$$
Since $I = \\frac{1}{2} B$, we get:
$$I = \\frac{1}{2} \\cdot \\frac{16}{315} = \\frac{8}{315}$$`
  },
  "maxima": {
    concept: "Coordinate Maximization and Optimization",
    difficulty: "Hard",
    marks: "10 Marks",
    question: "Examine for extreme values (maxima & minima) of the function $f(x,y) = x^3 + y^3 - 3axy$.",
    formula_used: "rt - s^2 > 0 check, where r = f_{xx}, s = f_{xy}, t = f_{yy}",
    solution: `**Step 1: Compute partial derivatives and locate stationary points**
$$\\frac{\\partial f}{\\partial x} = 3x^2 - 3ay = 0 \\implies x^2 = ay$$
$$\\frac{\\partial f}{\\partial y} = 3y^2 - 3ax = 0 \\implies y^2 = ax$$

Substitute $y = x^2/a$ into the second equation:
$$(x^2/a)^2 = ax \\implies x^4 = a^3 x \\implies x(x^3 - a^3) = 0 \\implies x = 0 \\text{ or } x = a$$
Stationary points are **$(0,0)$** and **$(a,a)$**.

**Step 2: Compute second order partial differentials**
$$r = f_{xx} = 6x, \\quad s = f_{xy} = -3a, \\quad t = f_{yy} = 6y$$

**Step 3: Analyze stationary points with discriminant criteria**
*At $(0,0)$*: $r = 0, s = -3a, t = 0$.
Discriminant: $rt - s^2 = 0 - 9a^2 = -9a^2 < 0$. No extreme values exist here. This is a **Saddle Point**.

*At $(a,a)$*: $r = 6a, s = -3a, t = 6a$ (Assuming $a > 0$).
Discriminant: $rt - s^2 = (6a)(6a) - (-3a)^2 = 36a^2 - 9a^2 = 27a^2 > 0$.
Since $rt - s^2 > 0$ and $r = 6a > 0$, the function possesses a local **Minimum** at $(a,a)$.
Minimum value: $f(a,a) = a^3 + a^3 - 3a^3 = -a^3$.`
  }
};

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
    return res.json(MATH_FALLBACK_QUESTIONS["eigenvalues"]);
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
    res.json(MATH_FALLBACK_QUESTIONS["eigenvalues"]);
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
