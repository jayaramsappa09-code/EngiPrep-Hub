module.exports = {
  "Engineering Physics": {
    topicDesc: "Complete academic mapping of JNTUK Engineering Physics R23 curriculum. From quantum tunneling to advanced semiconductor transport.",
    units: [
      {
        id: "unit-2",
        title: "Wave Particle Duality & Schrödinger Mechanics",
        subtitle: "Unit II: Quantum Mechanics & Free Electron Theory",
        weightage: "~15-20 Marks",
        desc: "Dual nature of matter, Heisenberg uncertainty, Schrödinger wave equations, and 1D potential wells.",
        introTitle: "Introduction to Quantum States",
        introBody: "Classical mechanics fails at the atomic scale. Quantum mechanics introduces wave-particle duality, where matter exhibits both particle-like and wave-like behavior, governed by probability amplitudes.",
        coreHighlight: "The Core Crux of R23: The entire unit revolves around the exact boundary state derivations for the 1D infinite potential well and the implications of the Heisenberg Uncertainty Principle.",
        concept1: { title: "Matter Waves", detail: "de Broglie proposed that moving particles have an associated wavelength λ = h/p." },
        concept2: { title: "Uncertainty", detail: "Heisenberg formulated that position and momentum cannot be simultaneously measured with arbitrary precision: Δx · Δp ≥ h/4π." },
        formula1: { title: "de Broglie Wavelength", eq: "λ = h / √(2mE)" },
        formula2: { title: "Particle in 1D Box", eq: "E_n = n²h² / (8mL²)" },
        pyq1: { title: "Schrödinger Time-Independent Eq", marks: "10 Marks", body: "Derive the time independent Schrödinger wave equation." },
        pyq2: { title: "Fermi Dirac Distribution", marks: "5 Marks", body: "Explain the effect of temperature on Fermi-Dirac distribution function." },
      },
      {
        id: "unit-3",
        title: "Intrinsic & Extrinsic Carrier Transport",
        subtitle: "Unit III: Semiconductors",
        weightage: "~15-20 Marks",
        desc: "Intrinsic/extrinsic transport, drift/diffusion, Fermi levels, and the Hall Effect.",
        introTitle: "Semiconductor Band Theory",
        introBody: "Materials are classified by energy band gaps. Semiconductors have a small band gap (~1 eV) allowing thermal excitation.",
        coreHighlight: "The Core Crux of R23: Hall effect derivation, Einstein relation, and intrinsic carrier concentration derivations dominate the board exams.",
        concept1: { title: "Charge Carriers", detail: "Electrons in conduction band and holes in valence band contribute to current." },
        concept2: { title: "Hall Effect", detail: "A transverse voltage is produced when a magnetic field is applied perpendicular to current flow." },
        formula1: { title: "Intrinsic Density", eq: "n_i² = N_c N_v exp(-E_g/kT)" },
        formula2: { title: "Hall Coefficient", eq: "R_H = 1 / (n·e)" },
        pyq1: { title: "Hall Effect Derivation", marks: "10 Marks", body: "Explain Hall Effect. Derive the expression for Hall coefficient." },
        pyq2: { title: "Einstein Relation", marks: "5 Marks", body: "Deduce the Einstein’s relation between diffusion coefficient and mobility." },
      },
      {
        id: "unit-4",
        title: "Einstein Coefficients & Fiber Optics",
        subtitle: "Unit IV: Lasers & Fiber Optics",
        weightage: "~10-15 Marks",
        desc: "Laser Characteristics, He-Ne laser, Nd:YAG. Numerical Aperture, Acceptance Angle derivations.",
        introTitle: "Principles of Light Emission",
        introBody: "Lasers operate on stimulated emission. Fiber optics rely on total internal reflection for guided light transmission.",
        coreHighlight: "The Core Crux of R23: He-Ne laser working mechanism and Numerical Aperture derivations are repeated every year.",
        concept1: { title: "Stimulated Emission", detail: "An incoming photon stimulates an excited atom to emit a coherent photon." },
        concept2: { title: "Total Internal Reflection", detail: "Light traveling from denser to rarer medium reflects completely if angle > critical angle." },
        formula1: { title: "Numerical Aperture", eq: "NA = √(n₁² - n₂²)" },
        formula2: { title: "Acceptance Angle", eq: "θ_a = arcsin(NA)" },
        pyq1: { title: "He-Ne Laser", marks: "10 Marks", body: "With a neat energy level diagram describe the working of He-Ne laser." },
        pyq2: { title: "Numerical Aperture", marks: "5 Marks", body: "Derive an expression for acceptance angle and numerical aperture." },
      },
      {
        id: "unit-5",
        title: "Polarization & Superconductors",
        subtitle: "Unit V: Dielectric & Magnetic Materials",
        weightage: "~10-15 Marks",
        desc: "Dielectrics polarizations; internal fields. Origin of magnetic moment, ferromagnetism, Superconducting transition.",
        introTitle: "Material Responses to Fields",
        introBody: "Dielectrics polarize in electric fields. Magnetic materials align dipoles in magnetic fields. Superconductors expel magnetic fields perfectly.",
        coreHighlight: "The Core Crux of R23: Clausius-Mossotti relation, B-H curve, and Meissner effect are the guaranteed questions.",
        concept1: { title: "Polarization", detail: "Electronic, ionic, and orientational displacement of charges." },
        concept2: { title: "Meissner Effect", detail: "Expulsion of magnetic field lines from a superconductor below critical temperature (perfect diamagnetism)." },
        formula1: { title: "Clausius-Mossotti", eq: "(ε_r - 1)/(ε_r + 2) = (N_α)/(3ε_o)" },
        formula2: { title: "Critical Field", eq: "H_c(T) = H_c(0)[1 - (T/T_c)²]" },
        pyq1: { title: "Clausius-Mossotti Relation", marks: "10 Marks", body: "Derive Clausius-Mossotti relation for solid dielectrics." },
        pyq2: { title: "Meissner Effect", marks: "5 Marks", body: "Write a short note on Meissner effect and Type I & II superconductors." },
      }
    ]
  },
  "Engineering Mathematics": {
    topicDesc: "Complete mapping of JNTUK Engineering Mathematics M1 & M2. From Matrix Eigenvalues to Multivariable Calculus.",
    units: [
      {
        id: "unit-1",
        title: "Matrix Operations & Linear Systems",
        subtitle: "Unit I: Matrices",
        weightage: "~15-20 Marks",
        desc: "Rank of matrix, Echelon form, Normal form. Solution of linear systems. Gauss elimination.",
        introTitle: "Linear Algebra Fundamentals",
        introBody: "Matrices provide a compact way to represent and solve systems of linear equations.",
        coreHighlight: "The Core Crux of R23: Finding the Rank using Echelon form and testing consistency of linear equations.",
        definitions: [
            { term: "Rank", desc: "Number of non-zero rows in echelon form." },
            { term: "Consistency", desc: "Condition for a solution to exist." }
        ],
        formulas: [
            { title: "Consistency", eq: "Rank(A) = Rank(A|B) ≤ n" },
            { title: "Infinite Solutions", eq: "Rank(A) = Rank(A|B) < n" }
        ],
        numericalSolved: [
            { title: "System Solution", solution: "Use Gauss Elimination to find variables." }
        ],
        revisionPoints: ["Echelon form rules", "Consistency conditions", "Gauss Jordan vs Elimination"],
        memoryTricks: "A|B Rank must match",
        examStrategy: "Always check rank of augmented matrix first.",
        concept1: { title: "Rank of a Matrix", detail: "Number of non-zero rows in its row echelon form." },
        concept2: { title: "Gauss Elimination", detail: "Reducing a system to upper triangular form to solve via back substitution." },
        formula1: { title: "Consistency", eq: "Rank(A) = Rank(A|B) ≤ n" },
        formula2: { title: "Infinite Solutions", eq: "Rank(A) = Rank(A|B) < n" },
        pyq1: { title: "Rank by Normal Form", marks: "10 Marks", body: "Reduce the matrix to Normal form and find its rank." },
        pyq2: { title: "System Consistency", marks: "10 Marks", body: "Test for consistency and solve: 2x - y + 3z = 8, -x + 2y + z = 4, 3x + y - 4z = 0." },
      },
      {
        id: "unit-2",
        title: "Eigenvalues, Eigenvectors & Orthogonal Transformation",
        subtitle: "Unit II: Eigen-Systems",
        weightage: "~15-20 Marks",
        desc: "Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, Diagonalization, Quadratic forms to canonical forms.",
        introTitle: "Eigen-Systems & Transformations",
        introBody: "Eigenvalues provide characteristic scale factors for matrix transformations. Cayley-Hamilton connects a matrix to its characteristic polynomial.",
        coreHighlight: "The Core Crux of R23: Finding Eigenvalues/vectors and reducing Quadratic form to Canonical form by Orthogonal Transformation.",
        definitions: [
            { term: "Eigenvalue", desc: "Scale factor for eigenvector transformation." },
            { term: "Cayley-Hamilton", desc: "Matrix satisfies its characteristic equation." }
        ],
        formulas: [
            { title: "Characteristic Eq", eq: "|A - λI| = 0" },
            { title: "Quadratic Form", eq: "Q = X^T A X" }
        ],
        numericalSolved: [
            { title: "Eigenvalue Calc", solution: "Solve |A - λI| = 0." }
        ],
        revisionPoints: ["Eigenvalue properties", "Diagonalization conditions", "Canonical form steps"],
        memoryTricks: "A - λI stays equal to zero",
        examStrategy: "Practice finding eigenvalues for 3x3 matrices.",
        concept1: { title: "Cayley-Hamilton Theorem", detail: "Every square matrix satisfies its own characteristic equation." },
        concept2: { title: "Quadratic Form", detail: "A homogenous polynomial of degree 2 in a number of variables." },
        formula1: { title: "Characteristic Eq", eq: "|A - λI| = 0" },
        formula2: { title: "Quadratic Form", eq: "Q = X^T A X" },
        pyq1: { title: "Cayley-Hamilton", marks: "10 Marks", body: "Verify Cayley-Hamilton theorem and find the inverse of A." },
        pyq2: { title: "Quadratic to Canonical", marks: "10 Marks", body: "Reduce the given quadratic form to canonical form by orthogonal reduction." }
      },
      {
        id: "unit-3",
        title: "Calculus & Mean Value Theorems",
        subtitle: "Unit III: Differential Calculus",
        weightage: "~15 Marks",
        desc: "Mean Value Theorems: Rolle's, Lagrange's, Cauchy's. Taylor's and Maclaurin's series.",
        introTitle: "Differential Calculus & Series",
        introBody: "Mean value theorems connect the local derivative of a function to its global change. Series expansions approximate complex functions with polynomials.",
        coreHighlight: "The Core Crux of R23: Verifying Rolle's/Lagrange's theorems and expanding functions using Maclaurin's series.",
        definitions: [
            { term: "Rolle's Theorem", desc: "f(a)=f(b) implies f'(c)=0." },
            { term: "Maclaurin's Series", desc: "Expansion of f(x) about x=0." }
        ],
        formulas: [
            { title: "Lagrange's MVT", eq: "f'(c) = (f(b) - f(a)) / (b - a)" },
            { title: "Cauchy's MVT", eq: "f'(c)/g'(c) = (f(b)-f(a))/(g(b)-g(a))" }
        ],
        numericalSolved: [
            { title: "MVT Verification", solution: "Show f'(c) = slope of secant." }
        ],
        revisionPoints: ["Rolle's conditions", "Maclaurin's series formula", "MVT applications"],
        memoryTricks: "f'(c) is the slope",
        examStrategy: "Always list theorem conditions first.",
        concept1: { title: "Rolle's Theorem", detail: "If f(a)=f(b) and continuous, there exists c where f'(c)=0." },
        concept2: { title: "Maclaurin Series", detail: "Expansion of a function about x=0." },
        formula1: { title: "Lagrange's MVT", eq: "f'(c) = (f(b) - f(a)) / (b - a)" },
        formula2: { title: "Cauchy's MVT", eq: "f'(c)/g'(c) = (f(b)-f(a))/(g(b)-g(a))" },
        pyq1: { title: "Verify Lagrange's MVT", marks: "5 Marks", body: "Verify Lagrange's mean value theorem for f(x) = log(x) on [1, e]." },
        pyq2: { title: "Maclaurin Expansion", marks: "10 Marks", body: "Expand tan(x) up to the term containing x^5 using Maclaurin's series." }
      },
      {
        id: "unit-4",
        title: "Partial Differentiation & Applications",
        subtitle: "Unit IV: Multivariable Calculus",
        weightage: "~15-20 Marks",
        desc: "Partial derivatives, Jacobians, Maxima and minima of functions of two variables, Lagrange multipliers.",
        introTitle: "Multivariable Calculus",
        introBody: "Extending calculus to functions of multiple variables. Critical for optimizing systems with multiple inputs.",
        coreHighlight: "The Core Crux of R23: Finding Maxima/Minima of two variables and applying Lagrange's method of undetermined multipliers.",
        definitions: [
            { term: "Jacobian", desc: "Determines functional dependence." },
            { term: "Lagrange Multipliers", desc: "Optimizing with constraints." }
        ],
        formulas: [
            { title: "Total Derivative", eq: "dz = (∂z/∂x)dx + (∂z/∂y)dy" },
            { title: "Lagrange Function", eq: "L = f(x,y) + λφ(x,y)" }
        ],
        numericalSolved: [
            { title: "Extrema Calc", solution: "Solve fx=0, fy=0." }
        ],
        revisionPoints: ["Extreme points check", "Constraint handling", "Jacobian application"],
        memoryTricks: "f'x=0, f'y=0 for Maxima/Minima",
        examStrategy: "Don't forget the second derivative test.",
        concept1: { title: "Jacobian", detail: "Determinant of the Jacobian matrix, used in change of variables." },
        concept2: { title: "Lagrange Multipliers", detail: "Optimizing a function subject to equality constraints." },
        formula1: { title: "Total Derivative", eq: "dz = (∂z/∂x)dx + (∂z/∂y)dy" },
        formula2: { title: "Lagrange Function", eq: "L = f(x,y) + λφ(x,y)" },
        pyq1: { title: "Maxima & Minima", marks: "10 Marks", body: "Find the maximum and minimum values of x^3 + 3xy^2 - 15x^2 - 15y^2 + 72x." },
        pyq2: { title: "Jacobians", marks: "5 Marks", body: "If u = x+y, v = xy, find the Jacobian ∂(u,v)/∂(x,y)." }
      },
      {
        id: "unit-5",
        title: "Multiple Integrals",
        subtitle: "Unit V: Multiple Integration",
        weightage: "~15 Marks",
        desc: "Double and triple integrals, change of order of integration, change of variables, finding areas and volumes.",
        introTitle: "Multiple Integration",
        introBody: "Extending definite integrals to two and three dimensions for calculating areas, volumes, and center of mass.",
        coreHighlight: "The Core Crux of R23: Change of order of integration and evaluating double integrals over specific regions.",
        definitions: [
            { term: "Change of Order", desc: "Swap integration limits." },
            { term: "Double Integral", desc: "Area under surface." }
        ],
        formulas: [
            { title: "Area via Double Integral", eq: "A = ∬ dx dy" },
            { title: "Volume via Triple Integral", eq: "V = ∭ dx dy dz" }
        ],
        numericalSolved: [
            { title: "Double Integral Area", solution: "Iteratively evaluate limits." }
        ],
        revisionPoints: ["Polar transformation", "Order of integration change", "Area/Volume"],
        memoryTricks: "dx dy -> r dr dθ",
        examStrategy: "Draw the region diagram first.",
        concept1: { title: "Change of Order", detail: "Swapping the limits of integration to simplify evaluation." },
        concept2: { title: "Polar Coordinates", detail: "Transforming Cartesian (x,y) to Polar (r,θ) where dx dy = r dr dθ." },
        formula1: { title: "Area via Double Integral", eq: "A = ∬ dx dy" },
        formula2: { title: "Volume via Triple Integral", eq: "V = ∭ dx dy dz" },
        pyq1: { title: "Change of Order", marks: "10 Marks", body: "Change the order of integration and evaluate ∬ xy dx dy." },
        pyq2: { title: "Area Calculation", marks: "5 Marks", body: "Find the area enclosed by the curves y = x^2 and y = x." }
      }
    ]
  },
  "Data Structures": {
    topicDesc: "Complete mapping of JNTUK Data Structures R23. From basic Arrays to advanced Graph traversal topologies.",
    units: [
      {
        id: "unit-1",
        title: "Arrays, Searching & Sorting",
        subtitle: "Unit I: Fundamentals",
        weightage: "~15 Marks",
        desc: "Array operations, Linear/Binary search. Selection, Bubble, Insertion, Quick, Merge sort.",
        introTitle: "Data Organization",
        introBody: "Organizing data efficiently is the foundation of computer science. Searching and sorting are the baseline mechanics.",
        coreHighlight: "The Core Crux of R23: Time complexity derivations for Merge Sort and Quick Sort.",
        concept1: { title: "Binary Search", detail: "O(log n) search on a sorted array by repeated halving." },
        concept2: { title: "Merge Sort", detail: "Divide and conquer recursive algorithm. Guaranteed O(n log n) time." },
        formula1: { title: "Binary Search Time", eq: "T(n) = T(n/2) + O(1)" },
        formula2: { title: "Merge Sort Time", eq: "T(n) = 2T(n/2) + O(n)" },
        pyq1: { title: "Quick Sort", marks: "10 Marks", body: "Trace Quick Sort on the array: [40, 20, 10, 80, 60, 50, 7, 30, 100]." },
        pyq2: { title: "Binary Search", marks: "5 Marks", body: "Write a C function for iterative Binary Search and state its complexity." },
      },
      {
        id: "unit-2",
        title: "Linked Lists (SLL, DLL, CLL)",
        subtitle: "Unit II: Dynamic Structures",
        weightage: "~15-20 Marks",
        desc: "Singly linked lists, doubly linked lists, circular linked lists, representation and operations.",
        introTitle: "Dynamic Data Structures",
        introBody: "Unlike arrays, linked lists allocate memory dynamically and do not require contiguous memory blocks.",
        coreHighlight: "The Core Crux of R23: Programmatic implementation of insertion and deletion in Singly and Doubly Linked Lists.",
        concept1: { title: "Singly Linked List", detail: "Each node contains data and a pointer to the next node." },
        concept2: { title: "Doubly Linked List", detail: "Each node contains pointers to both the previous and next nodes." },
        formula1: { title: "SLL Node Structure", eq: "struct Node { int data; struct Node* next; };" },
        formula2: { title: "DLL Node Structure", eq: "struct Node { int data; struct Node* prev, *next; };" },
        pyq1: { title: "SLL Operations", marks: "10 Marks", body: "Write a C program to insert a node at the beginning and end of a Singly Linked List." },
        pyq2: { title: "DLL Deletion", marks: "5 Marks", body: "Write an algorithm to delete a specific node from a Doubly Linked List." }
      },
      {
        id: "unit-3",
        title: "Stacks & Applications",
        subtitle: "Unit III: LIFO Operations",
        weightage: "~15 Marks",
        desc: "Stack properties, operations, array and linked list implementation, expression evaluation.",
        introTitle: "LIFO Operations",
        introBody: "Stacks follow the Last-In-First-Out (LIFO) principle. They are fundamental in recursion and parsing.",
        coreHighlight: "The Core Crux of R23: Conversion of infix to postfix expressions and evaluating postfix expressions.",
        concept1: { title: "Push & Pop", detail: "Push adds an element to the top; Pop removes the top element." },
        concept2: { title: "Expression Parsing", detail: "Using stacks to evaluate postfix expressions or check balanced parentheses." },
        formula1: { title: "Push Operation", eq: "stack[++top] = value;" },
        formula2: { title: "Pop Operation", eq: "value = stack[top--];" },
        pyq1: { title: "Infix to Postfix", marks: "10 Marks", body: "Convert the infix expression (A+B)*C-D/E into postfix notation using a stack." },
        pyq2: { title: "Stack via Linked List", marks: "10 Marks", body: "Implement Stack push and pop operations using Linked List." }
      },
      {
        id: "unit-4",
        title: "Queues & Deques",
        subtitle: "Unit IV: FIFO Operations",
        weightage: "~15 Marks",
        desc: "Queue properties, operations, circular queues, deques, implementation using arrays/linked lists.",
        introTitle: "FIFO Operations",
        introBody: "Queues operate strictly on First-In-First-Out (FIFO) logic, essential for scheduling and buffering.",
        coreHighlight: "The Core Crux of R23: Circular queue implementation and its advantage over simple queues.",
        concept1: { title: "Enqueue & Dequeue", detail: "Enqueue adds to the rear; Dequeue removes from the front." },
        concept2: { title: "Circular Queue", detail: "Connects the last position back to the first to utilize empty space efficiently." },
        formula1: { title: "CQ Enqueue", eq: "rear = (rear + 1) % MAX;" },
        formula2: { title: "CQ Dequeue", eq: "front = (front + 1) % MAX;" },
        pyq1: { title: "Circular Queue Operations", marks: "10 Marks", body: "Explain the implementation of Circular Queue with suitable C functions." },
        pyq2: { title: "Deque", marks: "5 Marks", body: "What is a Double Ended Queue (Deque)? Explain its input restricted variant." }
      },
      {
        id: "unit-5",
        title: "Trees, Hashing & Graphs",
        subtitle: "Unit V: Non-Linear Structures",
        weightage: "~20 Marks",
        desc: "Trees, Binary Search Tree (Insertion/Deletion/Traversal), Hashing collision techniques, Graph traversals.",
        introTitle: "Non-Linear Structures & Maps",
        introBody: "Hierarchical data is represented using Trees, while interconnected network systems use Graphs.",
        coreHighlight: "The Core Crux of R23: BST traversals (Inorder, Preorder, Postorder) and BFS/DFS graph traversals.",
        concept1: { title: "Binary Search Tree", detail: "Left child &lt; Root &lt; Right child, allowing efficient O(log n) searching." },
        concept2: { title: "Graph Traversal", detail: "BFS uses a Queue; DFS uses a Stack (or recursion)." },
        formula1: { title: "BST Property", eq: "Left_Val &lt; Root_Val &lt; Right_Val" },
        formula2: { title: "Hash Function", eq: "index = key % SIZE;" },
        pyq1: { title: "Tree Traversals", marks: "10 Marks", body: "Construct a BST for: 50, 30, 20, 40, 70, 60, 80. Write its Inorder, Preorder and Postorder." },
        pyq2: { title: "BFS and DFS", marks: "10 Marks", body: "Explain Breadth First Search (BFS) and Depth First Search (DFS) with an example." }
      }
    ]
  },
  "Chemistry": {
    topicDesc: "Complete mapping of JNTUK Engineering Chemistry R23. From Quantum Mechanics to Conducting Polymers and Instrumental Methods.",
    units: [
      {
        id: "unit-1",
        title: "Structure and Bonding Models",
        subtitle: "Unit I: Quantum Chemistry",
        weightage: "~15 Marks",
        desc: "Fundamentals of Quantum mechanics, Schrodinger Wave equation, Molecular orbital theory, Energy level diagrams of O2 and CO.",
        introTitle: "Quantum Chemistry Fundamentals",
        introBody: "Quantum mechanics provides the foundation for understanding atomic and molecular behavior through wave functions.",
        coreHighlight: "The Core Crux of R23: Molecular Orbital Theory (MOT) diagrams for homonuclear and heteronuclear diatomic molecules are frequently tested.",
        definitions: [
            { term: "Schrödinger Equation", desc: "Equation describing quantum system state changes." },
            { term: "Molecular Orbital Theory", desc: "Electronic structure via atomic orbital combinations." }
        ],
        formulas: [
            { title: "Bond Order", eq: "BO = (N_b - N_a) / 2" },
            { title: "Schrödinger Eq", eq: "HΨ = EΨ" }
        ],
        numericalSolved: [
            { title: "O2 Bond Order", solution: "Calculate bonding/antibonding electrons." }
        ],
        revisionPoints: ["MOT rules", "bonding orbitals lower energy", "antibonding orbitals higher energy"],
        memoryTricks: "Bonding is lower energy than Antibonding",
        examStrategy: "Practice MOT diagrams daily.",
        concept1: { title: "Schrödinger Equation", detail: "A fundamental equation describing how the quantum state of a quantum system changes with time." },
        concept2: { title: "Molecular Orbital Theory", detail: "Describes the electronic structure of molecules using atomic orbitals to form molecular orbitals." },
        formula1: { title: "Bond Order", eq: "BO = (N_b - N_a) / 2" },
        formula2: { title: "Schrödinger Eq", eq: "HΨ = EΨ" },
        pyq1: { title: "MOT of O2", marks: "10 Marks", body: "Draw the Molecular Orbital energy level diagram of O2 molecule and explain its magnetic behavior." },
        pyq2: { title: "Schrödinger Equation", marks: "10 Marks", body: "Derive the Schrodinger wave equation and explain the physical significance of Ψ and Ψ²." },
      },
      {
        id: "unit-2",
        title: "Modern Engineering Materials",
        subtitle: "Unit II: Advanced Materials",
        weightage: "~15-20 Marks",
        desc: "Semiconductors, Super Conductors, Super capacitors, and Nanomaterials (Fullerenes, Carbon Nanotubes, Graphenes).",
        introTitle: "Advanced Engineering Materials",
        introBody: "Modern engineering heavily relies on advanced materials like nanomaterials and superconductors.",
        coreHighlight: "The Core Crux of R23: Preparation, properties, and applications of Carbon Nanotubes (CNTs) and Supercapacitors.",
        definitions: [
            { term: "Superconductors", desc: "Zero resistivity below critical temperature." },
            { term: "Carbon Nanotubes", desc: "Cylindrical carbon molecules." }
        ],
        formulas: [
            { title: "Capacitance", eq: "C = Q / V" },
            { title: "Stored Energy", eq: "E = 1/2 CV²" }
        ],
        numericalSolved: [
            { title: "Capacitor Energy", solution: "Use E = 1/2 CV²." }
        ],
        revisionPoints: ["CNT types", "Meissner effect", "Supercapacitor types"],
        memoryTricks: "CNTs = Rolled sheets",
        examStrategy: "Draw CNT structures clearly.",
        concept1: { title: "Superconductors", detail: "Materials that exhibit zero electrical resistance and expel magnetic fields perfectly below a critical temperature." },
        concept2: { title: "Carbon Nanotubes", detail: "Cylindrical carbon molecules with unique properties." },
        formula1: { title: "Capacitance", eq: "C = Q / V" },
        formula2: { title: "Energy Stored", eq: "E = 1/2 CV²" },
        pyq1: { title: "Carbon Nanotubes", marks: "10 Marks", body: "Explain synthesis of Carbon Nanotubes." },
        pyq2: { title: "Supercapacitors", marks: "5 Marks", body: "What are supercapacitors? Discuss their applications." }
      },
      {
        id: "unit-3",
        title: "Electrochemistry and Applications",
        subtitle: "Unit III: Electrochemistry",
        weightage: "~15-20 Marks",
        desc: "Electrochemical cell, Nernst equation, potentiometry, primary and secondary cells, fuel cells (PEMFC).",
        introTitle: "Electrochemistry & Batteries",
        introBody: "Electrochemistry studies electricity and chemical changes.",
        coreHighlight: "The Core Crux of R23: Li-ion batteries, Nernst equation, Fuel cells.",
        definitions: [
            { term: "Nernst Equation", desc: "Relates reduction potential to Q." },
            { term: "Fuel Cells", desc: "Converts chemical energy to electrical." }
        ],
        formulas: [
            { title: "Nernst Equation", eq: "E = E° - (RT/nF)ln(Q)" },
            { title: "Cell Potential", eq: "E_cell = E_cathode - E_anode" }
        ],
        numericalSolved: [
            { title: "Nernst Calculation", solution: "Plug values into E = E° - (RT/nF)ln(Q)." }
        ],
        revisionPoints: ["Cell anode/cathode signs", "Nernst variables", "Batteries vs Fuel cells"],
        memoryTricks: "AO-CR (Anode Oxidation, Cathode Reduction)",
        examStrategy: "Memorize Nernst components.",
        concept1: { title: "Nernst Equation", detail: "Relates cell potential to concentration." },
        concept2: { title: "Fuel Cells", detail: "Converts chemical to electrical energy." },
        formula1: { title: "Nernst Equation", eq: "E = E° - (RT/nF)ln(Q)" },
        formula2: { title: "Cell Potential", eq: "E_cell = E_cathode - E_anode" },
        pyq1: { title: "Lithium-ion Battery", marks: "10 Marks", body: "Explain Li-ion battery structure." },
        pyq2: { title: "Nernst Equation", marks: "10 Marks", body: "Derive Nernst equation and solve numerical." }
      },
      {
        id: "unit-4",
        title: "Polymer Chemistry",
        subtitle: "Unit IV: Polymers",
        weightage: "~15 Marks",
        desc: "Polymerization mechanisms, Plastics (PVC, Teflon, Bakelite), Elastomers (Buna-S), Conducting and Biodegradable polymers.",
        introTitle: "Polymer Science",
        introBody: "Large molecules from repeating units.",
        coreHighlight: "The Core Crux of R23: Bakelite, Teflon, Conducting polymers.",
        definitions: [
            { term: "Polymerization", desc: "Monomers forming large molecules." },
            { term: "Conducting Polymers", desc: "Organic polymers that conduct electricity." }
        ],
        formulas: [
            { title: "Degree of Polymerization", eq: "DP = M_p / M_m" },
            { title: "Average Mol Wt", eq: "M_n = Σ(N_i M_i) / Σ(N_i)" }
        ],
        numericalSolved: [
            { title: "DP Calculation", solution: "DP = M_p / M_m" }
        ],
        revisionPoints: ["Bakelite synthesis", "Conduction mechanism", "Addition vs Condensation"],
        memoryTricks: "Addition = Double bond breakage",
        examStrategy: "Focus on reaction conditions.",
        concept1: { title: "Addition Polymerization", detail: "Monomers add directly." },
        concept2: { title: "Conducting Polymers", detail: "Polymers that conduct implicitly." },
        formula1: { title: "Deg. Polymerization", eq: "DP = M_p / M_m" },
        formula2: { title: "Num Avg Mol Wt", eq: "M_n = Σ(N_i M_i) / Σ(N_i)" },
        pyq1: { title: "Bakelite & Teflon", marks: "10 Marks", body: "Preparation of Bakelite and Teflon." },
        pyq2: { title: "Conducting Polymers", marks: "10 Marks", body: "Explain conduction in Polyacetylene." }
      },
      {
        id: "unit-5",
        title: "Instrumental Methods & Green Chemistry",
        subtitle: "Unit V: Spectroscopy & Energy",
        weightage: "~15-20 Marks",
        desc: "Beer-Lambert’s law, UV-Visible, IR spectroscopy, Solar, Geothermal, Green chemistry.",
        introTitle: "Spectroscopy & Renewable Energy",
        introBody: "Material characterization via analytical instrumentation.",
        coreHighlight: "The Core Crux of R23: Beer-Lambert, UV/IR, Solar cells.",
        definitions: [
            { term: "Beer-Lambert's Law", desc: "Absorbance propto concentration/path length." },
            { term: "Solar Cells", desc: "Converts light to electricity." }
        ],
        formulas: [
            { title: "Beer-Lambert Law", eq: "A = ε c l" },
            { title: "Photon Energy", eq: "E = hν" }
        ],
        numericalSolved: [
            { title: "Absorbance Calc", solution: "Use A = ε c l." }
        ],
        revisionPoints: ["Beer-Lambert limitations", "Spectrophotometer parts", "PV effect"],
        memoryTricks: "A = abc (A = absorbance, b = path, c = conc)",
        examStrategy: "Focus on instrumental parts.",
        concept1: { title: "Beer-Lambert's Law", detail: "Absorbance depends on concentration." },
        concept2: { title: "Solar Cells", detail: "Convert light to electricity." },
        formula1: { title: "Beer-Lambert Law", eq: "A = ε c l" },
        formula2: { title: "Energy of Photon", eq: "E = hν = hc/λ" },
        pyq1: { title: "Beer-Lambert's Law", marks: "10 Marks", body: "Explain Beer-Lambert's law." },
        pyq2: { title: "Solar Cells", marks: "10 Marks", body: "Explain Photovoltaic (Solar) cell." }
      },
    ]
  },
  "Communicative English": {
    topicDesc: "Complete mapping of JNTUK Communicative English R23. Covering listening, speaking, reading, writing, and grammar.",
    units: [
      {
        id: "unit-1",
        title: "Human Values & Basic Grammar",
        subtitle: "Unit I: LSRW Basics",
        weightage: "~15 Marks",
        desc: "Gift of Magi (Short Story), skimming, scanning, mechanics of writing, basic sentence structures, synonyms, antonyms.",
        introTitle: "Foundations of Communication",
        introBody: "Developing core competencies in Listening, Speaking, Reading, and Writing to enable effective professional interactions.",
        coreHighlight: "The Core Crux of R23: Reading comprehension based on skimming/scanning and basic grammatical structures.",
        concept1: { title: "Skimming vs Scanning", detail: "Skimming gets the general idea; scanning finds specific information." },
        concept2: { title: "Mechanics of Writing", detail: "Proper capitalization, spelling, and punctuation." },
        formula1: { title: "Sentence Structure", eq: "Subject + Verb + Object" },
        formula2: { title: "Affixes", eq: "Prefix + Root + Suffix" },
        pyq1: { title: "Reading Comprehension", marks: "10 Marks", body: "Read the given passage and answer the questions based on skimming and scanning." },
        pyq2: { title: "Grammar & Vocabulary", marks: "5 Marks", body: "Identify the parts of speech in the given sentences and provide synonyms for the highlighted words." }
      },
      {
        id: "unit-2",
        title: "Nature & Cohesive Devices",
        subtitle: "Unit II: Paragraphs",
        weightage: "~15 Marks",
        desc: "The Brook by Alfred Tennyson, identifying sequence of ideas, paragraph writing, cohesive devices, homonyms.",
        introTitle: "Structuring Ideas",
        introBody: "Using cohesive devices to string ideas together into coherent paragraphs and understanding context in poetry.",
        coreHighlight: "The Core Crux of R23: Writing well-structured paragraphs using appropriate linkers and prepositions.",
        concept1: { title: "Cohesive Devices", detail: "Linkers and transition words that connect sentences and paragraphs logically." },
        concept2: { title: "Homonyms", detail: "Words that sound the same but have different meanings and spellings." },
        formula1: { title: "Paragraph Structure", eq: "Topic Sentence + Supporting Details + Concluding Sentence" },
        formula2: { title: "Articles", eq: "A, An, The, Zero Article" },
        pyq1: { title: "Paragraph Writing", marks: "10 Marks", body: "Write a cohesive paragraph on 'The Impact of Technology on Nature' using appropriate linkers." },
        pyq2: { title: "Prepositions and Articles", marks: "5 Marks", body: "Fill in the blanks with correct prepositions and articles in the provided text." }
      },
      {
        id: "unit-3",
        title: "Biography & Note-Making",
        subtitle: "Unit III: Summarizing",
        weightage: "~15-20 Marks",
        desc: "Elon Musk Biography, global comprehension, making inferences, summarizing, note-making, paraphrasing, tenses.",
        introTitle: "Information Processing",
        introBody: "Extracting key information from detailed texts, summarizing long passages, and maintaining verb tense consistency.",
        coreHighlight: "The Core Crux of R23: Creating accurate notes and summaries from detailed biographical texts.",
        concept1: { title: "Note-Making", detail: "Systematic method of writing down important information using headings and subheadings." },
        concept2: { title: "Paraphrasing", detail: "Rewriting text in your own words while maintaining the original meaning." },
        formula1: { title: "Summarizing", eq: "Main Idea + Key Points - Unnecessary Details" },
        formula2: { title: "Subject-Verb Agreement", eq: "Singular Subject -> Singular Verb" },
        pyq1: { title: "Note-Making", marks: "10 Marks", body: "Read the passage on Elon Musk and prepare structured notes using appropriate headings." },
        pyq2: { title: "Tenses & Agreement", marks: "5 Marks", body: "Correct the errors in subject-verb agreement and verb tenses in the given sentences." }
      },
      {
        id: "unit-4",
        title: "Inspiration & Official Writing",
        subtitle: "Unit IV: Business Communication",
        weightage: "~20 Marks",
        desc: "The Toys of Peace by Saki, graphic elements in texts, official letters, resumes, active & passive voice.",
        introTitle: "Professional Writing",
        introBody: "Mastering formal communication formats essential for the workplace, including official letters and resumes.",
        coreHighlight: "The Core Crux of R23: Resume preparation and formal letter writing formats are highly tested.",
        concept1: { title: "Resume Formatting", detail: "Clear presentation of education, skills, and experience for job applications." },
        concept2: { title: "Active vs Passive Voice", detail: "Active: Subject performs action. Passive: Subject receives action." },
        formula1: { title: "Formal Letter", eq: "Sender Address + Date + Receiver Address + Salutation + Body + Closing" },
        formula2: { title: "Passive Voice structure", eq: "Object + forms of 'be' + V3 + by + Subject" },
        pyq1: { title: "Resume Writing", marks: "10 Marks", body: "Draft a resume along with a cover letter applying for the position of Software Engineer." },
        pyq2: { title: "Voice Conversion", marks: "5 Marks", body: "Change the given sentences from active to passive voice." }
      },
      {
        id: "unit-5",
        title: "Motivation & Essay Writing",
        subtitle: "Unit V: Presentations",
        weightage: "~15 Marks",
        desc: "The Power of Intrapersonal Communication, formal oral presentations, structured essays, editing short texts.",
        introTitle: "Advanced Expression",
        introBody: "Developing the ability to present complex ideas orally and in structured essays, while self-editing for accuracy.",
        coreHighlight: "The Core Crux of R23: Writing structured essays on technical or motivational topics and editing grammar errors.",
        concept1: { title: "Structured Essay", detail: "Introduction (thesis), Body Paragraphs (arguments), Conclusion (summary)." },
        concept2: { title: "Text Editing", detail: "Identifying and correcting errors in articles, prepositions, tenses, and overall flow." },
        formula1: { title: "Essay Structure", eq: "Intro + Body 1, 2, 3 + Conclusion" },
        formula2: { title: "Presentation Flow", eq: "Hook -> Agenda -> Core Content -> Summary -> Q&A" },
        pyq1: { title: "Essay Writing", marks: "10 Marks", body: "Write a structured essay on 'The Importance of Intrapersonal Communication in Professional Success'." },
        pyq2: { title: "Editing", marks: "5 Marks", body: "Edit the following short text, correcting errors in tenses, prepositions, and articles." }
      }
    ]
  },
  "Basic Civil and Mechanical Engineering": {
    topicDesc: "Fundamentals of Civil and Mechanical Engineering. From structural materials to thermal engineering and robotics.",
    units: [
      {
        id: "unit-1",
        title: "Basics of Civil Engineering & Materials",
        subtitle: "Unit I: Civil Foundations",
        weightage: "~15 Marks",
        desc: "Role of Civil Engineers, disciplines, construction materials (cement, bricks, steel), prefabricated construction.",
        introTitle: "Introduction to Civil Infrastructure",
        introBody: "Understanding the different branches of civil engineering and the properties of common construction materials.",
        coreHighlight: "The Core Crux of R23: Classification of civil engineering disciplines and properties/uses of cement and steel.",
        concept1: { title: "Civil Disciplines", detail: "Structural, Geo-technical, Transportation, Hydraulics, and Environmental Engineering." },
        concept2: { title: "Construction Materials", detail: "Primary ingredients like Cement (binding), Aggregates (volume), and Steel (tensile strength)." },
        formula1: { title: "Concrete Mix", eq: "Cement + Sand + Aggregate + Water" },
        formula2: { title: "Steel Strength", eq: "High Tensile reinforcement" },
        pyq1: { title: "Civil Disciplines", marks: "10 Marks", body: "Explain the scope and importance of any four disciplines of Civil Engineering." },
        pyq2: { title: "Building Materials", marks: "5 Marks", body: "Discuss the role and properties of cement and steel in building construction." }
      },
      {
        id: "unit-2",
        title: "Surveying & Foundations",
        subtitle: "Unit II: Measurement & Support",
        weightage: "~15 Marks",
        desc: "Objectives of surveying, levelling instruments, contour mapping, types of foundations, bearing capacity.",
        introTitle: "Surveying and Ground Support",
        introBody: "Surveying determines relative positions of points. Foundations transfer building loads safely to the ground.",
        coreHighlight: "The Core Crux of R23: Calculation of reduced levels (Simple levelling problems) and types of foundations.",
        concept1: { title: "Levelling", detail: "Finding the elevation of points relative to a datum using instruments like a Dumpy level." },
        concept2: { title: "Bearing Capacity", detail: "The maximum load per unit area that the soil can support without failing." },
        formula1: { title: "Height of Instrument", eq: "HI = Reduced Level (RL) + Backsight (BS)" },
        formula2: { title: "New RL", eq: "RL = HI - Foresight (FS)" },
        pyq1: { title: "Levelling Problem", marks: "10 Marks", body: "Solve the simple levelling problem given the following consecutive readings." },
        pyq2: { title: "Foundations", marks: "5 Marks", body: "What are the requirements of a good foundation? List the types of shallow foundations." }
      },
      {
        id: "unit-3",
        title: "Transportation, Water & Environment",
        subtitle: "Unit III: Civil Infrastructure",
        weightage: "~15-20 Marks",
        desc: "Highway pavements, water quality specifications, rainwater harvesting, dams and reservoirs.",
        introTitle: "Macro Civil Systems",
        introBody: "Designing transportation networks and managing water resources for environmental sustainability.",
        coreHighlight: "The Core Crux of R23: Differences between flexible and rigid pavements, and methods of rainwater harvesting.",
        concept1: { title: "Pavements", detail: "Flexible (Bitumen, yields to loads) vs Rigid (Concrete, slab acts as a bridge)." },
        concept2: { title: "Rainwater Harvesting", detail: "Collecting and storing rainwater for future use, improving groundwater recharge." },
        formula1: { title: "Flexible Pavement", eq: "Load transferred grain to grain" },
        formula2: { title: "Rigid Pavement", eq: "Load transferred via slab action" },
        pyq1: { title: "Pavements", marks: "10 Marks", body: "Distinguish between flexible and rigid pavements with neat cross-sectional sketches." },
        pyq2: { title: "Water Resources", marks: "10 Marks", body: "Explain the importance of rainwater harvesting and describe any two methods." }
      },
      {
        id: "unit-4",
        title: "Basics of Mechanical & Thermal Engineering",
        subtitle: "Unit IV: Manufacturing & Heat",
        weightage: "~20 Marks",
        desc: "Engineering materials, casting, forming, machining, boilers, IC engines (SI/CI, 2-stroke/4-stroke).",
        introTitle: "Mechanical Systems & Heat",
        introBody: "Understanding how materials are manufactured into components and the principles of internal combustion engines.",
        coreHighlight: "The Core Crux of R23: Working of 4-stroke SI/CI engines and the differences between them.",
        concept1: { title: "Manufacturing Processes", detail: "Casting (molten metal), Forming (deformation), Machining (material removal)." },
        concept2: { title: "IC Engines", detail: "Spark Ignition (SI) uses petrol and a spark plug; Compression Ignition (CI) uses diesel and high compression." },
        formula1: { title: "Thermal Efficiency", eq: "η = Work Done / Heat Input" },
        formula2: { title: "Cycles", eq: "Otto (Const. Vol), Diesel (Const. Pressure)" },
        pyq1: { title: "4-Stroke Engine", marks: "10 Marks", body: "Explain the working principle of a 4-stroke Spark Ignition (SI) engine with a neat sketch." },
        pyq2: { title: "Manufacturing", marks: "10 Marks", body: "Briefly explain the principles of casting and welding processes." }
      },
      {
        id: "unit-5",
        title: "Power Plants, Transmission & Robotics",
        subtitle: "Unit V: Power & Automation",
        weightage: "~15 Marks",
        desc: "Steam/Hydro/Nuclear power plants. Belt, chain, gear drives. Introduction to robotics (joints, links, applications).",
        introTitle: "Power Generation & Motion",
        introBody: "Generating electricity via power plants, transmitting power through mechanical drives, and automating tasks via robots.",
        coreHighlight: "The Core Crux of R23: Working of Steam and Hydro electric power plants and comparisons of mechanical drives.",
        concept1: { title: "Power Plants", detail: "Steam (coal boils water), Hydro (water turns turbine), Nuclear (fission heat)." },
        concept2: { title: "Robotics", detail: "Mechanical systems structured with links and joints to perform programmed tasks." },
        formula1: { title: "Velocity Ratio (Belt)", eq: "N2/N1 = D1/D2" },
        formula2: { title: "Power Capacity", eq: "Gears > Chain > Belt" },
        pyq1: { title: "Power Plants", marks: "10 Marks", body: "Explain the working of a Hydro-electric power plant with a block diagram." },
        pyq2: { title: "Power Transmission", marks: "5 Marks", body: "Compare belt drives, chain drives, and gear drives in mechanical power transmission." }
      }
    ]
  },
  "C Programming": {
    topicDesc: "Complete mapping of JNTUK C Programming R23. From control structures and loops to files and pointers.",
    units: [
      {
        id: "unit-1",
        title: "C Fundamentals",
        subtitle: "Unit I: Basics",
        weightage: "~15 Marks",
        desc: "Structure of C, data types, operators, input/output.",
        introTitle: "Foundations of C",
        introBody: "Understanding C programming basics, structure, and standard libraries. Master variables, operators, and the flow of a simple program.",
        coreHighlight: "The Core Crux of R23: Writing standard C programs and understanding operator precedence.",
        concept1: { title: "Data Types", detail: "Fundamental types: int, float, char, double, void. Modifiers: signed, unsigned, short, long." },
        concept2: { title: "Operators", detail: "Arithmetic (+,-,*,/), Logical (&&,||,!), Relational (<,>,==), Bitwise (&,|,^,~) operators." },
        formula1: { title: "C Structure", eq: "#include <stdio.h> \nint main() { ... return 0; }" },
        formula2: { title: "Basic I/O", eq: "scanf(\"%d\", &var); \nprintf(\"%d\", var);" },
        pyq1: { title: "Structure of C", marks: "10 Marks", body: "Describe the structure of a C program with an example." },
        pyq2: { title: "Operators", marks: "5 Marks", body: "Classify and explain different operators in C." },
        revisionPoints: ["Use #include for preprocessor", "main() is mandatory", "scanf uses & operator for variables"],
        memoryTricks: "A-L-R-B: Arithmetic, Logical, Relational, Bitwise",
        examStrategy: "Write at least one full example program for the basic structure question."
      },
      {
        id: "unit-2",
        title: "Control Structures & Loops",
        subtitle: "Unit II: Logic Flow",
        weightage: "~15-20 Marks",
        desc: "Decision making (if, if-else, switch), loops (for, while, do-while).",
        introTitle: "Control Flow in C",
        introBody: "Mastering conditional branching (if, if-else, switch) and repetitive execution logic (for, while, do-while).",
        coreHighlight: "The Core Crux of R23: Nested loops and switch-case branching mechanisms are almost always tested.",
        
        // --- NEW FIELDS ---
        definitions: [
            { term: "Decision Making", desc: "Constructs to alter flow: if, if-else, switch, nested if." },
            { term: "Loops", desc: "For (definite), while (pre-test), do-while (post-test)." },
            { term: "Break/Continue", desc: "Control keywords to terminate or skip loop iterations." }
        ],
        formulas: [
            { title: "For Loop", eq: "for(init; cond; inc) { statement; }" },
            { title: "Switch Case", eq: "switch(exp) { case val1: break; default:; }" },
            { title: "While Loop", eq: "while(cond) { statement; }" }
        ],
        numericalSolved: [
            { title: "Nested Loop Complexity", solution: "Analyzing time complexity of nested loops O(n^2) for pattern generation." },
            { title: "Switch-Case Logic", solution: "Ensure break; is used to prevent fall-through scenarios." }
        ],
        revisionPoints: ["do-while executes at least once", "break exits loop completely", "continue skips to next iteration", "switch constant expressions only (int/char)"],
        memoryTricks: "S-D-A: Switch, Decision, Assignment (Flow control basics). Break breaks the loop, Continue continues the loop.",
        examStrategy: "Ensure the loop termination condition is correct to avoid infinite loops. Always use {} for block statements to avoid dangling else problems.",
        concept1: { title: "Decision Making", detail: "If, if-else-if ladder, nested if, switch statement." },
        concept2: { title: "Iteration", detail: "For loop (definite), while loop (indefinite), do-while loop (post-test)." },
        formula1: { title: "Loop Structure", eq: "for(init; cond; inc) { ... }" },
        formula2: { title: "Switch Case", eq: "switch(expression) { case val: ... break; default: ... }" },
        pyq1: { title: "Nested Loops", marks: "10 Marks", body: "Write a program to print a pyramid pattern using nested loops." },
        pyq2: { title: "Switch-Case", marks: "5 Marks", body: "Explain the switch statement with a program." }
      },
      {
        id: "unit-3",
        title: "Functions, Arrays & Strings",
        subtitle: "Unit III: Modularity & Collections",
        weightage: "~15 Marks",
        desc: "Functions, arrays, string manipulation.",
        introTitle: "Modular Programming",
        introBody: "Breaking programs into reusable functions and managing collections via arrays and strings.",
        coreHighlight: "The Core Crux of R23: Handling 2D arrays (matrices) and string library functions (strcpy, strlen).",
        definitions: [
            { term: "Function", desc: "Block of code performing a specific task, reusable." },
            { term: "Array", desc: "Contiguous memory for same-type elements." }
        ],
        formulas: [
            { title: "Function call", eq: "int sum(int a, int b);" },
            { title: "2D Array", eq: "int arr[3][3];" }
        ],
        concept1: { title: "Functions", detail: "Prototypes, definitions, calls. Passing parameters (by value, by reference)." },
        concept2: { title: "Arrays & Strings", detail: "1D/2D arrays, string functions: strlen, strcpy, strcmp, strcat." },
        formula1: { title: "Function call", eq: "int sum(int a, int b);" },
        formula2: { title: "2D Array", eq: "int arr[3][3];" },
        pyq1: { title: "Matrix Multiplication", marks: "10 Marks", body: "Write a C program to perform matrix multiplication using 2D arrays." },
        pyq2: { title: "String Manipulation", marks: "10 Marks", body: "Explain string manipulation functions and provide examples." },
        revisionPoints: ["Arrays are zero-indexed", "Strings are character arrays ending with '\\0'", "Call by value vs reference (pointers)"],
        memoryTricks: "2D = Row x Column",
        examStrategy: "Practice writing the logic for matrix multiplication on paper first."
      },
      {
        id: "unit-4",
        title: "Pointers & Structures",
        subtitle: "Unit IV: Memory & Definitions",
        weightage: "~20 Marks",
        desc: "Pointers, structs, unions.",
        introTitle: "Memory & Data Definitions",
        introBody: "Direct memory management via pointers and defining custom data types via structs.",
        coreHighlight: "The Core Crux of Pointers: Pointer arithmetic, arrays of pointers, and pointer-to-structure.",
        definitions: [
            { term: "Pointer", desc: "Variable storing a memory address." },
            { term: "Structure", desc: "Grouping of heterogeneous data." }
        ],
        formulas: [
            { title: "Pointer Arithmetic", eq: "ptr++;" },
            { title: "Struct Access", eq: "struct_var.member;" }
        ],
        concept1: { title: "Pointers", detail: "Variables storing memory addresses. Pointers to functions, pointers to arrays." },
        concept2: { title: "Structures", detail: "User-defined data type grouping heterogeneous data together." },
        formula1: { title: "Pointer Arithmetic", eq: "ptr++; // moves to next element" },
        formula2: { title: "Struct Access", eq: "struct_var.member_name;" },
        pyq1: { title: "Pointers & Arrays", marks: "10 Marks", body: "Explain the relationship between pointers and arrays." },
        pyq2: { title: "Nested Structures", marks: "10 Marks", body: "Write a program to demonstrate nested structures." },
        revisionPoints: ["*ptr for dereferencing", "&var for address", "struct size is sum of members, union size is largest member"],
        memoryTricks: "Pointers *Point* to addresses",
        examStrategy: "Remember the difference between . and -> operator for structures."
      },
      {
        id: "unit-5",
        title: "Files & Preprocessor",
        subtitle: "Unit V: Secondary Storage & Macros",
        weightage: "~15 Marks",
        desc: "Files, preprocessor directives.",
        introTitle: "I/O & Directives",
        introBody: "File handling for persistence and preprocessor directives for conditional compilation.",
        coreHighlight: "The Core Crux: File modes (r, w, a, r+, w+) and parametric macros.",
        definitions: [
            { term: "File Handling", desc: "Functions to read/write persistent data." },
            { term: "Preprocessor", desc: "Directives run before compilation." }
        ],
        formulas: [
            { title: "File Open", eq: "FILE *fp = fopen(\"name\", \"mode\");" },
            { title: "Macro", eq: "#define AREA(r) (3.14*r*r)" }
        ],
        concept1: { title: "Files", detail: "fopen, fclose, fprintf, fscanf, fseek, ftell." },
        concept2: { title: "Preprocessor", detail: "#include, #define, #if-#else-#endif, #ifdef." },
        formula1: { title: "File Open", eq: "FILE *fp = fopen(\"name\", \"mode\");" },
        formula2: { title: "Parametric Macro", eq: "#define AREA(r) (3.14*r*r)" },
        pyq1: { title: "File Copying", marks: "10 Marks", body: "Write a program to copy the contents of one file to another." },
        pyq2: { title: "Preprocessors", marks: "10 Marks", body: "Explain various preprocessor directives with examples." },
        revisionPoints: ["Always fclose()", "Modes: r (read only), w (write-overwrite), a (append)", "Macros are text substitution"],
        memoryTricks: "# for preprocessor directives",
        examStrategy: "Focus on understanding the difference between file modes."
      }
    ]
  },
  "Basic Electrical Engineering": {
    topicDesc: "Ultimate JNTUK R23 BEEE study guide. Complete coverage of DC/AC circuits, electrical machines, energy resources, core electronics, and digital circuits.",
    units: [
      {
        id: "unit-1",
        title: "DC & AC Circuits",
        subtitle: "Unit I: Circuits Base",
        weightage: "~20 Marks",
        desc: "RLC elements, Ohm's law, Kirchhoff's Laws (KCL/KVL), Superposition theorem, AC waveforms, RMS & Average values, Phase diagrams, and power systems.",
        introTitle: "Foundations of Electrical Networks",
        introBody: "Understanding electrical networks is built on Ohm's law and Kirchhoff's laws. For alternating quantities, we master phase values, reactive power elements, and complex impedance systems.",
        coreHighlight: "The Core Crux of R23: KCL/KVL loop equations, Superposition derivation, and RMS/Average value derivations for sine waves are highly repetitive.",
        concept1: { title: "Kirchhoff's Laws", detail: "KCL states total current entering a node equals current leaving (conservation of charge). KVL states algebraic sum of voltages in any closed loop is zero." },
        concept2: { title: "AC Quantities", detail: "RMS (Root Mean Square) represents equivalent heating power of AC. Impedance (Z) combines real resistance (R) and imaginary reactance (X)." },
        formula1: { title: "Ohm's & Kirchhoff's", eq: "V = I * R ; Σ I_in = Σ I_out ; Σ V_loop = 0" },
        formula2: { title: "RMS & Form Factor", eq: "I_rms = I_max / √2 = 0.707 * I_max ; FF = RMS / Average = 1.11" },
        pyq1: { title: "Superposition Theorem", marks: "10 Marks", body: "State and explain Superposition Theorem with a neat circuit analysis example." },
        pyq2: { title: "RMS & Average Derivation", marks: "10 Marks", body: "Derive the expressions for RMS value, Average value, and Form Factor of a sinusoidal alternating wave." },
        revisionPoints: ["KCL is based on conservation of charge", "KVL is based on conservation of energy", "Form factor for sine wave is 1.11, peak factor is 1.414"],
        memoryTricks: "KCL-Charge, KVL-Energy. Form Factor (FF) = 1.11",
        examStrategy: "Always define the circuit diagrams clearly before applying nodal or mesh equations. Highlight final equations in rectangular boxes.",
        definitions: [
          { term: "Kirchhoff's Current Law (KCL)", desc: "The sum of currents entering a junction equals the sum of currents leaving the junction." },
          { term: "Kirchhoff's Voltage Law (KVL)", desc: "The algebraic sum of voltage drops and EMFs around any closed loop is zero." },
          { term: "Power Factor", desc: "The ratio of active power (W) to apparent power (VA). Equal to cos φ = R/Z." }
        ]
      },
      {
        id: "unit-2",
        title: "Machines & Measuring Instruments",
        subtitle: "Unit II: Electromechanics",
        weightage: "~20 Marks",
        desc: "DC Motor and Generator principles, Single Phase Transformers, Three Phase Induction Motors, Alternators, and moving coil/moving iron measuring instruments.",
        introTitle: "Dynamic Electromechanical Systems",
        introBody: "Master how energy is co-converted magnetically. This unit covers operational theory of DC motors, AC transformers, 3-Phase induction, and instruments like PMMC and MI coils.",
        coreHighlight: "The Core Crux of R23: Transformer EMF equation derivation and the comparison of Moving Coil (PMMC) vs Moving Iron (MI) instruments.",
        concept1: { title: "Transformer Operation", detail: "A static device that transfers electrical energy between circuits through electromagnetic induction, maintaining frequency." },
        concept2: { title: "DC Machine EMF", detail: "Generators use Faraday's law of induction where rotating coils generate voltage. Motors utilize Lorentz force where current in magnetic field creates mechanical torque." },
        formula1: { title: "EMF Equation of Transformer", eq: "E = 4.44 * f * N * Φ_max" },
        formula2: { title: "DC Machine Back EMF", eq: "E_b = (Φ * Z * N * P) / (60 * A)" },
        pyq1: { title: "Transformer EMF Derivation", marks: "10 Marks", body: "Derive the EMF equation of a single-phase transformer with standard nomenclature." },
        pyq2: { title: "Measuring Instruments Comparison", marks: "10 Marks", body: "Compare the construction, scale features, and working principles of Moving Coil (PMMC) and Moving Iron (MI) instruments." },
        revisionPoints: ["Transformers operate on mutual induction and cannot run on pure DC", "PMMC instruments have uniform scale and measure average/DC only", "MI instruments have cramped non-uniform scale and measure both AC/DC"],
        memoryTricks: "PMMC = DC only & Uniform scale. MI = AC + DC & cramped scale.",
        examStrategy: "Draw distinct separate columns when comparing PMMC and Moving Iron. Ensure transformer flux waveform is included in the EMF derivation.",
        definitions: [
          { term: "PMMC", desc: "Permanent Magnet Moving Coil meter. Deflection is directly proportional to average current. High accuracy but DC only." },
          { term: "Mutual Induction", desc: "Production of electromotive force in one circuit by change in current of adjacent electromagnetically linked circuit." }
        ]
      },
      {
        id: "unit-3",
        title: "Energy Resources & Safety",
        subtitle: "Unit III: Generation & Protection",
        weightage: "~15 Marks",
        desc: "Power plant schemas (Hydel, Nuclear, Solar, Wind), domestic electricity bill calculation parameters, safety fuses, and shock prevention systems.",
        introTitle: "Energy Auditing & Electrical Safety",
        introBody: "Understand global power generation schemas and learn how engineering safety measures are applied. Learn fuse ratings, circuit breakers (MCBs), grounding, and two-part tariffs.",
        coreHighlight: "The Core Crux of R23: Nuclear/Hydel plant block layout diagrams and numerical electricity bill estimations are highly tested.",
        concept1: { title: "Power Plant Energy Costs", detail: "Traditional thermal/nuclear power generates high base loads. Renewables like wind/solar use PV arrays and wind currents to feed grids green power." },
        concept2: { title: "Safety Protections", detail: "Grounding diverts dangerous leakage current to earth. MCBs (Miniature Circuit Breakers) automatically trip when load threshold exceeds safe rating limit." },
        formula1: { title: "Electricity Unit Cost", eq: "Units (kWh) = [Power (Watts) * Time (hours)] / 1000" },
        formula2: { title: "Total Monthly Bill", eq: "Total = Fixed Demand Charge + (Units consumed * Energy Unit Tariff)" },
        pyq1: { title: "Electricity Bill Estimation", marks: "10 Marks", body: "An industry runs five 2kW heaters for 6 hours/day, twenty 100W lamps for 10 hours/day. Estimate monthly bill at ₹8 per unit." },
        pyq2: { title: "Nuclear Power Plant", marks: "10 Marks", body: "Draw a neat block schematic diagram of a Nuclear Power Plant and explain the function of each subsystem." },
        revisionPoints: ["1 unit of electricity equals 1 kWh (kilowatt-hour)", "Moderator in nuclear plants slows down fast neutrons (e.g., Heavy Water)", "Fuses are sacrificial safety elements with low melting point"],
        memoryTricks: "1 Unit = 1 kWh = Power in kW * Hours. Trip MCB = Safe house.",
        examStrategy: "Draw clean flowcharts for power plants. For bills, show step-by-step product multiplications clearly.",
        definitions: [
          { term: "Circuit Breaker (MCB)", desc: "Miniature Circuit Breaker. Automatic thermal-magnetic switch that opens the circuit under excess overcurrent." },
          { term: "Two-Part Tariff", desc: "Tariff system consisting of a fixed customer demand charge and a variable consumption charge." }
        ]
      },
      {
        id: "unit-4",
        title: "Semiconductor Devices",
        subtitle: "Unit IV: Solid State Electronics",
        weightage: "~20 Marks",
        desc: "PN junction diodes, Zener effects, Bipolar Junction Transistor (BJT) operations, configurations (CB, CE, CC), and amplifier profiles.",
        introTitle: "Introduction to Microelectronics",
        introBody: "Diodes conduct in only one forward-biased direction. Transistors (BJTs) act as current controllers to enable massive amplification and switching.",
        coreHighlight: "The Core Crux of R23: V-I diode characteristics, Zener reverse regulator, and CE configuration parameters dominate exam sets.",
        concept1: { title: "PN Junction Diode", detail: "Formed by joining p-type and n-type silicon. Current flows easily during forward bias, blocked in reverse bias until breakdown." },
        concept2: { title: "Transistor Amplification", detail: "A BJT controls a larger collector current via a weak base current stream. CE (Common Emitter) configuration offers both voltage and current gain." },
        formula1: { title: "Diode Equation", eq: "I = I_0 * [e^(V / (η * V_T)) - 1]" },
        formula2: { title: "CE Current Gains", eq: "β = α / (1 - α) ; I_C = β * I_B + I_CEO" },
        pyq1: { title: "CE Amplifier Operating Profile", marks: "10 Marks", body: "Explain the block outline and working of a Common Emitter (CE) BJT amplifier with detailed input-output wave forms." },
        pyq2: { title: "Zener Diode Voltage Regulator", marks: "10 Marks", body: "Explain with a neat circuit schematic how a Zener diode functions as a voltage regulator under variable load and line voltages." },
        revisionPoints: ["Zener diodes operate in reverse breakdown region to regulate voltage", "Common Emitter (CE) amplifier provides 180° phase shift in output voltage", "Alpha (α) is always less than 1, Beta (β) is typically between 50 to 300"],
        memoryTricks: "Zener = Reverse Breakdown. CE phase shift = 180 degrees.",
        examStrategy: "Include complete forward and reverse bias characteristic plots for PN diode and Zener regulator. Label knee voltage of ~0.7V for Silicon.",
        definitions: [
          { term: "Zener Effect", desc: "Electric-field-induced quantum mechanical tunneling under high reverse bias, maintaining near-constant breakdown voltage." },
          { term: "Transistor CE Mode", desc: "Common Emitter configuration where emitter is shared. High gain output, used mostly for amplification." }
        ]
      },
      {
        id: "unit-5",
        title: "Circuits & Digital Electronics",
        subtitle: "Unit V: Digital Systems",
        weightage: "~15 Marks",
        desc: "Full wave bridge rectifiers, LC filters, Number systems, Logic Gates, Boolean Algebra, Binary Adders, and Flip-Flops.",
        introTitle: "Digital Logics & Voltage Rectification",
        introBody: "Master how alternating power is rectified into clean DC using diode bridges, then delve into binary computer mathematics: boolean expressions, universal gates, and structural flip-flops.",
        coreHighlight: "The Core Crux of R23: Full wave bridge rectifier derivation, universal logic gate operations (NAND/NOR), and Flip-Flops.",
        concept1: { title: "Rectification & Filters", detail: "Rectifiers convert AC to pulsating DC. Full wave utilizes four diodes. Capacitors smooth waves by absorbing peak ripple voltage." },
        concept2: { title: "Boolean & Logic Gates", detail: "NAND and NOR gates are universal gates because any combinational or sequential circuits can be built using them." },
        formula1: { title: "Full Wave Rectifier Specs", eq: "η_max = 81.2% ; V_dc = 2 * V_m / π ; Ripple Factor = 0.48" },
        formula2: { title: "DeMorgan's Theorems", eq: "(A + B)' = A' * B' ; (A * B)' = A' + B'" },
        pyq1: { title: "Full Wave Rectifier Analysis", marks: "10 Marks", body: "Derive the efficiency, ripple factor, and transformer utilization factor (TUF) of a Full-Wave Bridge Rectifier." },
        pyq2: { title: "Universal Logic Gates Realization", marks: "10 Marks", body: "Prove why NAND and NOR are called universal gates. Realize AND, OR, and NOT gates using only NAND gates." },
        revisionPoints: ["Bridge rectifier reverse peak voltage (PIV) is Vm", "NAND & NOR are universal gates", "SR Flip flop has invalid state when S=1, R=1"],
        memoryTricks: "FWR Efficiency = 81.2%, Ripple = 0.48. NAND + NOR are Universal.",
        examStrategy: "Draw distinct diode conduction paths during positive and negative AC input half-cycles inside your Bridge Rectifier answer.",
        definitions: [
          { term: "Universal Gate", desc: "A logic gate which can implement any boolean function without needing any other gate types (NAND and NOR)." },
          { term: "Ripple Factor", desc: "Measure of unwanted AC fluctuating components sitting on the output of rectified DC power." }
        ]
      }
    ]
  },
  "Engineering Graphics": {
    topicDesc: "Advanced AutoCAD aligned JNTUK R23 Engineering Drawing preparation system. Master conics, orthographic lines, sections of solids, isometric views, and CAD commands.",
    units: [
      {
        id: "unit-1",
        title: "Geometrical Constructions, Curves & Scales",
        subtitle: "Unit I: Drafting Foundations",
        weightage: "~15 Marks",
        desc: "Dimensioning systems, BIS SP-46 standards, conic sections (ellipse, parabola, hyperbola), cycloidal curves, and constructable scales (Plain, Diagonal).",
        introTitle: "Principles of Curves & Metric Scaling",
        introBody: "Learn to trace mechanical geometry using precise pencil weights (HB, 2H), mathematically construct conics, and build plain and diagonal scales with Representative Fractions (RF).",
        coreHighlight: "The Core Crux of R23: Isometric/general method for conics (e.g., Ellipse construction), cycloids, and diagonal scale calculations.",
        concept1: { title: "Conic Sections", detail: "Mathematical locus of points. Governed by eccentricity equation e = distance to focus / distance to directrix. e < 1 Ellipse, e = 1 Parabola, e > 1 Hyperbola." },
        concept2: { title: "Engineering Scales", detail: "Scales convert large dimensions to drawing paper. Plain scale shows 2 units. Diagonal scale uses similarity of triangles to measure three consecutive units (e.g., m, dm, cm) accurately." },
        formula1: { title: "Eccentricity Model", eq: "e = PF / PD" },
        formula2: { title: "Length of Scale equation", eq: "LOS = Representative Fraction (R.F) * Maximum length to read" },
        pyq1: { title: "General Method Ellipse Construction", marks: "10 Marks", body: "Draw an Ellipse when the distance of its focus from the directrix is 50mm and eccentricity is 2/3. Construct a normal and tangent." },
        pyq2: { title: "Diagonal Scale Construction", marks: "10 Marks", body: "Construct a diagonal scale of R.F = 1/4000 to show meters, decimeters, and centimeters. Mark a distance of 356 meters on the scale." },
        revisionPoints: ["Conic: Ellipse e < 1, Parabola e = 1, Hyperbola e > 1", "HB pencil for outlines, 2H pencil for light projection grids", "Diagonal scales read up to 1/100th of principal unit, representing 3 dimensions"],
        memoryTricks: "LOS = R.F * Max Length. e < 1 Ellipse. Diagonal = 3 dimensions, Plain = 2.",
        examStrategy: "Use extremely sharp pencil tips. Retain construction links (2H) to score higher for drawing accuracy and neatness.",
        definitions: [
          { term: "Representative Fraction (R.F)", desc: "Ratio of drawing dimension length of an element to its actual physical length." },
          { term: "Eccentricity (e)", desc: "Mathematical parameter that defines the slant conic profile geometry relative to its focus-directrix locus." }
        ]
      },
      {
        id: "unit-2",
        title: "Orthographic Projections (Points, Lines, Planes)",
        subtitle: "Unit II: Multi-View Projections",
        weightage: "~20 Marks",
        desc: "Orthographic quadrants, first angle projection rules, projection of points, straight lines inclined to both HP & VP, locus trace lines, and projections of regular planes.",
        introTitle: "Multiview Projective Geometry",
        introBody: "Understand the core principles of first-angle projection. Master how points and inclined lines translate on horizontal (HP) and vertical (VP) reference quadrants.",
        coreHighlight: "The Core Crux of R23: Straight line inclined to both planes is highly tested. Trace apparent lengths using locus rotation methods.",
        concept1: { title: "First-Angle Projection", detail: "In JNTUK, object is placed in quadrant 1: above HP and in-front of VP. Apparent top views land below the horizontal reference line XY, front views land above." },
        concept2: { title: "Locus Method for Lines", detail: "Inclined lines appear foreshortened. By rotating the true length of a line to reference planes, we project apparent lengths onto their respective locus grids." },
        formula1: { title: "True Length vs Apparent", eq: "Apparent Front length = True Length * cos θ" },
        formula2: { title: "XY Reference line splits", eq: "Front views (a') sit above XY ; Top views (a) sit below XY" },
        pyq1: { title: "Inclined Line Projection", marks: "14 Marks", body: "Line AB, 75mm long, has end A 15mm above HP, 20mm in front of VP. The line is inclined at 30° to HP and 45° to VP. Draw projections and find apparent inclinations." },
        pyq2: { title: "Inclined Regular Plane", marks: "10 Marks", body: "Draw projections of a regular hexagonal plane of 30mm side, having its surface inclined at 45° to HP and one edge resting on HP inclined 30° to VP." },
        revisionPoints: ["In First-Angle, Front View (fv) is above XY, Top View (tv) is below", "True length (TL) rotation gives the apparent front/top views on their local loci", " Locus lines of endpoints are always horizontal reference bands"],
        memoryTricks: "a' is Front View. a is Top View. fv ABOVE, tv BELOW.",
        examStrategy: "Confirm notations: front view ends with prime (a', b'), top view has no prime (a, b). Draw horizontal locus lines light and parallel.",
        definitions: [
          { term: "Orthographic Projection", desc: "A method of drawing where points of an object are projected perpendicular to projection planes." },
          { term: "Locus of End Point", desc: "The locus representing the path of the endpoint of an inclined line as it rotates through reference planes." }
        ]
      },
      {
        id: "unit-3",
        title: "Projections of Solids & Section of Solids",
        subtitle: "Unit III: 3D Solids drafting",
        weightage: "~20 Marks",
        desc: "Projections of solids (prisms, pyramids, cylinders, cones) resting on HP/VP inclined to one or both axes, and section planes cutting solids to reveal internal profiles.",
        introTitle: "Slicing & Projecting 3D Solids",
        introBody: "Master multi-stage solid drawing projections (prisms, pyramids, cylinders, cones) and define auxiliary cutting planes that carve through solids at slant paths.",
        coreHighlight: "The Core Crux of R23: Two-stage projection of tilted solids (e.g., axis inclined to HP, resting edge to VP) and tracing true shape of sectional slices.",
        concept1: { title: "Solid Classifications", detail: "Prisms and cylinders have uniform parallel bases. Pyramids and cones rise from a base cross-section to meet at a single top vertex called an Apex." },
        concept2: { title: "Section Cut Geometry", detail: "Cutting plane slicing solid at angle creates sectional views. True shape of section displays the real face of slice, drawn parallel on auxiliary planes." },
        formula1: { title: "Prism/Cylinder projections", eq: "Identical top & bottom polygonal/circular bases" },
        formula2: { title: "Section Cutting angles", eq: "Section plane perpendicular to first, slanted to second" },
        pyq1: { title: "Tilted Pyramid Projection", marks: "14 Marks", body: "A square pyramid, base side 30mm, axis 60mm long, rests on one of its base corners on HP with axis inclined 45° to HP, and 30° to VP." },
        pyq2: { title: "Sectional Cylinder View", marks: "14 Marks", body: "A cylinder of 50mm diameter and 70mm axis rests vertically on HP. It is cut by a section plane inclined 45° to HP and passing through a point 20mm below top face. Draw sectional views." },
        revisionPoints: ["Axis perpendicular to HP gives true shape of the base in Top View (tv)", "Apparent section profiles are projected perpendicular to the cut trace lines", "True Shape is drawn on auxiliary XY band parallel to cutting plane tracing line"],
        memoryTricks: "Prism = parallel column. Pyramid = rises to single point (Apex).",
        examStrategy: "Always complete the initial simple stage (solid vertically aligned) to lay the scaffolding before tilting the solid to inclined coordinates.",
        definitions: [
          { term: "Auxiliary Plane", desc: "An extra reference plane inclined to principal planes where auxiliary orthographic projections are captured." },
          { term: "True Shape of Section", desc: "The actual cross-sectional flat shape obtained when sliced solid is viewed perpendicular to cutting plane." }
        ]
      },
      {
        id: "unit-4",
        title: "Isometric Projections",
        subtitle: "Unit IV: Isometric 3D Space",
        weightage: "~15 Marks",
        desc: "Isometric scale construction, isometric views vs isometric projections, isometric blueprints of planes, prisms, pyramids, and cylinders.",
        introTitle: "Principles of Isometric Drafting",
        introBody: "Isometric drawing creates single-view 3D diagrams using 3 equal axis vectors separated by 120 degrees. Learn isometric scale calculations and trace ellipses.",
        coreHighlight: "The Core Crux of R23: Construction of isometric projections of cylinders using the Four-Center method, and composite solids.",
        concept1: { title: "Isometric Scale & View", detail: "Isometric scale reduces lines to ~0.815 of true lengths. Isometric view uses true lengths (1.0 scale). Both draw horizontal vectors at slanted 30-degree inclinations." },
        concept2: { title: "Four-Center Circle Method", detail: "Circles map as ellipses in isometric views. We construct regular rhombuses and project arcs from four intersecting center coordinates to form beautiful tangent ellipses." },
        formula1: { title: "Isometric Scale Ratio", eq: "Isometric Length = True Length * cos 45° / cos 30° ≈ 0.815 * True Length" },
        formula2: { title: "Isometric Axis orientation", eq: "30°, 90°, 150° reference slant relative to baseline" },
        pyq1: { title: "Four-Center Circle Projection", marks: "10 Marks", body: "Construct an Isometric Projection of a circular plane of 50mm diameter using the four-center method." },
        pyq2: { title: "Composite Solid view", marks: "14 Marks", body: "Draw the isometric view of a cylinder of base diameter 40mm and axis 50mm, resting centrally on top of a square prism block of side 60mm and height 20mm." },
        revisionPoints: ["Isometric Projection uses isometric scale (0.815), Isometric View is drawn using actual true dimensions (1.0)", "Horizontal circle becomes isometric ellipse on the 30° inclination plane", "All vertical edges remain strictly vertical (90 degrees)"],
        memoryTricks: "Isometric View = 100% dimensions. Isometric Projection = 81.5% scale length.",
        examStrategy: "Always start from a base box (bounding box technique) in isometric views. Draw isometric coordinates of base vertices before carving fine detail.",
        definitions: [
          { term: "Isometric Axes", desc: "The three coordinate lines representing length, width, and height inclined at 120° to each other." },
          { term: "Bounding Box Technique", desc: "Drafting a light 3D box containing full width/depth/height bounds, then pruning inner polygons." }
        ]
      },
      {
        id: "unit-5",
        title: "Computer-Aided Drafting (CAD)",
        subtitle: "Unit V: AutoCAD Command Engine",
        weightage: "~15 Marks",
        desc: "Introduction to CAD software, UI setup, coordinate systems (relative, polar), basic 2D drawing command scripts (LINE, CIRCLE, ARC), and modifying commands (TRIM, FILLET, ARRAY).",
        introTitle: "Digital AutoCAD Drafting Protocols",
        introBody: "Transition raw hand drafting onto digital CAD platforms. Detail command scripts, polar coordinate entry grids, layers setups, and modifiers.",
        coreHighlight: "The Core Crux of R23: Command strings, absolute vs relative polar coordinates entry syntax, and modifying commands are standard questions.",
        concept1: { title: "CAD Coordinate Entry", detail: "Absolute: x,y relative to 0,0. Relative: @dx,dy relative to last coordinate. Polar: @length<angle relative to last coordinate." },
        concept2: { title: "Drawing & Modifying Commands", detail: "Modify block commands perform geometry changes. TRIM prunes overlapping edges; FILLET rounds corners with custom radius; ARRAY duplicates patterns dynamically." },
        formula1: { title: "Relative Polar Entry", eq: "@length < inclination_angle" },
        formula2: { title: "Command Entry shortcuts", eq: "L for LINE ; C for CIRCLE ; TR for TRIM ; AR for ARRAY" },
        pyq1: { title: "AutoCAD Commands List", marks: "10 Marks", body: "Describe the function, command shortcut, and operational prompts of any five modify tools in AutoCAD." },
        pyq2: { title: "Relative Polar Scripting", marks: "10 Marks", body: "Write the sequence of AutoCAD coordinate command entries required to draw a regular hexagon of 40mm side using Polar Coordinate coordinates." },
        revisionPoints: ["Polar entry requires @ prefix and angle bracket (e.g., @50<60)", "TRIM command requires selecting cutting boundaries, then pressing Enter before cutting segments", "Limits and Units setups organize viewport bounds before beginning drawing sessions"],
        memoryTricks: "@Distance < Angle. TR = Trim. C = Circle. L = Line.",
        examStrategy: "In exam answers, write AutoCAD commands in uppercase. Lay out the interactive computer-prompt dialogue sequences exactly to prove practical competence.",
        definitions: [
          { term: "Polar Coordinate System", desc: "Defining points using distance from origin and angle from horizontal axis." },
          { term: "AutoCAD Layers", desc: "Organizing lines on individual overlay transparencies to govern line weights, display visibility, and printing options." }
        ]
      }
    ]
  }
};

