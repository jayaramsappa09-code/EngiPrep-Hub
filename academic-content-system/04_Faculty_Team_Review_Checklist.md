# Layer 4: Faculty Team AI Review Checklist (Quality Gate Protocol)

## Overview
The **Faculty Team AI Review Checklist** serves as an mandatory automated quality gate within the EngiPrepHub Academic Content Generation System. No generated study note, formula sheet, or interactive module may be rendered or published without passing all verification gates audited by our 6 simulated faculty personas.

---

## The 6 Faculty Persona Audit Matrix

### 1. 🎓 Professor Persona (Concept & Scientific Fact-Check Auditor)
- [ ] **100% Fact-Check Accuracy:** All physical laws, chemical equations, mathematical identities, and computer science logic are verified against authoritative engineering textbooks.
- [ ] **Zero Skipped Derivation Steps:** Every algebraic expansion, integral substitution, and trigonometric transformation is written out step-by-step.
- [ ] **Intuition-First Rule:** Every formal equation is preceded by a 2-sentence physical or logical ELI5 intuition.

### 2. 🏛️ Department HOD Persona (Syllabus & Outcome Alignment Auditor)
- [ ] **JNTUK R23 Syllabus Verification:** Ensures topic coverage matches the official JNTUK R23 curriculum outline without scope creep or missing sub-topics.
- [ ] **Mark Weightage Tagging:** Explicitly labels expected exam mark allocations (e.g., `[Expected: 7 Marks / Essay Question]` or `[Expected: 2 Marks / Short Question]`).
- [ ] **Course Outcome Alignment:** Ensures depth meets university undergraduate standards (neither overly superficial nor post-graduate level).

### 3. 📝 Paper Setter Persona (PYQ & Exam Relevance Auditor)
- [ ] **5-Year PYQ Mapping:** Solved previous year questions from past JNTUK examinations are embedded with step-by-step solutions.
- [ ] **Graded Problem Progression:** Solved examples progress systematically from Basic Concept Check -> Standard JNTUK Exam Level -> High-Yield Challenge Problem.
- [ ] **Exam Trap Alerts:** Highlighting common student mistakes, sign errors, unit conversion blunders, and misread questions in dedicated "Watch Out!" cards.

### 4. 🥇 Topper Persona (Memory Tricks & Rapid Revision Auditor)
- [ ] **Memory Tricks & Mnemonics:** Includes acronyms, visual hooks, or rhyming mnemonics for memorizing complex sequences, formulas, or classification lists.
- [ ] **Exam Tomorrow Mode:** Dedicated high-yield bulleted rapid cramming section listing the top 3-5 non-negotiable points for last-minute review.
- [ ] **Formula Index & SI Unit Matrix:** All variables, physical constants, SI units, and edge cases are indexed in a scannable table.

### 5. 🎨 Instructional Designer Persona (Visual Asset & UX Auditor)
- [ ] **No Wall-of-Text Rule:** Maximum 3 paragraphs of text without a visual break (list, callout box, table, SVG diagram, or code block).
- [ ] **Vector SVG / CAD Specs:** Every complex mechanism contains either an inline SVG vector diagram spec or an exact AutoCAD CLI sequence matrix.
- [ ] **Interactive Canvas Specs:** Specifies state parameters for 3D/2D React component visualizations (e.g., Three.js camera angles, slider bounds).

### 6. ✍️ Technical Writer Persona (Readability & AI Fluff Auditor)
- [ ] **Zero AI Fluff:** Complete removal of generic AI conversational filler ("In today's fast-paced world...", "In conclusion...", "It is worth noting that...").
- [ ] **Active & Direct Voice:** 100% active voice construction ("Electrons travel..." instead of "The travel of electrons is executed...").
- [ ] **Schema.org Readiness:** Includes structured JSON-LD microdata payload for `TechArticle`, `Course`, and `FAQPage`.

---

## Mandatory Automated QA Gate Sign-Off Block

Every generated content output MUST terminate with this exact verification block:

```text
================================================================================
ENGIPREPHUB FACULTY TEAM QUALITY GATE SIGN-OFF
================================================================================
1. [Professor] Scientific Accuracy & Derivations : [ 10 / 10 ] - VERIFIED
2. [HOD] JNTUK R23 Syllabus & Outcomes          : [ 10 / 10 ] - VERIFIED
3. [Paper Setter] PYQs & Exam Trap Alerts        : [ 10 / 10 ] - VERIFIED
4. [Topper] Memory Tricks & Exam Tomorrow Mode   : [ 10 / 10 ] - VERIFIED
5. [Instructional Designer] SVGs & Visual Breaks : [ 10 / 10 ] - VERIFIED
6. [Technical Writer] Zero Fluff & Active Voice  : [ 10 / 10 ] - VERIFIED
================================================================================
QUALITY GATE RESULT: PASSED (100% 10/10 REQUIREMENT MET)
================================================================================
```
If any individual metric scores below 10/10, the engine MUST halt, self-correct the deficiencies, and re-run the verification matrix prior to final rendering.
