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

  // 5. English Communication Skills
  {
    id: "en01",
    title: "Technical Writing, Business Letters & Resumes",
    slug: "english-technical-writing",
    subject: "English Communication Skills",
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
    subject: "English Communication Skills",
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
    subject: "English Communication Skills",
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
    subject: "English Communication Skills",
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
    subject: "English Communication Skills",
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
  }
];
