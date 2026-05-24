export const FALLBACK_NOTES = [
  // 1. Engineering Mathematics I
  {
    id: "m01",
    title: "M-I: Complete Exam Revision Notes",
    slug: "m1-complete-revision",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "Revision",
    weightage: 5,
    frequency: 10,
    is_published: true,
    content: `# ENGINEERING MATHEMATICS - I (JNTUK R23 Syllabus)

## UNIT 1: MATRICES
* **Rank of a Matrix:** Defined as the size of the largest non-zero minor. Computationally solved by reducing the matrix to **Row-Echelon Form** using elementary row operations:
  * Non-zero row count matches the Rank $\\rho(A)$.
* **Consistency of Linear Equations:** For $AX = B$:
  * **Consistent:** Rank of Co-efficient Matrix $A$ is equal to the Rank of Augmented Matrix $[A|B]$.
  * **Unique Solution:** $\\rho(A) = \\rho(A|B) = n$ (where $n$ is number of variables).
  * **Infinite Solutions:** $\\rho(A) = \\rho(A|B) < n$.
* **Eigenvalues & Eigenvectors:** Characteristic equation:
  $$|A - \\lambda I| = 0$$
* **Cayley-Hamilton Theorem:** Every square matrix satisfies its own characteristic equation:
  $$a_n A^n + a_{n-1} A^{n-1} + \\dots + a_0 I = 0$$
  * Highly useful to calculate matrix inverses $A^{-1}$ and powers $A^n$.

## UNIT 2: MEAN VALUE THEOREMS
* **Rolles Theorem:** If $f(x)$ is continuous in $[a, b]$, differentiable in $(a, b)$, and $f(a) = f(b)$, then there exists at least one $c \\in (a, b)$ such that:
  $$f''(c) = 0$$
* **Lagranges Mean Value Theorem (LMVT):** If $f(x)$ is continuous in $[a,b]$ and differentiable in $(a,b)$, then there exists $c \\in (a,b)$ such that:
  $$f''(c) = \\frac{f(b) - f(a)}{b - a}$$
* **Cauchy Mean Value Theorem:** If $f(x)$ and $g(x)$ satisfy continuity/differentiability, then:
  $$\\frac{f''(c)}{g''(c)} = \\frac{f(b) - f(a)}{g(b) - g(a)}$$

## UNIT 3: MULTIVARIABLE CALCULUS & PARTIAL DIFFERENTIATION
* **Partial Derivative:** Rate of change along a specific variable coordinate axis, keeping all other variables constant.
* **Total Derivative:**
  $$du = \\frac{\\partial u}{\\partial x}dx + \\frac{\\partial u}{\\partial y}dy + \\frac{\\partial u}{\\partial z}dz$$
* **Jacobian Determinant (Transformations):** For $u = f(x,y), v=g(x,y)$:
  $$J = \\frac{\\partial(u,v)}{\\partial(x,y)} = \\begin{vmatrix} \\frac{\\partial u}{\\partial x} & \\frac{\\partial u}{\\partial y} \\\\ \\frac{\\partial v}{\\partial x} & \\frac{\\partial v}{\\partial y} \\end{vmatrix}$$
* **Extreme Value Criterion (Maxima/Minima):**
  * Let $r = \\frac{\\partial^2 f}{\\partial x^2}$, $s = \\frac{\\partial^2 f}{\\partial x \\partial y}$, $t = \\frac{\\partial^2 f}{\\partial y^2}$.
  * If $rt - s^2 > 0$ and $r < 0$, coordinate is an absolute **Maximum**.
  * If $rt - s^2 > 0$ and $r > 0$, coordinate is an absolute **Minimum**.

## UNIT 4: MULTIPLE INTEGRALS
* **Double Integrals:** Used to calculate area in 2D space:
  $$\\text{Area} = \\iint_{R} dx \\, dy$$
* **Change of Order of Integration:** Helps convert complicated variable limits into integrable configurations by drawing regions and swapping horizontal/vertical strips.

## UNIT 5: SPECIAL FUNCTIONS
* **Beta Function:**
  $$B(m,n) = \\int_{0}^{1} x^{m-1} (1-x)^{n-1} dx$$
* **Gamma Function:**
  $$\\Gamma(n) = \\int_{0}^{\\infty} e^{-x} x^{n-1} dx$$
* **Symmetrical Beta-Gamma Relation Formula:**
  $$B(m, n) = \\frac{\\Gamma(m)\\Gamma(n)}{\\Gamma(m+n)}$$

---

🔥 **TOP IMPORTANT QUESTIONS FOR EXAMS**
1. Reduce the matrix to row-echelon form and find its rank:
   $$A = \\begin{pmatrix} 1 & 2 & 3 & 0 \\\\ 2 & 4 & 3 & 2 \\\\ 3 & 2 & 1 & 3 \\\\ 6 & 8 & 7 & 5 \\end{pmatrix}$$
2. Verify Cayley-Hamilton theorem for $A = \\begin{pmatrix} 2 & -1 & 1 \\\\ -1 & 2 & -1 \\\\ 1 & -1 & 2 \\end{pmatrix}$ and find $A^{-1}$.
3. Examine the extreme values of $f(x, y) = x^3 + y^3 - 3axy$.
4. Evaluate $\\int_{0}^{1} \\int_{x}^{\\sqrt{x}} xy \\, dy \\, dx$ by changing the order of integration.
5. Prove that $\\Gamma(1/2) = \\sqrt{\\pi}$.`
  },
  {
    id: "m02",
    title: "Matrices, Linear Systems & Rank Analysis",
    slug: "m1-matrices-notes",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "notes",
    weightage: 5,
    frequency: 12,
    is_published: true,
    content: `# Matrices & Linear Systems Notes

Master the matrix computations used in civil, mechanical, and computer science engineering systems.

## 1. Finding Rank via Echelon Form
To scale down any system of linear equations, you must perform row elementary operations to reduce the matrix to Echelon form:
- Arrange the leading non-zero element in subsequent rows to appear to the right of the leading element in preceding rows.
- Count the number of non-zero rows. That integer value is the Rank of the matrix.

## 2. Augmented System Consistency
The system has consistent equations if:
$$\\rho(A) = \\rho([A|B])$$

If this equals $n$ (total variables), there is exactly **one unique solution**.
If this is less than $n$, there exist **infinitely many solutions** involving arbitrary free variables.`
  },
  {
    id: "m03",
    title: "M-1 Integral & Multivariable Calculus Formula Sheet",
    slug: "m1-calculus-cheat",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "cheat-sheet",
    weightage: 4,
    frequency: 9,
    is_published: true,
    content: `# M-I Formula Reference Sheet

Keep these core derivations and calculus identities by your side during the final hour.

### 1. Partial Derivatives and Jacobians
$$J = \\frac{\\partial(u,v)}{\\partial(x,y)} = \\frac{\\partial u}{\\partial x}\\frac{\\partial v}{\\partial y} - \\frac{\\partial u}{\\partial y}\\frac{\\partial v}{\\partial x}$$

### 2. Extreme Value Conditions
$$rt - s^2 > 0 \\text{ with } r > 0 \\implies \\text{Local Minima}$$
$$rt - s^2 > 0 \\text{ with } r < 0 \\implies \\text{Local Maxima}$$
$$rt - s^2 < 0 \\implies \\text{Saddle Point (No extremum)}$$
$$rt - s^2 = 0 \\implies \\text{Inconclusive (Requires further investigation)}$$

### 3. Special Integrals
$$\\int_{0}^{\\pi/2} \\sin^p\\theta \\cos^q\\theta \\, d\\theta = \\frac{\\Gamma(\\frac{p+1}{2})\\Gamma(\\frac{q+1}{2})}{2\\Gamma(\\frac{p+q+2}{2})}$$`
  },
  {
    id: "m04",
    title: "JNTUK Mathematics-I Solved PYQs (2022-2024)",
    slug: "m1-pyq-solved",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 15,
    is_published: true,
    content: `# JNTUK R23 Mathematics-I Solved Exam Paper (May 2024)

## PART A (Mandatory Questions)

### Question 1: Find the Eigenvalues of a Diagonal Matrix
**Problem:** Find eigenvalues of $A = \\begin{pmatrix} 5 & 0 & 0 \\\\ 0 & 7 & 0 \\\\ 0 & 0 & -2 \\end{pmatrix}$.
**Solution:** Since $A$ is a diagonal matrix, its eigenvalues are simply its diagonal entries.
$$\\lambda_1 = 5, \\quad \\lambda_2 = 7, \\quad \\lambda_3 = -2$$

## PART B (Long Answers)

### Question 2: Cayley-Hamilton Verification
**Problem:** Show that $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ satisfies Cayley-Hamilton. Find $A^{-1}$.
**Solution:**
1. Find characteristic polynomial $|A - \\lambda I| = 0$:
   $$\\begin{vmatrix} 1-\\lambda & 2 \\\\ 3 & 4-\\lambda \\end{vmatrix} = (1-\\lambda)(4-\\lambda) - 6 = \\lambda^2 - 5\\lambda - 2 = 0$$
2. Substitute $A$:
   $$A^2 - 5A - 2I = \\begin{pmatrix} 7 & 10 \\\\ 15 & 22 \\end{pmatrix} - \\begin{pmatrix} 5 & 10 \\\\ 15 & 20 \\end{pmatrix} - \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix} = \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$$ (Verified!)
3. Find Inverse: Multiply by $A^{-1}$:
   $$A - 5I - 2A^{-1} = 0 \\implies A^{-1} = \\frac{1}{2}(A - 5I) = \\begin{pmatrix} -2 & 1 \\\\ 1.5 & -0.5 \\end{pmatrix}$$`
  },
  {
    id: "m05",
    title: "Eigenvalues, Eigenvectors & Cayley-Hamilton Sets",
    slug: "m1-eigenvectors-questions",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "question",
    weightage: 3,
    frequency: 8,
    is_published: true,
    content: `# Cayley-Hamilton High-Frequency Workset

Use this workbook to master matrices for JNTUK assessments. Complete solutions are referenced inside the Math I Hub.

### Question Set:
1. Verify Cayley-Hamilton for $A = \\begin{pmatrix} 1 & 3 & 7 \\\\ 4 & 2 & 3 \\\\ 1 & 2 & 1 \\end{pmatrix}$.
2. Deduce $A^4$ and $A^{-1}$ using the characteristic equation.
3. Calculate the corresponding eigenvector for the maximum eigenvalue $\\lambda_{max}$.`
  },

  // 2. Engineering Physics
  {
    id: "p01",
    title: "Physics: Wave Optics & Quantum Mech",
    slug: "physics-unit-1-3",
    subject: "Engineering Physics",
    semester: 1,
    type: "notes",
    weightage: 4,
    frequency: 8,
    is_published: true,
    content: `# ENGINEERING PHYSICS

## UNIT 1: WAVE OPTICS
* **Interference:** Phenomenon of redistribution of light energy due to superposition of coherent light waves.
* **Newtons Rings (Reflective):** Formed due to interference in a variable thickness air film between glass surfaces.
  * **Diameter of Bright Rings:** $D_n^2 = 2(2n-1)\\lambda R$.
  * **Diameter of Dark Rings:** $D_n^2 = 4n\\lambda R$.
  * Best technique to find radius of curvature $R$ or light wavelength $\lambda$.
* **Diffraction:** Bending of light rays around the edges of obstacle apertures:
  * **Fraunhofer vs Fresnel:** Fraunhofer places the system components at virtual infinity by using collimating/focusing lenses.

## UNIT 2: LASERS & FIBER OPTICS
* **Spontaneous vs Stimulated Emission:**
  * **Spontaneous:** Atoms move randomly, emitting phase-incoherent photons.
  * **Stimulated:** External photons force high-energy state atoms down, producing coherent, single-phase laser beams.
* **Population Inversion:** State of system where the number of atoms in excited levels ($N_2$) exceeds ground levels ($N_1$). Required to activate amplification.
* **Numerical Aperture (NA):** Light gathering capacity index:
  $$NA = \\sqrt{n_{\\text{core}}^2 - n_{\\text{cladding}}^2}$$

## UNIT 3: QUANTUM MECHANICS basics
* **De-Broglie Wave Theory:** Matter exhibits dual states. Particles has corresponding waves of:
  $$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$
* **Heisenbergs Uncertainty Principle:** It is physically impossible to simultaneously compute momentum ($p$) and coordinate position ($x$) with absolute precision:
  $$\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$$
* **Schrodinger Wave Equation (Time Independent):**
  $$\\nabla^2 \\psi + \\frac{2m}{\\hbar^2}(E - V)\\psi = 0$$`
  },
  {
    id: "p02",
    title: "Lasers, Superconductors & Quantum Formula Quick Sheet",
    slug: "physics-quick-sheet",
    subject: "Engineering Physics",
    semester: 1,
    type: "cheat-sheet",
    weightage: 4,
    frequency: 7,
    is_published: true,
    content: `# Lasers & Quantum Formula Essentials

Fast formula visual aid for the exam day.

### Optical Fibers and Wave Propagation
- **Acceptance Angle:**
  $$\\theta_a = \\sin^{-1}\\left(\\frac{\\sqrt{n_1^2 - n_2^2}}{n_0}\\right)$$
- **Fractional Index Difference:**
  $$\\Delta = \\frac{n_1 - n_2}{n_1}$$
- **V-Number (Normalized Frequency):**
  $$V = \\frac{2\\pi a}{\\lambda}\\sqrt{n_1^2 - n_2^2}$$

### Quantum Constants
- **Planks Constant:** $h \\approx 6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}$
- **Schrodinger 1D Deep Potentials:**
  $$E_n = \\frac{n^2 h^2}{8 m L^2}$$`
  },
  {
    id: "p03",
    title: "JNTUK Physics 2024 Solved Papers with Derivations",
    slug: "physics-pyq-2024",
    subject: "Engineering Physics",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 11,
    is_published: true,
    content: `# Engineering Physics JNTUK Solved Questions

### Question 1: Derivation of Newton's Rings Dark Ring Diameters
**Problem:** Derive that the diameter of dark rings in a Newton's rings experiment is proportional to the square root of natural numbers.
**Derivation:**
1. Let $d$ be the thickness of the air film at distance $r$ from contact. Path difference is $2\\mu d \\cos r_0 + \\lambda/2$.
2. For normal incidence and air film: $\\text{Path Difference} = 2d + \\lambda/2$.
3. For dark fringe/destructive interference:
   $$2d + \\lambda/2 = (2n + 1)\\lambda/2 \\implies 2d = n \\lambda$$
4. From geometry of circle: $d \\approx r^2 / 2R$.
5. Substituting $d$:
   $$2\\left(\\frac{r^2}{2R}\\right) = n \\lambda \\implies r^2 = n \\lambda R \\implies D_n^2 = 4n \\lambda R$$
6. Therefore:
   $$D_n = \\sqrt{4R\\lambda} \\cdot \\sqrt{n} \\implies D_n \\propto \\sqrt{n}$$ (Proven!)`
  },
  {
    id: "p04",
    title: "Physics Final Hour Exam Revision Notes",
    slug: "physics-crash-rev",
    subject: "Engineering Physics",
    semester: 1,
    type: "Revision",
    weightage: 5,
    frequency: 12,
    is_published: true,
    content: `# Final Physics Revision Roadmap

Review these highly-focused subjects prior to entrance.

### Key Derivations Checklist:
- **He-Ne Gas Laser construction:** Uses Helium to assist Neon atoms populating higher states through collision. Operates on continuous wave red light outputs at $632.8\\text{ nm}$.
- **Diffraction Gratings:** Grating formula is $(e+d)\\sin\\theta = n\\lambda$.
- **Superconductivity Type-I vs II:** Meissner effect forces external magnetic flux out below transition temperature $T_c$. Type-I has distinct critical field limits, Type-II has two critical bounds.`
  },
  {
    id: "p05",
    title: "Newton's Rings, Double-Slit Diffraction & Laser Physics Questions",
    slug: "physics-diffraction-questions",
    subject: "Engineering Physics",
    semester: 1,
    type: "question",
    weightage: 3,
    frequency: 5,
    is_published: true,
    content: `# Physics Problem Set

Practical applications of Wave Optics and Laser formulas.

### Problems:
1. In Newton's rings experiment, 10th dark ring diameter is $0.5\\text{ cm}$ using wavelength $6000\\text{ Å}$. Calculate Lens Curvature radius $R$.
2. Outline the relative advantages of Semi-conductor Lasers over Ruby Lasers.
3. Contrast Fraunhofer and Fresnel diffraction patterns with standard beam diagrams.`
  },

  // 3. C Programming
  {
    id: "c01",
    title: "PPS: C Language Fundamentals",
    slug: "pps-c-notes",
    subject: "C Programming",
    semester: 1,
    type: "program",
    weightage: 5,
    frequency: 12,
    is_published: true,
    content: `# C PROGRAMMING CONCEPTS

## UNIT 1: C BASICS & OPERATORS
* **Structure of a C Program:** Preprocessors $\\to$ global values $\to$ local main routine.
* **Tokens:** Smallest logical code elements (keywords, constants, identifiers).
* **Data Types sizes:** \`char\` (1 Byte), \`int\` (2 or 4 Bytes), \`float\` (4 Bytes).

## UNIT 2: CONTROL FLOW LOOPS
* **Conditional:** \`if-else\`, nesting cascades, and \`switch\` block mappings.
* **Loops:**
  * \`for\` loops (known bounds evaluation).
  * \`while\` (pre-checking loops).
  * \`do-while\` (guaranteed execution of at least once).

## UNIT 3: ARRAYS & STRINGS
* **Array Definition:** Sequential block of homogeneous data variables stored in contiguous addresses.
  * \`int arr[5] = {10, 20, 30, 40, 50};\`
* **Strings:** Null-terminated (\`\\0\`) character sequence.

\`\`\`c
#include <stdio.h>
int main() {
    printf("Welcome to JNTUK R23 Programming Study Hub!");
    return 0;
}
\`\`\``
  },
  {
    id: "c02",
    title: "C Strings, Pointers & Syntax Quick Guide",
    slug: "c-syntax-cheatsheet",
    subject: "C Programming",
    semester: 1,
    type: "cheat-sheet",
    weightage: 5,
    frequency: 15,
    is_published: true,
    content: `# C Cheat Sheet: Syntax & Shortcuts

### String Handling Operators (\`string.h\`)
- \`strlen(s)\`: Finds length of string.
- \`strcpy(d, s)\`: Copies source string into destination.
- \`strcmp(s1, s2)\`: Checks equal status. Returns \`0\` if identical.
- \`strcat(d, s)\`: Concatenates source onto target.

### Pointer Address Operators
- \`&\` (Address of): Returns physical reference.
- \`*\` (Dereference): ACCESS values residing in a reference coordinate.`
  },
  {
    id: "c03",
    title: "Advanced Memory Pointers & Structure Logic",
    slug: "c-file-io-notes",
    subject: "C Programming",
    semester: 1,
    type: "notes",
    weightage: 4,
    frequency: 8,
    is_published: true,
    content: `# Advanced Pointers and Memory Structures

Detailing dynamic memory and structures in ANSI C.

### Memory Allocations (\`stdlib.h\`)
1. \`malloc(size)\`: Allocates uninitialized block.
2. \`calloc(n, size)\`: Allocates zero-initialized contiguous space.
3. \`free(*ptr)\`: Releases heap holdings.

### Structures and Unions Difference
- **Structure:** Members hold separate byte locations. Size matches the sum of members' block scales.
- **Union:** Members share identical address. Size matches the largest member scale.`
  },
  {
    id: "c04",
    title: "PPS (C Language) Solved University Exam Papers",
    slug: "c-programming-pyq",
    subject: "C Programming",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 14,
    is_published: true,
    content: `# PPS Core JNTUK R23 Exam Solutions

### Question: Recursive Factorial Logic
**Problem:** Write a recursion code computing factorial of a number and trace stack calls.
**Code Solution:**
\`\`\`c
#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1; // Base case
    return n * factorial(n - 1); // Recursive call
}

int main() {
    int num = 5;
    printf("Factorial of %d is %lld\\n", num, factorial(num));
    return 0;
}
\`\`\`
**Call Trace (factorial(3)):**
1. \`factorial(3)\` $\\implies 3 \\times \\text{factorial}(2)$
2. \`factorial(2)\` $\\implies 2 \\times \\text{factorial}(1)$
3. \`factorial(1)\` returns $1 \\to$ propagates back to compute $2 \\times 1 = 2 \\to 3 \\times 2 = 6$.`
  },
  {
    id: "c05",
    title: "Unit-by-Unit Recursion & Array Quick Revision",
    slug: "c-quick-revision",
    subject: "C Programming",
    semester: 1,
    type: "Revision",
    weightage: 4,
    frequency: 10,
    is_published: true,
    content: `# PPS Rapid Revision Kit

Use this crash outline to ensure safe passing grades during supplementary or main exams.

### Essential Programs Cheat Sheets:
- Swap integers with pointers.
- Bubble Sort arrays.
- Linear search values.
- Compute Matrix additions or transpositions.`
  },

  // 4. Basic Electrical Engineering
  {
    id: "e01",
    title: "BEEE: Circuit Laws & Machines",
    slug: "beee-revision",
    subject: "Basic Electrical Engineering",
    semester: 1,
    type: "Revision",
    weightage: 5,
    frequency: 9,
    is_published: true,
    content: `# BASIC ELECTRICAL & ELECTRONICS ENGINEERING

## UNIT 1: DC CIRCUITS & NETWORK LAWS
* **Ohms Law:** Voltage drop is proportional to loop current: $V = I \\cdot R$.
* **Kirchhoffs Current Law (KCL):** Sum of node currents matches zero: $\\sum I_{\\text{incoming}} = \\sum I_{\\text{outgoing}}$.
* **Kirchhoffs Voltage Law (KVL):** Sum of closed loop potential differences matches zero: $\\sum V = 0$.

## UNIT 2: AC CIRCUITS & PRINCIPLES
* **Root Mean Square (RMS) Value:** $V_{\\text{rms}} = \\frac{V_m}{\\sqrt{2}} \\approx 0.707 \\cdot V_m$.
* **Average Sinusoidal Value:** $V_{\\text{avg}} = \\frac{2V_m}{\\pi}$.
* **Power Factor:** Ratio of actual real power ($P$) to apparent power ($S$): $\\cos \\phi = R / Z$.

## UNIT 3: AC/DC MACHINES & TRANSFORMERS
* **Transformer Mechanics:** Static voltage changing device:
  $$\\frac{V_1}{V_2} = \\frac{N_1}{N_2}$$`
  },
  {
    id: "e02",
    title: "AC Analysis, Power Factor Resonance & DC Circuits",
    slug: "beee-ac-circuits",
    subject: "Basic Electrical Engineering",
    semester: 1,
    type: "notes",
    weightage: 4,
    frequency: 6,
    is_published: true,
    content: `# AC Circuit Resonance Study Notes

Analyzing alternating current parameters, impedance, and resonance conditions in serial/parallel configurations.

### RLC Series Circuit Resonance
- **Resonant Frequency:**
  $$f_r = \\frac{1}{2\\pi\\sqrt{LC}}$$
- **At resonance:** Impedance $Z = R$ (minimum), Current $I$ peaks, Power factor matches unity ($1.0$).
- **Impedance Formula:**
  $$Z = \\sqrt{R^2 + (X_L - X_C)^2}$$`
  },
  {
    id: "e03",
    title: "Kirchhoff's Laws & DC Network Theorems Cheat Sheet",
    slug: "beee-laws-sheet",
    subject: "Basic Electrical Engineering",
    semester: 1,
    type: "cheat-sheet",
    weightage: 5,
    frequency: 11,
    is_published: true,
    content: `# BEEE Quick Network Theorems Sheet

Key theorems for Solving Complex DC Loops in exams:

- **Superposition Theorem:** Total response matches algebraic sum of constituent independent source actions acting isolation.
- **Thevenin's Equivalent Circuit:** Any active bilateral network reduces to a series Voltage source ($V_{th}$) and equivalent resistor ($R_{th}$).
- **Norton's Theorem:** Reduces loop into parallel current source ($I_{sc}$) and Norton resistor ($R_{n}$).`
  },
  {
    id: "e04",
    title: "JNTUK R23 BEEE Solved Exam Papers (2024)",
    slug: "beee-solved-pyqs",
    subject: "Basic Electrical Engineering",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 13,
    is_published: true,
    content: `# JNTUK BEEE Exam Solution Set

### Question: Superposition Theorem
**Problem:** Find current $I$ through a load resistor using Superposition theorem.
**Solution Analysis:**
1. **Case 1: Only Voltage source active.** short circuit the current source. Solve loop using mesh loops to find $I'$.
2. **Case 2: Only Current source active.** open circuit the voltage source. Determine $I''$ through the branch.
3. **Synthesis:** Combine components:
   $$I_{\\text{net}} = I' + I''$$ (Follow polarity directional rules!)`
  },
  {
    id: "e05",
    title: "AC Motor Characteristics & Single-Phase Transformer Questions",
    slug: "beee-analytical-questions",
    subject: "Basic Electrical Engineering",
    semester: 1,
    type: "question",
    weightage: 3,
    frequency: 7,
    is_published: true,
    content: `# BEEE Question Pack & Exercises

### Exam Practice:
1. Explain the EMF Equation of a Single Phase Transformer:
   $$E = 4.44 f N \\Phi_m$$
2. Contrast Slip-ring and Squirrel cage Induction motors with operational diagrams.
3. Compute equivalent resistance of a complex delta-star network configuration.`
  },

  // 5. Communicative English
  {
    id: "en01",
    title: "Technical Writing, Business Letters & Resumes",
    slug: "english-technical-writing",
    subject: "Communicative English",
    semester: 1,
    type: "notes",
    weightage: 4,
    frequency: 5,
    is_published: true,
    content: `# English Professional Writing Guide

Master writing skills for workplace scenarios and technical presentations.

### 1. Structure of a Cover Letter
- **Header:** Sender/Recipient details with formal date.
- **Salutation:** 'Dear Hiring Team' or 'Dear Dr. Name'.
- **Body paragraphs:** Introduces relevance, credentials, and achievements.
- **Complimentary close:** 'Sincerely,' or 'Warm Regards,'.

### 2. Resume Formats
- **Chronological:** Lists accomplishments from recent to prehistoric.
- **Functional:** Groups relevance around skills (best for student portfolios).`
  },
  {
    id: "en02",
    title: "Grammar, Punctuation & Active Voice Quick Sheet",
    slug: "english-grammar-cheatsheet",
    subject: "Communicative English",
    semester: 1,
    type: "cheat-sheet",
    weightage: 3,
    frequency: 6,
    is_published: true,
    content: `# Oral and Grammar Reference Sheet

Key communication concepts simplified:

- **Active vs Passive Voice Transitions:**
  - *Active:* "The compiler compiled code."
  - *Passive:* "The code was compiled by the compiler."
- **Common Preposition Errors:** Solve matching prepositions for time, coordinate positions, and directions.
- **Subject-Verb Agreement (Concord):** Singular subjects demand singular actions.`
  },
  {
    id: "en03",
    title: "JNTUK English Semester Solved Examination Papers",
    slug: "english-solved-pyqs",
    subject: "Communicative English",
    semester: 1,
    type: "PYQ",
    weightage: 4,
    frequency: 8,
    is_published: true,
    content: `# JNTUK English Exam Resolved Keys

### Section: Error Rectification
**Questions:**
1. *Error:* "He did not went to college." $\\to$ **Correction:** "He did not go to college."
2. *Error:* "Everyone are presenting today." $\\to$ **Correction:** "Everyone is present today."

### Section: Technical Reporting
Write an executive report outline analyzing structural lab safety incidents. Perfect models included inside notes.`
  },
  {
    id: "en04",
    title: "English Oral Communication & Reading Skills Revision",
    slug: "english-oral-revision",
    subject: "Communicative English",
    semester: 1,
    type: "Revision",
    weightage: 5,
    frequency: 10,
    is_published: true,
    content: `# English Final Oral Revision Checklist

Ensure you cover these concepts before verbal labs:

- **Phonetics & Pronunciation:** Study primary vowel clusters and consonants.
- **Presentation Mechanics:** Slide alignment, non-verbal hand actions, cue-cards coordination, and maintaining eye contact inside audience halls.`
  },
  {
    id: "en05",
    title: "Prepositions, Agreement Concord & Verb Conjugation Sets",
    slug: "english-preposition-questions",
    subject: "Communicative English",
    semester: 1,
    type: "question",
    weightage: 3,
    frequency: 7,
    is_published: true,
    content: `# English Grammar Practice Questions

Improve spelling accuracy and syntax corrections.

### Exercises:
1. Provide correct prepositions: "The lecture commenced ___ 9:00 AM ___ the seminar lounge."
2. Match concord agreements: "Either the laboratory assistant or the principal (makes/make) final apparatus sign-offs."`
  },

  // 6. Engineering Mathematics II
  {
    id: "m201",
    title: "Laplace Transforms & Ordinary Differential Equations",
    slug: "m2-ode-fourier",
    subject: "Engineering Mathematics II",
    semester: 2,
    type: "notes",
    weightage: 5,
    frequency: 11,
    is_published: true,
    content: `# Laplace Transforms and Ordinary Differential Equations

Master higher analytical methods for engineering mechanics.

### 1. Laplace Transform Definitions
$$L\\{f(t)\\} = \\int_{0}^{\\infty} e^{-st} f(t) \\, dt$$

- **Laplace of custom functions:**
  - $L\\{e^{at}\\} = \\frac{1}{s-a}$
  - $L\\{\\sin(at)\\} = \\frac{a}{s^2 + a^2}$
  - $L\\{t^n\\} = \\frac{n!}{s^{n+1}}$

### 2. Solving ODEs using Laplace
Transform local derivatives into algebraic configurations:
$$L\\{y'\\} = s Y(s) - y(0)$$
$$L\\{y''\\} = s^2 Y(s) - s y(0) - y'(0)$$`
  },
  {
    id: "m202",
    title: "Laplace Transform & Vector Calculus Formulas",
    slug: "m2-laplace-cheatsheet",
    subject: "Engineering Mathematics II",
    semester: 2,
    type: "cheat-sheet",
    weightage: 5,
    frequency: 14,
    is_published: true,
    content: `# M-II Integration & Transform Formulas

### Vector Calculus Mechanics
- **Gradient operator:**
  $$\\nabla \\phi = \\frac{\\partial \\phi}{\\partial x}\\hat{i} + \\frac{\\partial \\phi}{\\partial y}\\hat{j} + \\frac{\\partial \\phi}{\\partial z}\\hat{k}$$
- **Divergence of a vector (Flux):**
  $$\\nabla \\cdot \\vec{F}$$
- **Curl of a vector (Rotation):**
  $$\\nabla \\times \\vec{F}$$

### Integral Theorems Constants
- **Green's Theorem:**
  $$\\oint (P\\,dx + Q\\,dy) = \\iint \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dx\\,dy$$`
  },
  {
    id: "m203",
    title: "JNTUK Mathematics-II Solved R23 Exam Papers",
    slug: "m2-solved-pyqs",
    subject: "Engineering Mathematics II",
    semester: 2,
    type: "PYQ",
    weightage: 5,
    frequency: 12,
    is_published: true,
    content: `# JNTUK R23 Math II Exam Key

### Question: Prove Vector Solenoidal status
**Problem:** Verify that $\\vec{F} = 3y^4 z^2 \\vec{i} + 4x^3 z^2 \\vec{j} - 3x^2 y^2 \\vec{k}$ is Solenoidal.
**Solution Analysis:**
- A vector fields is *Solenoidal* if its divergence is 0: $\\nabla \\cdot \\vec{F} = 0$.
- Evaluate derivatives:
  $$\\frac{\\partial F_x}{\\partial x} = 0, \\quad \\frac{\\partial F_y}{\\partial y} = 0, \\quad \\frac{\\partial F_z}{\\partial z} = 0$$
- Adding components:
  $$\\nabla \\cdot \\vec{F} = 0 + 0 + 0 = 0$$ (Checked!)`
  },
  {
    id: "m204",
    title: "Fourier Series & Multiple Integrals Final revision",
    slug: "m2-vector-revision",
    subject: "Engineering Mathematics II",
    semester: 2,
    type: "Revision",
    weightage: 4,
    frequency: 9,
    is_published: true,
    content: `# Math II Revision Guidelines

Focus regions for JNTUK assessments:

- **Dirichlet's Conditions:** Continuity demands for Fourier series mappings.
- **Inverse Laplace Transforms:** Using partial fraction decompositions to return back to function space.
- **Stokes' Theorem equivalence:** Line-to-surface vector transformations.`
  },
  {
    id: "m205",
    title: "Second-Order Non-Homogeneous Linear Equations Practice",
    slug: "m2-ode-differential-questions",
    subject: "Engineering Mathematics II",
    semester: 2,
    type: "question",
    weightage: 3,
    frequency: 7,
    is_published: true,
    content: `# M-II ODE Challenge Problemsets

### Differential Equations Solver Checklist:
1. Find Complementary Function (CF) and Particular Integral (PI) for:
   $$(D^2 - 4D + 4)y = e^{2x} + \\sin(x)$$
2. Apply the Method of Variation of Parameters to compute ODE solutions.`
  },

  // 7. Engineering Chemistry
  {
    id: "ch01",
    title: "Chemistry: Water Tech & Bonding",
    slug: "chem-water-tech",
    subject: "Engineering Chemistry",
    semester: 2,
    type: "notes",
    weightage: 4,
    frequency: 7,
    is_published: true,
    content: `# ENGINEERING CHEMISTRY

## UNIT 1: MOLECULAR STRUCTURE & BONDING
* **Valence Bond (VB) Theory vs Molecular Orbital (MO) Theory:**
  * **VB Theory:** Bonding results from overlap of atomic orbitals on individual atoms.
  * **MO Theory:** Atomic orbitals merge to form molecular orbitals delocalized over the whole molecule.
* **Bond Order Calculation:** Stability metrics:
  $$\\text{Bond Order} = \\frac{N_{\\text{bonding}} - N_{\\text{anti-bonding}}}{2}$$

## UNIT 2: ELECTROCHEMISTRY
* **Galvanic Cell:** Converts chemical reactions directly to electricity.
* **Nernst Equation Formula:** Potential changes for concentration shifts:
  $$E = E^0 - \\frac{0.0592}{n}\\log_{10} \\frac{[\\text{Products}]}{[\\text{Reactants}]}$$
* **Batteries:** Dry Cell (Primary) versus lead-acid storing elements (Secondary).

## UNIT 3: WATER TECHNOLOGY
* **Water Hardness:** Caused by divalent cations ($Ca^{2+}, Mg^{2+}$).
* **EDTA Hardness Estimation:** Complexometric titration using metal indicators like EBT. Wine-red to ink-blue transition.`
  },
  {
    id: "ch02",
    title: "Fuels, Polymers & Molecular Orbitals Cheat Sheet",
    slug: "chem-fuels-cheatsheet",
    subject: "Engineering Chemistry",
    semester: 2,
    type: "cheat-sheet",
    weightage: 4,
    frequency: 8,
    is_published: true,
    content: `# Engineering Chemistry Quick Formula Sheet

### Water Hardness calculations:
$$\\text{Hardness in CaCO}_3 \\text{ equivalents} = \\frac{\\text{Mass of hardness-salt (mg)}}{\\text{Molecular weight of salt}} \\times 100$$
- **EDTA relationship coefficient:**
  $$1 \\text{ mL of } 0.01\\text{M EDTA} \\equiv 1\\text{ mg of CaCO}_3\\text{ hardness.}$$

### Polymer Configurations
- **Thermoplastics:** Linear chain structures, melt on reheating.
- **Thermosets:** Highly cross-linked, char instead of melting.`
  },
  {
    id: "ch03",
    title: "JNTUK Chemistry R23 Main Paper & Supply Solved Questions",
    slug: "chem-solved-pyqs",
    subject: "Engineering Chemistry",
    semester: 2,
    type: "PYQ",
    weightage: 5,
    frequency: 10,
    is_published: true,
    content: `# Chemistry PYQ Exam Answers

### Question: EDTA Hardness Computation
**Problem:** If $50\\text{ mL}$ of a water sample consumed $15\\text{ mL}$ of $0.01\\text{M}$ EDTA, calculate sample hardness.
**Solution Step-by-Step:**
1. Determine equivalent milligrams hardness in reaction:
   $$\\text{Hardness mass} = V_{\\text{EDTA}} \\times M_{\\text{EDTA}} \\text{ factors} = 15 \\text{ mg equivalent}$$
2. Convert scale to $1\\text{L}$ (ppm equivalence):
   $$\\text{Total Hardness} = \\frac{15\\text{ mg}}{50\\text{ mL}} \\times 1000 = 300\\text{ ppm}$$ (Hardness is $300\\text{ mg/L}$ total)`
  },
  {
    id: "ch04",
    title: "Spectroscopy Methods & Analytical Estimations",
    slug: "chem-spectroscopy",
    subject: "Engineering Chemistry",
    semester: 2,
    type: "Revision",
    weightage: 4,
    frequency: 9,
    is_published: true,
    content: `# Chemistry Instrument Revision Guide

Quick highlights of spectroscopy and analysis units:

- **Beer-Lambert's Law:** Absorption is proportional to path length and solution density: $A = \\epsilon \\cdot c \\cdot l$.
- **UV-Visible Spectroscopy:** Identifies electronic transition modes (conjugation).
- **FTIR Spectral Analysis:** Maps molecular functional group vibrations.`
  },
  {
    id: "ch05",
    title: "Corrosion Control Methods & Fuel Energy Values Calculation",
    slug: "chem-corrosion-questions",
    subject: "Engineering Chemistry",
    semester: 2,
    type: "question",
    weightage: 3,
    frequency: 6,
    is_published: true,
    content: `# Engineering Chemistry Practice Questions

- Compare sacrificial anode cathodic metal shielding with impressed current shielding systems.
- Contrast Gross Calorific Value (GCV) and Net Calorific Values of heavy boiler fuels.`
  },

  // 8. Data Structures
  {
    id: "ds01",
    title: "Linear Data Structures: Stacks, Queues & Linked Lists",
    slug: "ds-linear-structures-notes",
    subject: "Data Structures",
    semester: 2,
    type: "notes",
    weightage: 5,
    frequency: 13,
    is_published: true,
    content: `# Linear Data Structures Notes

Basic linear structures and memory organization models.

### 1. Stacks (LIFO - Last In First Out)
- **Primary Operations:** \`push()\` (adds to top), \`pop()\` (removes top element).
- **Pointer markers:** \`top\` points to current index. Underflow if \`top == -1\`.

### 2. Queues (FIFO - First In First Out)
- **Primary Operations:** \`enqueue()\` (rear insertion), \`dequeue()\` (front deletion).
- **Index pointers:** \`front\`, \`rear\`. Circular queues resolve standard storage wastes.

### 3. Singly Linked Lists
- Homogeneous values linked by address reference elements. Memory nodes hold data and address pointers. `
  },
  {
    id: "ds02",
    title: "Sorting Complexities & BST Operations Sheet",
    slug: "ds-complexities-cheatsheet",
    subject: "Data Structures",
    semester: 2,
    type: "cheat-sheet",
    weightage: 5,
    frequency: 14,
    is_published: true,
    content: `# Data Structures Complexities Quick Sheet

Keep insertion, sorting, and search benchmarks on hand.

### Sorting Complexities Map
| Algorithm | Best Complexity | Average Complexity | Worst Complexity | Space Overhead |
|---|---|---|---|---|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Quick Sort | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ | $O(\\log n)$ |
| Merge Sort | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(n)$ |
| Binary Search | $O(1)$ | $O(\\log n)$ | $O(\\log n)$ | $O(1)$ |`
  },
  {
    id: "ds03",
    title: "JNTUK DS Solved Papers with Full Code Snippets",
    slug: "ds-solved-pyqs",
    subject: "Data Structures",
    semester: 2,
    type: "PYQ",
    weightage: 5,
    frequency: 15,
    is_published: true,
    content: `# JNTUK Data Structures Solved Codes

### Question: Singly Linked List Node Inversion
**Problem:** Write a function block in C to reverse a singly linked list.
**Code Solution:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* reverseList(struct Node* head) {
    struct Node* prev = NULL;
    struct Node* current = head;
    struct Node* next = NULL;
    
    while (current != NULL) {
        next = current->next;   // Keep track of next
        current->next = prev;   // Reverse connection
        prev = current;         // Advance pointers
        current = next;
    }
    return prev; // New head of reversed list
}
\`\`\``
  },
  {
    id: "ds04",
    title: "Trees, Graphs & Graph Traversals Final Revision",
    slug: "ds-trees-graphs-revision",
    subject: "Data Structures",
    semester: 2,
    type: "Revision",
    weightage: 4,
    frequency: 11,
    is_published: true,
    content: `# Trees and Graphs Crash Revision

Major topics for the final exams:

- **Traversals of Binary Trees:** Pre-Order (DLR), In-Order (LDR), Post-Order (LRD).
- **Graph Traversals BFS/DFS:** BFS uses Queue structures (level search), DFS uses recursion stacks (depth path).
- **Minimum Spanning Trees:** Kruskal's edge analysis and Prim's vertex expansions.`
  },
  {
    id: "ds05",
    title: "AVL Trees, Binary Search & Heap Tree Insertion Exercises",
    slug: "ds-avl-rotations-questions",
    subject: "Data Structures",
    semester: 2,
    type: "question",
    weightage: 3,
    frequency: 9,
    is_published: true,
    content: `# Data Structures Practice Questions

- Insert keys $\{40, 20, 10, 25, 30, 22\}$ into an AVL tree and trace balancing rotations (LL, RR, LR, RL).
- Trace Heapify array actions building a Max-Heap structure.`
  },

  // 9. Environmental Science
  {
    id: "es01",
    title: "Ecosystems, Mineral Resources & Biodiversity Conservation",
    slug: "es-ecosystem-biodiversity",
    subject: "Environmental Science",
    semester: 2,
    type: "notes",
    weightage: 4,
    frequency: 7,
    is_published: true,
    content: `# Ecosystems and Resource Conservations

Learn primary topics in social environmental sciences.

### 1. Types of Ecosystems
1. **Terrestrial:** Forests, grasslands, sand deserts.
2. **Aquatic:** Marine, fresh water lakes, ocean corals.

### 2. Ecosystem Trophic Levels
- **Producers:** Autotrophic green plants convert solar energy.
- **Consumers:** Herbivore primary, carnivore secondary members.
- **Decomposers:** Fungal and bacterial elements breaking organisms back into soils.`
  },
  {
    id: "es02",
    title: "Environmental Acts, Pollution Control & Green Tech Sheets",
    slug: "es-acts-ozone-cheatsheet",
    subject: "Environmental Science",
    semester: 2,
    type: "cheat-sheet",
    weightage: 3,
    frequency: 6,
    is_published: true,
    content: `# Environmental Legislation Cheat Sheet

### Important Environmental Acts (India)
- **Water Prevention and Pollution Act:** 1974
- **Air Prevention and Pollution Act:** 1981
- **Environmental Protection Umbrella Act:** 1986
- **Wildlife Protection Act:** 1972

### Global Protocols
- **Montreal Protocol (1987):** Target: Eliminate Ozone Depleting CFC gases.
- **Kyoto Protocol (1997):** Target: Restructuring carbon emissions.`
  },
  {
    id: "es03",
    title: "JNTUK Environmental Studies R23 Solved Paper Keys",
    slug: "es-solved-pyqs",
    subject: "Environmental Science",
    semester: 2,
    type: "PYQ",
    weightage: 4,
    frequency: 9,
    is_published: true,
    content: `# Environmental Prep Solved Exams

### Question: Trace Acid Rain Mechanisms
**Problem:** Outline the chemical reactions causing Acid Rain and describe impacts.
**Solution Analysis:**
1. **Reactions:** Industrial sulfur dioxide and nitric oxides release into atmospheric water vapors forming acids:
   $$\\text{SO}_2 + \\text{O}_2 + \\text{H}_2\\text{O} \\to \\text{H}_2\\text{SO}_4 \\quad (\\text{Sulfuric Acid})$$
   $$\\text{NO}_x + \\text{H}_2\\text{O} \\to \\text{HNO}_3 \\quad (\\text{Nitric Acid})$$
2. **Impacts:** Corrodes structures (marble damage - Taj Mahal), alters soil acidity, kills aquatic fauna.`
  },
  {
    id: "es04",
    title: "Global Warming, Green House Gases & Waste Management",
    slug: "es-disaster-revision",
    subject: "Environmental Science",
    semester: 2,
    type: "Revision",
    weightage: 5,
    frequency: 10,
    is_published: true,
    content: `# Rapid Environmental Revision Outline

Critical study points for JNTUK semester exams:

- **Primary Greenhouse Gases:** Carbon Dioxide ($CO_2$), Methane ($CH_4$), Nitrous Oxide ($N_2O$), CFCs and water vapors.
- **Solid Waste Management Process:** Segregation, Composting, Sanitary Landfills, and Incineration controls.`
  },
  {
    id: "es05",
    title: "Food Webs, Renewable Energies & Ecological Footprint Questions",
    slug: "es-carbon-credit-questions",
    subject: "Environmental Science",
    semester: 2,
    type: "question",
    weightage: 3,
    frequency: 5,
    is_published: true,
    content: `# Environmental Practice Workbook

### Classroom Exercises:
1. Detail Biomagnification using real ecological Mercury toxin flow examples.
2. Draft a critical outline detailing renewable Solar cell vs Wind power efficiency coefficients.`
  },
  // ==================== NEW EXTENSIONS FOR EXAMS, VIVA & LAB PROGRAMS ====================
  // 10. C Programming Lab Programs
  {
    id: "c-lab-progs-outputs",
    title: "PPS C Programming Lab Programs with Terminal Output",
    slug: "c-lab-programs-outputs",
    subject: "C Programming",
    semester: 1,
    type: "program",
    weightage: 5,
    frequency: 18,
    is_published: true,
    content: `# C Programming Lab Experiments Manual (JNTUK R23)

Get complete, compiled terminal verified implementations for core first-year laboratory exercises.

## 1. Bubble Sort Algorithm
Arranges array elements dynamically in ascending order based on adjacent comparison switches.

### Complete Program Code:
\`\`\`c
#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int temp;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(data) / sizeof(data[0]);
    
    printf("Original array: ");
    for(int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");

    bubbleSort(data, n);

    printf("Sorted array: ");
    for(int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");
    return 0;
}
\`\`\`

### Verified Terminal Output:
\`\`\`text
Original array: 64 34 25 12 22 11 90 
Sorted array: 11 12 22 25 34 64 90 
\`\`\`

---

## 2. In-Place String Reversion
reverses a string without using backup character variables or secondary arrays.

### Complete Code Snippet:
\`\`\`c
#include <stdio.h>
#include <string.h>

void reverseString(char str[]) {
    int length = strlen(str);
    int start = 0;
    int end = length - 1;
    char temp;

    while (start < end) {
        temp = str[start];
        str[start] = str[end];
        str[end] = temp;
        start++;
        end--;
    }
}

int main() {
    char sample[] = "ENGIPREP_HUB";
    printf("Original: %s\\n", sample);
    reverseString(sample);
    printf("Reversed: %s\\n", sample);
    return 0;
}
\`\`\`

### Verified Terminal Output:
\`\`\`text
Original: ENGIPREP_HUB
Reversed: BUH_PERPIGNE
\`\`\``
  },
  // 11. C Programming Viva
  {
    id: "c-viva-qa",
    title: "PPS C Language Viva Voce Guide & FAQs",
    slug: "c-viva-questions",
    subject: "C Programming",
    semester: 1,
    type: "question",
    weightage: 4,
    frequency: 14,
    is_published: true,
    content: `# C Programming Viva-Voce Ultimate Preparation Guide

Prepare for your internal and external laboratory exams with verified topper-tier questions and immediate answers.

### Q1. What is the difference between \`malloc()\` and \`calloc()\`?
* **malloc():** Allocates a single block of memory of requested size. Contained bytes are uninitialized and hold garbage data.
  * *Syntax:* \`int* ptr = (int*)malloc(n * sizeof(int));\`
* **calloc():** Allocates multiple continuous blocks of memory and automatically initializes each block to zero.
  * *Syntax:* \`int* ptr = (int*)calloc(n, sizeof(int));\`

### Q2. What is a "Dangling Pointer"?
A dangling pointer occurs when a pointer continues pointing to a physical memory address after that allocation has been deallocated or freed.
* **Avoidance:** Assign \`NULL\` to the pointer immediately after releasing it:
  \`\`\`c
  free(ptr);
  ptr = NULL;
  \`\`\`

### Q3. Explain Pointers in C.
A pointer is a variable whose contents store the memory address of another variable. They enable direct manipulation of RAM blocks.

### Q4. What is the difference between a Structure and a Union?
* **Structure:** Allocates separate memory slots for each of its members. The size matches the sum of sizes of all members.
* **Union:** Allocates a single shared memory block. The size equals the size of its largest member. All members share the same address space.

### Q5. What is the lifetime and scope of a Static Variable?
A static variable holds its valued memory state throughout the entire execution duration of the program. It retains its last calculated value between successive function calls.`
  },
  // 12. C Programming Expected Qs
  {
    id: "c-most-expected",
    title: "C Programming Most Expected 10-Mark Exam Solvers",
    slug: "c-most-expected-questions",
    subject: "C Programming",
    semester: 1,
    type: "question",
    weightage: 5,
    frequency: 16,
    is_published: true,
    content: `# C Programming Most Expected Long Answer Solutions

Crack the highest-weightage exam topics with completely structured answers.

## Topic 1: Standard Parameter Passing Methods (Call by Value vs Call by Reference)

In C programming, arguments can be sent to functions using two core methodologies:

### A. Call By Value
* A copy of the actual variable is passed to the formal parameter.
* Modifications made inside the called function have no side-effects on original variables in the calling routine.
* Code Model:
  \`\`\`c
  void swap(int x, int y) {
      int temp = x;
      x = y;
      y = temp;
  }
  \`\`\`

### B. Call By Reference
* The memory address of the actual parameter is passed to pointers.
* Changes inside the function directly swap the content at those addresses.
* Code Model:
  \`\`\`c
  void swapByRef(int *x, int *y) {
      int temp = *x;
      *x = *y;
      *y = temp;
  }
  \`\`\`

---

## Topic 2: File Operation Keywords
Explain \`fopen()\`, \`fclose()\`, \`fread()\`, and \`fwrite()\` with modes like \`"r"\`, \`"w"\`, and \`"a"\`.
* **"r" (Read mode):** Opens an existing text file for parsing. If missing, returns \`NULL\`.
* **"w" (Write mode):** Creates a new blank file. Overwrites existing contents if the file already exists.
* **"a" (Append mode):** Adds data onto the end of an existing file. Perfect for logging databases.`
  },
  // 13. M1 Viva Qs
  {
    id: "m1-viva-qa",
    title: "Engineering Mathematics I Viva Voce Guide",
    slug: "m1-viva-questions-answers",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "question",
    weightage: 4,
    frequency: 12,
    is_published: true,
    content: `# M-I Viva Voce & Concept Review Guide

Quick questions to pass your Mathematics external audits with excellent remarks.

### Q1. What is the physical significance of the Rank of a Matrix?
**Answer:** Geometrically, it represents the dimension of the vector space generated by its rows/columns. It denotes the maximum number of independent linear paths in a vector field.

### Q2. Describe the Cayley-Hamilton Theorem.
**Answer:** It states that every square matrix $A$ satisfies its own characteristic determinant equation:
$$|A - \lambda I| = 0$$
For example, if $\lambda^2 - 5\lambda + 6 = 0$ is the characteristic equation, then:
$$A^2 - 5A + 6I = 0$$

### Q3. When is a system of linear equations consistent?
**Answer:** For a system $AX = B$, it is consistent (possesses at least one solution) if and only if the Rank of the coefficient matrix $A$ is equal to the Rank of the Augmented matrix $[A|B]$:
$$\rho(A) = \rho([A|B])$$

### Q4. List the conditions for Rolle's Theorem.
**Answer:** A function $f(x)$ complies with Rolle's criteria inside boundaries $[a, b]$ if:
1. $f(x)$ is continuous in the closed interval $[a, b]$.
2. $f(x)$ is differentiable in the open interval $(a, b)$.
3. $f(a) = f(b)$.
Under these states, there's always a physical spot $c \in (a, b)$ where $f'(c) = 0$.`
  },
  // 14. M1 Expected Qs
  {
    id: "m1-most-expected",
    title: "Engineering Mathematics I Most Expected 10-Mark Solvers",
    slug: "m1-most-expected-questions",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "question",
    weightage: 5,
    frequency: 15,
    is_published: true,
    content: `# Engineering Mathematics I Most Expected Exam Solvers

Rigorous step-by-step methods to solve the highest scoring JNTUK exam structures.

## Question Type 1: Reduce to Row Echelon Form and Find Rank
**Problem Matrix:**
$$A = \begin{pmatrix} 1 & 3 & 4 & 3 \\ 3 & 9 & 12 & 3 \\ 1 & 3 & 4 & 1 \end{pmatrix}$$

### Step-by-Step Solution:
1. Apply $R_2 \to R_2 - 3R_1$ and $R_3 \to R_3 - R_1$:
   $$A \sim \begin{pmatrix} 1 & 3 & 4 & 3 \\ 0 & 0 & 0 & -6 \\ 0 & 0 & 0 & -2 \end{pmatrix}$$
2. Divide $R_2$ by $-6$:
   $$A \sim \begin{pmatrix} 1 & 3 & 4 & 3 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & -2 \end{pmatrix}$$
3. Eliminate $R_3$ using $R_3 \to R_3 + 2R_2$:
   $$A \sim \begin{pmatrix} 1 & 3 & 4 & 3 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \end{pmatrix}$$
4. Count the non-zero rows. There are precisely 2 non-zero rows. 
5. **Final Result:** Rank $(\rho) = 2$.

---

## Question Type 2: Extreme value estimation for $f(x, y) = x^3 + y^3 - 3axy$
A classic 10-mark multivariable optimization derivation.

### Step-by-Step Solution:
1. Calculate partial derivatives:
   $$\frac{\partial f}{\partial x} = 3x^2 - 3ay = 0 \implies x^2 = ay$$
   $$\frac{\partial f}{\partial y} = 3y^2 - 3ax = 0 \implies y^2 = ax$$
2. Solve the equations:
   $$x^4 = a^2y^2 = a^3x \implies x(x^3 - a^3) = 0 \implies x = 0 \text{ or } x = a$$
3. Critical Coordinate Points are $(0,0)$ and $(a,a)$.
4. Compute second-order elements:
   $$r = \frac{\partial^2 f}{\partial x^2} = 6x, \quad s = \frac{\partial^2 f}{\partial x \partial y} = -3a, \quad t = \frac{\partial^2 f}{\partial y^2} = 6y$$
5. Evaluate at Point $(a,a)$:
   $$r = 6a, \quad s = -3a, \quad t = 6a$$
   $$rt - s^2 = (6a)(6a) - (-3a)^2 = 36a^2 - 9a^2 = 27a^2 > 0$$
6. Since $rt-s^2 > 0$ and $r = 6a > 0$ (assuming $a > 0$), the point is a local **Minima**.
7. Minimum value is $f(a,a) = a^3 + a^3 - 3a^3 = -a^3$.`
  },
  // 15. Physics Viva
  {
    id: "p-viva-qa",
    title: "Engineering Physics Laboratory Viva Voce Guides",
    slug: "physics-viva-questions-answers",
    subject: "Engineering Physics",
    semester: 1,
    type: "question",
    weightage: 4,
    frequency: 11,
    is_published: true,
    content: `# Engineering Physics Viva Q&A Guide

Prepare for your physical experiments and laboratory exams.

### Q1. Why are Newton's Rings circular?
**Answer:** The air film enclosed between the plano-convex lens curvature and flat glass plate possesses circular symmetry. Every locus of equal thickness forms a concentric circle, resulting in circular constructive and destructive fringes.

### Q2. What is Population Inversion?
**Answer:** Population inversion is the physical condition where there are more atoms inside metastable excited energy states ($N_2$) than the ground states ($N_1$). This enables stimulated light propagation.

### Q3. What is the fundamental physical difference between single-mode and multi-mode fibers?
* **Single-Mode Fiber (SMF):** Very narrow core diameter (~9 $\mu$m). Supports only one wave path, eliminating modal dispersion.
* **Multi-Mode Fiber (MMF):** Wide core diameter (~50 to 125 $\mu$m). Supports multiple light paths, making signal alignments easy but introducing dispersion.

### Q4. Describe the meaning of a Grating Constant.
**Answer:** The grating constant represents the distance between consecutive slits:
$$(e + d)$$
where $e$ is slit width, and $d$ is opaque space width. It defines the diffraction grating formula: $(e+d)\sin\theta = n\lambda$.`
  },
  // 16. Physics Expected Qs
  {
    id: "p-most-expected",
    title: "Engineering Physics Most Expected Derivations & Solvers",
    slug: "physics-most-expected-questions",
    subject: "Engineering Physics",
    semester: 1,
    type: "question",
    weightage: 5,
    frequency: 15,
    is_published: true,
    content: `# Physics Most Expected 10-Mark Exam Derivations

Detailed exam derivations to secure passing and distinction marks in physics.

## Derivation 1: Numerical Aperture of an Optical Fiber
Derive the expression for the maximum light acceptance capability of standard fibers.

### Step-by-Step Derivation:
1. Let $n_0, n_1, n_2$ be the refractive indices of air, core, and cladding respectively.
2. A light ray enters the core at acceptance angle $\theta_a$ and refracts at angle $\theta$:
   $$n_0 \sin \theta_a = n_1 \sin \theta \quad \text{--- (Eq 1)}$$
3. At the core-cladding boundary, the angle of incidence must be critical angle $\phi_c$ for total internal reflection:
   $$\sin \phi_c = \frac{n_2}{n_1}$$
4. From the right-angled triangle index inside core:
   $$\theta = 90^\circ - \phi_c \implies \sin \theta = \sin(90^\circ - \phi_c) = \cos \phi_c$$
5. Combine algebraic relationships:
   $$\cos \phi_c = \sqrt{1 - \sin^2 \phi_c} = \sqrt{1 - \frac{n_2^2}{n_1^2}} = \frac{\sqrt{n_1^2 - n_2^2}}{n_1}$$
6. Substitute $\sin \theta$ into Snell's law (Eq 1):
   $$n_0 \sin \theta_a = n_1 \left(\frac{\sqrt{n_1^2 - n_2^2}}{n_1}\right) = \sqrt{n_1^2 - n_2^2}$$
7. Since $n_0 \approx 1$ in air, the Acceptance Angle is:
   $$\theta_a = \sin^{-1}\left(\sqrt{n_1^2 - n_2^2}\right)$$
8. **Final Formula:** Numerical Aperture (NA) is:
   $$\text{NA} = \sin \theta_a = \sqrt{n_1^2 - n_2^2}$$`
  },
  // 17. Chemistry Lab & Viva
  {
    id: "chem-lab-viva",
    title: "Engineering Chemistry Lab Diagnostics & Titration Guides",
    slug: "chem-lab-viva-estimations",
    subject: "Engineering Chemistry",
    semester: 2,
    type: "program",
    weightage: 4,
    frequency: 13,
    is_published: true,
    content: `# JNTUK Engineering Chemistry Practical Lab Guide

Detailed workflows, algorithms, calculations, and explanations for first-year chemistry laboratory sessions.

## 1. EDTA Titration for Estimation of Water Hardness
A standard commercial metric to analyze boiler scale risk in mechanical and civil installations.

### Experimental Procedure:
1. Pipette $20\text{ mL}$ of industrial hard water sample into a conical flask.
2. Add $2\text{ mL}$ of Ammonium buffer solution ($\text{NH}_4\text{Cl} + \text{NH}_4\text{OH}$) to lock pH at $10.0$.
3. Add 2 drops of Eriochrome Black-T (EBT) indicator. The color changes to **Wine-Red**.
4. Titrate against $0.01\text{M}$ standardized EDTA solution until the Wine-Red shifts to stable **Ink-Blue**.

### Chemical Calculations:
$$\text{Total water hardness (mg/L)} = \frac{\text{Volume of EDTA Consumed (mL)} \times \text{Molarity of EDTA} \times 10^5}{\text{Volume of hardness sample titrated (mL)}}$$

---

## 2. Conductivity Titration (Strong Acid vs Strong Base)
Maps point coordinates of net potential conductance changes between Hydrochloric Acid ($\text{HCl}$) and Sodium Hydroxide ($\text{NaOH}$).

### Key Concept:
* Conductance initially decreases sharply as highly mobile $\text{H}^+$ ions are neutralized by incoming base.
* The equivalence point is the minimum point on a V-shaped curve, after which the excess hydroxyl $\text{OH}^-$ ions cause a rapid rise in conductivity.

### Sample Viva Questions & Answers:
* **Q: Why buffer at pH 10 in EDTA?**
  * *Answer:* To ensure the metal-EDTA complex remains stable and the EBT indicator can undergo a sharp color change.
* **Q: Explain temporary and permanent water hardness.**
  * *Answer:* Temporary hardness is due to metal bicarbonates and can be removed by boiling. Permanent hardness is due to metal sulfates or chlorides, requiring chemical processing.`
  },
  // 18. Chemistry Expected Qs
  {
    id: "chem-most-expected",
    title: "Engineering Chemistry Most Expected Exam Questions",
    slug: "chem-most-expected-questions",
    subject: "Engineering Chemistry",
    semester: 2,
    type: "question",
    weightage: 5,
    frequency: 14,
    is_published: true,
    content: `# Chemistry Most Expected Exam Derivations

Save time by studying these highly scoring Chemistry topics for your semester final exams.

## Topic 1: Derivation of the Nernst Equation
Computes electrochemical electrode potential at non-standard ion concentrations.

### Step-by-Step Derivation:
1. Consider a reversible reduction reaction:
   $$M^{n+} + n e^{-} \rightleftharpoons M(s)$$
2. From thermodynamics, free energy change is related by:
   $$\Delta G = \Delta G^0 + R T \ln Q$$
3. Since work done is electrical energy ($-\Delta G = nFE$):
   $$-nFE = -nFE^0 + R T \ln \left(\frac{[M(s)]}{[M^{n+}]}\right)$$
4. Divide through by $-nF$ (taking activity of solid metal $[M] = 1$):
   $$E = E^0 - \frac{RT}{nF} \ln \left(\frac{1}{[M^{n+}]}\right) \implies E = E^0 + \frac{RT}{nF} \ln [M^{n+}]$$
5. Substitute constants at room temperature ($T = 298\text{ K}$, $R = 8.314\text{ J/K}\cdot\text{mol}$, $F = 96500\text{ C}$):
   $$E = E^0 + \frac{0.0591}{n} \log_{10} [M^{n+}]$$

---

## Topic 2: Sacrificial Anode Protection
* A corrosion prevention method where a more active, easily oxidizable metal is connected to the steel structure.
* Magnesium ($\text{Mg}$) or Zinc ($\text{Zn}$) acts as the "sacrificial anode," corroding preferentially and protecting the underlying steel pipe or ship hull.`
  },
  // 19. BEEE Viva
  {
    id: "beee-viva-qa",
    title: "BEEE Laboratory Viva Voce Guides",
    slug: "beee-viva-lab-guide",
    subject: "Basic Electrical Engineering",
    semester: 1,
    type: "question",
    weightage: 4,
    frequency: 11,
    is_published: true,
    content: `# Basic Electrical Engineering Viva Q&A Pack

Prepare for your Electrical lab final exams with these conceptual insights.

### Q1. Define the RMS value of Alternating Current.
**Answer:** The Root Mean Square (RMS) value represents the equivalent DC current that produces the exact same amount of thermal heat dissipation in a given resistor over the same period.
$$I_{\text{rms}} = \frac{I_{\text{max}}}{\sqrt{2}} \approx 0.707 \cdot I_{\text{max}}$$

### Q2. What is the Core (Iron) Loss in a transformer, and how is it measured?
**Answer:** Core losses include hysteresis and eddy current losses in the magnetic core. They are static and independent of load. They are measured using the **Open Circuit (OC) Test** at rated voltage.

### Q3. Explain the meaning of the Power Factor.
**Answer:** It is the ratio of Real Power ($P$, in Watts) to Apparent Power ($S$, in Volt-Amperes). It represents how productively electrical energy is being converted into work:
$$\text{Power Factor} = \cos \phi = \frac{\text{Real Power}}{\text{Apparent Power}}$$

### Q4. What is the function of slip-rings in a slip-ring induction motor?
**Answer:** Slip-rings provide electrical connection between the rotating rotor windings and external circuits, allowing external resistance insertion to achieve huge starting torques.`
  },
  // 20. BEEE Expected Qs
  {
    id: "beee-most-expected",
    title: "BEEE Most Expected Exam Derivations & Circuits",
    slug: "beee-most-expected-derivations",
    subject: "Basic Electrical Engineering",
    semester: 1,
    type: "question",
    weightage: 5,
    frequency: 15,
    is_published: true,
    content: `# BEEE Expected 10-Mark Exam Derivations

Top scoring derivations and circuit solvers for JNTUK final exams.

## Derivation 1: EMF Equation of a Transformer
Derive the expression for the RMS electromotive force induced inside magnetic transformer windings.

### Mathematical Derivation:
1. Let $\Phi_m$ be the maximum value of magnetic flux in the core, $f$ be the frequency of supply, and $N$ be the number of winding turns.
2. The core flux fluctuates sinusoidally, completing a single cycle in $T = 1/f$ seconds.
3. The average rate of change of flux from 0 to peak ($\Phi_m$) occurs in a quarter cycle ($T/4$):
   $$\text{Average EMF per turn} = \frac{\text{Change of Flux}}{\text{Time Taken}} = \frac{\Phi_m - 0}{1/4f} = 4 f \Phi_m \quad \text{Volts/turn}$$
4. For sinusoidal waves, the Form Factor is defined as:
   $$\text{Form Factor} = \frac{\text{RMS Value}}{\text{Average Value}} = 1.11$$
5. Therefore, the RMS EMF induced per turn is:
   $$\text{RMS EMF per turn} = 1.11 \times \text{Average Value} = 1.11 \times 4 f \Phi_m = 4.44 f \Phi_m$$
6. **Final Result:** Total induced voltage ($E$) in a winding with $N$ turns is:
   $$E = 4.44 f N \\Phi_m \\quad \\text{Volts}$$`
  },
  {
    id: "bcme01",
    title: "Basic Civil & Mechanical Engineering Notes",
    slug: "bcme-notes",
    subject: "Basic Civil and Mechanical Engineering",
    semester: 2,
    type: "Revision",
    weightage: 5,
    frequency: 10,
    is_published: true,
    content: `# Basic Civil and Mechanical Engineering 

## UNIT 1: CIVIL ENGINEERING MATERIALS
* **Cement:** Binding material. Portland Cement contains limestone and clay.
* **Bricks:** Made from molded clay and fired in kilns. Standard dimensions apply.

## UNIT 2: SURVEYING
* **Principles of Surveying:** Working from whole to part.
* **Leveling:** Determining elevations relative to a datum.

## UNIT 3: THERMODYNAMICS & POWER PLANTS
* **Thermal Plants:** Use coal/steam turbines to generate power.
* **First Law of Thermodynamics:** Energy cannot be created nor destroyed ($\Delta U = q + w$).

## UNIT 4: INTERNAL COMBUSTION ENGINES
* **4-Stroke vs 2-Stroke:** 4-Stroke completes a cycle in two crankshaft revolutions; 2-Stroke in one.

## UNIT 5: REFRIGERATION
* **Vapor Compression Cycle:** Evaporator $\\rightarrow$ Compressor $\\rightarrow$ Condenser $\\rightarrow$ Expansion Valve.`
  },
  {
    id: "pyq-m1-2024",
    title: "JNTUK R23 Linear Algebra & Calculus Solved Answers (Jan-2024)",
    slug: "m1-jan-2024-solved",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 1,
    is_published: true,
    content: `# JNTUK R23 January-2024 LINEAR ALGEBRA AND CALCULUS (SET-1)

## PART-A (Compulsory Short Answers - 20 Marks)

### Q1. a) Define linear system of equations.
**Solution:**
A linear system of m equations in n variables is a collection of equations of the form:
$$a_{i1}x_1 + a_{i2}x_2 + \dots + a_{in}x_n = b_i \quad (\text{for } i=1,2,\dots,m)$$
This can be compactly written in matrix notation as $AX = B$, where:
- $A$ is the $m \times n$ coefficient matrix.
- $X$ is the $n \times 1$ variable vector.
- $B$ is the $m \times 1$ constant vector.

---

### Q1. b) What is the normal form?
**Solution:**
The normal form of a matrix $A$ of rank $r$ is the representation obtained by applying a sequence of elementary row and column operations to reduce it to:
$$\begin{pmatrix} I_r & O \\ O & O \end{pmatrix}$$
where $I_r$ is the $r \times r$ identity matrix, and $O$ represents zero matrices of suitable dimensions. The integer $r$ corresponds to the mathematical Rank of the matrix.

---

### Q1. c) Find the matrix corresponding to quadratic form: $x^2 + 4xy + 2y^2$.
**Solution:**
For any 2D quadratic form $Q(x,y) = ax^2 + 2hxy + by^2$:
- Coefficient of $x^2$ is $a_{11} = a = 1$.
- Coefficient of $y^2$ is $a_{22} = b = 2$.
- Coefficient of $xy$ is $2h = 4 \implies a_{12} = a_{21} = h = 2$.
Thus, the symmetric matrix of the quadratic form is:
$$A = \begin{pmatrix} 1 & 2 \\ 2 & 2 \end{pmatrix}$$

---

### Q1. d) Find the sum of the Eigen values of matrix $\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$.
**Solution:**
By matrix properties, the sum of the eigenvalues is equal to the Trace of the matrix (sum of main diagonal entries):
$$\sum \lambda_i = \text{Trace}(A) = a_{11} + a_{22} = 1 + 4 = 5$$

---

### Q1. e) State Cauchy's mean value theorem.
**Solution:**
If two functions $f(x)$ and $g(x)$ are:
1. Continuous in the closed interval $[a, b]$,
2. Differentiable in the open interval $(a, b)$,
3. $g'(x) \neq 0$ for all $x \in (a, b)$,
then there exists at least one point $c \in (a, b)$ such that:
$$\frac{f'(c)}{g'(c)} = \frac{f(b) - f(a)}{g(b) - g(a)}$$

---

### Q1. f) Write the geometrical interpretation for Lagrange's mean value theorem.
**Solution:**
Geometrically, LMVT states that if a continuous curve $y = f(x)$ is drawn between two points $A(a, f(a))$ and $B(b, f(b))$, there is at least one point $c \in (a, b)$ on the curve where the tangent line is parallel to the secant chord line passing through $A$ and $B$.

---

### Q1. g) Find $\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}$ for $f(x, y) = xy + x^2 + 2y$.
**Solution:**
- Differentiating partially w.r.t $x$ (treating $y$ as constant):
  $$\frac{\partial f}{\partial x} = y + 2x$$
- Differentiating partially w.r.t $y$ (treating $x$ as constant):
  $$\frac{\partial f}{\partial y} = x + 2$$

---

### Q1. h) Find $\frac{\partial u}{\partial x}$ if $u = f(x+y, x-y)$.
**Solution:**
Let $r = x+y$ and $s = x-y$. By the multivariable chain rule:
$$\frac{\partial u}{\partial x} = \frac{\partial f}{\partial r}\frac{\partial r}{\partial x} + \frac{\partial f}{\partial s}\frac{\partial s}{\partial x}$$
Since $\frac{\partial r}{\partial x} = 1$ and $\frac{\partial s}{\partial x} = 1$:
$$\frac{\partial u}{\partial x} = \frac{\partial f}{\partial r}(1) + \frac{\partial f}{\partial s}(1) = \frac{\partial f}{\partial r} + \frac{\partial f}{\partial s}$$

---

### Q1. i) Let $f(x, y)$ be a continuous function in $R^2$ where $R = \{ (x, y) \mid a \leq x \leq b; c \leq y \leq d \}$ then $\iint_R f(x, y) \, dx \, dy = ?$
**Solution:**
By Fubini's Theorem for rectangular regions, the double integral can be evaluated as an iterated integral:
$$\iint_R f(x, y) \, dx \, dy = \int_{a}^{b} \int_{c}^{d} f(x, y) \, dy \, dx = \int_{c}^{d} \int_{a}^{b} f(x, y) \, dx \, dy$$

---

### Q1. j) Evaluate $\int_{0}^{1} \int_{0}^{2} xy \, dx \, dy$.
**Solution:**
Due to constant limits, we can separate the integral variables:
$$\int_{0}^{1} y \, dy \times \int_{0}^{2} x \, dx = \left[ \frac{y^2}{2} \right]_{0}^{1} \times \left[ \frac{x^2}{2} \right]_{0}^{2} = \left( \frac{1}{2} \right) \times \left( \frac{4}{2} \right) = \frac{1}{2} \times 2 = 1$$

---

## PART-B (Long Answers - 50 Marks)

### Q2. a) Find the rank of the matrix using Echelon form of $A = \begin{pmatrix} 1 & 2 & 3 & -2 \\ 2 & -2 & 1 & 3 \\ 3 & 0 & 4 & 1 \end{pmatrix}$.
**Solution:**
Let's apply elementary row operations to reduce $A$ to Row-Echelon form:
1. Make entries below $a_{11}=1$ zero:
   - Perform $R_2 \rightarrow R_2 - 2R_1$:
     $$R_2 = \begin{pmatrix} 2 & -2 & 1 & 3 \end{pmatrix} - \begin{pmatrix} 2 & 4 & 6 & -4 \end{pmatrix} = \begin{pmatrix} 0 & -6 & -5 & 7 \end{pmatrix}$$
   - Perform $R_3 \rightarrow R_3 - 3R_1$:
     $$R_3 = \begin{pmatrix} 3 & 0 & 4 & 1 \end{pmatrix} - \begin{pmatrix} 3 & 6 & 9 & -6 \end{pmatrix} = \begin{pmatrix} 0 & -6 & -5 & 7 \end{pmatrix}$$
   Now the matrix is:
   $$\begin{pmatrix} 1 & 2 & 3 & -2 \\ 0 & -6 & -5 & 7 \\ 0 & -6 & -5 & 7 \end{pmatrix}$$
2. Make entry below $a_{22}=-6$ zero:
   - Perform $R_3 \rightarrow R_3 - R_2$:
     $$\begin{pmatrix} 1 & 2 & 3 & -2 \\ 0 & -6 & -5 & 7 \\ 0 & 0 & 0 & 0 \end{pmatrix}$$
3. Since the number of non-zero rows is strictly 2, the **Rank of the matrix $\rho(A) = 2$**.

---

### Q2. b) Solve the system of equations using Gauss elimination method: $10x + y + z = 12$, $2x + 10y +  z = 13$, $x + y + 5z = 7$.
**Solution:**
The augmented matrix $[A|B]$ is:
$$\begin{pmatrix} 10 & 1 & 1 & 12 \\ 2 & 10 & 1 & 13 \\ 1 & 1 & 5 & 7 \end{pmatrix}$$
1. Swap $R_1$ and $R_3$ (for easier leading entry $1$):
   $$\begin{pmatrix} 1 & 1 & 5 & 7 \\ 2 & 10 & 1 & 13 \\ 10 & 1 & 1 & 12 \end{pmatrix}$$
2. Perform row operations to eliminate entries underneath column 1:
   - $R_2 \rightarrow R_2 - 2R_1$:
     $$R_2 = \begin{pmatrix} 2-2 & 10-2 & 1-10 & 13-14 \end{pmatrix} = \begin{pmatrix} 0 & 8 & -9 & -1 \end{pmatrix}$$
   - $R_3 \rightarrow R_3 - 10R_1$:
     $$R_3 = \begin{pmatrix} 10-10 & 1-10 & 1-50 & 12-70 \end{pmatrix} = \begin{pmatrix} 0 & -9 & -49 & -58 \end{pmatrix}$$
   Matrix becomes:
   $$\begin{pmatrix} 1 & 1 & 5 & 7 \\ 0 & 8 & -9 & -1 \\ 0 & -9 & -49 & -58 \end{pmatrix}$$
3. Eliminate $y$ term in $R_3$:
   - Perform $R_3 \rightarrow R_3 + \frac{9}{8}R_2$ or scale both rows: $8R_3 + 9R_2 \rightarrow R_3$:
     $$8R_3 = \begin{pmatrix} 0 & -72 & -392 & -464 \end{pmatrix}$$
     $$9R_2 = \begin{pmatrix} 0 & 72 & -81 & -9 \end{pmatrix}$$
     Adding them: $\begin{pmatrix} 0 & 0 & -473 & -473 \end{pmatrix}$
   Matrix is:
   $$\begin{pmatrix} 1 & 1 & 5 & 7 \\ 0 & 8 & -9 & -1 \\ 0 & 0 & -473 & -473 \end{pmatrix}$$
4. Solve via Back-Substitution:
   - From $R_3$: $-473z = -473 \implies \mathbf{z = 1}$.
   - From $R_2$: $8y - 9(1) = -1 \implies 8y = 8 \implies \mathbf{y = 1}$.
   - From $R_1$: $x + 1 + 5(1) = 7 \implies x + 6 = 7 \implies \mathbf{x = 1}$.
Thus, the unique solution is $x = 1, y = 1, z = 1$.`
  },
  {
    id: "pyq-m1-2024-full",
    title: "JNTUK R23 Linear Algebra & Calculus — Complete Solved Answers",
    slug: "m1-jan-2024-full-solved",
    subject: "Engineering Mathematics I",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 2,
    is_published: true,
    content: `# JNTUK R23 Linear Algebra & Calculus — Complete Solved Answers

Based on uploaded January 2024 real PYQs.

## UNIT–1
### Q1) Find Rank of Matrix Using Echelon Form
**Matrix:** $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & -2 & 0 \\\\ 3 & 1 & 4 \\end{pmatrix}$.
**Solution:**
Apply row operations:
- $R_2 \\to R_2 - 2R_1$
- $R_3 \\to R_3 - 3R_1$
New matrix: $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & -6 & -5 \\\\ 0 & -5 & -5 \\end{pmatrix}$
Now: $R_3 \\to R_3 - R_2$ $\\to \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & -6 & -5 \\\\ 0 & 0 & 0 \\end{pmatrix}$.
Number of non-zero rows = 2.
**Final Answer:** Rank(A) = 2.

### Q2) Solve Using Gauss Elimination Method
$10x+y+z=12, 2x+10y+z=13, x+y+5z=7$
**Solution:**
From equation (3): $x = 7-y-5z$. Substitute into (1) and (2).
After simplification: $y=1, z=1, x=1$.
**Final Answer:** $x=1, y=1, z=1$.

## UNIT–2
### Q3) Find Eigen Values of $A=\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}$
**Solution:**
Characteristic equation: $|A-\\lambda I| = 0 \\implies (1-\\lambda)(4-\\lambda) - 4 = 0 \\implies \\lambda^2 - 5\\lambda = 0 \\implies \\lambda(\\lambda-5)=0$.
**Eigen Values:** $\\lambda_1 = 0, \\lambda_2 = 5$.

### Q4) Verify Cayley Hamilton Theorem for $A=\\begin{pmatrix} 2 & 0 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 0 & 2 \\end{pmatrix}$
**Solution:**
Characteristic Equation $|A-\\lambda I|=0 \\implies \\lambda^3-5\\lambda^2+6\\lambda-2=0$.
By Cayley Hamilton theorem: $A^3 - 5A^2 + 6A - 2I = 0$.
Substitute matrix powers and verify.
**Final Result:** Hence verified.

## UNIT–3
### Q5) Verify Rolle’s Mean Value Theorem
Function: $f(x) = \\frac{x^2+1}{x^2-1}$ in interval $[-1, 1]$.
(Conditions: continuous in $[-1,1]$, differentiable in $(-1,1)$, $f(-1)=f(1)$).
Differentiate setting $f'(c)=0 \\implies c=0$.
**Final Answer:** Hence Rolle’s theorem verified.

### Q6) Taylor Series Expansion of $f(x)=\\log(1+x)$ about $x=0$
**Expansion:** $\\log(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\dots$

## UNIT–4
### Q7) Find Partial Derivatives of $f(x,y)=xy+x^2+2y^2$
**Solution:**
With respect to $x$: $\\frac{\\partial f}{\\partial x} = y + 2x$.
With respect to $y$: $\\frac{\\partial f}{\\partial y} = x + 4y$.

### Q8) Find Extreme Values of $f(x,y)=1-x^2-y^2$
First Derivatives: $f_x = -2x, f_y = -2y \\implies x=0, y=0$.
Second Derivatives: $f_{xx} = -2, f_{yy} = -2, f_{xy} = 0$.
Determinant $D = f_{xx}f_{yy} - f_{xy}^2 = 4$.
Since $D>0, f_{xx}<0$, Maximum occurs at $f(0,0)=1$.

## UNIT–5
### Q9) Evaluate Double Integral $\\int_{0}^{1} \\int_{0}^{1} xy \, dx dy$
**Solution:**
$\\int_{0}^{1} y \, dy \\times \\int_{0}^{1} x \, dx = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.
**Final Answer:** $1/4$.

### Q10) Volume of Sphere Using Triple Integration: $x^2+y^2+z^2=a^2$
**Solution:**
Using spherical coordinates: $V = \\int_0^{2\\pi} \\int_0^{\\pi} \\int_0^{a} r^2 \\sin\\theta \, dr d\\theta d\\phi$.
**Final Answer:** $V = \\frac{4}{3}\\pi a^3$.`
  },
  {
    id: "pyq-physics-2024",
    title: "JNTUK R23 Physics Jan-2024 Solved Paper",
    slug: "physics-jan-2024-solved",
    subject: "Engineering Physics",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 1,
    is_published: true,
    content: `# JNTUK R23 January-2024 ENGINEERING PHYSICS (SET-1)

## PART-A (Compulsory Short Answers - 20 Marks)

### Q1. a) What is the significance of the intensity distribution in the interference pattern produced by the superposition of waves?
**Solution:**
The intensity distribution demonstrates that interference does not destroy light energy; instead, it redistributes it. In bright fringes, energy constructively summates to a peak value ($I_{max} \propto (a_1+a_2)^2$), while in dark fringes, destructive interference drops it to $I_{min} \propto (a_1-a_2)^2$. The average energy remains perfectly conserved.

---

### Q1. b) Define diffraction grating.
**Solution:**
A diffraction grating is an optical device consisting of a large number of parallel, closely spaced, equidistant slits of equal width. It diffracts incident light into detailed spectra due to multi-source secondary interference waves:
$$(e+d)\sin\theta = n\lambda$$
where $(e+d)$ is the grating element.

---

### Q1. h) Explain Fermi Dirac distribution function.
**Solution:**
The Fermi-Dirac distribution function $f(E)$ calculates the probability that an available electron state at energy level $E$ is occupied by an electron at temperature $T$:
$$f(E) = \frac{1}{1 + e^{\frac{E - E_F}{k_B T}}}$$
where $E_F$ is the characteristic Fermi Energy level, and $k_B$ is the Boltzmann constant. At $T=0\text{ K}$, $f(E)=1$ for $E \le E_F$ and $0$ for $E > E_F$.

---

## PART-B (Long Answers - 50 Marks)

### Q2. a) Explain how Newton's rings are formed in reflected light. Derive expressions for diameters of dark and bright rings.
**Solution:**
When a plano-convex lens of large radius of curvature $R$ is placed on a flat glass plate, a thin wedge-shaped air film is formed between them. When monochromatic light is incident normally on this film, light reflected from the lower surface of the lens interferes with light reflected from the upper surface of the flat plate.

#### Derivation of Ring Diameters:
1. Path difference for normal incidence on an air film of thickness $t$:
   $$\Delta = 2t + \frac{\lambda}{2} \quad (\text{due to Phase shift at denser medium reflection})$$
2. **For Dark Rings:** $\Delta = (2n + 1)\frac{\lambda}{2}$
   $$2t + \frac{\lambda}{2} = (2n+1)\frac{\lambda}{2} \implies 2t = n\lambda$$
   From circular geometry, the thickness of the film $t$ at radius $r_n$ is:
   $$t \approx \frac{r_n^2}{2R} \implies 2\left(\frac{r_n^2}{2R}\right) = n\lambda \implies r_n^2 = n\lambda R$$
   Since diameter $D_n = 2r_n$:
   $$\mathbf{D_{dark} = \sqrt{4n\lambda R}} \quad (\text{where } n = 0, 1, 2, \dots)$$
3. **For Bright Rings:** $\Delta = n\lambda$
   $$2t + \frac{\lambda}{2} = n\lambda \implies 2t = (2n-1)\frac{\lambda}{2}$$
   Substituting $t = \frac{r_n^2}{2R}$:
   $$2\left(\frac{r_n^2}{2R}\right) = (2n-1)\frac{\lambda}{2} \implies r_n^2 = \frac{(2n-1)\lambda R}{2}$$
   $$\mathbf{D_{bright} = \sqrt{2(2n-1)\lambda R}} \quad (\text{where } n = 1, 2, 3, \dots)$$`
  },
  {
    id: "pyq-chemistry-2024",
    title: "JNTUK R23 Chemistry Jan-2024 Solved Paper",
    slug: "chemistry-jan-2024-solved",
    subject: "Engineering Chemistry",
    semester: 2,
    type: "PYQ",
    weightage: 5,
    frequency: 1,
    is_published: true,
    content: `# JNTUK R23 January-2024 CHEMISTRY (SET-1)

## 1. CONCEPT SIMPLIFICATION

### Q1. a) What is the Significance of $\Psi$ and $\Psi^2$?
* **The Wavefunction ($\Psi$):** In quantum chemistry, $\Psi$ has no direct physical meaning. It is a mathematical amplitude function that describes the spatial coordinate behavior of an electron. It can have positive, negative, or complex values.
* **Probability Density ($\Psi^2$):** According to Max Born, $\Psi^2$ represents the actual probability of finding an electron in an infinitesimal space volume around a given point. It is always positive and normalized:
  $$\iiint_{-\infty}^{\infty} |\Psi|^2 \, d\tau = 1$$

---

### Q1. b) What are the Bonding and Anti-Bonding molecular orbitals?
* **Bonding Molecular Orbitals (BMO):** Formed by the constructive addition of atomic wavefunctions ($\Psi_{BMO} = \psi_A + \psi_B$). Electrons in BMOs increase inter-nuclear electron density, shielding nuclei and stabilizing the molecule. They have lower energy.
* **Anti-Bonding Molecular Orbitals (ABMO):** Formed by destructive subtraction of wavefunctions ($\Psi_{ABMO} = \psi_A - \psi_B$). ABMOs have a zero electron density node between nuclei, destabilizing the system. They have higher energy.

---

### Q1. e) What is an electrochemical cell? Give an example.
An electrochemical cell is a system that can either generate electrical energy from spontaneous chemical reactions (Galvanic/Voltaic cell) or use electrical energy to drive non-spontaneous chemical changes (Electrolytic cell).
* **Example:** The **Daniel Cell**, consisting of a Zinc anode immersed in $\text{ZnSO}_4$ solution and a Copper cathode in $\text{CuSO}_4$ solution, connected via a salt bridge.

---

## 2. MOLECULAR ORBITAL ENERGY DIAGRAM OF $O_2$ (UNIT-I)

$$\begin{array}{c}
\text{Energy Level Configuration for } O_2 \text{ (16 Electrons):} \\
\sigma_{1s}^2 \ \sigma_{1s}^{*2} \ \sigma_{2s}^2 \ \sigma_{2s}^{*2} \ \sigma_{2p_z}^2 \ \left( \pi_{2p_x}^2 = \pi_{2p_y}^2 \right) \ \left( \pi_{2p_x}^{*1} = \pi_{2p_y}^{*1} \right)
\end{array}$$

#### Bond Order Calculation:
$$\text{Bond Order} = \frac{N_{\text{bonding}} - N_{\text{anti-bonding}}}{2} = \frac{10 - 6}{2} = 2$$

#### Magnetic Nature:
Since there are **two unpaired electrons** in the degenerate anti-bonding $\pi^*$ orbitals ($\pi_{2p_x}^{*1}$ and $\pi_{2p_y}^{*1}$), **molecular oxygen ($O_2$) is paramagnetic**.

---

## 3. FORMULA DERIVATION: THE NERNST EQUATION (UNIT-III)

Derive the electrode reduction potential under non-standard ion concentrations.

1. Let the reversible electrode reduction reaction be:
   $$M^{n+}(aq) + n e^{-} \rightleftharpoons M(s)$$
2. From chemical thermodynamics, the real Gibbs free energy change ($\Delta G$) is related to standard free energy ($\Delta G^0$) by:
   $$\Delta G = \Delta G^0 + R T \ln Q$$
   where $Q$ is the reaction quotient:
   $$Q = \frac{[\text{Products}]}{[\text{Reactants}]} = \frac{[M(s)]}{[M^{n+}(aq)]}$$
3. Since solid concentration is constant, we set activity $[M(s)] = 1$.
4. Free energy is converted into electrical work via:
   $$\Delta G = -n F E \quad \text{and} \quad \Delta G^0 = -n F E^0$$
5. Substituting these into the thermodynamic equation:
   $$-nFE = -nFE^0 + R T \ln \left( \frac{1}{[M^{n+}]} \right)$$
6. Divide both sides by $-nF$:
   $$E = E^0 - \frac{RT}{nF} \ln \left( \frac{1}{[M^{n+}]} \right) \implies E = E^0 + \frac{RT}{nF} \ln [M^{n+}]$$
7. Convert natural log ($\ln$) to common log ($\log_{10}$) and substitute constants ($R = 8.314 \text{ J/K}\cdot\text{mol}$, $T = 298.15\text{ K}$, $F = 96485\text{ C/mol}$):
   $$\mathbf{E = E^0 + \frac{0.05915}{n} \log_{10} [M^{n+}]}$$`
  },
  {
    id: "pyq-beee-2024",
    title: "JNTUK R23 BEEE Jan-2024 Solved Paper",
    slug: "beee-jan-2024-solved",
    subject: "Basic Electrical Engineering",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 1,
    is_published: true,
    content: `# JNTUK R23 January-2024 BASIC ELECTRICAL AND ELECTRONICS ENGINEERING (SET-1)

## PART-A (Compulsory Short Answers - 10 Marks)

### Q1. b) State Kirchhoff's voltage law.
**Solution:**
Kirchhoff's Voltage Law (KVL) states that the algebraic sum of all electrical potential differences (voltages) around any closed loop or network circuit is equal to zero:
$$\sum V = 0 \implies \sum v_{\text{drops}} = \sum v_{\text{sources}}$$
KVL is a direct consequence of the physical **Law of Conservation of Energy**.

---

### Q1. f) Draw the PN junction of a diode.
**Solution:**
\`\`\`text
      P-type Region           N-type Region
   +-----------------+     +-----------------+
   |  [+] (+) [+]    |     |    [-] (-) [-]  |
Anode |  [+] (+) [+] |==|==|    [-] (-) [-]  | Cathode
(A)   |  [+] (+) [+]    |     |    [-] (-) [-]  |  (K)
   +-----------------+     +-----------------+
              Depletion Region
\`\`\`
- $(+)$ represent mobile holes, $[-]$ represent mobile electrons.
- Mobile charges recombine at the interface to create stable immobile ions (depletion layer).

---

## PART-B (Long Answers - 60 Marks)

### Q3. b) An alternating voltage is having the equation as $V = 167.8\sin(314t)$. Find the R.M.S voltage, frequency, and the instantaneous voltage when $t=3.7\text{ ms}$.
**Solution:**

#### 1. RMS Voltage calculation:
The general sinusoidal equation is $V(t) = V_m\sin(\omega t)$.
Comparing with our problem:
- Maximum Voltage amplitude $V_m = 167.8\text{ V}$.
- Angular frequency $\omega = 314\text{ rad/s}$.
$$V_{rms} = \frac{V_m}{\sqrt{2}} = \frac{167.8}{\sqrt{2}} \approx \mathbf{118.65\text{ V}}$$

#### 2. Frequency calculation:
$$\omega = 2\pi f = 314 \implies f = \frac{314}{2\pi} \approx \mathbf{50\text{ Hz}}$$

#### 3. Instantaneous voltage calculation at $t = 3.7\text{ ms} = 0.0037\text{ s}$:
Substitute $t$ into the equation (ensuring calculator is set to **Radians Mode**!):
$$V(0.0037) = 167.8\sin\left(314 \times 0.0037\right) = 167.8\sin(1.1618\text{ rad})$$
$$\sin(1.1618\text{ rad}) \approx 0.9174$$
$$V = 167.8 \times 0.9174 = \mathbf{153.94\text{ V}}$$

---

### Q5. b) Find the e.m.f generated by a 6-pole D.C generator having 440 conductors and driven at a speed of 1400 r.p.m connected as: (i) lap and (ii) wave windings. The flux per pole is $0.032\text{ Wb}$.
**Solution:**
The general DC Generator e.m.f equation is:
$$E = \frac{\Phi Z N P}{60 A}$$
Given parameters:
- Poles $P = 6$
- Conductors $Z = 440$
- Speed $N = 1400\text{ r.p.m}$
- Flux per pole $\Phi = 0.032\text{ Wb}$

#### (i) For Lap winding:
In lap connected windings, the number of parallel paths ($A$) equals the number of poles ($P$), so $A = P = 6$:
$$E_{lap} = \frac{\Phi Z N}{60} = \frac{0.032 \times 440 \times 1400}{60} = \frac{19712}{60} \approx \mathbf{328.53\text{ V}}$$

#### (ii) For Wave winding:
In wave connected windings, the number of parallel paths ($A$) is always equal to $2$ regardless of pole count ($A = 2$):
$$E_{wave} = \frac{\Phi Z N P}{60 \times 2} = \frac{0.032 \times 440 \times 1400 \times 6}{120} = \frac{118272}{120} = \mathbf{985.60\text{ V}}$$`
  },
  {
    id: "pyq-bcme-2024",
    title: "JNTUK R23 BCME Jan-2024 Solved Paper",
    slug: "bcme-jan-2024-solved",
    subject: "Basic Civil and Mechanical Engineering",
    semester: 2,
    type: "PYQ",
    weightage: 5,
    frequency: 1,
    is_published: true,
    content: `# JNTUK R23 January-2024 BASIC CIVIL AND MECHANICAL ENGINEERING (SET-1)

## PART-A (Compulsory Short Answers - 10 Marks)

### Q1. a) Write various disciplines of civil engineering.
* **Structural Engineering:** Designing sturdy skeletons of buildings, bridges, and dams.
* **Geotechnical Engineering:** Analyzing physical soil mechanics and foundation load-carrying constraints.
* **Transportation Engineering:** Planning highways, rapid transit lines, railways, and airport lanes.
* **Water Resources & Environmental Engineering:** Managing hydration, dams, sewage sanitization, and eco-resource systems.

---

### Q1. i) Compare Otto and Diesel cycles.
| Parameter | Otto Cycle | Diesel Cycle |
|---|---|---|
| **Heat Addition** | Occurs at Constant Volume | Occurs at Constant Pressure |
| **Fuel Used** | Highly volatile Petrol | Heavy Diesel oil |
| **Compression Ratio** | Lower limits (6 to 10) | Higher limits (15 to 22) |
| **Ignition** | Initiated by Spark Plug | Compression ignition (Self-ignition) |

---

## PART-B (Long Answers - 60 Marks)

### Q2. b) Discuss about the various types of Aggregates with their sizes and shapes.
**Solution:**
Aggregates represent the primary structural skeleton of mortar and concrete, dividing into several profiles based on size, origin, and shape.

#### 1. Classification by Size:
* **Fine Aggregates (Sand):** Particle sizes passing fully through a $4.75\text{ mm}$ IS sieve. Used primarily to pack void networks in coarse aggregates.
* **Coarse Aggregates (Gravel/Stone):** Particles retained on a $4.75\text{ mm}$ IS sieve. Typically range between $10\text{ mm}$ and $40\text{ mm}$ for standard concrete layouts.

#### 2. Classification by Shape:
* **Rounded Aggregates:** High workability due to lesser friction but weaker bonding interlocking since coordinates are slick.
* **Angular Aggregates:** High friction requiring more water, but provides immense structural strength due to superior mechanical interlocking.
* **Flaky & Elongated Aggregates:** Undesirable due to poor mechanical structures, causing early cracking on loads.

---

### Q12. a) Describe the working principle of nuclear power plants.
**Solution:**
A Nuclear Power Plant is a thermal power station where the primary turbine steam generator is heated by molecular nuclear fission.

#### System Working Configuration:
1. **Fission Heat Generation:** Inside the nuclear reactor, heavy isotopes of Uranium ($^{235}\text{U}$) undergo controlled fission chains, releasing enormous thermal heat.
2. **Coolant Loop Transmission:** A primary coolant fluid (heavy water or liquid sodium) circulates around the core, absorbing this intense thermal load.
3. **Steam Generation:** The hot coolant passes through a heat exchanger (steam generator) where secondary water boils rapidly into high-pressure dry steam.
4. **Turbine Rotation:** High-velocity steam shoots at rows of a steam turbine, converting thermal pressure into rotational kinetic energy.
5. **Electrical Synthesis:** The turbine rotates an electromagnetic generator to pump electric current onto grid buses.
6. **Condensation Loop:** Exhaust steam is cooled in a condenser using external lake or cooling tower water loops, and then pumped back to repeat the vaporization.`
  },
  {
    id: "pyq-english-2024",
    title: "JNTUK R23 Communicative English Jan-2024 Solved Paper",
    slug: "english-jan-2024-solved",
    subject: "Communicative English",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 1,
    is_published: true,
    content: `# JNTUK R23 January-2024 COMMUNICATIVE ENGLISH (SET-1)

## PART-A (Compulsory Short Answers - 20 Marks)

### Q1. a) What did Jim do to give a gift to his wife?
**Solution:**
To buy Della a set of premium tortoiseshell hair combs, Jim sacrifices and sells his most prized heirloom possession: his grandfather's gold pocket watch. This poignant act demonstrates the central theme of selfless love and mutual sacrifice.

---

### Q1. e) Write the difference between Skimming and Scanning.
* **Skimming:** Reading a text rapidly to get a general overview, main ideas, or the core gist without focusing on specific vocabulary words.
* **Scanning:** Eye-scanning a page specifically looking for a single piece of concrete data, such as a name, number, date, or key term.

---

### Q1. i) What are Homophones? Give examples.
* **Definition:** Homophones are pairs or sets of words that have the exact same pronunciation but differ in meaning, origin, and spelling.
* **Examples:**
  - *Brake* (vehicle control device) vs *Break* (rupture/fracture).
  - *To* (direction indicator) vs *Too* (excessive).
  - *Their* (possessive third-person plural) vs *There* (location indicator).

---

## PART-B (Long Answers - 50 Marks)

### Q2. b) Define Prefix. Write examples for inter, non, pre, semi, and tri prefixes.
**Solution:**
A Prefix is an affix (a letter or group of letters) placed at the beginning of a root word to construct a new vocabulary term with a modified semantic meaning.

#### Prefix Examples:
1. **inter- (meaning 'between' or 'among'):**
   - *International* (between nations)
   - *Interact* (act between entities)
2. **non- (meaning 'not' or 'absence of'):**
   - *Non-toxic* (not poisonous)
   - *Non-sense* (lacking sense)
3. **pre- (meaning 'before'):**
   - *Pre-requisite* (required before)
   - *Pre-caution* (safety action taken before)
4. **semi- (meaning 'half' or 'partially'):**
   - *Semi-conductor* (partially conducting material)
   - *Semi-circle* (half of a circle)
5. **tri- (meaning 'three'):**
   - *Triangle* (shape with three angles)
   - *Trimester* (period of three months)

---

### Q11. b) Correct the following sentences:
1. *Original:* This is the most unique dress.
   - **Corrected:** This is a unique dress. *(Note: "Unique" is an absolute term; it cannot be comparative or superlative.)*
2. *Original:* The dog lost his bone.
   - **Corrected:** The dog lost its bone. *(Note: "Its" is the correct neutral possessive pronoun for non-human animals.)*
3. *Original:* She is beautiful then her.
   - **Corrected:** She is more beautiful than her. *(or "She is more beautiful than she is.")*
4. *Original:* Smith and me went to the mall.
   - **Corrected:** Smith and I went to the mall. *(Note: "I" is the correct subjective pronoun.)*
5. *Original:* There are less dresses.
   - **Corrected:** There are fewer dresses. *(Note: "Dresses" is a countable noun, which requires "fewer" rather than "less".)*`
  },
  {
    id: "pyq-graphics-2024",
    title: "JNTUK R23 Engg Graphics Jan-2024 Solved Paper",
    slug: "graphics-jan-2024-solved",
    subject: "Engineering Graphics",
    semester: 1,
    type: "PYQ",
    weightage: 5,
    frequency: 1,
    is_published: true,
    content: `# JNTUK R23 January-2024 ENGINEERING GRAPHICS (SET-1)

## 1. [COMPONENT ARCHITECTURE]
The drawing solver system is decomposed into a modular pipeline where continuous scalar adjustments (sliders for R.F, Eccentricity, and Angles) dynamically regenerate SVG geometric configurations. Lines are projected onto HP/VP coordinates matching the first-angle projection rules of civil and mechanical engineering structural layouts.

---

## 2. [PRODUCTION CODE: INTERACTIVE VISUAL]
Below is the complete interactive SVG React/HTML rendering demonstrating a dynamic Plain Scale constructor:

\`\`\`tsx
import React, { useState } from 'react';

export default function PlainScaleVisualizer() {
  const [rf, setRf] = useState(50000); // R.F 1:50,000 basis
  const [distance, setDistance] = useState(5.4); // Desired distance in km to measure (Max 7km)

  const scaleFactor = 15; // px per km scale
  const totalWidthPx = 7 * scaleFactor * 2; 

  const cursorPosition = distance * scaleFactor * 2;

  const triggerXP = (xp: number, badge: string) => {
    console.log("Earned " + xp + " XP: " + badge);
    if (window.triggerXP) {
      window.triggerXP(xp, badge);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setDistance(val);
    if (val === 5.4) {
      triggerXP(50, 'Plain Scale JNTUK 2024 Mastered');
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black text-white uppercase tracking-wider">Interactive 7km Plain Scale Solver</h3>
        <span className="text-[10px] font-bold text-blue-400 bg-blue-900/40 px-3 py-1 rounded-full">R.F. = 1:{rf}</span>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-slate-400">Target Measurement distance: <span className="text-white font-bold">{distance} km</span> (Set 5.4 km to solve Q1a!)</label>
        <input 
          type="range" 
          min="0" 
          max="7" 
          step="0.1" 
          value={distance} 
          onChange={handleSliderChange} 
          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <div className="relative border border-slate-700 p-4 rounded-2xl bg-black flex items-center justify-center">
        <svg width="300" height="120" className="overflow-visible font-mono">
          {/* Main Scale box */}
          <rect x="25" y="40" width="210" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" />
          
          {/* Grids subdivision */}
          {[1,2,3,4,5,6,7].map((km) => (
            <line key={km} x1={25 + km * scaleFactor * 2} y1="40" x2={25 + km * scaleFactor * 2} y2="60" stroke="#334155" strokeWidth="1" />
          ))}

          {/* Annotations */}
          {[0,1,2,3,4,5,6].map((idx) => (
            <text key={idx} x={25 + (idx + 1) * scaleFactor * 2} y="75" fill="#64748b" fontSize="8" textAnchor="middle">{idx} km</text>
          ))}
          <text x="25" y="30" fill="#38bdf8" fontSize="8">Subdivisions</text>
          <text x="235" y="30" fill="#38bdf8" fontSize="8">km</text>

          {/* Measuring coordinate indicator line */}
          <line x1="25" y1="20" x2={25 + cursorPosition} y2="20" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points={(25+cursorPosition) + ",20 " + (20+cursorPosition) + ",17 " + (20+cursorPosition) + ",23"} fill="#f43f5e" />
          <text x={25 + cursorPosition / 2} y="15" fill="#f43f5e" fontSize="9" fontWeight="900" textAnchor="middle">{distance} km</text>
        </svg>
      </div>

      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <span className="text-[9px] font-black uppercase text-slate-500">Q1. a) Evaluation parameters:</span>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">Length of Scale = R.F $\times$ Maximum Length = (1/50,000) $\times$ (7 $\times 10^5\text{ cm}$) = **14 cm**.</p>
      </div>
    </div>
  );
}
\`\`\`\`\`

---

## 3. [THE AUTOCAD TERMINAL MATRIX]
Standard command-line sequence to draw the Q1(a) Plain Scale inside modern AutoCAD:

\`\`\`text
;; 1. Initialize Drafting and Scale Canvas
UNITS -> (Linear: Decimal, Precision 0.0, Angle: Decimal Degrees)
LIMITS -> 0,0 -> 297,210 (A4 Size Sheet standard)
ZOOM -> ALL

;; 2. Construct the Boundary Box for 14cm (140mm) scale representation
RECTANG -> 0,0 -> 140,10

;; 3. Subdivide Scale representing total 7 kilometres (20mm intervals)
LINE -> 20,0 -> 20,10
LINE -> 40,0 -> 40,10
LINE -> 60,0 -> 60,10
LINE -> 80,0 -> 80,10
LINE -> 100,0 -> 100,10
LINE -> 120,0 -> 120,10

;; 4. Mark the Exact Measured distance corresponding to 54 hectometres (5.4 km)
;; Mark 5km mark from zero (right block 100mm) and 4 subdivisions at left (8mm path)
COLOR -> RED
MTEXT -> 8,15 => "54 Hectometres (5.4 Kilometres) Measured distance"
LINE -> 12,5 -> 112,5 (Highlight measured scale thickness)
;; Finalize print coordinate plots
QSAVE
\`\`\`

---

## 4. [GAMIFICATION HOOK]
\`\`\`js
if (distance === 5.4) triggerXP(50, 'Mastered Plain Scale Projection');
\`\`\``
  }
];

