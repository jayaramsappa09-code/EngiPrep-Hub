import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const contentData = require('./src/content.cjs');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateArticle(subjectName, unit) {
  const prompt = `
You are an elite Engineering Tutor and Content Architect for Engi Prep Hub.
The target audience is JNTUK R23 engineering students in India.
Write an exceptionally detailed, high-quality, step-by-step educational article for the following unit.

Subject: ${subjectName}
Unit: ${unit.title} (${unit.subtitle})
Description: ${unit.desc}
Core Concept: ${unit.coreHighlight}
Important Concepts: ${unit.concept1?.title}, ${unit.concept2?.title}
Formulas: ${unit.formula1?.title} (${unit.formula1?.eq}), ${unit.formula2?.title} (${unit.formula2?.eq})

REQUIREMENTS (AdSense Quality Standards):
1. Write deep, structured HTML content (use h3, h4, p, ul, li). Do NOT wrap the entire output in \`\`\`html or include <html> tags. Just the HTML body snippets.
2. Structure:
   - What you will learn (Bulleted list)
   - Core explanation (Detailed, teach like a tutor, use analogies)
   - Step-by-Step Solutions / Derivations (Show the math/code clearly, explain why)
   - Real-world Examples
   - Common Mistakes / Pitfalls
   - Practice Questions (with hints)
   - Summary
3. Style: Use Tailwind CSS classes for styling (e.g. text-slate-700, font-bold, bg-slate-50, p-4, rounded-xl). Keep it engaging, visually appealing, and formatted as modern tech documentation.
4. Voice: Authoritative, empathetic, highly educational engineering tutor. Avoid thin, auto-generated vibes.

Output strictly raw HTML without markdown code fences.`;

  console.log(`Generating article for ${subjectName} - ${unit.title}...`);
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.7,
        }
    });

    let html = response.text;
    html = html.replace(/^```html/m, '').replace(/```$/m, '').trim();
    return html;
  } catch (error) {
    console.error(`Error generating article for ${unit.title}:`, error);
    return null;
  }
}

async function main() {
  const articlesDir = path.join(__dirname, 'src', 'articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  for (const [subjectName, data] of Object.entries(contentData)) {
    // Generate an ID for the subject
    const subjectSlug = subjectName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    for (const unit of data.units) {
      const fileName = `${subjectSlug}-${unit.id}.html`;
      const filePath = path.join(articlesDir, fileName);
      
      if (fs.existsSync(filePath)) {
        console.log(`Skipping ${fileName}, already exists.`);
        continue;
      }

      const html = await generateArticle(subjectName, unit);
      if (html) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Saved ${fileName}`);
      }
      
      // Wait a bit to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    // STOP after one subject is successfully generated to avoid timeouts
    console.log(`Finished ${subjectName}, stopping to prevent timeout.`);
    break;
  }
}

main().catch(console.error);
