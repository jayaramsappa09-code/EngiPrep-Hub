const fs = require('fs');
const path = require('path');

const dir = 'academic-content-system';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const files = {
  '00_Master_Architecture.md': `
# EngiPrepHub Academic Content Generation System
## Master Architecture

This system is designed to generate top 0.1% quality educational content for Engineering Students (JNTUK R23).
It replaces generic AI prompts with a multi-layered, role-based, quality-assured generation pipeline.

### The 3-Layer System
1. **Layer 1: Master Rules** - Permanent guidelines on tone, structure, visual standards, and SEO.
2. **Layer 2: Subject Blueprints** - Domain-specific pedagogy (e.g., how to teach Engineering Graphics vs. C Programming).
3. **Layer 3: Topic Generator** - Highly specific prompts for a single, focused topic, enforcing a multi-persona review cycle.

### The Review Cycle
Content is never generated in one shot. It goes through simulated roles:
- **Professor:** Simplifies concepts.
- **Department HOD:** Ensures syllabus alignment.
- **Paper Setter:** Analyzes PYQs (Previous Year Questions) and frames exam relevance.
- **Topper:** Adds memory tricks and revision strategies.
- **Instructional Designer:** Identifies visual opportunities (SVGs, interactive components).
- **Technical Writer:** Ensures readability and eliminates AI fluff.
`,
  '01_Layer_1_Master_Rules.md': `
# Layer 1: Master Rules (Global Standards)

## 1. Tone and Voice
- **Authoritative yet Accessible:** Speak like a top-tier professor who loves teaching.
- **No Fluff:** Never use generic intros like "In today's fast-paced world...". Start directly with the core concept.
- **Direct & Active:** Use active voice. "Electrons flow..." not "The flow of electrons is caused by...".

## 2. 13-Section Blueprint Structure
Every generated unit/topic MUST adhere to this exact structure:
1. **Introduction & Objectives:** Why does this matter?
2. **Concept Explanation:** Jargon-free teaching.
3. **Real World Applications:** Industry use cases.
4. **Solved Examples:** Step-by-step logic.
5. **Visual/Interactive Requirements:** Specify where SVGs or React elements go.
6. **Formula Index:** Variables, Units, Mistakes.
7. **PYQ Analysis:** Previous Year Questions mapping.
8. **Common Mistakes:** "Watch out!" boxes.
9. **Memory Tricks:** Mnemonics.
10. **Quick Revision:** 2-min summary.
11. **Exam Tomorrow Mode:** High-yield points.
12. **Student FAQ:** Schema-optimized.
13. **Related Topics:** Internal linking paths.

## 3. Visual & Interactive Standards
- **Never Output Wall of Text:** Max 3 paragraphs without a visual break (list, callout, SVG).
- **Mandatory Visuals:** Every complex mechanism needs an SVG or a React-Three-Fiber interactive component specification.
- **Colors:** Use Tailwind CSS utility classes.

## 4. Exam Standard Alignment
- Must explicitly state the expected marks (e.g., "Expected: 7 Marks").
- Highlight R23 syllabus keywords.

## 5. Quality Assurance Checklist
Target score must be 10/10 on all:
- Concept clarity [ /10]
- Exam relevance [ /10]
- Originality [ /10]
- Readability [ /10]
- Visual opportunities [ /10]
`,
  '02_Layer_2_Subject_Blueprints.md': `
# Layer 2: Subject Blueprints

## Blueprint: Engineering Physics
**Pedagogy Focus:** Phenomenon -> Derivation -> Application.
- **Derivations:** Must explain *why* the math works, step-by-step. Don't skip intermediate steps.
- **Experiments:** Include clear setup diagrams (SVG format) and observation tables.
- **Numericals:** Always include given data, formula used, substitution, and final answer with units.

## Blueprint: Engineering Graphics
**Pedagogy Focus:** Visualization and Step-by-Step Construction.
- **CAD Workflow:** Always provide the exact AutoCAD terminal commands matrix.
- **Drawing Sequence:** Explain the logic of projection before the construction steps.
- **Interactive:** Require React/Three.js or SVG specifications for 3D/2D visualization.

## Blueprint: C Programming
**Pedagogy Focus:** Logic, Memory Management, and Dry Runs.
- **Code Standards:** Use modern C. Include comments.
- **Dry Runs:** Provide step-by-step execution traces using tables.
- **Debugging:** Include common syntax errors and logical flaws.

## Blueprint: Engineering Chemistry
**Pedagogy Focus:** Molecular logic and industrial processes.
- **Visuals:** Require SVG models for molecular structures or electron flows.
- **Reactions:** Provide balanced equations with conditions (temp/catalyst).
`,
  '03_Layer_3_Topic_Generator.md': `
# Layer 3: Topic Generator Prompt Template

**Copy and paste this into the LLM for EACH specific topic.**

---
**SYSTEM PROMPT:**
You are the EngiPrepHub Content Generation Engine. You will operate as a committee of experts: Professor, Paper Setter, Topper, Instructional Designer, and Technical Writer.

**TASK:**
Generate the definitive notes module for:
- **Subject:** [INSERT SUBJECT]
- **Unit:** [INSERT UNIT]
- **Topic:** [INSERT SPECIFIC TOPIC]

**CONSTRAINTS:**
- Apply Layer 1 Master Rules.
- Apply Layer 2 Subject Blueprint for [INSERT SUBJECT].
- DO NOT generate content for any other topic. Stay strictly focused.

**COMMITTEE REVIEW PROCESS (Internal Monologue before outputting):**
1. **Professor:** "Is the concept explained perfectly?"
2. **Paper Setter:** "Are PYQs and exam patterns addressed?"
3. **Instructional Designer:** "Are there SVG/React interactive placeholders?"
4. **Topper:** "Are there memory tricks and a 'Exam Tomorrow' rapid review?"

**OUTPUT FORMAT:**
Provide the final HTML/Markdown content structured according to the 13-Section Blueprint.
Include the final QA score (must be 10/10 on all metrics).
---
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, filename), content.trim());
}
console.log('Successfully created the EngiPrepHub Academic Content Generation System markdown package.');
