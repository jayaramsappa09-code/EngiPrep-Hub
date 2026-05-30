/**
 * Interactive Unit Quiz Component Engine
 * Dynamically parses JNTUK R23 subject & unit from the current path,
 * loads the corresponding syllabus test, and renders an interactive quiz.
 */

const UNIT_QUIZ_DATABASE = {
  "engineering-physics": {
    "unit-1": [
      {
        q: "What is the condition for constructive interference in thin films by reflected light?",
        options: ["2μt cos r = (2n + 1)λ / 2", "2μt cos r = nλ", "2μt cos r = (2n - 1)λ / 2", "2μt cos r = 2nλ"],
        correct: 1,
        desc: "For constructive interference in reflected light under cosine law conditions, 2μt cos r = nλ is correct because the path difference includes an extra λ/2 phase change upon reflection."
      },
      {
        q: "Newton's rings are formed due to the interference of light in a:",
        options: ["Slab-shaped air film", "Wedge-shaped air film", "Cylindrical glass layer", "Perfect vacuum tunnel"],
        correct: 1,
        desc: "Newton's rings are formed when light interferes in a wedge-shaped air film formed between a planoconvex lens and a flat glass plate."
      },
      {
        q: "When a thin sheet of mica is introduced in the path of one of the interfering beams in a double-slit experiment, the fringe width:",
        options: ["Increases", "Decreases", "Remains unchanged but the central fringe shifts", "Fringes disappear"],
        correct: 2,
        desc: "Introducing a thin transparent plate shifts the optical path and shifts the entire fringe pattern, but the spacing (fringe width) remains unchanged."
      },
      {
        q: "In Fraunhofer diffraction, the wavefronts incident on the obstacle are:",
        options: ["Spherical", "Cylindrical", "Plane", "Elliptical"],
        correct: 2,
        desc: "Fraunhofer diffraction involves plane wavefronts (light coming from infinity or placed at the focal point of a lens)."
      },
      {
        q: "The resolving power of a grating is directly proportional to:",
        options: ["The grating constant", "Number of lines in the grating (N)", "The aperture size", "Focal length of lens"],
        correct: 1,
        desc: "Resolving power = λ / dλ = n * N, which is directly proportional to the total number of lines (N) of the grating."
      }
    ],
    "unit-2": [
      {
        q: "What is the de Broglie wavelength associated with an electron accelerated through a potential of V volts?",
        options: ["λ = 12.26 / √V Å", "λ = 1.226 / √V Å", "λ = 122.6 / √V Å", "λ = 0.1226 / √V Å"],
        correct: 0,
        desc: "Specifically for an electron, λ = h / √(2meV) evaluates numerical values exactly to 12.26 / √V Angstroms."
      },
      {
        q: "The wave function ψ for a physical system has no direct physical meaning, but |ψ|² represents:",
        options: ["The absolute momentum of the particle", "The kinetic energy state", "Probability density of finding the particle", "Phase velocity vectors"],
        correct: 2,
        desc: "Max Born proposed that |ψ|² represents the probability density of finding the particle at a given spatial coordinate."
      },
      {
        q: "For a particle trapped in a one-dimensional infinite potential well of width L, the energy of state n is proportional to:",
        options: ["L²", "1 / L", "1 / L²", "√L"],
        correct: 2,
        desc: "The energy eigenvalues are given by E_n = n²h² / (8mL²). Hence, it is inversely proportional to L²."
      },
      {
        q: "The Heisenberg uncertainty principle states that the product of uncertainty in position and momentum is:",
        options: ["Δx · Δp ≥ h / (4π)", "Δx · Δp = 0", "Δx · Δp < h / (2π)", "Δx · Δp ≥ h · 4π"],
        correct: 0,
        desc: "Δx · Δp ≥ h / (4π) is the fundamental lower bound of simultaneous measurement precision."
      },
      {
        q: "The Fermi-Dirac distribution function f(E) at E = E_F for any temperature T > 0 K is:",
        options: ["0", "1", "0.5", "Infinity"],
        correct: 2,
        desc: "At E = E_F, f(E) = 1 / (e^0 + 1) = 1/2 = 0.5. The probability of occupying the Fermi level is exactly 50%."
      }
    ],
    "unit-3": [
      {
        q: "In an intrinsic semiconductor, the Fermi energy level lies:",
        options: ["In the conduction band", "In the valence band", "Exactly in the middle of the forbidden energy gap", "Immediately below the conduction band"],
        correct: 2,
        desc: "For pure (intrinsic) semiconductors, the concentration of holes in the valence band matches electrons in the conduction band, placing E_F directly in the center of the band gap."
      },
      {
        q: "What occurs to the conductivity of a semiconductor as its temperature rises?",
        options: ["It decreases", "It increases exponentially", "It remains constant", "It decreases linearly"],
        correct: 1,
        desc: "As temperature increases, more covalent bonds rupture, generating extra free electron-hole pairs and decreasing resistivity, causing conductivity to rise."
      },
      {
        q: "The Hall coefficient R_H for an n-type semiconductor is:",
        options: ["Positive", "Negative", "Zero", "Fluctuates dynamically"],
        correct: 1,
        desc: "For n-type materials, the majority carriers are electrons (negative charge), so the Hall coefficient R_H = -1 / (n·e) is negative."
      },
      {
        q: "The Einstein relation connecting diffusion coefficient D and mobility μ is:",
        options: ["D / μ = e / (kT)", "D · μ = kT / e", "D / μ = kT / e", "μ / D = kT"],
        correct: 2,
        desc: "D / μ = kT / e relates thermal movement (diffusion) directly to electric drift alignment (mobility)."
      },
      {
        q: "The concentration of dopant atoms in an extrinsic semiconductor affects:",
        options: ["Only the conductivity", "Only the Fermi level position", "Both conductivity and the Fermi level position", "Neither parameter"],
        correct: 2,
        desc: "Increasing dopant concentrations boosts carrier density (conductivity) and shifts the Fermi level closer to the majority carrier band."
      }
    ],
    "unit-4": [
      {
        q: "Which laser property describes light waves traveling in perfect spatial and temporal phase alignment?",
        options: ["Monochromaticity", "High Intensity", "Coherence", "Divergence"],
        correct: 2,
        desc: "Coherence represents highly locked phases, maintaining static constructive alignment over long propagation lengths."
      },
      {
        q: "In Helium-Neon lasers, Helium atoms are crucial to:",
        options: ["Participate in stimulated emission directly", "Excite Neon atoms to metastable states via collision", "Scatter stray photons and cool the tube", "Form covalent molecular bonds"],
        correct: 1,
        desc: "Helium atoms are easily excited by gaseous discharge, then transfer energy via resonant collisions to Neon atoms, achieving Neon population inversion."
      },
      {
        q: "Light propagates inside an optical fiber core via the physical process of:",
        options: ["Refraction on cladding edges", "Total Internal Reflection (TIR)", "Coherent polarization scattering", "Quantum tunneling"],
        correct: 1,
        desc: "TIR ensures 100% light containment inside the core, provided core refractive index n1 > cladding index n2 and incidence angle > critical angle."
      },
      {
        q: "The Acceptance Angle of an optical fiber is derived as:",
        options: ["θ_a = arcsin(NA)", "θ_a = cos(NA)", "θ_a = NA / n1", "θ_a = arctan(NA / n2)"],
        correct: 0,
        desc: "θ_a = arcsin(Numerical Aperture) represents the maximum cone half-angle of entry for light to be successfully guided by TIR."
      },
      {
        q: "If core index n1 = 1.50 and cladding index n2 = 1.45, what is the Numerical Aperture?",
        options: ["0.05", "0.38", "0.14", "0.55"],
        correct: 1,
        desc: "NA = √(1.50² - 1.45²) = √(2.25 - 2.1025) = √0.1475 ≈ 0.384."
      }
    ],
    "unit-5": [
      {
        q: "The perfect diamagnetism exhibited by a superconductor is clinically called the:",
        options: ["Hall Transit Effect", "Meissner Effect", "Barkhausen Jump", "Clausius Equation"],
        correct: 1,
        desc: "The Meissner effect describes the complete exclusion of magnetic flux lines from the interior of a superconductor when cooled below critical temperature."
      },
      {
        q: "Which relation equates dielectric constant ε_r to atomic polarizability α in cubic lattices?",
        options: ["Clausius-Mossotti Relation", "Einstein-Debye Formula", "Planck's Dispersion Formula", "Lorentz Force Equilibrium"],
        correct: 0,
        desc: "The Clausius-Mossotti relation (ε_r-1)/(ε_r+2) = N·α / (3ε_0) relates microscopic polarisability to macroscopic dielectric properties."
      },
      {
        q: "What happens to a superconductor's critical magnetic field H_c as the temperature increases towards T_c?",
        options: ["It increases to infinity", "It remains constant", "It decreases to zero", "It oscillates at high frequency"],
        correct: 2,
        desc: "H_c(T) = H_c(0) * [1 - (T/T_c)²]. As T approaches T_c, the term (T/T_c)² becomes 1, bringing the critical magnetic field H_c(T) to zero."
      },
      {
        q: "Superconductors which allow magnetic flux to penetrate gradually via vortices are classified as:",
        options: ["Type I Superconductors", "Type II Superconductors", "Organic Superconductors", "Zero-state conductors"],
        correct: 1,
        desc: "Type II (or hard) superconductors possess an intermediate mixed vortex state, making them highly suitable for high-field electromagnets."
      },
      {
        q: "In dielectric materials, orientational polarization is inversely proportional to:",
        options: ["Electric field strength", "Atomic weight", "Absolute temperature (T)", "Slab thickness"],
        correct: 2,
        desc: "Orientational polarisability is given by p = μ²/(3kT). Higher temperatures disrupt molecular alignment due to thermal agitation."
      }
    ]
  },
  "engineering-mathematics": {
    "unit-1": [
      {
        q: "The system of linear equations AX = B is consistent if and only if:",
        options: ["Rank(A) = Rank(A|B)", "Rank(A) < Rank(A|B)", "Rank(A) is zero", "Determinant of A is non-zero"],
        correct: 0,
        desc: "Rouché-Capelli theorem states that consistency requires the augmented matrix [A|B] to have the identical rank as the coefficient matrix A."
      },
      {
        q: "The elementary operations on a matrix do not change its:",
        options: ["Determinant", "Eigenvalues", "Rank", "Row-sum indices"],
        correct: 2,
        desc: "Elementary row/column operations preserve linear independence configurations, meaning the matrix rank remains invariant."
      },
      {
        q: "Gauss-Jordan elimination method reduces the coefficient matrix A to a:",
        options: ["Upper triangular matrix", "Lower triangular matrix", "Diagonal / Identity matrix", "Null matrix"],
        correct: 2,
        desc: "Unlike Gauss elimination (which produces upper-triangular echelon matrices), Gauss-Jordan reduces coefficients all the way to a diagonal or identity matrix."
      },
      {
        q: "If a system AX = 0 of 3 equations in 3 variables has a unique solution, the solution is:",
        options: ["The zero (trivial) solution", "An infinite plane of solutions", "x = 1, y = 1, z = 1", "Undefined"],
        correct: 0,
        desc: "Homogeneous systems AX = 0 always admit the trivial zero solution; if the solution is unique, it must be the zero vector."
      },
      {
        q: "If we reduce a matrix of size 3x3 to its normal form [I_r 0; 0 0], the rank is equal to:",
        options: ["3 - r", "r", "9", "0"],
        correct: 1,
        desc: "The size of the identity block (r) in normal form represents the exact number of linearly independent rows/columns, which is the rank of the matrix."
      }
    ],
    "unit-2": [
      {
        q: "The product of all eigenvalues of a square matrix A is equivalent to its:",
        options: ["Trace", "Determinant", "Inverse", "Adjoint"],
        correct: 1,
        desc: "The product of the eigenvalues of any square matrix A always equals the determinant of A."
      },
      {
        q: "The sum of the eigenvalues of a square matrix A is equal to its:",
        options: ["Determinant", "Trace (sum of main diagonal elements)", "Rank", "Order index"],
        correct: 1,
        desc: "The trace of a matrix (the sum of the diagonal elements) matches the sum of its eigenvalues exactly."
      },
      {
        q: "If λ is an eigenvalue of A, then the eigenvalue of the matrix A² + 3A is:",
        options: ["λ²", "λ + 3", "λ² + 3λ", "1 / (λ² + 3λ)"],
        correct: 2,
        desc: "By matrix polynomial properties, if Av = λv, then (A² + 3A)v = (λ² + 3λ)v, giving λ² + 3λ as the eigenvalue."
      },
      {
        q: "The Cayley-Hamilton theorem states that every square matrix satisfies its own:",
        options: ["Determinant inequality", "Characteristic equation", "Trace equation", "Adjoint theorem"],
        correct: 1,
        desc: "The Cayley-Hamilton theorem guarantees that if p(λ) = det(A - λI) = 0 is the characteristic polynomial of square matrix A, then p(A) = 0."
      },
      {
        q: "If A is a symmetric matrix, its eigenvalues are:",
        options: ["Complex conjugates", "Always real", "Always purely imaginary", "All zero"],
        correct: 1,
        desc: "A fundamental property of real symmetric matrices is that all their eigenvalues are strictly real numbers."
      }
    ],
    "unit-3": [
      {
        q: "Rolle's theorem is applicable to a function f(x) in [a, b] only if:",
        options: ["f(a) = f(b)", "f(a) > f(b)", "f'(a) = f'(b)", "f(x) is a linear polynomial"],
        correct: 0,
        desc: "Rolle's theorem requires f(x) to be continuous in [a,b], differentiable in (a,b), and the boundary values f(a) = f(b) to match."
      },
      {
        q: "In f(x) satisfying Rolle's theorem in [a, b], there exists at least one point c in (a, b) such that f'(c) equals:",
        options: ["1", "(f(b) - f(a)) / (b - a)", "0", "f(a) / f(b)"],
        correct: 2,
        desc: "Rolle's theorem guarantees at least one stationary point c in the interval where f'(c) = 0 (tangent line is horizontal)."
      },
      {
        q: "Lagrange's Mean Value Theorem guarantees a point c in (a, b) such that f'(c) =:",
        options: ["0", "(f(b) - f(a)) / (b - a)", "(f(b) + f(a)) / 2", "f(b) - f(a)"],
        correct: 1,
        desc: "Lagrange's mean value theorem equates the instantaneous rate of change f'(c) to the average slope over the interval [a,b]."
      },
      {
        q: "Which theorem is also known as the Second Mean Value Theorem?",
        options: ["Rolle's Theorem", "Taylor's Theorem", "Cauchy's Mean Value Theorem", "Leibniz Rule"],
        correct: 2,
        desc: "Cauchy's Mean Value Theorem, relating two functions f(x) and g(x) via f'(c)/g'(c) = [f(b)-f(a)]/[g(b)-g(a)], is commonly referred to as the second mean value theorem."
      },
      {
        q: "What does Maclaurin's series expansion represent?",
        options: ["Taylor's series expanded around the origin x = 0", "Fourier series in real coordinates", "Lagrange series for matrices", "None of the above"],
        correct: 0,
        desc: "A Maclaurin series is simply a Taylor series expansion of f(x) centered at the origin, a = 0."
      }
    ],
    "unit-4": [
      {
        q: "The Jacobian J = ∂(u,v)/∂(x,y) of functions u = x + y and v = x - y is:",
        options: ["0", "2", "-2", "x² - y²"],
        correct: 2,
        desc: "∂u/∂x = 1, ∂u/∂y = 1; ∂v/∂x = 1, ∂v/∂y = -1. Det is (1 * -1) - (1 * 1) = -2."
      },
      {
        q: "A function f(x, y) has a stationary point at (a, b). Letting r = f_xx, s = f_xy, t = f_yy, a local minimum exists if:",
        options: ["rt - s² > 0 and r > 0", "rt - s² > 0 and r < 0", "rt - s² < 0", "rt - s² = 0"],
        correct: 0,
        desc: "rt - s² > 0 guarantees a true local extremum. If r = f_xx > 0, the surface curves upwards in all directions, representing a minimum."
      },
      {
        q: "If at a stationary point we find rt - s² < 0, then the point is classified as a:",
        options: ["Point of local maximum", "Point of local minimum", "Saddle point", "Inconclusive parameter state"],
        correct: 2,
        desc: "If rt - s² < 0, the curvatures in the principal directions have opposite signs, resulting in a saddle point (min in one direction, max in another)."
      },
      {
        q: "The condition for two functions u(x, y) and v(x, y) to be functionally dependent is that their Jacobian ∂(u,v)/∂(x,y) is exactly:",
        options: ["1", "-1", "0", "Infinity"],
        correct: 2,
        desc: "If u and v are functionally dependent (e.g. u = f(v)), their variables vary collinear-ly, which forces their Jacobian determinant to collapse to 0."
      },
      {
        q: "In Lagrange's method of undetermined multipliers for optimizing f(x,y,z) subject to constraint g(x,y,z) = 0, the auxiliary function is:",
        options: ["F = f + λ·g", "F = f - g", "F = f · g", "F = f / λg"],
        correct: 0,
        desc: "F = f + λ·g is the standard Lagrangian form, where λ is the undetermined Lagrange multiplier."
      }
    ],
    "unit-5": [
      {
        q: "The area of a region bounded in the Cartesian plane is calculated by evaluating:",
        options: ["∫ dx", "∫∫_R dx dy", "∫∫∫_V dx dy dz", "∫ (y/x) dx"],
        correct: 1,
        desc: "The double integral ∫∫ dx dy over region R calculates the planar area of that exact region."
      },
      {
        q: "When converting a double integral from Cartesian (x, y) to Polar (r, θ), the area element dx dy is replaced by:",
        options: ["dr dθ", "r dr dθ", "r² dr dθ", "1 / r dr dθ"],
        correct: 1,
        desc: "The Jacobian of transformation from Cartesian to Polar is r, so the differential area element scales to r dr dθ."
      },
      {
        q: "The value of Γ(1/2) (Gamma of half) is equivalent to:",
        options: ["π", "√π", "1 / √π", "0.5"],
        correct: 1,
        desc: "Using the Gaussian integral and definition of Gamma, Γ(1/2) evaluates exactly to the square root of pi."
      },
      {
        q: "The relationship between the Beta B(m, n) and Gamma Γ functions is given by:",
        options: ["B(m,n) = Γ(m) · Γ(n) / Γ(m+n)", "B(m,n) = Γ(m+n) / (Γ(m)·Γ(n))", "B(m,n) = Γ(m) · Γ(n)", "B(m,n) = Γ(m·n)"],
        correct: 0,
        desc: "B(m,n) = Γ(m)Γ(n)/Γ(m+n) is the fundamental link connecting the single and double integrals of exponential scales."
      },
      {
        q: "The value of f(n) = Γ(n+1) for any positive integer n is exactly:",
        options: ["n!", "(n-1)!", "(n+1)!", "n^n"],
        correct: 0,
        desc: "Gamma is the continuous generalization of factorial. By recursive integration, Γ(n+1) = n · Γ(n) = n! for integer scalars."
      }
    ]
  },
  "c-programming": {
    "unit-1": [
      {
        q: "Who is the primary creator of the C programming language?",
        options: ["Bjarne Stroustrup", "Dennis Ritchie", "Ken Thompson", "James Gosling"],
        correct: 1,
        desc: "Dennis Ritchie developed C in 1972 at Bell Labs to write the Unix Operating System."
      },
      {
        q: "Which data type in C usually occupies 1 byte of memory storage?",
        options: ["int", "float", "char", "double"],
        correct: 2,
        desc: "A 'char' data type consists of 8 bits (1 byte) under standard C compilers."
      },
      {
        q: "What is the return value of the printf() function upon successful execution?",
        options: ["Always 0", "Always 1", "The number of characters printed", "void"],
        correct: 2,
        desc: "printf returns the integer count of characters successfully written to the output stream."
      },
      {
        q: "What is the result of the division expression '7 / 2' in C?",
        options: ["3.5", "3", "4", "Error"],
        correct: 1,
        desc: "Both 7 and 2 are integer constants. Integer division in C discards the fractional part, yielding exactly 3."
      },
      {
        q: "Which operator possesses the highest precedence index in C?",
        options: ["+", "==", "&&", "() (Parentheses)"],
        correct: 3,
        desc: "Function call / grouping parentheses () have the absolute highest precedence level in C operator hierarchy."
      }
    ],
    "unit-2": [
      {
        q: "Which control loop block is guaranteed to execute its body at least once?",
        options: ["for loop", "while loop", "do-while loop", "nested-if structure"],
        correct: 2,
        desc: "A do-while loop is a post-test loop. It evaluates the condition after executing the body, forcing at least one run."
      },
      {
        q: "In a switch-case structure, what happens if a matching 'case' block lacks a 'break' statement?",
        options: ["The compiler throws a syntax error", "Execution halts immediately", "Execution falls through to subsequent case statements", "It jumps to default case immediately"],
        correct: 2,
        desc: "Without a break statement, control flows directly into the code of the next sequential case block, a behavior known as fall-through."
      },
      {
        q: "Which keyword immediately exits the current loop, transferring control to the statement following the loop?",
        options: ["continue", "goto", "break", "return"],
        correct: 2,
        desc: "The break statement terminates the enclosing switch or loop statement and hands control to the succeeding statement."
      },
      {
        q: "What is the output of: for(int i=0; i<3; i++) { if(i==1) continue; printf(\"%d\", i); }?",
        options: ["0 1 2", "0 2", "1 2", "0 1"],
        correct: 1,
        desc: "When i is 1, continue terminates that specific iteration, skipping printf, but retaining loop execution for index 2. Yields '02'."
      },
      {
        q: "What is a 'while' loop evaluated as if the condition is initialized to any non-zero integer?",
        options: ["It executes exactly zero times", "It throws a compiler error", "It creates an infinite loop", "It executes exactly once"],
        correct: 2,
        desc: "In C, any non-zero value represents 'true'. A static non-zero condition is always true, creating an infinite loop."
      }
    ],
    "unit-3": [
      {
        q: "Under standard C rules, what is the starting base index of any designated array?",
        options: ["1", "0", "-1", "Arbitrary"],
        correct: 1,
        desc: "C uses zero-based indexing. The first element of array 'arr' is located at arr[0]."
      },
      {
        q: "Which character is automatically appended to terminate strings in C memory?",
        options: ["\\n (New line)", "\\t (Tab)", "\\0 (Null character)", "; (Semicolon)"],
        correct: 2,
        desc: "Strings in C are character arrays terminated by a null byte '\\0' which signals the operational boundary to string utilities."
      },
      {
        q: "If char str[] = \"JNTUK\"; is declared, what does sizeof(str) evaluate to in bytes?",
        options: ["5", "6", "4", "Depends on computer width"],
        correct: 1,
        desc: "The string \"JNTUK\" has 5 characters plus 1 invisible termination null character, totaling 6 bytes in storage."
      },
      {
        q: "Which library function compares two strings lexicographically?",
        options: ["strcpy()", "strcat()", "strcmp()", "strlen()"],
        correct: 2,
        desc: "strcmp(s1, s2) returns 0 if they are identical, a negative value of s1 < s2, and positive if s1 > s2."
      },
      {
        q: "What is the maximum number of dimensions a C array can theoretically possess?",
        options: ["Maximum 2", "Maximum 3", "No fixed limit (restricted only by memory)", "Maximum 256"],
        correct: 2,
        desc: "C specs impose no architectural limit on multidimensional arrays; it is solely bounded by accessible memory capacity."
      }
    ],
    "unit-4": [
      {
        q: "When a pointer is declared in C, what fundamental entity does it store in memory?",
        options: ["Value of another variable", "The absolute state of CPU cache", "Memory address of another variable", "Static binary coordinates"],
        correct: 2,
        desc: "A pointer is a specialized variable whose value is the direct memory address of another variable."
      },
      {
        q: "Which unary operator takes an address and yields the value stored at that specific address?",
        options: ["& (Address operator)", "* (Dereference operator)", "-> (Arrow operator)", ". (Dot operator)"],
        correct: 1,
        desc: "The asterisk * dereferences a pointer, allowing direct access/modification of the raw data stored at that target memory address."
      },
      {
        q: "What is a function called that directly or indirectly calls itself?",
        options: ["Inline function", "Static function", "Recursive function", "Dynamic loop"],
        correct: 2,
        desc: "A recursive function calls itself to solve a smaller sub-problem, requiring a base case to safely terminate execution."
      },
      {
        q: "What is the output of: int major = 10; int *ptr = &major; *ptr = 50; printf(\"%d\", major);?",
        options: ["10", "50", "Address of major", "Error"],
        correct: 1,
        desc: "ptr points to major. Modifying *ptr sets the content of the address directly, changing 'major' to 50."
      },
      {
        q: "By default, variables declared inside a C function are classified as:",
        options: ["Static variables", "Register variables", "Automatic (local) variables", "Global variables"],
        correct: 2,
        desc: "Local variables are automatic by default ('auto' storage class). They are allocated on the stack and destroyed on function exit."
      }
    ],
    "unit-5": [
      {
        q: "How does a 'union' differ from a 'struct' in C memory allocation?",
        options: ["Unions require more memory", "Unions allocate separate blocks, struct members share", "Struct members get dedicated memory, union members share the same space", "Struct elements cannot hold floats"],
        correct: 2,
        desc: "In a struct, each member has its own unique memory address. In a union, all members share the exact same starting address, sized to the largest member."
      },
      {
        q: "Which operator is required to access members of a structure when utilizing a structure pointer?",
        options: [". (Dot operator)", "* (Star operator)", "-> (Arrow operator)", "& (Ampersand)"],
        correct: 2,
        desc: "The arrow operator (->) is syntactically equivalent to dereferencing the pointer and using the dot operator (e.g., (*ptr).member)."
      },
      {
        q: "Which file handling mode opens an existing file or creates a new one, positioning the cursor at the END of content?",
        options: ["\"r\" (Read)", "\"w\" (Write)", "\"a\" (Append)", "\"r+\" (Read and write)"],
        correct: 2,
        desc: "The append \"a\" mode opens files for writing, strictly enforcing that all new inputs are added at the end, preventing content overwrites."
      },
      {
        q: "Which standard function is used to release dynamically allocated heap blocks?",
        options: ["malloc()", "calloc()", "free()", "realloc()"],
        correct: 2,
        desc: "free(ptr) returns the block back to the heap to prevent memory leaks in long-running processes."
      },
      {
        q: "If int is 4 bytes and char is 1 byte, what is the size of 'union Data { int i; char c; }'?",
        options: ["5 bytes", "4 bytes", "1 byte", "8 bytes"],
        correct: 1,
        desc: "Union size is determined by its largest member. The largest member is 'int i' (4 bytes), so the union size is 4 bytes."
      }
    ]
  },
  "data-structures": {
    "unit-1": [
      {
        q: "What is the time complexity to insert a node at the beginning of a singly linked list?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
        correct: 1,
        desc: "Inserting at the head simply requires updating the new node's next pointer to current head, and setting head to the new node, taking constant O(1) time."
      },
      {
        q: "Singly linked list traversal requires at least what complexity in the worst case?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 2,
        desc: "To traverse or find an element in a singly linked list of size n, you must sequentially visit each node, costing O(n) operations."
      },
      {
        q: "In contiguous array allocations, searching an element in an UNSORTED block of size n takes:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        desc: "For unsorted structures, you must perform linear search, scanning sequentially until the item is located, costing O(n) in the worst case."
      },
      {
        q: "What is a self-referential structure?",
        options: ["A struct with zero variables", "A struct that refers to another struct type", "A struct containing a pointer to a structure of the identical type", "A standard database class"],
        correct: 2,
        desc: "Self-referential structures (like nodes in lists and trees) contain a pointer element pointing to another instance of the identical struct type."
      },
      {
        q: "Unlike arrays, singly linked lists do NOT require:",
        options: ["A custom data class", "Dynamic allocation", "Contiguous memory locations", "Pointers of any kind"],
        correct: 2,
        desc: "Linked lists allocate nodes dynamically in fragmented heap addresses; they are linked via pointers and do not need sequential static arrays."
      }
    ],
    "unit-2": [
      {
        q: "Which operational principle governs the behavior of a Stack?",
        options: ["First-In-First-Out (FIFO)", "Last-In-First-Out (LIFO)", "Priority Ordering", "Random In-Out"],
        correct: 1,
        desc: "A Stack works on the LIFO principle. The element pushed last is the first one retrieved upon pop operations."
      },
      {
        q: "What occurs if you call 'pop' on an empty stack structure?",
        options: ["Stack Overflow", "Stack Underflow", "Infinite program loop", "Memory leak allocation"],
        correct: 1,
        desc: "Attempting to retrieve or delete elements from an empty container is called an Underflow condition."
      },
      {
        q: "A standard Queue data structure adheres strictly to which principle?",
        options: ["FIFO", "LIFO", "FILO", "Random-Access"],
        correct: 0,
        desc: "Queues work on the First-In-First-Out (FIFO) principle. Elements enter at the rear and exit at the front."
      },
      {
        q: "In a circular queue of size N, what represents the queue FULL state boundary?",
        options: ["rear == front", "(rear + 1) % N == front", "rear == N - 1", "front == 0"],
        correct: 1,
        desc: "A circular queue of capacity N is full when the circular index immediately succeeding the rear pointer matches the front index."
      },
      {
        q: "To convert an infix expression to a postfix expression, which data structure is utilized?",
        options: ["Queue", "Tree", "Stack", "Adjacency List"],
        correct: 2,
        desc: "A Stack maintains operators based on their precedence order during infix-to-postfix translation processes."
      }
    ],
    "unit-3": [
      {
        q: "What is the primary architectural advantage of a doubly linked list (DLL) over a singly linked list (SLL)?",
        options: ["Requires less physical memory space", "Can be traversed in both forward and backward directions", "Allows direct index-based random access", "Has O(1) sorting complexity"],
        correct: 1,
        desc: "DLL nodes contain both 'next' and 'prev' pointers, enabling bidirectional traversal."
      },
      {
        q: "In a circular singly linked list, the final node's 'next' pointer points directly to:",
        options: ["NULL", "The previous node", "The head node", "itself"],
        correct: 2,
        desc: "Circular structures loop back completely. The final node points directly to the starting head node instead of referencing NULL."
      },
      {
        q: "How many pointer allocations are modified when inserting a node in the middle of a doubly linked list?",
        options: ["2 pointers", "4 pointers", "1 pointer", "8 pointers"],
        correct: 1,
        desc: "Inserting a node requires binding the new node's prev and next (2 pointers) and linking the neighboring nodes to the new node (2 more pointers), totaling 4."
      },
      {
        q: "If only a 'head' pointer is maintained, what is the complexity to append a node to a DLL of size n?",
        options: ["O(1)", "O(log n)", "O(n)", "O(1) if head is NULL else O(n)"],
        correct: 2,
        desc: "Without a tail pointer, we must traverse the entire list sequentially to locate the tail, taking O(n) time."
      },
      {
        q: "A header linked list is a list which contains:",
        options: ["Only pointers", "A special node at the beginning called the header node", "No variables", "None of the above"],
        correct: 1,
        desc: "A header linked list has a dedicated starting node (header node) which often stores metadata like list size."
      }
    ],
    "unit-4": [
      {
        q: "What is the maximum number of nodes inside a binary tree of height h?",
        options: ["2^h", "2^(h+1) - 1", "2h", "2^h - 1"],
        correct: 1,
        desc: "A fully complete binary tree of height h has maximum total nodes calculated as 2^(h+1) - 1."
      },
      {
        q: "In Postorder tree traversal, what is the correct sequence of step visits?",
        options: ["Root -> Left -> Right", "Left -> Root -> Right", "Left -> Right -> Root", "Right -> Root -> Left"],
        correct: 2,
        desc: "Postorder visits subtrees first: Left child, then Right child, and finally the local parent Root node."
      },
      {
        q: "In a balanced Binary Search Tree (BST), locating a specific element is bounded by which complexity?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 1,
        desc: "Each step in a balanced BST splits search scope in half, yielding highly fast O(log n) searches."
      },
      {
        q: "Which graph traversal algorithm utilizes a Queue to manage states?",
        options: ["Depth First Search (DFS)", "Breadth First Search (BFS)", "Kruskal's Algorithm", "Dijkstra's Algorithm"],
        correct: 1,
        desc: "BFS visits nodes level-by-level, utilizing a FIFO Queue to track unvisited neighbor sets."
      },
      {
        q: "A tree is structurally defined as an undirected graph which is:",
        options: ["Cyclic and connected", "Acyclic and connected", "Disconnected and acyclic", "Fully dense"],
        correct: 1,
        desc: "A formal mathematical tree is a connected graph possessing no cycles (acyclic connected graph)."
      }
    ],
    "unit-5": [
      {
        q: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correct: 2,
        desc: "In the worst case (e.g. sorted arrays and poor pivot choices), Quick Sort runs in quadratic O(n²) time."
      },
      {
        q: "Which sorting algorithm maintains a guaranteed worst-case time complexity of O(n log n)?",
        options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"],
        correct: 2,
        desc: "Merge Sort uses divide-and-conquer to guarantee O(n log n) complexity across all best, average, and worst-case scenarios."
      },
      {
        q: "Binary Search can only be conducted on data that is:",
        options: ["Singly linked", "Sorted", "Unsorted", "Represented as trees"],
        correct: 1,
        desc: "Binary search depends on sorted ordering to determine whether to search the upper or lower segment."
      },
      {
        q: "What is the auxiliary space complexity of Merge Sort?",
        options: ["O(1) (In-place)", "O(n)", "O(log n)", "O(n²)"],
        correct: 1,
        desc: "Merge Sort merges sub-arrays by copying nodes into temp arrays, requiring linear O(n) temporary storage."
      },
      {
        q: "Which sorting algorithm is highly adaptive and executes in linear O(n) time on fully sorted inputs?",
        options: ["Selection Sort", "Insertion Sort", "Merge Sort", "Heap Sort"],
        correct: 1,
        desc: "Insertion Sort simply performs one scan over presorted lists, making zero swaps and running in O(n) best-case time."
      }
    ]
  }
};

// Generates an on-the-fly random quiz for subjects not explicitly present in the DB
const FALLBACK_GENERIC_QUESTIONS = [
  {
    q: "In JNTUK R23 curriculum specifications, why are continuous assessments emphasized?",
    options: ["To eliminate final written exams", "To track incremental mastery and analytical application", "To increase textbook costs", "To reduce active lecturing hours"],
    correct: 1,
    desc: "Continuous internal evaluation (CIE) emphasizes steady academic learning, practical labs, and progressive skill mastery."
  },
  {
    q: "When analyzing the runtime performance of an engineering solution, we prefer algorithms with:",
    options: ["High polynomial growth rates", "Logarithmic or linear complexity", "Maximum memory overhead", "Infinite loop cycles"],
    correct: 1,
    desc: "Lower complexity bounds, such as O(1), O(log n), or O(n), represent highly efficient scaling structures."
  },
  {
    q: "What does the 'engineering mindset' primarily require when addressing complex curriculum derivations?",
    options: ["Rote memorization of numerical constants", "Decomposing problems into boundary conditions & basic relations", "Skipping step proofs", "Using static guessing heuristics"],
    correct: 1,
    desc: "Breaking down systems into fundamental equations and analyzing boundary dynamics is crucial for accurate technical analysis."
  },
  {
    q: "To prevent CPU cycle spikes and HMR flicker in React implementations, component states should be:",
    options: ["Updated directly within the render loop", "Managed cleanly using controlled side effects and primitive dependencies", "Set globally on every keyword keyup", "Ignored entirely"],
    correct: 1,
    desc: "Strict state management combined with optimized dependency bounds avoids infinite renders and flickering screens."
  },
  {
    q: "Which engineering concept scales output symmetrically against proportional inputs?",
    options: ["Exponential progression", "Linear system characteristics", "Chaotic resonance loops", "Hysteresis curves"],
    correct: 1,
    desc: "Linearity satisfies superposition and homogeneity, meaning outputs scale strictly proportional to input coordinates."
  }
];

window.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("unit-quiz-mount");
  if (!mount) return;

  // Identify Subject & Unit from pathname
  // e.g., "/engineering-mathematics-unit-1-matrices-and-cayley-hamilton-jntuk-r23" or "/data-structures-unit-3"
  const pathname = window.location.pathname;
  const filename = pathname.substring(pathname.lastIndexOf("/") + 1).replace(/\.html$/, "");
  
  // Extract Subject Slug and Unit ID
  const parts = filename.split("-unit-");
  let subjectSlug = "c-programming";
  let unitId = "unit-1";
  
  if (parts.length === 2) {
    subjectSlug = parts[0]; // e.g., "engineering-physics"
    unitId = `unit-${parts[1]}`; // e.g., "unit-2"
  } else {
    // Attempt match with regex if route is different
    const regexMatch = filename.match(/^([a-z0-9-]+)-(unit-[0-9]+)$/);
    if (regexMatch) {
      subjectSlug = regexMatch[1];
      unitId = regexMatch[2];
    }
  }

  // Normalize Subject Slug for precise DATABASE mapping
  if (subjectSlug === "engineering-chemistry" || subjectSlug === "chemistry-topper-notes") {
    subjectSlug = "chemistry";
  } else if (subjectSlug === "beee-notes" || subjectSlug === "basic-electrical-engineering" || subjectSlug === "basic-electrical-engineering-beee-notes-jntuk-r23") {
    subjectSlug = "beee";
  } else if (subjectSlug === "c-programming-notes" || subjectSlug === "pps" || subjectSlug === "programming" || subjectSlug === "c-programming-notes-pps-jntuk-r23") {
    subjectSlug = "c-programming";
  } else if (subjectSlug === "data-structures-basics" || subjectSlug === "dsa" || subjectSlug === "data-structures-notes-jntuk-r23") {
    subjectSlug = "data-structures";
  } else if (subjectSlug === "maths-1" || subjectSlug === "engineering-mathematics-unit" || subjectSlug === "engineering-mathematics-1-notes-jntuk-r23") {
    subjectSlug = "engineering-mathematics";
  }

  // Normalize Unit ID to extract only the core identifier (e.g., "unit-1-wave..." -> "unit-1")
  const unitDigitMatch = unitId.match(/unit-([1-5])/);
  if (unitDigitMatch) {
    unitId = `unit-${unitDigitMatch[1]}`;
  }

  // Load appropriate questions or load generic
  let questions = [];
  if (UNIT_QUIZ_DATABASE[subjectSlug] && UNIT_QUIZ_DATABASE[subjectSlug][unitId]) {
    questions = UNIT_QUIZ_DATABASE[subjectSlug][unitId];
  } else {
    // Generate simulated questions based on subject slug and unit ID
    questions = generateCustomSyllabusQuiz(subjectSlug, unitId);
  }

  // Initialize state
  let currentQuestionIdx = 0;
  let score = 0;
  let answered = false;
  let selectedIdx = -1;

  // Add click listener to the start button
  const startBtn = document.getElementById("start-unit-quiz-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      runQuiz();
    });
  }

  function runQuiz() {
    currentQuestionIdx = 0;
    score = 0;
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    selectedIdx = -1;
    const qData = questions[currentQuestionIdx];
    const progressPct = Math.round(((currentQuestionIdx) / questions.length) * 100);

    mount.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex items-center justify-between mb-4">
          <span class="text-[9px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded">
            Question ${currentQuestionIdx + 1} of ${questions.length}
          </span>
          <span class="text-xs font-mono text-slate-500">Mastery: ${progressPct}%</span>
        </div>

        <div class="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
          <div class="h-full bg-blue-500 transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <h3 class="text-lg font-black text-slate-900 dark:text-slate-50 mb-6 leading-snug">
          ${qData.q}
        </h3>

        <div class="space-y-3 mb-6" id="quiz-options-box">
          ${qData.options.map((option, i) => `
            <button data-idx="${i}" class="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-350 dark:text-slate-300 transition-all flex justify-between items-center group cursor-pointer focus:outline-none">
              <span>${option}</span>
              <div class="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:border-blue-500 shrink-0 ml-2"></div>
            </button>
          `).join("")}
        </div>

        <div id="quiz-feedback-box" class="hidden mb-6 p-4 rounded-xl border flex items-start gap-3">
          <div id="quiz-feedback-icon" class="w-5 h-5 shrink-0 mt-0.5"></div>
          <div>
            <h4 id="quiz-feedback-title" class="text-xs font-bold uppercase tracking-wider mb-0.5"></h4>
            <p id="quiz-feedback-text" class="text-xs leading-normal"></p>
          </div>
        </div>

        <button id="quiz-action-btn" class="btn-primary w-full text-xs py-3" disabled>
          Submit Answer
        </button>
      </div>
    `;

    // Hook options click
    const options = mount.querySelectorAll("#quiz-options-box button");
    options.forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        
        // Remove selection style from other buttons
        options.forEach(b => {
          b.classList.remove("border-blue-500", "bg-blue-500/5", "dark:bg-blue-950/10");
          b.querySelector("div").innerHTML = "";
          b.querySelector("div").className = "w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 ml-2";
        });

        // Add to this button
        btn.classList.add("border-blue-500", "bg-blue-500/5", "dark:bg-blue-950/10");
        btn.querySelector("div").innerHTML = `<div class="w-2 h-2 rounded-full bg-blue-500"></div>`;
        btn.querySelector("div").className = "w-4 h-4 rounded-full border border-blue-500 flex items-center justify-center shrink-0 ml-2";
        
        selectedIdx = parseInt(btn.getAttribute("data-idx"));
        mount.querySelector("#quiz-action-btn").removeAttribute("disabled");
      });
    });

    // Hook submit button click
    const actionBtn = mount.querySelector("#quiz-action-btn");
    actionBtn.addEventListener("click", () => {
      if (!answered) {
        evaluateAnswer();
      } else {
        advanceQuiz();
      }
    });
  }

  function evaluateAnswer() {
    answered = true;
    const qData = questions[currentQuestionIdx];
    const options = mount.querySelectorAll("#quiz-options-box button");
    const feedbackBox = mount.querySelector("#quiz-feedback-box");
    const feedbackIcon = mount.querySelector("#quiz-feedback-icon");
    const feedbackTitle = mount.querySelector("#quiz-feedback-title");
    const feedbackText = mount.querySelector("#quiz-feedback-text");
    const actionBtn = mount.querySelector("#quiz-action-btn");

    options.forEach((btn, idx) => {
      btn.setAttribute("disabled", "true");
      btn.classList.add("opacity-60");
      if (idx === qData.correct) {
        // Highlight correct
        btn.classList.remove("opacity-60", "border-slate-200", "dark:border-slate-800");
        btn.classList.add("border-green-500", "bg-green-500/5", "dark:bg-green-950/10", "text-green-600", "dark:text-green-400");
        btn.querySelector("div").innerHTML = `<svg class="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>`;
        btn.querySelector("div").className = "w-4 h-4 rounded-full border border-green-500 flex items-center justify-center shrink-0 ml-2 bg-green-500/10";
      } else if (idx === selectedIdx) {
        // Highlight chosen incorrect
        btn.classList.remove("opacity-60", "border-slate-200", "dark:border-slate-800");
        btn.classList.add("border-red-500", "bg-red-500/5", "dark:bg-red-950/10", "text-red-600", "dark:text-red-400");
        btn.querySelector("div").innerHTML = `<svg class="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>`;
        btn.querySelector("div").className = "w-4 h-4 rounded-full border border-red-500 flex items-center justify-center shrink-0 ml-2 bg-red-500/10";
      }
    });

    feedbackBox.classList.remove("hidden");
    const isCorrect = (selectedIdx === qData.correct);

    if (isCorrect) {
      score++;
      feedbackBox.className = "mb-6 p-4 rounded-xl border border-green-500/30 bg-green-500/5 flex items-start gap-3 animate-fadeIn";
      feedbackTitle.innerText = "Correct Answer!";
      feedbackTitle.className = "text-xs font-bold text-green-500 uppercase tracking-wider mb-0.5";
      feedbackIcon.innerHTML = `<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    } else {
      feedbackBox.className = "mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex items-start gap-3 animate-fadeIn";
      feedbackTitle.innerText = "Incorrect Answer";
      feedbackTitle.className = "text-xs font-bold text-red-500 uppercase tracking-wider mb-0.5";
      feedbackIcon.innerHTML = `<svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    }

    feedbackText.innerText = qData.desc;
    actionBtn.innerText = (currentQuestionIdx < questions.length - 1) ? "Next Question" : "See Final Score";
  }

  function advanceQuiz() {
    if (currentQuestionIdx < questions.length - 1) {
      currentQuestionIdx++;
      renderQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    const finalPercentage = Math.round((score / questions.length) * 100);
    const xpReward = score * 20;

    // Award XP to JNTUK EngiPrep Hub persistence storage
    try {
      let currentXP = parseInt(localStorage.getItem("engi_eg_MasteryXP")) || 0;
      currentXP += xpReward;
      localStorage.setItem("engi_eg_MasteryXP", currentXP);

      // Trigger standard toast or level system check if exists on subject page
      if (typeof window.masteryAccreditEvent === "function") {
        window.masteryAccreditEvent(xpReward);
      } else if (typeof window.showToast === "function") {
        window.showToast(`Completed Quiz! +${xpReward} XP Earned.`);
      }
    } catch (e) {
      console.log("Persistence storage write skipped:", e);
    }

    mount.innerHTML = `
      <div class="text-center py-6 animate-fadeIn">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6">
          <svg class="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h3 class="text-2xl font-black text-slate-900 dark:text-slate-50 mb-2">Quiz Completed!</h3>
        <p class="text-sm text-slate-400 mb-6">Great effort testing your concept bounds on Unit ${unitId.replace("unit-", "")}.</p>

        <div class="flex items-center justify-center gap-10 mb-8">
          <div>
            <div class="text-4xl font-black text-blue-500">${finalPercentage}%</div>
            <div class="text-[9px] uppercase tracking-wider text-slate-500 mt-1">Accuracy</div>
          </div>
          <div class="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <div class="text-4xl font-black text-slate-800 dark:text-slate-200">${score}/${questions.length}</div>
            <div class="text-[9px] uppercase tracking-wider text-slate-500 mt-1">Correct Answers</div>
          </div>
          <div class="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <div class="text-4xl font-black text-amber-500">+${xpReward}</div>
            <div class="text-[9px] uppercase tracking-wider text-slate-500 mt-1">XP Earned</div>
          </div>
        </div>

        <div class="flex gap-3">
          <button id="retake-quiz-btn" class="flex-1 px-5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-950 transition-all font-bold text-xs cursor-pointer text-slate-800 dark:text-slate-200">
            Retake Quiz
          </button>
          <button id="back-to-subject-btn" class="flex-1 btn-primary text-xs py-3">
            Back to Hub
          </button>
        </div>
      </div>
    `;

    // Retake hooks
    mount.querySelector("#retake-quiz-btn").addEventListener("click", () => {
      runQuiz();
    });
    
    // Back to sub hooks
    mount.querySelector("#back-to-subject-btn").addEventListener("click", () => {
      window.location.href = "/all-subjects.html";
    });
  }

  // Generates unique custom questions for units and subjects dynamically when not in the static DB
  function generateCustomSyllabusQuiz(subject, unit) {
    const cleanSubject = subject.replace(/-/g, " ");
    const cleanUnit = unit.replace("unit-", "Unit ");
    
    return [
      {
        q: `Which fundamental principle is central to ${cleanSubject} in ${cleanUnit}?`,
        options: [
          "Rote mathematical formulation with static heuristics",
          "Analytical modeling, boundary equilibrium, and parameter optimization",
          "Random parameter estimations",
          "Arbitrary coding variables"
        ],
        correct: 1,
        desc: `In ${cleanSubject}, high-level core principles prioritize analytical modeling and systematic parameter optimization over raw guessing.`
      },
      {
        q: `Under JNTUK R23 curriculum specifications, studying ${cleanUnit} of ${cleanSubject} aims to achieve:`,
        options: [
          "A solid grasp of practical design criteria and clean structural solutions",
          "Simply passing the written assessment without understanding",
          "Memorizing slide decks",
          "Replacing lab assessments with theoretical conjectures"
        ],
        correct: 0,
        desc: "JNTUK R23 is specifically restructured to balance core theoretical logic with practical engineering design criteria."
      },
      {
        q: `To ensure maximum accuracy in resolving variables on the board paper for ${cleanSubject}, you should:`,
        options: [
          "Skip intermediate algebraic steps",
          "Explicitly state boundary conditions, formulate base equations, and trace calculations sequentially",
          "Directly write the guessed answer",
          "Decline drawing corresponding schemas"
        ],
        correct: 1,
        desc: "Providing neat step derivations alongside explicitly stated boundary conditions guarantees maximum examiner score credits."
      },
      {
        q: `Which parameter remains invariant during basic coordinate transformation changes in ${cleanSubject}?`,
        options: [
          "The linear trace values and physical rank conservation",
          "All local variable magnitude factors",
          "Arbitrary boundary constants",
          "The physical scale coefficient"
        ],
        correct: 0,
        desc: "Coordinate transformations alter specific projections, but leave intrinsic system traits like physical rank or trace eigenvalues invariant."
      },
      {
        q: `Which approach best optimizes the learning lifecycle for ${cleanSubject} on exam-eve?`,
        options: [
          "Reviewing formula cheatsheets, solving high-weightage Board PYQs, and self-testing using interactive unit quizzes",
          "Reading full multi-hundred page books without writing practice",
          "Ignoring mock viva card questions",
          "Vaporizing standard syllabus checklists"
        ],
        correct: 0,
        desc: "Combining high-yield revision points, solving solved board PYQs, and interactive testing locks in active recall for high test scores."
      }
    ];
  }
});
