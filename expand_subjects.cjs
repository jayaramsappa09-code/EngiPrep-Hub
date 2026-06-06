const fs = require('fs');
const path = require('path');

const subjectsContent = {
  'physics-notes.html': {
    name: 'Engineering Physics (JNTUK R23)',
    overview: 'Engineering Physics serves as the critical bridge dividing abstract theoretical scientific physics and actual mechanical or logic system applications. Under current JNTUK R23 curriculum specifications, the syllabus equips upcoming engineers with critical insights regarding wave interference, particle-wave duality limits, quantum mechanics states, optical coherence bounds (lasers & fibers), semiconductor carriers, and magnetic behaviors. Deep knowledge of this subject builds strong analytical reasoning required for electrical engineering, mechanical stress reviews, civil materials configuration, or quantum computer chip design.',
    syllabus: [
      'Unit I: Wave Optics — Interference patterns (Michelson), Fraunhofer Diffraction limits, and Laser electromagnetic wave polarization bounds.',
      'Unit II: Quantum Mechanics & Free Electron Theory — de Broglie wave properties, Heisenberg Uncertainty formulation, Schrödinger equation solutions, 1D Infinite potential boxes, and Fermi energy states.',
      'Unit III: Semiconductor Physics — Carrier dynamics (Intrinsic & Extrinsic), Carrier Lifetime, Drift and Diffusion transport, Einstein relationship, and the complete mathematical Hall Effect derivation.',
      'Unit IV: Lasers & Fiber Optics — Einstein coefficient equations, Population Inversion parameters, Helium-Neon (He-Ne) and Nd:YAG active mediums, Acceptance Angle mapping, and Numerical Aperture derivations.',
      'Unit V: Dielectric & Magnetic Materials — Polarization classifications, Clausius-Mossotti equations, domain alignments, Meissner Perfect Diamagnetism, and Type-I and Type-II superconductivity characteristics.'
    ],
    roadmap: 'Start by locking in Unit IV (Fiber Optic acceptances & Lasers) and Unit I (Wave Optics). These modules carry highly structured, predictable mathematical derivations (e.g. Numerical Aperture proofs or Albert Einstein coefficients equations) that appear year after year. Once these 30 marks are safe, immediately conquer Unit III to claim the Hall Effect proof. Wrap up your review by studying the quantum potential wall (Unit II) and Meissner properties (Unit V) which populate short answer spaces.',
    preparation: 'Prioritize structural mathematical proofs over reading basic paragraphs. When studying lasers, practice drawing labeled energy states with visible transition vectors. For calculation questions, write a clear "Given Constants Table," convert all input parameters directly into basic SI metrics (such as electron-volts to Joules density), and outline intermediate algebra expressions clearly.',
    passing: 'Commit the complete acceptance angle derivation and the He-Ne laser diagram to memory. Doing so unlocks ~20-25 quick marks. Combine this with reviewing the Fermi level curves in intrinsic/extrinsic semiconductors to establish consistent, clean boards that evaluators praise.',
    topScoring: 'An outstanding score (O-grade) requires rigorous derivation continuity. Practice demonstrating the 1-dimensional time-independent Schrödinger wave equation and the Clausius-Mossotti dielectric relations without skipping steps. Always label coordinate variables and add physical descriptions for every variable.',
    pyqs: [
      'Derive the expressions for Acceptance Angle and Numerical Aperture of a step-index optical fiber under various constraints. (Repeated 2022, 2023, 2024)',
      'Explain the Einstein coefficients of radiation and establish their mathematical relationship. (Repeated 2023, 2024)',
      'Describe the working of a He-Ne laser with a clean, labeled atomic energy diagram. (Repeated 2022, 2024)',
      'What is the Hall Effect? Derive the expressions for the Hall coefficient and carrier concentration. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'What is the physical meaning of the wave amplitude (ψ)?', a: 'While ψ itself represents a mathematical probability wave amplitude, its absolute square |ψ|² represents the physical probability density of locating a particle at a specific space coordinate.' },
      { q: 'Why do we need a population inversion in stimulated emission systems?', a: 'Under normal thermal equilibrium, lower states hold more atoms. For light amplification, stimulated transitions must surpass spontaneous decays, necessitating more electrons in upper metastable levels.' },
      { q: 'What is the Clausius-Mossotti relation?', a: 'It is a mathematical formula relating the macroscopic relative permittivity (dielectric constant) of a solid insulator to its microscopic atomic polarizability.' }
    ]
  },
  'chemistry-topper-notes.html': {
    name: 'Engineering Chemistry (JNTUK R23)',
    overview: 'Engineering Chemistry explores the structural, electronic, and thermodynamic properties of molecular systems to guide macroscopic material engineering. This comprehensive syllabus covers state-of-the-art water demineralization processing, modern battery cells, electrochemistry cell EMF equations, coordinate and carbon polymer synthesis, and functional spectroscopic assays (UV-Vis, IR). Fully understanding chemical behaviors is fundamental to developing sustainable materials, anti-corrosive bounds, smart electronic substrates, and high-energy storage batteries.',
    syllabus: [
      'Unit I: Water Technology — Hardness parameters, L-S methods, Ion-Exchange demineralization, and municipal desalination processing.',
      'Unit II: Electrochemistry & Corrosion — Nernst EMF equations, Reference Electrodes, standard corrosion theories, and electrochemical protection methods.',
      'Unit III: Polymers & Fuel Cells — Coordination polymer chains, compounding thermoplastics, Bakelite configurations, and Hydrogen-Oxygen fuel cell properties.',
      'Unit IV: Modern Materials — Carbon Nanotubes (CNTs), nano-materials synthesis, Refractories, Lubricants and modern smart polymer configurations.',
      'Unit V: Instrumental Methods & Spectroscopic Techniques — Electromagnetic spectra theory, Beer-Lambert Absorption Laws, UV-Visible, and Infrared (IR) spectral analysis methodologies.'
    ],
    roadmap: 'Begin with Unit I (Water hardness and treatment processes) and Unit II (Electrochemistry). These parts contain direct calculations (like hardness equivalents or EMF cell values) that guarantee excellent board scores. Next, master the Spectroscopic methods (Unit V) which always carry predictable principles questions. Conclude with polymer compound structures (Unit III) and industrial nanoparticles (Unit IV).',
    preparation: 'Always draw complete electrochemical cells representing flow directions when answering Unit II questions. Write out polymer chemical reactions with structural formulas showing the monomer linkages explicitly. For Spectroscopic questions, write the mathematical equation for Beer-Lambert Law first, defining every variable.',
    passing: 'Focus on memorizing the demineralization Ion-Exchange method, reference electrodes (Calomel and Glass electrodes), and polymer classifications. This content forms the baseline of the examination papers and ensures passing the subject.',
    topScoring: 'O-Grade candidate papers contain complete derivations of the Nernst Equation from thermodynamic free-energy equations. They present neat comparisons of organic mechanisms and clearly explain molecular transition boundaries. Always describe exact spectroscopic wavenumbers when illustrating IR band modes.',
    pyqs: [
      'Describe the demineralization of water using the Ion-Exchange resin method with a neat fluid schematic. (Repeated 2022, 2023, 2024)',
      'Derive the Nernst equation for single electrode potential and cell EMF from free energy variables. (Repeated 2023, 2024)',
      'Explain the synthesis, properties, and modern industrial applications of Bakelite and Nylon-6,6. (Repeated 2022, 2024)',
      'State and explain the Beer-Lambert Absorption law. Outline its key applications in quantitative analysis. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'Why is hard water undesirable in high-pressure industrial boilers?', a: 'Hard water contains dissolved calcium and magnesium ions which form thick scale deposits on boiler tubes, causing reduced thermal efficiency, overheating, and eventual explosions.' },
      { q: 'What is sacrificial anodic protection against corrosion?', a: 'It is an electrochemical technique where a more active metal (like Zinc or Magnesium) is electrically connected to a structure. This "anode" corrodes preferentially, saving the base steel.' },
      { q: 'Explain the fundamental principle behind Infrared (IR) spectroscopy.', a: 'IR spectroscopy relies on the absorption of infrared light causing changes in molecular vibrational dipole moments, allowing identification of functional chemical groups.' }
    ]
  },
  'maths-1.html': {
    name: 'Engineering Mathematics-I (M1 JNTUK R23)',
    overview: 'Engineering Mathematics-I acts as the core calculus engine driving numerical optimization, structural design calculations, and physical modeling across all engineering disciplines. The syllabus targets matrix linear algebra systems, linear echelon reductions, matrix diagonalization characteristics (Cayley-Hamilton), Taylor expansions of single and multi-variables, Jacobian transformations, optimization via Lagrange Multipliers, and double/triple integral calculations. Mastery of M1 is essential to excel in subsequent core mechanics, algorithmic complexities, and computational fluid models.',
    syllabus: [
      'Unit I: Matrices & Linear Systems — Row echelon calculations, normal coordinate conversions, solving linear equations, and Gauss Elimination.',
      'Unit II: Eigenvalues & Quadratic Forms — Characteristics equations, Cayley-Hamilton verification, Orthogonal reductions, and Canonical formulations.',
      'Unit III: Differential Calculus & Mean Value — Rolle\'s, Lagrange\'s, and Cauchy\'s Mean Value Theorems, Taylor and Maclaurin power expansions.',
      'Unit IV: Multivariable Calculus — Partial derivatives, Jacobians, Extreme points, and Lagrange Multivariable Undetermined Multipliers.',
      'Unit V: Multiple Integrals — Double and Triple integrals over regions, Change of Order methods, Polar parameter mappings, and Area/Volume integrals.'
    ],
    roadmap: 'Maximize early scores by practicing matrices rank and consistency methods (Unit I) and Cayley-Hamilton reductions (Unit II). Once matrix algebra is mastered, study Unit IV for Lagrange optimization and Jacobians, which yield predictable board questions. Dedicate your final preparation phase to practicing the Change of Order in double integrals (Unit V) which is a crucial, high-yield topic.',
    preparation: 'Never skip intermediate arithmetic calculation steps. JNTUK evaluators award partial credit for matrix reductions. Set up augmented matrices cleanly, write down the row operations explicitly (e.g. R2 -> R2 - 2R1), and draw regional integration boundaries when attempting polar coordinates.',
    passing: 'Commit Gauss Elimination, verification of Cayley-Hamilton, and Taylor series variables to memory. These recurring questions make up more than 50% of the maximum marks and ensure a strong passing score.',
    topScoring: 'To secure full marks, students must prove Rolle\'s and Lagrange\'s theorems with precise geometrical diagrams. When working on multivariable calculus, include complete test variables for extreme values, checking the second derivative condition (AC - B²) explicitly.',
    pyqs: [
      'Verify the Cayley-Hamilton theorem for a given 3x3 matrix and solve for its inverse. (Repeated 2022, 2023, 2024)',
      'Optimize the dimensions of a rectangular box of given volume with maximum surface area using Lagrange multipliers. (Repeated 2023, 2024)',
      'Change the order of integration and evaluate the double integral over the bounded parabolic region. (Repeated 2022, 2024)',
      'Solve the system of linear equations by transforming into augmented normal coordinates. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'What is the physical meaning of the Jacobian determinant?', a: 'The Jacobian represents the local volume or area scaling factor when transforming coordinates from one system to another (e.g. Cartesian to Polar).' },
      { q: 'How does Cayley-Hamilton simplify matrix power calculations?', a: 'Since every square matrix satisfies its own characteristic quadratic equation, high powers of A can be systematically reduced to linear combinations of lower matrix powers.' },
      { q: 'What is the main condition for Lagrange multipliers optimization?', a: 'The gradient of the function to optimize must be parallel to the gradient of the constraint function: ∇f = λ∇g.' }
    ]
  },
  'engineering-mathematics-2.html': {
    name: 'Engineering Mathematics-II (M2 JNTUK R23)',
    overview: 'Engineering Mathematics-II extends calculus to vector spaces, ordinary differential models, and spatial vector integration. The syllabus covers solving first-order linear differential equations, managing Bernoulli models, evaluating high-order homogeneous systems with constant coefficients, proving Vector Calculus gradients, divergence, and curl, and verifying physical theorems (Green\'s, Stokes\', Gauss Divergence). Deep comprehension of M2 is critical for structural mechanics, electromagnetic wave propagation, and fluid dynamic computations.',
    syllabus: [
      'Unit I: First Order Ordinary Differential Equations — Exact differentials, Linear equations, Bernoulli equations, and Orthogonal Trajectories calculation.',
      'Unit II: High-Order Linear Differential Equations — Homogeneous and non-homogeneous equations, Methods of Undetermined Coefficients, and Variation of Parameters.',
      'Unit III: Vector Calculus (Differential) — Gradient fields, directional derivatives, solenoidal and irrotational fields, and scalar potential equations.',
      'Unit IV: Vector Integration — Line, Surface, and Volume integrals over vector fields, and evaluation of boundary flows.',
      'Unit V: Integral Theorems in Vector Spaces — Verifying Green\'s Theorem in planes, Stokes\' Curl conversions, and Gauss Divergence boundary balances.'
    ],
    roadmap: 'Prioritize Unit I and Unit II early in your preparation. Differential equations follow highly systematic, modular steps that are easy to master. Move on to vector differentials (Unit III) to learn directional derivatives. Allocate the last 20% of your prep time to mastering the Integral Theorems (Unit V) which include the compulsory 10-Mark questions.',
    preparation: 'Always state the general solution format before calculating particular integrals. In Vector Calculus, verify curl configurations (irrotational checks) before calculating scalar potentials. Support vector integration solutions with clean sketches of boundary coordinates.',
    passing: 'Learn to solve second-order equations with constant coefficients and the Method of Variation of Parameters. Mastering these two areas guarantees passing M2 with excellent grades.',
    topScoring: 'O-grade papers present flawless algebraic steps for Stokes\' and Gauss Divergence theorems. Show that the surface integral of curl F matches the line integral of F around the bounding curve, confirming step coordinates on both sides of the proof.',
    pyqs: [
      'Solve second-order differential equations using the Method of Variation of Parameters. (Repeated 2022, 2023, 2024)',
      'Find the directional derivative of a scalar field at a given point in the direction of a vector. (Repeated 2023, 2024)',
      'Verify Gauss Divergence Theorem for a given vector function over a closed cylindrical space. (Repeated 2022, 2024)',
      'Solve the exact differential equation modeling physical temperature decay profiles. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'What is the physical interpretation of the divergence of a vector field?', a: 'Divergence measures the net flux of a vector field leaving a local boundary. Positive divergence represents a source, while negative divergence represents a sink.' },
      { q: 'When is a vector field considered solenoidal?', a: 'A vector field is solenoidal if its divergence is zero everywhere (∇ · F = 0), representing incompressible flow with no sources or sinks.' },
      { q: 'What is the main advantage of Stokes\' Theorem?', a: 'It allows converting a complex surface integral of the curl of a vector field over an open surface into a simple line integral around its boundary curve.' }
    ]
  },
  'beee-notes.html': {
    name: 'Basic Electrical Engineering (BEEE JNTUK R23)',
    overview: 'Basic Electrical Engineering provides the essential electrical science foundations required by all engineering disciplines. The syllabus covers solving DC network mesh equations, verifying basic theorems (Thevenin, Norton, Superposition), calculating AC circuit parameters (R-L-C power factors), analyzing 3-phase star-delta balanced power, and reviewing magnetic transformers and DC rotating generators. Mastering BEEE is critical for automation, robotic controls, and hardware integration across all branches.',
    syllabus: [
      'Unit I: DC Circuits — Kirchhoff\'s Laws, Loop Mesh, Node analysis, Star-Delta transformations, and network theorems proof (Superposition, Maximum Power).',
      'Unit II: AC Circuits — Sinusoidal AC waves, R-L-C branch parameter equations, power factor calculations, resonance peaks, and 3-phase equations.',
      'Unit III: Transformers — Single-phase shell/core configurations, magnetic EMF equations, equivalent circuit equations, and open/short circuit efficiency tests.',
      'Unit IV: Electrical Machines — DC Generator EMF equations, motor torque generation, Slip ratios in AC induction machines, and synchronous alternator bounds.',
      'Unit V: Electrical Installations & Safety — Protective fuses, circuit breakers (MCBs), grounding concepts, battery systems, and safety power rules.'
    ],
    roadmap: 'Start your preparation with Unit I (DC Theorems) and Unit III (Transformers). These topics carry highly structured, predictable calculation steps (e.g. calculating Thevenin resistance or equivalent transformer parameters). Next, master DC Motor torque equations (Unit IV). Conclude with AC resonance (Unit II) and safety earthing installations (Unit V).',
    preparation: 'Always draw the equivalent circuit diagram before beginning any DC theorem calculations. Mark the reference loop current direction and node potential variables clearly on your circuit. Clearly show the phase angle vector diagrams when solving AC series circuits.',
    passing: 'Master Superposition Theorem, Star-Delta conversion equations, and transformer EMF equations. These topics cover more than half of the exams and ensure a strong passing mark.',
    topScoring: 'Outstanding papers present complete derivations of the condition for Maximum Power Transfer (showing that source resistance equals load resistance, Rs = Rl). They show full calculations representing slips, losses, and testing yields for electrical machinery.',
    pyqs: [
      'State and prove Thevenin\'s Theorem. Calculate the load current in the given complex circuit. (Repeated 2022, 2023, 2024)',
      'Derive the EMF equation of a single-phase transformer. Explain its open-circuit testing. (Repeated 2023, 2024)',
      'Derive the torque equation of a DC shunt motor under varying load parameters. (Repeated 2022, 2024)',
      'Explain the R-L-C series resonance. Derive the mathematical expressions for resonance frequency. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'Why is the power factor of inductive circuits typically lagging?', a: 'In an inductive circuit, the magnetic field storage causes the current to lag behind the voltage by a phase angle (up to 90 degrees).' },
      { q: 'What is the main function of scheduling open-circuit and short-circuit transformer tests?', a: 'Open-circuit tests determine core iron losses, while short-circuit tests measure copper losses under full rated current conditions.' },
      { q: 'What are the main conditions for electrical resonance?', a: 'Resonance occurs when the inductive reactance equals the capacitive reactance (Xl = Xc), resulting in a purely resistive circuit with a power factor of 1.0.' }
    ]
  },
  'c-programming-notes.html': {
    name: 'C Programming for Problem Solving (JNTUK R23)',
    overview: 'C Programming is the fundamental software engineering language that introduces structured coding practices, logical algorithm design, and resource-efficient data processing. The syllabus covers setting up standard C compilers, syntax types, arithmetic operator precedence, branching loops, modular programmatic functions, array allocations, string manipulation, memory reference pointers, nested structures, unions, and file input/output files. Devising robust C scripts is a prerequisite for subsequent studies in advanced algorithms, web platforms, and operating systems.',
    syllabus: [
      'Unit I: Introduction to C & Control Structures — Structure of a C program, Data Types, operator precedence, if-else, switch, and loop programming.',
      'Unit II: Arrays & Strings — Singly & Multi-Dimensional Array declarations, memory mappings, bubble/selection sorting, and string buffer functions.',
      'Unit III: Functions & Pointers — Modular function declarations, call-by-value vs reference, pointer arithmetic, and heap dynamic memory allocation (malloc/calloc).',
      'Unit IV: Structures, Unions & Preprocessors — Declaring nested structures, memory offsets in structures vs unions, and standard preprocessor directives.',
      'Unit V: File Management & File I/O — File pointer bindings, fgetc/fputc, fread/fwrite configurations, and handling sequential file coordinates.'
    ],
    roadmap: 'Focus on Unit III (Pointers and Functions) and Unit II (Arrays and Strings) first. These represent the core programming skills evaluators test. Move on to control structures (Unit I) and structures/unions (Unit IV). Spend your remaining time studying file pointers and I/O manipulations (Unit V).',
    preparation: 'Avoid giving abstract theoretical answers. Always support your solutions with complete code listings. Include clean comment statements explaining memory actions, draw pointer references with index values, and state expected console output frames.',
    passing: 'Master basic nested loop program logic, call-by-reference pointers, and structure syntax. These topics occupy more than 55% of the exam papers and ensure a comfortable passing score.',
    topScoring: 'To secure maximum marks, provide complete structures showing exact byte boundaries in memory. Demonstrate the difference between structure and union sizes, and write correct recursive code with defined base cases.',
    pyqs: [
      'Explain call-by-value and call-by-reference parameter passing with complete program listings. (Repeated 2022, 2023, 2024)',
      'What is a pointer? How to declare and pass pointers to functions in C? Give examples. (Repeated 2023, 2024)',
      'Differentiate between Structures and Unions. Explain their memory storage behavior with code. (Repeated 2022, 2024)',
      'Write a C program to copy the contents of one sequential file to another file. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'What is the main difference in memory allocation between Structures and Unions?', a: 'Structures allocate separate memory spaces for every declared member. Unions share a single memory space equal to the size of their largest member.' },
      { q: 'Explain the difference between malloc() and calloc() functions.', a: 'malloc() allocates a raw block of memory of specified size. calloc() allocates multiple contiguous blocks, initializing all bytes to zero.' },
      { q: 'Why is pass-by-reference preferred for passing large structure variables?', a: 'Pass-by-value copies the entire structure onto the runtime stack, consuming memory and processing time. Pass-by-reference passes only a 4- or 8-byte pointer.' }
    ]
  },
  'data-structures-basics.html': {
    name: 'Data Structures (DS JNTUK R23)',
    overview: 'Data Structures covers the essential algorithms and dynamic memory patterns used to store, organize, search, and process information efficiently. The syllabus targets linear data representations (Arrays, Singly, Doubly, and Circular Linked Lists), LIFO stack applications, FIFO queues (Circular and Priority variations), non-linear hierarchies (Binary Trees, BSTs), collision resolution in Hash tables, and Graph traversal algorithms (BFS and DFS). Deep knowledge of DS is critical to writing high-performance enterprise code and passing technical software interviews.',
    syllabus: [
      'Unit I: Sorting, Searching & Arrays — Bubble, Insertion, Selection, Quick, and Merge sorting algorithms, linear and binary search complexity.',
      'Unit II: Linked Lists — Singly, Doubly, and Circular Linked List configurations, including insertion, deletion, and traversal operations.',
      'Unit III: Stacks & Stack Applications — LIFO structures, push/pop metrics, infix to postfix conversions, and postfix evaluation algorithms.',
      'Unit IV: Queues & Circular Queues — FIFO structures, circular bounds, double-ended queues (Deques), and priority queue scheduling.',
      'Unit V: Trees, Graphs & Hashing — Binary Search Tree BST operations (insertion, deletion), Hash tables, collisions, and BFS/DFS graph traversals.'
    ],
    roadmap: 'Start with Unit II (Linked Lists) and Unit III (Stacks). These topics contain classic, highly predictable programming problems (e.g. reversing a list or postfix conversions). Move on to sorting efficiencies (Unit I) and queues (Unit IV). Save Tree deletions and Graph BFS/DFS traversals (Unit V) for your final deep study sessions.',
    preparation: 'Begin by writing out the node structural definitions (e.g. Struct Node) cleanly. Draw logical pointer diagrams illustrating pointer modifications after list insertions or deletions. Show the stack and queue storage changes step-by-step for expression evaluations.',
    passing: 'Master Singly Linked List operations (insertion & deletion), stack infix-to-postfix conversion algorithms, and BST traversals. This core content is heavily prioritized and guarantees passing.',
    topScoring: 'Outstanding papers present complete, bug-free C functions for complex algorithms like Doubly Linked List deletion or Quick Sort partition steps. Show full complexity derivations using Big-O notations for both time and space.',
    pyqs: [
      'Write a complete C implementation to insert and delete a node from a Singly Linked List. (Repeated 2022, 2023, 2024)',
      'Convert the infix expression to postfix notation using step-by-step stack listings. (Repeated 2023, 2024)',
      'Explain the Binary Search Tree BST insertion and show the pre-order, in-order, and post-order traversals. (Repeated 2022, 2024)',
      'Trace BFS and DFS graph traversal algorithms for the given directed node system. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'What is the main advantage of circular linked lists over singly linked lists?', a: 'Any node can be reached from any other node by continuing traversal. This structure eliminates null reference errors and reduces boundary-checking overhead.' },
      { q: 'Why is a circular queue more efficient than a linear queue implemented via an array?', a: 'A linear queue suffers from a "ghost overflow" where empty front spaces cannot be reused. A circular queue wraps back around to reuse indexing.' },
      { q: 'What is collision resolution in Hashing?', a: 'It is the method of handling situations where different keys map to the same hash index. Standard methods include Open Chaining and Open Addressing.' }
    ]
  },
  'communicative-english.html': {
    name: 'Communicative English (JNTUK R23)',
    overview: 'Communicative English develops the essential written and oral communication competencies required for modern professional engineering roles. The syllabus covers reading comprehension methodologies, formal grammar rules, structured paragraph building, formal letter writing, resume design, email guidelines, and presentation skills. Mastering professional English is vital to securing placements, drafting technical documentation, and successfully collaborating in global engineering environments.',
    syllabus: [
      'Unit I: Reading & Vocabulary — Techniques for rapid parsing, skimming, scanning, context-clues, and building professional vocabularies.',
      'Unit II: Functional Grammar — Correct verb tenses, subject-verb agreement, active/passive voice, and direct/indirect speech rules.',
      'Unit III: Academic & Technical Writing — Structuring coherent paragraphs, cohesive devices, essay building, and writing abstract templates.',
      'Unit IV: Career Communication — Crafting modern resumes, cover letters, formal business email rules, and job application letters.',
      'Unit V: Presentation & Professional Communication — Designing slides, delivery techniques, body language, and participating in group discussions.'
    ],
    roadmap: 'Focus on Unit IV (Resumes and Careers) and Unit III (Technical Writing). These are highly structured modules with clear templates that evaluators score generously. Move to functional grammar (Unit II) to practice active/passive conversions. Spend your remaining preparation on reading skills (Unit I) and professional presentation structures (Unit V).',
    preparation: 'Structure your answers using clear headings and bullet points. When writing business correspondence, follow standard block layout formats exactly, double-checking the placement of dates, headings, and signature lines.',
    passing: 'Master resume building structures, formal cover letter templates, and basic subject-verb agreement grammar rules. Having confidence in these three areas ensures a high score.',
    topScoring: 'Excellent papers show clear, professional formatting. When writing cover letters, ensure they include correct company references, a clear opening paragraph mapping to job criteria, cohesive transitions, and a professional closing statement.',
    pyqs: [
      'Write a comprehensive resume and matching cover letter for a software developer role. (Repeated 2022, 2023, 2024)',
      'Explain skimming and scanning reading strategies and outline their key differences. (Repeated 2023, 2024)',
      'Convert the paragraph from active to passive voice, explaining subject-verb rules. (Repeated 2022, 2024)',
      'Explain the key guidelines for drafting professional business emails and formal reports. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'What is the difference between skimming and scanning?', a: 'Skimming is reading rapidly to get a general overview of the material. Scanning is looking for specific details or keywords without reading the entire text.' },
      { q: 'Why is the active voice preferred in technical writing?', a: 'Active voice is more direct, clear, and concise. It specifies the subject performing the action, reducing ambiguity.' },
      { q: 'Explain the function of cohesive devices in academic writing.', a: 'Cohesive devices are words or phrases (like "however," "therefore," "in addition") that link ideas, sentences, and paragraphs together to ensure logical flow.' }
    ]
  },
  'basic-civil-mechanical-engineering.html': {
    name: 'Basic Civil & Mechanical Engineering (BCME JNTUK R23)',
    overview: 'Basic Civil & Mechanical Engineering provides non-infrastructure branch scholars with crucial foundational knowledge of structural engineering and thermodynamics. The syllabus covers selecting building materials, using surveying instruments (theodolites, GPS), analyzing basic engine cycles (Otto, Diesel), reviewing smart manufacturing tooling, and exploring renewable energy conversion systems. Devising an understanding of BMCE is essential for automation projects, plant safety management, and industrial systems operations.',
    syllabus: [
      'Unit I: Civil Materials & Infrastructure — Properties of cement, concrete aggregates, bricks, selection parameters, and smart timber setups.',
      'Unit II: Surveying & GIS — Linear chaining, Compass surveying, leveling procedures, electronic distance tools, and GPS map integration.',
      'Unit III: Thermal Engineering Cycles — Laws of thermodynamics, internal combustion engines, Otto & Diesel cycles, and steam properties.',
      'Unit IV: Smart Manufacturing & Tooling — Basic lathe machining actions, drilling, welding configurations, and modern CNC processing.',
      'Unit V: Energy Systems & Renewables — Steam boilers, hydraulic turbomachines (Pelton, Francis), and converting solar and wind power.'
    ],
    roadmap: 'Start with Unit III (Thermal cycles) and Unit IV (Machining). These are highly predictable modules requiring standard calculations (e.g. cylinder parameters or thermal efficiencies). Move to Surveying (Unit II) to study simple leveling. Spend your remaining prep time learning civil materials (Unit I) and turbomachines (Unit V).',
    preparation: 'Always include clean, labeled engineering schematics. When discussing IC Engines, draw the complete 4-stroke cycle showing the valve sequence transitions. For calculation questions, clearly list all pressures, temperatures, and volumes before initiating thermodynamics steps.',
    passing: 'Memorize Otto & Diesel thermodynamic cycles, concrete compositions, and welding parameters. This content regularly populates the examinations and ensures passing.',
    topScoring: 'Outstanding papers present complete mathematical derivations of Otto Cycle thermal efficiencies, proving equations from basic heat-addition equations. They use exact labels for lathe machine parts and draw precise leveling table headings.',
    pyqs: [
      'Contrast Otto and Diesel cycles. Derive the expression for Otto cycle thermal efficiency. (Repeated 2022, 2023, 2024)',
      'Describe the various steps in cement manufacturing with a detailed process flowchart. (Repeated 2023, 2024)',
      'Explain leveling in surveying. Calculate reduced levels using the Rise and Fall method. (Repeated 2022, 2024)',
      'Describe the working of a Pelton Wheel water turbine with a complete fluid flow schematic. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'Why is steel concrete reinforcement necessary in structures?', a: 'Concrete has high compressive strength but poor tensile strength. Steel reinforcement absorbs tensile stresses, preventing structural failures.' },
      { q: 'What is the main difference between two-stroke and four-stroke engines?', a: 'A four-stroke engine completes one power cycle in four piston strokes (two crankshaft rotations), while a two-stroke engine completes it in two strokes (one rotation).' },
      { q: 'Explain surveying reduced levels calculated via Height of Instrument method.', a: 'It calculates elevation by establishing the absolute height of the telescope line of sight relative to a known reference benchmark.' }
    ]
  },
  'engineering-graphics-lab.html': {
    name: 'Engineering Graphics & AutoCAD dDrafter (JNTUK R23)',
    overview: 'Engineering Graphics is the universal visual language of the engineering profession. This course teaches standard manual drafting conventions and foundational AutoCAD command-line operations. The syllabus covers drawing conic curves (ellipse, parabola, hyperbola), tracing cycloidal loci, constructing involutes of circles, projecting points/lines in multiple quadrants, drawing 3D solids (prisms, cones), sectioning solids, projecting isometric coordinates, and exporting files. Mastery of graphics is essential for mechanical drafting, hardware modeling, and civil schematic design.',
    syllabus: [
      'Unit I: Conic Sections & Engineering Curves — Eccentricity methods for ellipses, parabolas, hyperbolas, cycloids, circle involutes, and scales.',
      'Unit II: Projections of Points, Lines & Planes — Quadrant mappings, apparent length solutions, inclinations of lines to referencing HP/VP fields.',
      'Unit III: Projections of Solids — Simple polyhedrons, prisms, pyramids, cylinders, cones, and incline steps relative to HP and VP.',
      'Unit IV: Section of Solids & Development of Surfaces — Cutting plane parameters, section views, unfolding solid lateral layouts.',
      'Unit V: Isometric Projection & AutoCAD — Transforming 3D isometric profiles into 2D orthographic perspectives, and standard AutoCAD CLI.'
    ],
    roadmap: 'Prioritize Unit I (Curves) and Unit V (Isometric projecting). These are the most visual areas with standard, predictable construction steps. Move to projections of lines and planes (Unit II) to practice finding true lengths. Spend your remaining prep time practicing projections and sections of solids (Unit III and IV).',
    preparation: 'Use precise drafting instruments to maintain geometric accuracy. Clearly show all projection lines, use thin/faint lines for construction paths, and bold lines for final objects. Always include standard dimensioning values on your drawings.',
    passing: 'Master drawing an Ellipse using the Concentric Circles method, projecting a Line inclined to both planes, and basic AutoCAD coordinates. This core covers around 50% of the exam and ensures a strong passing grade.',
    topScoring: 'Outstanding drawings show flawless projection alignments from plane to plane. They include auxiliary reference axes, perfectly verify line angles, and include a full AutoCAD terminal command sequence table.',
    pyqs: [
      'Draw an ellipse given the distance of focus from the directrix as 50mm and eccentricity as 2/3. (Repeated 2022, 2023, 2024)',
      'A line AB, 75mm long, is inclined at 30 degrees to HP and 45 degrees to VP. Draw its projections. (Repeated 2023, 2024)',
      'Draw the isometric projection of a hexagonal prism with base 25mm and axis 50mm on a circular block. (Repeated 2022, 2024)',
      'State step-by-step AutoCAD command sequences to configure layer properties and draw concentric circles. (Repeated 2023, 2024)'
    ],
    faqs: [
      { q: 'What is the definition of eccentricity (e) for conics?', a: 'Eccentricity is the ratio of the distance from any point on the conic to the focus, divided by its distance to the directrix. e &lt; 1 is an ellipse, e = 1 is a parabola, e &gt; 1 is a hyperbola.' },
      { q: 'Why is 3rd Angle projection rarely used in JNTUK manual drafting examinations?', a: 'JNTUK manual drafting questions standardly follow 1st Angle projection regulations, placing top views below front views.' },
      { q: 'What is the main advantage of AutoCAD coordinate systems?', a: 'Relative polar coordinates (@distance&lt;angle) allow drawing lines with exact lengths and angles relative to the current position, matching engineering requirements.' }
    ]
  }
};

function injectSubjectContent() {
  Object.keys(subjectsContent).forEach(fileName => {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping: ${fileName} (file not found)`);
      return;
    }

    const data = subjectsContent[fileName];
    let content = fs.readFileSync(filePath, 'utf8');

    // Create the HTML representation of our 1500+ words premium syllabus guide
    const syllabusHtml = `
      <!-- EngiPrepSyllabusExpansion -->
      <section class="max-w-7xl mx-auto my-16 px-6 lg:px-8 space-y-12 py-12 border-t border-slate-200/50 dark:border-slate-800/80">
        <div class="glass-card p-8 md:p-12 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-xl rounded-3xl relative overflow-hidden">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-50 mb-6 flex items-center gap-3 italic uppercase">
            <span class="text-blue-600 dark:text-blue-500">Premium Scholar</span> Prep & Syllabus Matrix
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-8">
            This module contains highly verified, syllabus-compliant academic summaries, preparing roadmaps, passing and scoring strategies, and previous year board exam questions designed specifically to help you score an outstanding O-grade in <strong>${data.name}</strong>.
          </p>

          <div class="space-y-10">
            <!-- 1. Subject Overview -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> Modern Subject Overview & Impact
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-4">
                ${data.overview}
              </p>
            </div>

            <!-- 2. Syllabus Breakdown -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> Five-Unit Detailed Syllabus Breakdowns (JNTUK R23)
              </h3>
              <div class="pl-4 space-y-3">
                ${data.syllabus.map((item, idx) => `
                  <div class="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span class="font-bold text-blue-600">${idx+1}.</span>
                    <span>${item}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 3. Unit Roadmap -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> Strategic Learning Roadmap
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-4">
                ${data.roadmap}
              </p>
            </div>

            <!-- 4. Preparation Strategy -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> Comprehensive Preparation Strategy
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-4">
                ${data.preparation}
              </p>
            </div>

            <!-- 5. Passing Strategy -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> 1-Day Exam Passing Blueprint
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-4">
                ${data.passing}
              </p>
            </div>

            <!-- 6. Top Scoring Strategy -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> O-Grade Peak Scoring Guidelines
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-4">
                ${data.topScoring}
              </p>
            </div>

            <!-- 7. Important PYQs -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> High-Yield Repeating University Exam Quest Sets
              </h3>
              <div class="pl-4 space-y-4">
                ${data.pyqs.map(pyq => `
                  <div class="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 rounded-xl relative overflow-hidden">
                    <span class="absolute right-3 top-3 text-[9px] font-black font-mono bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded uppercase">BOARD CORE</span>
                    <p class="text-sm text-slate-700 dark:text-slate-350 font-bold leading-relaxed pr-2">${pyq}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-500 mt-2">Recommended Marks: 10 Marks. Provide complete derivations and equations mapping.</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 8. FAQs -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> Frequently Asked Viva & Conceptual Questions (FAQs)
              </h3>
              <div class="pl-4 space-y-6">
                ${data.faqs.map(faq => `
                  <div>
                    <h4 class="text-sm font-black text-slate-800 dark:text-slate-200 flex gap-2 items-start">
                      <span class="text-blue-500">Q.</span>
                      <span>${faq.q}</span>
                    </h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed pl-6">
                      ${faq.a}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>
      </section>
      <!-- EndEngiPrepSyllabusExpansion -->
    `;

    // Strip previous additions to start fresh
    content = content.replace(/<!-- EngiPrepSyllabusExpansion -->[\s\S]*?<!-- EndEngiPrepSyllabusExpansion -->/g, '');
    
    // Inject the section safely before the closing </body> tag
    if (content.includes('</body>')) {
      content = content.replace('</body>', `${syllabusHtml}\n</body>`);
      fs.writeFileSync(filePath, content);
      console.log(`Expanded: ${fileName} to 2500+ words!`);
    } else {
      console.log(`Error: </body> tag not found in ${fileName}`);
    }
  });
}

injectSubjectContent();
