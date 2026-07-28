# Layer 2: Subject Blueprints (Domain Pedagogical Frameworks)

## Overview
The **Layer 2 Subject Blueprints** define domain-specific generation workflows for every major branch of First-Year Engineering (JNTUK R23). While Layer 1 establishes global structural and quality rules, Layer 2 enforces domain-specific rules—ensuring a physics derivation is mathematically rigorous, a C program includes stack/heap dry runs, and an Engineering Graphics topic includes exact AutoCAD terminal command matrices.

---

## 1. Engineering Graphics & Computer-Aided Drafting (CAD)

### 1.1 Core Pedagogical Philosophy
- **Spatial Visualization First:** Students must understand *why* a 3D object projects into a specific 2D view before reading construction steps.
- **Strict Quadrant Rules:** Explicitly clarify First-Angle Projection conventions (Top view below Front view, Object between Observer and Plane).

### 1.2 Mandatory Generation Workflow
1. **3D Spatial Orientation & Quadrant Logic:**
   - Define the object's position relative to Horizontal Plane (HP) and Vertical Plane (VP) in plain text and 3D coordinate space.
2. **Step-by-Step Manual Drawing Sequence:**
   - Numbered step list with exact dimensions, reference line ($XY$) placement, and projection ray directions.
   - Distinct linetype declarations (e.g., Continuous Thick for outlines, Hidden Dashed for hidden edges, Chain Thin for axes, Continuous Thin for dimension lines).
3. **The AutoCAD Terminal Command Matrix:**
   - Every topic MUST include the copy-pasteable CLI command sequence:
     ```text
     ============================================================
     AUTOCAD TERMINAL COMMAND SEQUENCE
     ============================================================
     COMMAND: LAYER -> NEW -> "AXIS" -> COLOR: RED -> LINETYPE: CENTER
     COMMAND: LAYER -> NEW -> "HIDDEN" -> COLOR: YELLOW -> LINETYPE: DASHED
     COMMAND: LINE -> 0,200 -> 300,200 (XY Reference Line)
     COMMAND: CIRCLE -> 150,100 -> Radius: 30
     COMMAND: OFFSET -> 15 -> Select Line
     ============================================================
     ```
4. **Interactive SVG/3D Canvas Specification:**
   - Specify 2D projection or 3D interactive viewer state parameters (e.g., elevation angle, azimuth, locus trajectory).

---

## 2. Engineering Physics

### 2.1 Core Pedagogical Philosophy
- **Phenomenon -> Derivation -> Application:** Start with physical reality before introducing equations.
- **Zero-Skipped-Step Derivation Policy:** Write out every algebraic step, integral evaluation, and trigonometric identity.

### 2.2 Mandatory Generation Workflow
1. **Physical Phenomenon & Intuition:**
   - Conceptual ELI5 explanation of the wave/quantum/optical effect.
2. **Mathematical Derivation & Ray Optics Geometry:**
   - Define all boundary conditions, wave assumptions, and geometrical paths.
   - Full derivation of path difference ($\Delta$), phase difference ($\delta$), and intensity distribution ($I = 4I_0 \cos^2(\delta/2)$).
   - Every equation step must include an explanatory side-label (e.g., *"Using small angle approximation $\sin\theta \approx \tan\theta = y/D$"*).
3. **Experimental Setup & Observation Table:**
   - High-contrast SVG diagram spec for lab apparatus (e.g., sodium vapor lamp, biprism, micrometer eyepiece).
   - Standard laboratory observation table layout with formula variables.
4. **Graded Solved Numericals:**
   - **Data Given:** Listed with explicit SI unit conversions.
   - **Formula Used:** Highlighted in a callout box.
   - **Substitution & Calculation:** Step-by-step arithmetic substitution.
   - **Final Answer:** Emphasized in bold with correct SI units (e.g., $\lambda = 589.3 \text{ nm}$).

---

## 3. C Programming & Data Structures

### 3.1 Core Pedagogical Philosophy
- **Logic Over Syntax:** Teach code execution via memory mental models (Stack, Heap, Registers, Pointers).
- **Dry-Run Driven Learning:** Every code snippet must be accompanied by an execution trace table.

### 3.2 Mandatory Generation Workflow
1. **ANSI C99/C11 Compliant Code Listing:**
   - Fully compilable, production-ready code with headers, proper indentation, and memory management (`malloc`/`free`).
2. **Memory Layout & Variable Execution Trace Table:**
   - Table tracking variable values line-by-line across loops and stack calls:
     | Line # | Statement | Variable `i` | Variable `sum` | Memory Address / Stack Pointer | Notes |
     | :--- | :--- | :--- | :--- | :--- | :--- |
     | 12 | `sum += arr[i]` | 0 | 15 | `0x7fff5fbff010` | First iteration |
     | 12 | `sum += arr[i]` | 1 | 38 | `0x7fff5fbff014` | Second iteration |
3. **Algorithm Complexity Analysis:**
   - Big-O Notation for Best, Average, and Worst-Case Time Complexity ($O(1), O(N), O(N \log N)$).
   - Auxiliary Space Complexity breakdown.
4. **Common Compiler Errors & Runtime Bugs:**
   - Callout box showing Segmentation Fault traps, Dangling Pointers, Off-by-One array bounds errors, and Memory Leaks.

---

## 4. Engineering Chemistry & Material Science

### 4.1 Core Pedagogical Philosophy
- **Molecular Logic & Industrial Scale:** Bridge atomic electronic structure to large-scale engineering applications (e.g., water treatment plants, corrosion prevention, polymer synthesis).

### 4.2 Mandatory Generation Workflow
1. **Reaction Mechanism & Thermodynamics:**
   - Balanced chemical equations with enthalpy changes ($\Delta H$), catalyst conditions, and temperature/pressure bounds.
2. **Molecular Orbital / Corrosion Diagram Spec:**
   - SVG specifications for electron transfer mechanisms, sacrificial anode arrangements, or EDTA complexation titration curves.
3. **Industrial Process & Treatment Flowcharts:**
   - Step-by-step flow of raw materials through reactions, purification, and byproduct recovery.
4. **Quantitative Calculations:**
   - Solved numericals on Lime-Soda process, Hardness of Water (ppm $\text{CaCO}_3$ equivalents), Calorific value of fuels, and Nernst equation cell EMF.

---

## 5. Engineering Mathematics (Calculus, ODEs, & Linear Algebra)

### 5.1 Core Pedagogical Philosophy
- **Geometric Intuition -> Formal Proof -> Solved Exam Problems:** Always explain what a matrix transformation or differential equation represents in space.

### 5.2 Mandatory Generation Workflow
1. **Geometric/Physical Meaning:**
   - Describe Eigenvalues/Eigenvectors as principal directions of scaling, or Partial Differential Equations as heat diffusion/string vibration.
2. **Rigorous Proof / Methodical Algorithm:**
   - Step-by-step reduction methods (e.g., Gauss-Jordan Echelon reduction, Cayley-Hamilton Theorem verification, Frobenius Method series expansion).
3. **Graded Solved Problems (Basic -> JNTUK Exam Level -> High Difficulty):**
   - Minimum 3 fully worked problems with complete algebraic and integration steps.

---

## 6. Basic Electrical & Electronics Engineering (BEEE)

### 6.1 Core Pedagogical Philosophy
- **Circuit Analysis & Waveform Logic:** Combine KVL/KCL equations with phasor diagrams and semiconductor energy band models.

### 6.2 Mandatory Generation Workflow
1. **Schematic & Mesh/Nodal Equations:**
   - Circuit schematic specification with node voltages ($V_1, V_2$) and loop currents ($I_1, I_2$).
2. **Phasor Diagrams & AC Analysis:**
   - Vector representation of impedance ($Z = R + jX$), power factor ($\cos\phi$), and resonance conditions.
3. **Semiconductor Physics & Energy Band Diagrams:**
   - P-N junction depletion region width, Fermi energy level shifts, and V-I characteristic curves.
4. **Numerical Circuit Calculations:**
   - Solved problems for Thevenin's/Norton's equivalent circuits, transformer regulation, and DC motor torque equations.
