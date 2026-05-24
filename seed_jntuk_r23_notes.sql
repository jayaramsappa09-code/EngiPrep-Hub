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
'),

-- JNTUK Jan-2024 Solved Papers
('JNTUK R23 Mathematics-I Jan-2024 Solved Paper', 'm1-jan-2024-solved', 'Engineering Mathematics I', 1, 'PYQ', 5, 1, '
# JNTUK R23 January-2024 LINEAR ALGEBRA AND CALCULUS (SET-1)

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

### Q1. e) State Cauchy''s mean value theorem.
**Solution:**
If two functions $f(x)$ and $g(x)$ are:
1. Continuous in the closed interval $[a, b]$,
2. Differentiable in the open interval $(a, b)$,
3. $g''(x) \neq 0$ for all $x \in (a, b)$,
then there exists at least one point $c \in (a, b)$ such that:
$$\frac{f''(c)}{g''(c)} = \frac{f(b) - f(a)}{g(b) - g(a)}$$

---

### Q1. f) Write the geometrical interpretation for Lagrange''s mean value theorem.
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
By Fubini''s Theorem for rectangular regions, the double integral can be evaluated as an iterated integral:
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
Let''s apply elementary row operations to reduce $A$ to Row-Echelon form:
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
Thus, the unique solution is $x = 1, y = 1, z = 1$.
'),

('JNTUK R23 Physics Jan-2024 Solved Paper', 'physics-jan-2024-solved', 'Engineering Physics', 1, 'PYQ', 5, 1, '
# JNTUK R23 January-2024 ENGINEERING PHYSICS (SET-1)

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

### Q2. a) Explain how Newton''s rings are formed in reflected light. Derive expressions for diameters of dark and bright rings.
**Solution:**
When a plano-convex lens of large radius of curvature $R$ is placed on a flat glass plate, a thin wedge-shaped air film is formed between them. When monochromatic light is incident normally on this film, light reflected from the lower surface of the lens interferes with light reflected from the upper surface of the flat plate.

#### Derivation of Ring Diameters:
1. Path difference for normal incidence on an air film of thickness $t$:
   $$\Delta = 2t + \frac{\lambda}{2} \quad (\text{due to Phase shift at denser reflection})$$
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
   $$\mathbf{D_{bright} = \sqrt{2(2n-1)\lambda R}} \quad (\text{where } n = 1, 2, 3, \dots)$$
'),

('JNTUK R23 Chemistry Jan-2024 Solved Paper', 'chemistry-jan-2024-solved', 'Engineering Chemistry', 2, 'PYQ', 5, 1, '
# JNTUK R23 January-2024 CHEMISTRY (SET-1)

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
   $$\mathbf{E = E^0 + \frac{0.05915}{n} \log_{10} [M^{n+}]}$$
'),

('JNTUK R23 BEEE Jan-2024 Solved Paper', 'beee-jan-2024-solved', 'Basic Electrical Engineering', 1, 'PYQ', 5, 1, '
# JNTUK R23 January-2024 BASIC ELECTRICAL AND ELECTRONICS ENGINEERING (SET-1)

## PART-A (Compulsory Short Answers - 10 Marks)

### Q1. b) State Kirchhoff''s voltage law.
**Solution:**
Kirchhoff''s Voltage Law (KVL) states that the algebraic sum of all electrical potential differences (voltages) around any closed loop or network circuit is equal to zero:
$$\sum V = 0 \implies \sum v_{\text{drops}} = \sum v_{\text{sources}}$$
KVL is a direct consequence of the physical **Law of Conservation of Energy**.

---

### Q1. f) Draw the PN junction of a diode.
**Solution:**
```text
      P-type Region           N-type Region
   +-----------------+     +-----------------+
   |  [+] (+) [+]    |     |    [-] (-) [-]  |
Anode |  [+] (+) [+] |==|==|    [-] (-) [-]  | Cathode
(A)   |  [+] (+) [+]    |     |    [-] (-) [-]  |  (K)
   +-----------------+     +-----------------+
              Depletion Region
```
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
$$E_{wave} = \frac{\Phi Z N P}{60 \times 2} = \frac{0.032 \times 440 \times 1400 \times 6}{120} = \frac{118272}{120} = \mathbf{985.60\text{ V}}$$
'),

('JNTUK R23 BCME Jan-2024 Solved Paper', 'bcme-jan-2024-solved', 'Basic Civil and Mechanical Engineering', 2, 'PYQ', 5, 1, '
# JNTUK R23 January-2024 BASIC CIVIL AND MECHANICAL ENGINEERING (SET-1)

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
6. **Condensation Loop:** Exhaust steam is cooled in a condenser using external lake or cooling tower water loops, and then pumped back to repeat the vaporization.
'),

('JNTUK R23 Communicative English Jan-2024 Solved Paper', 'english-jan-2024-solved', 'Communicative English', 1, 'PYQ', 5, 1, '
# JNTUK R23 January-2024 COMMUNICATIVE ENGLISH (SET-1)

## PART-A (Compulsory Short Answers - 20 Marks)

### Q1. a) What did Jim do to give a gift to his wife?
**Solution:**
To buy Della a set of premium tortoiseshell hair combs, Jim sacrifices and sells his most prized heirloom possession: his grandfather''s gold pocket watch. This poignant act demonstrates the central theme of selfless love and mutual sacrifice.

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
1. **inter- (meaning ''between'' or ''among''):**
   - *International* (between nations)
   - *Interact* (act between entities)
2. **non- (meaning ''not'' or ''absence of''):**
   - *Non-toxic* (not poisonous)
   - *Non-sense* (lacking sense)
3. **pre- (meaning ''before''):**
   - *Pre-requisite* (required before)
   - *Pre-caution* (safety action taken before)
4. **semi- (meaning ''half'' or ''partially''):**
   - *Semi-conductor* (partially conducting material)
   - *Semi-circle* (half of a circle)
5. **tri- (meaning ''three''):**
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
   - **Corrected:** There are fewer dresses. *(Note: "Dresses" is a countable noun, which requires "fewer" rather than "less".)*
'),

('JNTUK R23 Engg Graphics Jan-2024 Solved Paper', 'graphics-jan-2024-solved', 'Engineering Graphics', 1, 'PYQ', 5, 1, '
# JNTUK R23 January-2024 ENGINEERING GRAPHICS (SET-1)

## 1. [COMPONENT ARCHITECTURE]
The drawing solver system is decomposed into a modular pipeline where continuous scalar adjustments (sliders for R.F, Eccentricity, and Angles) dynamically regenerate SVG geometric configurations. Lines are projected onto HP/VP coordinates matching the first-angle projection rules of civil and mechanical engineering structural layouts.

---

## 2. [PRODUCTION CODE: INTERACTIVE VISUAL]
Below is the complete interactive SVG React/HTML rendering demonstrating a dynamic Plain Scale constructor:

\`\`\`tsx
import React, { useState } from ''react'';

export default function PlainScaleVisualizer() {
  const [rf, setRf] = useState(50000); // R.F 1:50,000 basis
  const [distance, setDistance] = useState(5.4); // Desired distance in km to measure (Max 7km)

  const scaleFactor = 15; // px per km scale
  const totalWidthPx = 7 * scaleFactor * 2; 

  const cursorPosition = distance * scaleFactor * 2;

  const triggerXP = (xp: number, badge: string) => {
    console.log(`Earned \${xp} XP: \${badge}`);
    if (window.triggerXP) {
      window.triggerXP(xp, badge);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setDistance(val);
    if (val === 5.4) {
      triggerXP(50, ''Plain Scale JNTUK 2024 Mastered'');
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
          <line x1="25" y1="20" x2={21 + cursorPosition} y2="20" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points={`\${25+cursorPosition},20 \${20+cursorPosition},17 \${20+cursorPosition},23`} fill="#f43f5e" />
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
\`\`\`

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
if (distance === 5.4) triggerXP(50, ''Plain Scale JNTUK 2024 Mastered'');
\`\`\`
')
ON CONFLICT (slug) DO NOTHING;
