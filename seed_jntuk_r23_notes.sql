-- JNTUK R23 FIRST YEAR ENGINEERING NOTES (COMPLETE SEED DATA) - RESILIENT VERSION
-- This script populates the 'notes' table with exam-ready curriculum content.

-- 1. Ensure Table Structure is Up-to-Date
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS weightage INT DEFAULT 3;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS frequency INT DEFAULT 1;

-- Ensure notes type check constraint is fully updated to support 'Revision' type
ALTER TABLE public.notes DROP CONSTRAINT IF EXISTS notes_type_check;
ALTER TABLE public.notes ADD CONSTRAINT notes_type_check CHECK (type IN ('notes', 'cheat-sheet', 'program', 'question', 'PYQ', 'Revision'));

-- 2. ENGINEERING MATHEMATICS – I
INSERT INTO public.notes (title, slug, subject, semester, type, weightage, frequency, content)
VALUES
('M-I: Complete Exam Revision Notes', 'm1-complete-revision', 'Engineering Mathematics I', 1, 'Revision', 5, 10, '
# ENGINEERING MATHEMATICS - I (Unit 1-5)

## UNIT 1: MATRICES
- **Rank of a Matrix:** The number of non-zero rows in its Echelon form.
- **Elementary Transformations:** Row/Column operations to find Rank.
- **System of Equations:** $AX = B$. Consistent if $Rank(A) = Rank(A|B)$.
- **Eigen Values & Vectors:** Roots of $|A - \lambda I| = 0$.
- **Cayley-Hamilton Theorem:** Every square matrix satisfies its eigen equation. Useful for finding $A^{-1}$ and $A^n$.

## UNIT 2: MEAN VALUE THEOREMS
- **Rolles Theorem:** If $f(a)=f(b)$, there exists $c$ such that $f''(c)=0$.
- **Lagranges MVT:** $f''(c) = [f(b)-f(a)] / (b-a)$.
- **Cauchy MVT:** $[f(b)-f(a)] / [g(b)-g(a)] = f''(c) / g''(c)$.
- **Taylors Series:** Expansion of $f(x)$ about $a$.

## UNIT 3: MULTIVARIABLE CALCULUS (PARTIAL DIFF)
- **Partial Derivatives:** Differentiating w.r.t one variable keeping others constant.
- **Total Derivative:** $du = (\partial u/\partial x)dx + (\partial u/\partial y)dy$.
- **Jacobians:** Functional transformations $J = \partial(u,v)/\partial(x,y)$.
- **Maxima & Minima:** Condition $rt-s^2 > 0$ and $r < 0$ for Maxima.

## UNIT 4: MULTIPLE INTEGRALS
- **Double Integrals:** Area calculation in XY plane.
- **Change of Order:** Essential when limits are functions that are hard to integrate in original order.
- **Triple Integrals:** Volume calculation.

## UNIT 5: SPECIAL FUNCTIONS
- **Beta Function:** $B(m,n) = \int_0^1 x^{m-1} (1-x)^{n-1} dx$.
- **Gamma Function:** $\Gamma(n) = \int_0^\infty e^{-x} x^{n-1} dx$.
- **Relation:** $B(m,n) = [\Gamma(m)\Gamma(n)] / \Gamma(m+n)$.

🔥 **TOP IMPORTANT QUESTIONS:**
1. Find Rank using Echelon Form.
2. Verify Cayley-Hamilton Theorem for a 3x3 matrix.
3. Find Maxima/Minima of $f(x,y) = x^3 + y^3 - 3axy$.
4. Evaluate $\iint_R xy \, dx \, dy$ over a given region.
5. Solve problems using Beta-Gamma relations.
'),

-- 2. ENGINEERING PHYSICS
('Physics: Wave Optics & Quantum Mech', 'physics-unit-1-3', 'Engineering Physics', 1, 'notes', 4, 8, '
# ENGINEERING PHYSICS NOTES

## UNIT 1: WAVE OPTICS
- **Interference:** Superposition of waves resulting in fringe patterns.
- **Newtons Rings:** Optical technique to find radius of curvature of lens using $D_n = \sqrt{4n\lambda R}$.
- **Diffraction:** Bending of light around corners.
- **Fraunhofer Diffraction:** Source and Screen are at infinite distance.

## UNIT 2: LASERS & FIBER OPTICS
- **Spontaneous Emission:** Random emission.
- **Stimulated Emission:** Controlled emission (Laser basis).
- **Population Inversion:** More atoms in higher energy state.
- **Numerical Aperture (NA):** Light gathering capacity. $NA = \sqrt{n_1^2 - n_2^2}$.

## UNIT 3: QUANTUM MECHANICS
- **De-Broglie Hypothesis:** $\lambda = h/p = h/mv$.
- **Heisenberg Uncertainty:** $\Delta x \cdot \Delta p \ge \hbar/2$.
- **Schrodinger Wave Equation:** $\hat{H}\psi = E\psi$.

🔥 **TOP IMPORTANT QUESTIONS:**
1. Theory of Newtons Rings (Experimental setup).
2. Differences between Spontaneous and Stimulated emission.
3. Derive Schrodinger Time Independent equation.
4. Working of He-Ne Laser.
'),

-- 3. PPS (C LANGUAGE)
('PPS: C Language Fundamentals', 'pps-c-notes', 'C Programming', 1, 'program', 5, 12, '
# PROGRAMMING FOR PROBLEM SOLVING (C)

## UNIT 1: BASICS
- **Syntax:** `int main() { ... }`
- **Data Types:** `int` (2/4B), `char` (1B), `float` (4B).
- **Operators:** Arithmetic (+, -, *, /), Relational (==, !=, <), Logical (&&, ||, !).

## UNIT 2: CONTROL STRUCTURES
- **Loops:**
```c
// For loop example
for(int i=0; i<10; i++) { 
    printf("%d", i); 
}

// While loop example
while(condition) { ... }
```
- **Switch:** `switch(choice) { case 1: ... break; default: ... }`

## UNIT 3: ARRAYS & STRINGS
- **Array:** Collection of similar data types. `int arr[5] = {1,2,3,4,5};`
- **Strings:** Character arrays ending with `\0`. Functions: `strlen()`, `strcpy()`, `strcmp()`.

## UNIT 4: FUNCTIONS & POINTERS
- **Function:** Block of code. `return_type name(params)`.
- **Pointers:** Variables storing addresses. `int *p = &var;`.

## UNIT 5: STRUCTURES & FILES
- **Structure:** Different data types grouped. `struct Student { char name[50]; int roll; };`
- **Files:** `fopen()`, `fclose()`, `fprintf()`, `fscanf()`.

🔥 **TOP IMPORTANT QUESTIONS:**
1. Explain different Storage Classes in C.
2. Write a program to find Factorial using Recursion.
3. Differences between Call by Value and Call by Reference.
4. Explain Bubble Sort algorithm with an example.
'),

-- 4. CHEMISTRY
('Chemistry: Water Tech & Bonding', 'chem-water-tech', 'Engineering Chemistry', 2, 'notes', 4, 7, '
# ENGINEERING CHEMISTRY NOTES

## UNIT 1: BONDING & STRUCTURE
- **VB Theory:** Overlap of atomic orbitals.
- **MO Theory:** Bonding and Anti-bonding orbitals.
- **Bond Order:** $1/2 (N_b - N_a)$.

## UNIT 2: ELECTROCHEMISTRY
- **Galvanic Cell:** Chemical energy to Electrical.
- **Nernst Equation:** $E = E_0 - (0.059/n) \log[Product/Reactant]$.
- **Batteries:** Primary (Dry cell), Secondary (Lead-acid storage).

## UNIT 3: WATER TECHNOLOGY
- **Hardness:** Due to $Ca^{2+}$ and $Mg^{2+}$ salts.
- **Units:** ppm, mg/L, Degree Clark.
- **EDTA Method:** Used to estimate total hardness using EBT indicator.
- **Treatment:** Zeolite process and Ion-exchange resin.

🔥 **TOP IMPORTANT QUESTIONS:**
1. Estimation of hardness by EDTA method.
2. Construction and working of Calomel Electrode.
3. Differences between Thermoplastics and Thermosetting plastics.
4. Explain Ion-Exchange process for water softening.
'),

-- 5. BEEE
('BEEE: Circuit Laws & Machines', 'beee-revision', 'Basic Electrical Engineering', 1, 'Revision', 5, 9, '
# BASIC ELECTRICAL & ELECTRONICS ENGINEERING

## UNIT 1: DC CIRCUITS
- **Ohms Law:** $V = IR$.
- **Kirchhoffs Laws:** 
  - **KCL:** $\sum I = 0$ at a node.
  - **KVL:** $\sum V = 0$ in a loop.
- **Resistors:** Series ($R = \sum R_i$), Parallel ($1/R = \sum 1/R_i$).

## UNIT 2: AC CIRCUITS
- **RMS Value:** $I_{rms} = I_m / \sqrt{2}$.
- **Average Value:** $I_{avg} = 2I_m / \pi$.
- **Phasors:** Representation of sinusoidal waves.
- **Power Factor:** $\cos\phi = P/S$.

## UNIT 3: ELECTRICAL MACHINES
- **DC Motor:** Converts electrical to mechanical. $T \propto \phi I_a$.
- **Transformer:** Static device changing voltage. $V_1/V_2 = N_1/N_2 = I_2/I_1$.

## UNIT 4: SEMICONDUCTORS
- **P-N Junction:** Forward bias (conducts), Reverse bias (non-conducting).
- **Rectifiers:** Half-wave (one diode), Full-wave (bridge - 4 diodes).

🔥 **TOP IMPORTANT QUESTIONS:**
1. State and explain Kirchhoffs Laws with a circuit.
2. Principle of operation of a single-phase Transformer.
3. Explain Bridge Rectifier with circuit and waveforms.
4. Derive the Torque equation of a DC Motor.
')
ON CONFLICT (slug) DO NOTHING;
