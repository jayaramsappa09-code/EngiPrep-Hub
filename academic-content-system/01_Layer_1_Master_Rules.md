# Layer 1: Master Rules (Global Content Standards)

## Executive Overview
The **EngiPrepHub Academic Content Generation System** enforces a top 0.1% quality standard for all educational content, notes, formula sheets, and interactive modules across the JNTUK R23 curriculum. Content generated under these rules must reflect the authority of a senior university professor while remaining intuitive and engaging for a first-year engineering student.

---

## 1. Writing Tone, Voice, & Pedagogical Architecture

### 1.1 Tone & Voice Guidelines
- **Authoritative yet Empathetic:** Write like a veteran professor who has taught 10,000+ students and knows exactly where they struggle.
- **Zero Fluff Policy:** Ban AI conversational filler. Never start with:
  - *"In today's fast-paced digital world..."*
  - *"In this comprehensive guide, we will explore..."*
  - *"It is important to note that..."*
  - *"Furthermore, it is worth mentioning..."*
- **Active & Direct Voice:** Use active verbs and immediate action.
  - ❌ *Passive:* "The light rays are refracted by the thin film causing interference."
  - ✅ *Active:* "The thin film splits incoming light into two coherent rays, driving optical interference."
- **Clarity over Complexity:** Explain complex phenomena using real-world physical metaphors before introducing heavy mathematical formalism.

### 1.2 Pedagogical Rules
1. **The 'Why' Before 'How':** Every mathematical derivation or algorithm must start with a 2-sentence physical or logical motivation.
2. **First-Year Accessibility:** Assume the reader is a first-semester B.Tech student encountering the concept for the first time under exam stress.
3. **Incremental Complexity:** Structure content sequentially: `Intuition -> Visual/Diagram -> Derivation/Code -> Solved Example -> PYQ Mapping`.

---

## 2. SEO & Technical Search Intent Requirements

### 2.1 Keyword & Semantic Strategy
- **Primary Keywords:** Target JNTUK R23 syllabus terms specifically (e.g., `JNTUK R23 Engineering Physics Unit 1 Young's Double Slit`).
- **LSI Entity Coverage:** Automatically incorporate relevant secondary entities (e.g., `fringe width formula`, `path difference`, `constructive interference condition`, `monochromatic light source`).
- **Density Threshold:** Maintain natural primary keyword inclusion (1.5% - 2.0% density). Avoid keyword stuffing.

### 2.2 On-Page Structure & Microdata
- **Heading Hierarchy:** Strict logical nesting (`H1` -> `H2` -> `H3`). Never skip heading levels.
- **Schema.org Integration:** Every topic must generate valid JSON-LD metadata for `TechArticle`, `Course`, and `FAQPage`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Young's Double Slit Experiment Derivation & Numerical Problems - JNTUK R23",
    "educationalLevel": "Higher Education / B.Tech First Year",
    "inLanguage": "en-IN"
  }
  ```
- **Featured Snippet Targeting:** Include concise 40-50 word definition callout boxes for direct Google Answer Box extraction.

---

## 3. Visual & Interactive Asset Standards

### 3.1 SVG Diagram Mandate
- **No Text-Only Pages:** Every major concept must include at least one custom-coded SVG diagram or interactive React component specification.
- **SVG Code Standards:**
  - Standard viewBox dimensions (`0 0 800 400`).
  - High contrast vector lines with explicit `stroke-width`.
  - Accessible `<title>` and `<desc>` elements for screen readers.
  - Tailwind CSS integration (`dark:stroke-slate-200`, `stroke-blue-600`).

### 3.2 CAD & Code Block Specifications
- **Engineering Graphics:** Must provide the exact AutoCAD CLI sequence matrix:
  ```text
  COMMAND: LINE -> 0,0 -> 100,0 (Length: 100mm Base)
  COMMAND: OFFSET -> 50 -> Select Base Line
  COMMAND: CIRCLE -> 50,50 -> Radius: 25
  ```
- **C Programming & Algorithms:** Code listings must be C99/C11 compliant, fully commented, accompanied by a Memory Dry Run Table tracking pointer state, stack values, and register outputs.

---

## 4. Academic Rigor & Pedagogical Expectations

### 4.1 Derivation & Mathematics Rigor
- **Zero Omitted Steps:** Never use phrases like *"Simplifying further, we get..."* or *"It can be easily shown that..."*. Write out every algebraic expansion, substitution, and integral step.
- **Variable Index:** Every formula block must explicitly define all variable symbols, SI units, and physical constraints.

### 4.2 Error Traps & Exam Alignment
- **Common Mistakes Callouts:** Highlight student exam traps in high-visibility warning cards (e.g., mixing up degrees vs. radians, missing negative signs in potential equations).
- **Marks Mapping:** Every section must indicate its historical mark weightage in JNTUK end-semester exams (e.g., `[Expected: 7 Marks / Essay Question]`).

---

## 5. Mandatory 13-Section Content Blueprint

Every generated topic must follow this exact 13-section structure without exception:

1. **Introduction & Objectives:** Real-world purpose and JNTUK exam weightage.
2. **Concept Simplification:** ELI5 physical intuition and core definition.
3. **Real-World Engineering Applications:** Industry use cases (e.g., optical coatings, structural mechanics, semiconductor fabrication).
4. **Step-by-Step Derivation / Logic / Construction:** Complete mathematical or algorithmic breakdown.
5. **Interactive / SVG Illustration Spec:** Custom vector diagram or simulation specification.
6. **Formula Index & Units Matrix:** Table listing parameters, formulas, and SI units.
7. **JNTUK PYQ Analysis (Previous Year Questions):** Solved exam questions categorized by frequency (5-Year Analysis).
8. **Common Student Mistakes & Traps:** "Watch Out!" exam blunder alerts.
9. **Memory Tricks & Mnemonics:** Acronyms and visual hooks for fast recall.
10. **Quick Revision Summary:** 2-minute bulleted recap.
11. **Exam Tomorrow Mode (High-Yield):** Top 3 key points for last-minute cramming.
12. **Student FAQ Section:** Schema.org ready Q&A addressing common confusion points.
13. **Related Syllabus Topics:** Internal navigation links to preceding and succeeding topics.

---

## 6. Simulated Multi-Role Faculty Review Matrix

Before content output is finalized, it must undergo a simulated review by a committee of expert roles:

| Role | Review Focus & Quality Filter |
| :--- | :--- |
| **1. Professor** | Verifies 100% scientific/mathematical accuracy and conceptual depth. |
| **2. Department HOD** | Ensures complete syllabus alignment with JNTUK R23 outcome standards. |
| **3. Paper Setter** | Checks PYQ mapping, mark allocation accuracy, and problem difficulty. |
| **4. Topper** | Adds exam shortcuts, memory tricks, and high-yield revision summaries. |
| **5. Instructional Designer** | Guarantees SVG clarity, responsive layout balance, and visual break rhythm. |
| **6. Technical Writer** | Strips out AI fluff, verifies active voice, and optimizes readability scores. |

---

## 7. Quality Assurance Scorecard & Gatekeeping

All generated modules must achieve a perfect **10/10** score across all 5 core metrics before publication:

```text
===========================================================
ENGIPREPHUB QUALITY ASSURANCE SCORECARD
===========================================================
1. Concept Clarity           [ 10 / 10 ] - Intuitive, zero jargon without explanation
2. Exam Relevance            [ 10 / 10 ] - 100% JNTUK R23 alignment & PYQ covered
3. Originality               [ 10 / 10 ] - Zero generic AI phrasing or textbook copy
4. Readability               [ 10 / 10 ] - Active voice, scannable, short paragraphs
5. Visual Opportunities      [ 10 / 10 ] - Complete SVG/CAD specs included
===========================================================
STATUS: PASSED (RELEASE APPROVED)
===========================================================
```
If any score falls below 10/10, the engine MUST automatically rewrite and re-review the content.
