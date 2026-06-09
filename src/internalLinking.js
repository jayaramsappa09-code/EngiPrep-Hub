/**
 * EngiPrepHub - Comprehensive Internal Linking and Academic Engagement System
 * Tailored dynamically for JNTUK R23 Engineering Curriculum.
 */

export const subjectMap = {
  "mathematics-1": {
    name: "Engineering Mathematics - I",
    shortName: "Maths I",
    hubUrl: "/maths-1.html",
    theme: "mathematics",
    units: [
      { unit: 1, title: "First Order Linear Differential Equations", url: "/engineering-mathematics-unit-1.html", desc: "Linear, Bernoulli, and exact differential equations. Learn orthogonal trajectories and cooling rate formulations." },
      { unit: 2, title: "Higher Order Linear Differential Equations", url: "/engineering-mathematics-unit-2.html", desc: "Particular integrals, complementary functions, Cauchy-Euler equations, and method of variation of parameters." },
      { unit: 3, title: "Partial Differentiation & Applications", url: "/engineering-mathematics-unit-3.html", desc: "Euler's theorem, total derivative, Taylor series expansions for multiple variables, Jacobians, and extrema." },
      { unit: 4, title: "Vector Differentiation", url: "/engineering-mathematics-unit-4.html", desc: "Scalar and vector fields, gradient, curl, divergence, solenoidal structures, and directional derivative proofs." },
      { unit: 5, title: "Vector Integration & Theorems", url: "/engineering-mathematics-unit-5.html", desc: "Line, surface, and volume integrals. Master Gauss divergence, Green's, and Stokes' fundamental theorems." }
    ],
    clusters: [
      { key: "Linear ODE", target: "First Order Linear Differential Equations", url: "/engineering-mathematics-unit-1.html" },
      { key: "Variation of Parameters", target: "Method of Variation of Parameters", url: "/engineering-mathematics-unit-2.html" },
      { key: "Euler's Theorem", target: "Partial Differentiation & Euler's Proofs", url: "/engineering-mathematics-unit-3.html" },
      { key: "Jacobians", target: "Coordinate Transformation & Jacobians", url: "/engineering-mathematics-unit-3.html" },
      { key: "Solenoidal Vector", target: "Vector Divergence & Solenoidal Fields", url: "/engineering-mathematics-unit-4.html" },
      { key: "Stokes' Theorem", target: "Surface Integrals & Stokes' Formulations", url: "/engineering-mathematics-unit-5.html" }
    ],
    pyqs: [
      { year: "2024", q: "Solve continuous-cooling equations using Leibniz linear multipliers.", link: "/pyqs.html?subject=mathematics-1&q=leibniz" },
      { year: "2023", q: "Evaluate surface integral of curl F using Stokes' Theorem over paraboloid grid.", link: "/pyqs.html?subject=mathematics-1&q=stokes-paraboloid" },
      { year: "2022", q: "Evaluate particular integral of d^2y/dx^2 + y = sec x using variation parameters.", link: "/pyqs.html?subject=mathematics-1&q=variation-parameters" }
    ]
  },
  "physics": {
    name: "Engineering Physics",
    shortName: "Physics",
    hubUrl: "/physics-notes.html",
    theme: "physics",
    units: [
      { unit: 1, title: "Wave Optics & Interference", url: "/engineering-physics-unit-1.html", desc: "Coherent light sources, thin film interference, Newton's Rings calibration, and wave diffraction theories." },
      { unit: 2, title: "Lasers & Fiber Optics", url: "/engineering-physics-unit-2.html", desc: "Einstein coefficients, population inversion, He-Ne & semiconductor lasers, and optical fiber attenuation." },
      { unit: 3, title: "Quantum Mechanics", url: "/engineering-physics-unit-3.html", desc: "De Broglie wavelengths, uncertainty principle, wavefunctions, and Schrodinger equation finite box proofs." },
      { unit: 4, title: "Semiconductors & Device Physics", url: "/engineering-physics-unit-4.html", desc: "Direct/indirect bands, Fermi level drift, carrier concentration, Hall Effect, and diode mechanics." },
      { unit: 5, title: "Modern Physics & Nanotechnology", url: "/engineering-physics-unit-5.html", desc: "Band theory of solids, nanomaterial synthesis, quantum dots, magnetic materials, and superconductivity." }
    ],
    clusters: [
      { key: "Newton's Rings", target: "Interference of Light & Newton's Rings Calibration", url: "/engineering-physics-unit-1.html" },
      { key: "Population Inversion", target: "Lasers, Stimulated Emission & Population Inversion", url: "/engineering-physics-unit-2.html" },
      { key: "Schrodinger Equation", target: "Schrodinger Wave Model & Particle-in-a-Box Proofs", url: "/engineering-physics-unit-3.html" },
      { key: "Hall Effect", target: "Semiconductor Hall Coefficient & Free Carriers", url: "/engineering-physics-unit-4.html" },
      { key: "Band Theory", target: "Solid State Energy Bands & Fermi Distributions", url: "/engineering-physics-unit-5.html" }
    ],
    pyqs: [
      { year: "2024", q: "Derive expression of diameter of Newton's rings in dark interference bands.", link: "/pyqs.html?subject=physics&q=newton-rings-dark" },
      { year: "2023", q: "Explain construction and operation of direct-bandgap GaAs semiconductor laser.", link: "/pyqs.html?subject=physics&q=gaas-semiconductor-laser" },
      { year: "2022", q: "Apply Schrodinger equation to evaluate energy grids for infinite potential wells.", link: "/pyqs.html?subject=physics&q=infinite-potential-wells" }
    ]
  },
  "chemistry": {
    name: "Engineering Chemistry",
    shortName: "Chemistry",
    hubUrl: "/chemistry-topper-notes.html",
    theme: "chemistry",
    units: [
      { unit: 1, title: "Water Technology & Treatment", url: "/chemistry-unit-1.html", desc: "Water hardness, EDTA titrations, municipal supply, demineralization, and industrial scale boile systems." },
      { unit: 2, title: "Electrochemistry & Corrosion", url: "/chemistry-unit-2.html", desc: "Electrode values, Nernst equation, reference elements, fuel cells, rust prevention, and corrosion currents." },
      { unit: 3, title: "Materials Chemistry & Polymers", url: "/chemistry-unit-3.html", desc: "Chemical compositions, plastics synthesis, elastomer synthesis, fullerenes, and carbon nanotubes." },
      { unit: 4, title: "Spectroscopic Techniques", url: "/chemistry-unit-4.html", desc: "Beer-Lambert formulation, UV-Vis spectroscopy, IR selection profiles, and rotational energy levels." },
      { unit: 5, title: "Energy Sources & Applications", url: "/chemistry-unit-5.html", desc: "Calorific values, coal proximate profiling, fractional refining, solar cells, and supercapacitors." }
    ],
    clusters: [
      { key: "EDTA Method", target: "Hardness Computation via EDTA Titration", url: "/chemistry-unit-1.html" },
      { key: "Nernst Equation", target: "Electrode Potential & Nernst Formulations", url: "/chemistry-unit-2.html" },
      { key: "Carbon Nanotubes", target: "Materials Science, CNT Synthesis & Properties", url: "/chemistry-unit-3.html" },
      { key: "Beer-Lambert Law", target: "Spectrophotometric Beer-Lambert Adsorbance", url: "/chemistry-unit-4.html" },
      { key: "Supercapacitors", target: "Electrolyte Storage & Supercapacitor Frameworks", url: "/chemistry-unit-5.html" }
    ],
    pyqs: [
      { year: "2024", q: "Derive Nernst potential equation explaining non-standard state emf calculation.", link: "/pyqs.html?subject=chemistry&q=nernst-derivation" },
      { year: "2023", q: "Calculate total calcium hardness using complexometric EDTA titration datasets.", link: "/pyqs.html?subject=chemistry&q=edta-titration-hardness" },
      { year: "2022", q: "Differentiate between conventional batteries and high-power proton supercapacitors.", link: "/pyqs.html?subject=chemistry&q=supercapacitors" }
    ]
  },
  "programming": {
    name: "C Programming for Problem Solving",
    shortName: "C Programming",
    hubUrl: "/c-programming-notes.html",
    theme: "programming",
    units: [
      { unit: 1, title: "Introduction to C & Basic Input/Output", url: "/c-programming-unit-1.html", desc: "C language syntax, compilers, flowcharts, operators, standard format I/O, and nested expressions." },
      { unit: 2, title: "Control Structures & Decision Making", url: "/c-programming-unit-2.html", desc: "If-else branch criteria, switch-case selections, loop structures, break controls, and goto execution." },
      { unit: 3, title: "Arrays & Character Strings", url: "/c-programming-unit-3.html", desc: "Single/multi-dimensional array offsets, string arrays, key standard string functions, and algorithms." },
      { unit: 4, title: "Functions & Pointers", url: "/c-programming-unit-4.html", desc: "Scope rules, stack frames, call-by-reference pointers, malloc/free allocations, and double pointer maps." },
      { unit: 5, title: "Structures, Unions & File Management", url: "/c-programming-unit-5.html", desc: "Structure bitwise parameters, unions, memory differences, file streams, and seek indicators." }
    ],
    clusters: [
      { key: "Switch-Case", target: "Conditional Jumps & Switch Selections", url: "/c-programming-unit-2.html" },
      { key: "Array Offsets", target: "Memory Offsets & Matrix Multiplication in C", url: "/c-programming-unit-3.html" },
      { key: "Pointer Arithmetic", target: "Declaring Pointer Offsets & Call-by-Reference", url: "/c-programming-unit-4.html" },
      { key: "Dynamic Memory", target: "Dynamic Heap Allocation using Malloc & Free", url: "/c-programming-unit-4.html" },
      { key: "Nested Structures", target: "Heterogeneous Records & Packed Bitfields", url: "/c-programming-unit-5.html" }
    ],
    pyqs: [
      { year: "2024", q: "Demonstrate recursive pointer traversal over multidimensional data vectors.", link: "/pyqs.html?subject=programming&q=pointer-traversal" },
      { year: "2023", q: "Write a program in C that clones files via block stream buffers.", link: "/pyqs.html?subject=programming&q=file-cloning-blocks" },
      { year: "2022", q: "Evaluate structure sizes vs unions illustrating padding offsets.", link: "/pyqs.html?subject=programming&q=structure-unions-padding" }
    ]
  },
  "beee": {
    name: "Basic Electrical & Electronics Engineering",
    shortName: "BEEE",
    hubUrl: "/beee-notes.html",
    theme: "beee",
    units: [
      { unit: 1, title: "DC & AC Circuits", url: "/basic-electrical-engineering-unit-1.html", desc: "Mesh & nodal evaluation, Superposition & Thevenin theorems, phasor representation, and resonance." },
      { unit: 2, title: "Electrical Machines", url: "/basic-electrical-engineering-unit-2.html", desc: "DC generator principles, three-phase transformers, slip-ring induction rotors, and alternators." },
      { unit: 3, title: "Power Infrastructure & Renewable Energy", url: "/basic-electrical-engineering-unit-3.html", desc: "Generation loops, solar & wind energy systems, protective devices, and electric billing codes." },
      { unit: 4, title: "Semiconductor Devices & Rectifiers", url: "/basic-electrical-engineering-unit-4.html", desc: "PN junction forward barrier, Zener regulator mechanics, full-wave rectifiers, and filters." },
      { unit: 5, title: "Digital Electronics & Op-Amps", url: "/basic-electrical-engineering-unit-5.html", desc: "Logic gates, Boolean reduction, flip-flops, and operational amplifier mathematical grids." }
    ],
    clusters: [
      { key: "Thevenin Theorem", target: "Circuit Reduction & Thevenin Equivalents", url: "/basic-electrical-engineering-unit-1.html" },
      { key: "Transformer Slip", target: "Induction Rotor Slip Rate & Efficiency", url: "/basic-electrical-engineering-unit-2.html" },
      { key: "Zener Diode", target: "Voltage Regulation via Avalanche Breakdowns", url: "/basic-electrical-engineering-unit-4.html" },
      { key: "Operational Amplifier", target: "Virtual Ground & Inverting Op-Amp Systems", url: "/basic-electrical-engineering-unit-5.html" }
    ],
    pyqs: [
      { year: "2024", q: "Apply Thevenin's theorem to identify peak load current in complex Wheatstone bridge loops.", link: "/pyqs.html?subject=beee&q=thevenin-wheatstone" },
      { year: "2023", q: "Explain open circuit test constraints in a single-phase transformer core.", link: "/pyqs.html?subject=beee&q=transformer-octest" },
      { year: "2022", q: "Design summing amplifier and integrator grids using standard 741 Op-Amps.", link: "/pyqs.html?subject=beee&q=opamp-multiplier" }
    ]
  },
  "data-structures": {
    name: "Data Structures",
    shortName: "Data Structures",
    hubUrl: "/data-structures-basics.html",
    theme: "programming",
    units: [
      { unit: 1, title: "Algorithms, Searching & Bubble/Insertion Sorting", url: "/data-structures-unit-1.html", desc: "Linear vs binary searches, bubble sort, insertion sort, performance limits, and complexity bounds." },
      { unit: 2, title: "Linear Data Structures & Linked Lists", url: "/data-structures-unit-2.html", desc: "Pointer linking structures, singly list inserts, deletions, doubly and circular linked list implementations." },
      { unit: 3, title: "Stacks & Queues", url: "/data-structures-unit-3.html", desc: "Array stack models, parenthesis matching, infix to postfix parsing, and circular queues." },
      { unit: 4, title: "Trees & Binary Search Trees", url: "/data-structures-unit-4.html", desc: "Binary tree representations, inorder/preorder/postorder traversals, and BST indexing." },
      { unit: 5, title: "Graphs & Hashing Techniques", url: "/data-structures-unit-5.html", desc: "Matrix and list representation, BFS, DFS, MST construction, and hash table probing mechanisms." }
    ],
    clusters: [
      { key: "Binary Search", target: "Logarithmic Partitioning Search Mechanics", url: "/data-structures-unit-1.html" },
      { key: "Linked Lists", target: "Dynamic Pointer Chains & Singly Linked Lists", url: "/data-structures-unit-2.html" },
      { key: "Postfix", target: "Stack-Authorized Postfix String Compilation", url: "/data-structures-unit-3.html" },
      { key: "BST Traversals", target: "Binary Heap Sorting & Traversal Algorithms", url: "/data-structures-unit-4.html" },
      { key: "BFS", target: "Queue-Oriented Breadth First Matrix Traversals", url: "/data-structures-unit-5.html" }
    ],
    pyqs: [
      { year: "2024", q: "Demonstrate binary tree traversals restoring index roots from inorder grids.", link: "/pyqs.html?subject=data-structures&q=tree-traversals" },
      { year: "2023", q: "Create algorithm managing circular buffer inserts in queues.", link: "/pyqs.html?subject=data-structures&q=circular-queue-buffers" },
      { year: "2022", q: "Compare depth first graph searching limits with stack complexity.", link: "/pyqs.html?subject=data-structures&q=dfs-stack" }
    ]
  },
  "english": {
    name: "Communicative English",
    shortName: "English",
    hubUrl: "/communicative-english.html",
    theme: "english",
    units: [
      { unit: 1, title: "Language Focus & Lesson Analysis", url: "/communicative-english-unit-1.html", desc: "Passage scanning, context deductions, word root mappings, and passive listening." },
      { unit: 2, title: "Professional Correspondence", url: "/communicative-english-unit-2.html", desc: "Structured email formats, reporting datasets, official inquiries, and notices." },
      { unit: 3, title: "Interpersonal Communication", url: "/communicative-english-unit-3.html", desc: "Group coordination dialogues, elevator statements, presentation skills, and body language." },
      { unit: 4, title: "Advanced Grammatical Mechanics", url: "/communicative-english-unit-4.html", desc: "Sentence transformations, voice shifts, relative clauses, and preposition maps." },
      { unit: 5, title: "Academic & Career Readiness", url: "/communicative-english-unit-5.html", desc: "Job application portfolios, tailored CV writing, and mock interview preparations." }
    ],
    clusters: [
      { key: "Cohesion", target: "Analytical Writing & Sentence Cohesion", url: "/communicative-english-unit-1.html" },
      { key: "Email Etiquette", target: "Corporate Emails & Professional Inbound Writing", url: "/communicative-english-unit-2.html" },
      { key: "Group Dynamics", target: "Navigating Professional Panels & Group Discussion", url: "/communicative-english-unit-3.html" },
      { key: "Resume Design", target: "CV Assembly & Structural Target Portfolios", url: "/communicative-english-unit-5.html" }
    ],
    pyqs: [
      { year: "2024", q: "Draft professional email requesting technical laboratory hardware extensions.", link: "/pyqs.html?subject=english&q=draft-email" },
      { year: "2023", q: "Transform passive voice paragraphs to active direct action reports.", link: "/pyqs.html?subject=english&q=voice-transformation" },
      { year: "2022", q: "State rules of professional team panels and group debate moderation.", link: "/pyqs.html?subject=english&q=panel-moderation" }
    ]
  },
  "civil-mechanical": {
    name: "Basic Civil & Mechanical Engineering",
    shortName: "BCME",
    hubUrl: "/basic-civil-mechanical-engineering.html",
    theme: "civil-mechanical",
    units: [
      { unit: 1, title: "Materials & Structural Materials", url: "/basic-civil-and-mechanical-engineering-unit-1.html", desc: "Hydration of concrete, reinforcement steel grades, tensile behaviors, and brick mortar properties." },
      { unit: 2, title: "Surveying & Building Planning", url: "/basic-civil-and-mechanical-engineering-unit-2.html", desc: "Linear triangulation, prism magnetic compasses, line of collimation, contour offsets, and municipal building codes." },
      { unit: 3, title: "Power Transmission Mechanics", url: "/basic-civil-and-mechanical-engineering-unit-3.html", desc: "Line shafts, friction belt variables, chain-link tooth ratios, gear trains, and clutches." },
      { unit: 4, title: "Thermal Engineering & IC Engines", url: "/basic-civil-and-mechanical-engineering-unit-4.html", desc: "Work laws, Carnot efficiency bounds, single cylinder 4-stroke operations, and heat sinks." },
      { unit: 5, title: "Manufacturing & Machine Processes", url: "/basic-civil-and-mechanical-engineering-unit-5.html", desc: "Pattern allowances, sandbox gas vents, milling cutter speeds, lathe indexing, and welding pools." }
    ],
    clusters: [
      { key: "Concrete Hydration", target: "Silicate Phase Hydration & Cement Strength", url: "/basic-civil-and-mechanical-engineering-unit-1.html" },
      { key: "Compass Surveying", target: "Closed Traverses & Magnetic Declination", url: "/basic-civil-and-mechanical-engineering-unit-2.html" },
      { key: "Gear Trains", target: "Velocity Ratio & Mechanical Advantage in Gears", url: "/basic-civil-and-mechanical-engineering-unit-3.html" },
      { key: "IC Engines", target: "Otto Cycle, Diesel Cycle & Cylinder Efficiency", url: "/basic-civil-and-mechanical-engineering-unit-4.html" },
      { key: "Lathe Indexing", target: "Turning, Milling, Drilling & Metal Indexing", url: "/basic-civil-and-mechanical-engineering-unit-5.html" }
    ],
    pyqs: [
      { year: "2024", q: "Formulate concrete moisture-to-cement hydration rates predicting load breakdown points.", link: "/pyqs.html?subject=civil-mechanical&q=concrete-hydration" },
      { year: "2023", q: "Evaluate fore-bearing and back-bearing data calculating local compass error offsets.", link: "/pyqs.html?subject=civil-mechanical&q=survey-declination" },
      { year: "2022", q: "Compare thermodynamic limits of 2-stroke vs 4-stroke combustion cycles.", link: "/pyqs.html?subject=civil-mechanical&q=combustion-compare" }
    ]
  }
};

/**
 * Parses pathname to determine if active workspace matches subject parameters.
 */
export function detectPageContext() {
  const path = window.location.pathname.toLowerCase();
  let subjectKey = null;
  let unitNum = null;
  let isHub = false;
  let isUnit = false;

  // Process unit specific templates
  if (path.includes('engineering-mathematics-unit-')) {
    subjectKey = 'mathematics-1';
    isUnit = true;
    const match = path.match(/unit-(\d)/);
    if (match) unitNum = parseInt(match[1]);
  } else if (path.includes('engineering-physics-unit-')) {
    subjectKey = 'physics';
    isUnit = true;
    const match = path.match(/unit-(\d)/);
    if (match) unitNum = parseInt(match[1]);
  } else if (path.includes('chemistry-unit-')) {
    subjectKey = 'chemistry';
    isUnit = true;
    const match = path.match(/unit-(\d)/);
    if (match) unitNum = parseInt(match[1]);
  } else if (path.includes('c-programming-unit-')) {
    subjectKey = 'programming';
    isUnit = true;
    const match = path.match(/unit-(\d)/);
    if (match) unitNum = parseInt(match[1]);
  } else if (path.includes('basic-electrical-engineering-unit-')) {
    subjectKey = 'beee';
    isUnit = true;
    const match = path.match(/unit-(\d)/);
    if (match) unitNum = parseInt(match[1]);
  } else if (path.includes('data-structures-unit-')) {
    subjectKey = 'data-structures';
    isUnit = true;
    const match = path.match(/unit-(\d)/);
    if (match) unitNum = parseInt(match[1]);
  } else if (path.includes('communicative-english-unit-')) {
    subjectKey = 'english';
    isUnit = true;
    const match = path.match(/unit-(\d)/);
    if (match) unitNum = parseInt(match[1]);
  } else if (path.includes('basic-civil-and-mechanical-engineering-unit-')) {
    subjectKey = 'civil-mechanical';
    isUnit = true;
    const match = path.match(/unit-(\d)/);
    if (match) unitNum = parseInt(match[1]);
  }

  // Process subject core hubs
  if (!isUnit) {
    if (path.includes('maths-1.html')) {
      subjectKey = 'mathematics-1';
      isHub = true;
    } else if (path.includes('physics-notes.html')) {
      subjectKey = 'physics';
      isHub = true;
    } else if (path.includes('chemistry-topper-notes.html')) {
      subjectKey = 'chemistry';
      isHub = true;
    } else if (path.includes('c-programming-notes.html')) {
      subjectKey = 'programming';
      isHub = true;
    } else if (path.includes('beee-notes.html')) {
      subjectKey = 'beee';
      isHub = true;
    } else if (path.includes('data-structures-basics.html')) {
      subjectKey = 'data-structures';
      isHub = true;
    } else if (path.includes('communicative-english.html')) {
      subjectKey = 'english';
      isHub = true;
    } else if (path.includes('basic-civil-mechanical-engineering.html')) {
      subjectKey = 'civil-mechanical';
      isHub = true;
    }
  }

  return { subjectKey, unitNum, isHub, isUnit };
}

/**
 * Injects CSS rules supporting custom linking layouts.
 */
function injectLinkingStyles() {
  const styleId = 'engiprephub-linking-injected-styles';
  if (document.getElementById(styleId)) return;

  const styleEl = document.createElement('style');
  styleEl.id = styleId;
  styleEl.textContent = `
    .linking-grid-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 2rem 0;
    }
    @media (min-width: 768px) {
      .linking-grid-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1024px) {
      .linking-grid-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .linking-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 1.25rem;
      padding: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .dark .linking-card {
      background: #0f172a;
      border-color: #1e293b;
      box-shadow: none;
    }
    .linking-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px -5px rgba(59, 130, 246, 0.15);
      border-color: #3b82f6;
    }
    .progress-bar-bg {
      background: #f1f5f9;
      border-radius: 9999px;
      height: 6px;
      width: 100%;
      margin: 1rem 0;
      overflow: hidden;
    }
    .dark .progress-bar-bg {
      background: #1e293b;
    }
    .progress-bar-fill-dynamic {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #6366f1);
      border-radius: 9999px;
      transition: width 0.8s ease;
    }
    .sticky-nav-height-block {
      height: 80px;
    }
    .concept-cluster-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1.25rem 0;
    }
    .concept-chip {
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      font-size: 0.75rem;
      font-weight: 600;
      transition: all 0.2s;
      text-decoration: none !important;
    }
    .dark .concept-chip {
      background: #1e293b;
      border-color: #334155;
      color: #93c5fd;
    }
    .concept-chip:hover {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #ffffff;
      transform: scale(1.04);
    }
    .dark .concept-chip:hover {
      background: #3b82f6;
      color: #ffffff;
    }
  `;
  document.head.appendChild(styleEl);
}

/**
 * Initializes and persists returning path data inside localStorage.
 */
function recordStudyHistory(context) {
  if (!context || !context.subjectKey || !context.unitNum) return;
  const matchSubObj = subjectMap[context.subjectKey];
  if (!matchSubObj) return;
  const matchUnitObj = matchSubObj.units.find(u => u.unit === context.unitNum);
  if (!matchUnitObj) return;

  const payload = {
    subjectKey: context.subjectKey,
    subjectName: matchSubObj.name,
    unitNum: context.unitNum,
    unitTitle: matchUnitObj.title,
    url: matchUnitObj.url,
    timestamp: Date.now()
  };
  localStorage.setItem('engiprep_last_studied', JSON.stringify(payload));
}

/**
 * Rule 11: Renders return learning CTA inside homepage greeting card.
 */
export function initContinueLearning() {
  const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  if (!isHomepage) return;

  const saved = localStorage.getItem('engiprep_last_studied');
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    // Find first section in main-content to injection
    const mainSection = document.getElementById('main-content');
    if (!mainSection) return;

    if (document.getElementById('continue-learning-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'continue-learning-widget';
    widget.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-2xl animate-fade-in-up shadow-2xl';
    
    // Format dynamic label for last studied
    const minsAgo = Math.max(1, Math.floor((Date.now() - data.timestamp) / 60000));
    let timeLabel = `${minsAgo} mins ago`;
    if (minsAgo >= 60) {
      const hrsAgo = Math.floor(minsAgo / 60);
      timeLabel = hrsAgo === 1 ? '1 hour ago' : `${hrsAgo} hours ago`;
      if (hrsAgo >= 24) {
        timeLabel = 'recently';
      }
    }

    widget.innerHTML = `
      <div class="relative overflow-hidden p-6 rounded-3xl border border-blue-200/60 dark:border-blue-900/40 bg-white/75 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4 hover:border-blue-500/40 transition-colors duration-300">
        <!-- Visual Glows -->
        <div class="absolute -right-24 -bottom-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-center gap-4 relative z-10 w-full md:w-auto">
          <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/20 shrink-0">
            📖
          </div>
          <div class="space-y-0.5 truncate">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">Continue Studying</span>
              <span class="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Studied ${timeLabel}</span>
            </div>
            <h4 class="text-sm font-black text-slate-900 dark:text-white truncate max-w-[280px] sm:max-w-[420px]">
              Unit ${data.unitNum}: ${data.unitTitle}
            </h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${data.subjectName} • JNTUK R23</p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0 relative z-10 w-full md:w-auto justify-end">
          <button id="dismiss-continue-learning" class="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors cursor-pointer" title="Hide notification">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <a href="${data.url}" class="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
            <span>Resume Studying Notes</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    `;

    // Insert as the first child of main container so it matches header bounds
    mainSection.insertBefore(widget, mainSection.firstChild);

    // Bind clean dismiss event listener
    document.getElementById('dismiss-continue-learning').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      widget.classList.add('opacity-0', 'scale-95');
      setTimeout(() => widget.remove(), 300);
    });

  } catch (err) {
    console.error('Failed to restore study progress history banner:', err);
  }
}

/**
 * Rule 1: SUBJECT HUB LINKS
 * Injects beautiful interactive unit cards with progress indicators into subject core portals.
 */
function initSubjectHubUnits(context) {
  if (!context || !context.isHub || !context.subjectKey) return;
  const mapping = subjectMap[context.subjectKey];
  if (!mapping) return;

  const targetSelector = '.main';
  const parentNode = document.querySelector(targetSelector);
  if (!parentNode) return;

  // Render Section below heroic tagline
  const insertionPoint = parentNode.querySelector('.unit-hero') || parentNode.firstChild;
  if (!insertionPoint) return;

  if (document.getElementById('interactive-syllabus-hub')) return;

  const wrapper = document.createElement('section');
  wrapper.id = 'interactive-syllabus-hub';
  wrapper.className = 'px-6 md:px-12 py-8 max-w-7xl mx-auto space-y-6';

  let cardsHtml = '';
  mapping.units.forEach(u => {
    const completedKey = `engiprep_completed_${context.subjectKey}_unit_${u.unit}`;
    const isCompleted = localStorage.getItem(completedKey) === 'true';
    const percent = isCompleted ? 100 : 0;

    cardsHtml += `
      <div class="linking-card border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all relative">
        <div class="flex-1 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Module 0${u.unit}</span>
            <span class="status-badge-val text-[10px] font-black uppercase ${isCompleted ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md' : 'text-slate-400'}">
              ${isCompleted ? '✓ Completed' : 'Pending'}
            </span>
          </div>
          <h4 class="text-md font-bold text-slate-900 dark:text-white font-[Space_Grotesk]">
            Unit ${u.unit}: ${u.title}
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-sans line-clamp-2">
            ${u.desc}
          </p>

          <!-- Interactive Progress indicator -->
          <div class="space-y-1">
            <div class="flex justify-between items-center text-[10px] font-mono text-slate-400 font-bold">
              <span>PROGRESS</span>
              <span class="progress-val-lbl">${percent}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill-dynamic" style="width: ${percent}%"></div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-2 mt-4">
          <!-- Toggle Master -->
          <button data-unit-idx="${u.unit}" class="master-checkpoint-toggle text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-1.5">
            ${isCompleted ? '✓ Mastered' : 'Mark Comp'}
          </button>
          
          <a href="${u.url}" class="text-xs font-extrabold text-[#2563EB] dark:text-blue-400 hover:underline transition-colors leading-none flex items-center gap-1">
            <span>Study ${mapping.shortName} Unit ${u.unit} Notes</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    `;
  });

  wrapper.innerHTML = `
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
      <div>
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Syllabus Grid</span>
        <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-2 font-['Space_Grotesk']">Interactive Academic Portal</h3>
        <p class="text-xs text-slate-500 dark:text-slate-405">Complete each module to earn Mastery XP and maximize your internal test averages!</p>
      </div>
      <!-- Core percentage bar of subject overall -->
      <div id="subject-overall-meter" class="flex items-center gap-3 bg-slate-100/50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-850 shrink-0">
        <div class="shrink-0 relative w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 36 36" class="w-full h-full rotate-[-90deg]">
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-slate-200 dark:stroke-slate-800" stroke-width="3" />
            <circle id="subject-radial-fill" cx="18" cy="18" r="16" fill="none" class="stroke-emerald-500" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round" />
          </svg>
          <span id="subject-overall-percent" class="absolute font-mono text-[10px] font-black text-slate-800 dark:text-white">0%</span>
        </div>
        <div class="space-y-0.5">
          <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Total Mastery</span>
          <span class="text-xs font-black text-slate-800 dark:text-slate-200" id="total-mastery-desc">0 / 5 Completed</span>
        </div>
      </div>
    </div>

    <div class="linking-grid-container select-none">
      ${cardsHtml}
    </div>
  `;

  // Prepend or insert below hero block
  if (insertionPoint.nextSibling) {
    parentNode.insertBefore(wrapper, insertionPoint.nextSibling);
  } else {
    parentNode.appendChild(wrapper);
  }

  // Calculate overall metrics update function
  const updateOverallMetrics = () => {
    let completedCount = 0;
    for (let u = 1; u <= 5; ++u) {
      if (localStorage.getItem(`engiprep_completed_${context.subjectKey}_unit_${u}`) === 'true') {
        completedCount++;
      }
    }
    const percentOverall = Math.round((completedCount / 5) * 100);
    const circle = document.getElementById('subject-radial-fill');
    if (circle) {
      // Circle stroke-dasharray is 100 (matches radius=16 -> 2*pi*r ≈ 100)
      circle.style.strokeDashoffset = 100 - percentOverall;
    }
    const textPercent = document.getElementById('subject-overall-percent');
    if (textPercent) textPercent.textContent = `${percentOverall}%`;

    const descWidget = document.getElementById('total-mastery-desc');
    if (descWidget) descWidget.textContent = `${completedCount} / 5 Modules Completed`;
  };

  // Add event listener for checkpoint buttons
  wrapper.querySelectorAll('.master-checkpoint-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const uIndex = parseInt(btn.getAttribute('data-unit-idx'));
      const completedKey = `engiprep_completed_${context.subjectKey}_unit_${uIndex}`;
      const isCurrentlyCompleted = localStorage.getItem(completedKey) === 'true';

      if (!isCurrentlyCompleted) {
        localStorage.setItem(completedKey, 'true');
        btn.innerHTML = '✓ Mastered';
        btn.classList.add('border-emerald-500', 'text-emerald-500');

        // Update progress bar
        const cardNode = btn.closest('.linking-card');
        if (cardNode) {
          cardNode.querySelector('.progress-bar-fill-dynamic').style.width = '100%';
          cardNode.querySelector('.progress-val-lbl').textContent = '100%';
          cardNode.querySelector('.status-badge-val').textContent = '✓ Completed';
          cardNode.querySelector('.status-badge-val').className = 'status-badge-val text-[10px] font-black uppercase text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md';
        }

        // Gamified toast triggers
        if (typeof window.showAchievementToast === 'function') {
          window.showAchievementToast('+50 Mastery XP Premium', `Mastered ${mapping.shortName} Unit ${uIndex}! Keep completing modules.`);
        }
      } else {
        localStorage.removeItem(completedKey);
        btn.innerHTML = 'Mark Comp';
        btn.classList.remove('border-emerald-500', 'text-emerald-500');

        // Update progress bar
        const cardNode = btn.closest('.linking-card');
        if (cardNode) {
          cardNode.querySelector('.progress-bar-fill-dynamic').style.width = '0%';
          cardNode.querySelector('.progress-val-lbl').textContent = '0%';
          cardNode.querySelector('.status-badge-val').textContent = 'Pending';
          cardNode.querySelector('.status-badge-val').className = 'status-badge-val text-[10px] font-black uppercase text-slate-400';
        }
      }

      updateOverallMetrics();
    });
  });

  // Run initial metrics sync
  updateOverallMetrics();
}

/**
 * Rule 2: Injects sticky bottom Prev/Next unit slider controller.
 */
function initUnitNavigation(context) {
  if (!context || !context.isUnit || !context.subjectKey || !context.unitNum) return;
  const matchSub = subjectMap[context.subjectKey];
  if (!matchSub) return;

  const currentUnitIndex = context.unitNum;
  const prevUnit = matchSub.units.find(u => u.unit === currentUnitIndex - 1);
  const nextUnit = matchSub.units.find(u => u.unit === currentUnitIndex + 1);

  if (document.getElementById('sticky-unit-navigator')) return;

  // Render buffer blocker at bottom so footer/content is not overlapped
  const footerSpacer = document.createElement('div');
  footerSpacer.className = 'sticky-nav-height-block';
  document.querySelector('main')?.appendChild(footerSpacer);

  const stickyBar = document.createElement('div');
  stickyBar.id = 'sticky-unit-navigator';
  stickyBar.className = 'fixed bottom-4 left-4 right-4 z-[99] max-w-5xl mx-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-2xl p-3 md:p-4 select-none';

  const prevHtml = prevUnit 
    ? `<a href="${prevUnit.url}" class="flex flex-col items-start gap-0.5 group flex-1" title="Study previous Engineering ${matchSub.shortName} module.">
         <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
           ← Previous Unit
         </span>
         <span class="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:underline truncate max-w-[150px] sm:max-w-xs block leading-none pt-0.5">
           Unit ${prevUnit.unit}: ${prevUnit.title}
         </span>
       </a>`
    : `<div class="flex-1 opacity-20 cursor-default">
         <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">← First Unit</span>
         <span class="text-xs font-bold block pt-1 leading-none text-slate-400">Boundary Reached</span>
       </div>`;

  const nextHtml = nextUnit 
    ? `<a href="${nextUnit.url}" class="flex flex-col items-end gap-0.5 group flex-1 text-right" title="Study next Engineering ${matchSub.shortName} module.">
         <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
           Next Unit →
         </span>
         <span class="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:underline truncate max-w-[150px] sm:max-w-xs block leading-none pt-0.5">
           Unit ${nextUnit.unit}: ${nextUnit.title}
         </span>
       </a>`
    : `<div class="flex-1 text-right opacity-25 cursor-default">
         <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Last Unit →</span>
         <span class="text-xs font-bold block pt-1 leading-none text-slate-400">Boundary Reached</span>
       </div>`;

  const completedKey = `engiprep_completed_${context.subjectKey}_unit_${currentUnitIndex}`;
  const isCompleted = localStorage.getItem(completedKey) === 'true';

  stickyBar.innerHTML = `
    <div class="flex items-center justify-between gap-4 md:gap-8">
      <!-- Left side page nav -->
      ${prevHtml}

      <!-- Center milestone trigger -->
      <button id="sticky-milestone-check" class="shrink-0 font-sans font-black text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-2xl cursor-pointer shadow-md transition-all duration-300 flex items-center gap-1.5 ${isCompleted ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/10' : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-emerald-500 text-slate-600 dark:text-slate-300 hover:text-emerald-500'}" title="Mark unit completed and save study indicators.">
        <span class="milestone-icon">${isCompleted ? '✓' : '⚡'}</span>
        <span class="milestone-txt truncate max-w-[80px] sm:max-w-none">${isCompleted ? 'Mastered' : 'Complete & XP'}</span>
      </button>

      <!-- Right side page nav -->
      ${nextHtml}
    </div>
  `;

  document.body.appendChild(stickyBar);

  // Bind milestone toggle
  document.getElementById('sticky-milestone-check').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const btn = e.currentTarget;
    const isNowCompleted = localStorage.getItem(completedKey) === 'true';

    if (!isNowCompleted) {
      localStorage.setItem(completedKey, 'true');
      btn.className = 'shrink-0 font-sans font-black text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10 cursor-pointer transition-all duration-300 flex items-center gap-1.5';
      btn.querySelector('.milestone-icon').textContent = '✓';
      btn.querySelector('.milestone-txt').textContent = 'Mastered';

      // Gamification Hook XP trigger
      if (typeof window.showAchievementToast === 'function') {
        window.showAchievementToast('+50 Mastery XP', `Engineered and fully completed Unit ${currentUnitIndex} study checkpoint!`);
      }
    } else {
      localStorage.removeItem(completedKey);
      btn.className = 'shrink-0 font-sans font-black text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-emerald-500 text-slate-600 dark:text-slate-300 hover:text-emerald-500 cursor-pointer transition-all duration-300 flex items-center gap-1.5';
      btn.querySelector('.milestone-icon').textContent = '⚡';
      btn.querySelector('.milestone-txt').textContent = 'Complete & XP';
    }
  });
}

/**
 * Rule 3: Clickable supplements related resources container.
 */
function initRelatedResources(context) {
  if (!context || !context.isUnit || !context.subjectKey || !context.unitNum) return;
  const matchSub = subjectMap[context.subjectKey];
  if (!matchSub) return;

  const targetSelector = 'main';
  const parentNode = document.querySelector(targetSelector);
  if (!parentNode) return;

  if (document.getElementById('related-academic-resources')) return;

  const wrapper = document.createElement('section');
  wrapper.id = 'related-academic-resources';
  wrapper.className = 'max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-slate-200 dark:border-slate-850 space-y-6 mt-16';

  const listItems = [
    { title: "Important PYQs", icon: "📝", url: `/pyqs.html?subject=${context.subjectKey}&unit=${context.unitNum}`, anchor: `JNTUK ${matchSub.shortName} Unit ${context.unitNum} Solved PYQs` },
    { title: "Cheat Sheet", icon: "🔥", url: "/cheat-sheets.html", anchor: `${matchSub.shortName} Formulas Cheat Sheet` },
    { title: "Quick Revision Notes", icon: "📚", url: matchSub.hubUrl, anchor: `${matchSub.shortName} Continuous Lecture Notes` },
    { title: "Viva Questions", icon: "⚡", url: `/quiz.html?sub=${encodeURIComponent(matchSub.name)}`, anchor: `Verify Skills with ${matchSub.shortName} Viva Quiz` },
    { title: "AI Professor", icon: "🤖", url: `/ai-professor.html?q=${context.subjectKey}-unit-${context.unitNum}`, anchor: `Ask AI Professor about ${matchSub.shortName} Unit ${context.unitNum}` },
    { title: "Exam Survival Guide", icon: "🎓", url: "/exam-survival.html", anchor: `Excel in JNTUK R23 Exams Survival Guide` }
  ];

  let listHtml = '';
  listItems.forEach(item => {
    listHtml += `
      <a href="${item.url}" class="linking-card border border-slate-200 dark:border-slate-850 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-500/40 transition-colors" title="${item.anchor}">
        <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-lg mb-4">
          ${item.icon}
        </div>
        <div class="space-y-1">
          <span class="text-[9px] font-black uppercase text-slate-400 tracking-widest">${item.title}</span>
          <span class="text-sm font-black text-slate-800 dark:text-white group-hover:text-blue-500 block leading-tight font-[Space_Grotesk]">
            ${item.anchor}
          </span>
        </div>
      </a>
    `;
  });

  wrapper.innerHTML = `
    <div>
      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Supplementaries</span>
      <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-2 font-['Space_Grotesk']">Related Study Resources</h3>
      <p class="text-xs text-slate-500">Access high-yield preparation datasets corresponding to JNTUK guidelines.</p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      ${listHtml}
    </div>
  `;

  // Append inside main
  parentNode.appendChild(wrapper);
}

/**
 * Rule 4: Add "Students Also Study" advanced links.
 */
function initRelatedSubjects(context) {
  if (!context || (!context.isUnit && !context.isHub) || !context.subjectKey) return;

  const parentNode = document.querySelector('main');
  if (!parentNode) return;

  if (document.getElementById('students-also-study')) return;

  const wrapper = document.createElement('section');
  wrapper.id = 'students-also-study';
  wrapper.className = 'max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-slate-200 dark:border-slate-850 space-y-6';

  // Select 4 other subjects dynamically
  const listKeys = Object.keys(subjectMap).filter(k => k !== context.subjectKey).slice(0, 4);

  let subjectsHtml = '';
  listKeys.forEach(k => {
    const sObj = subjectMap[k];
    subjectsHtml += `
      <a href="${sObj.hubUrl}" class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 hover:border-indigo-500/40 hover:shadow-md transition-all flex items-center gap-4 relative group" title="Access verified notes for ${sObj.name}.">
        <div class="h-10 w-10 shrink-0 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 rounded-xl flex items-center justify-center font-bold text-lg">
          📚
        </div>
        <div class="space-y-0.5 truncate flex-1">
          <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none">JNTUK R23 Subject</span>
          <span class="text-sm font-black text-slate-900 dark:text-white truncate block group-hover:text-indigo-500 transition-colors font-['Space_Grotesk']">
            ${sObj.name}
          </span>
          <span class="text-[10px] text-slate-500 truncate block leading-none">Complete 5 Unit Topper syllabus guides</span>
        </div>
      </a>
    `;
  });

  wrapper.innerHTML = `
    <div>
      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 px-3 py-1 rounded-full">Syllabus Expansion</span>
      <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-2 font-['Space_Grotesk']">Students Also Study</h3>
      <p class="text-xs text-slate-500">Accelerate your overall first year credits path by preparing related engineering disciplines.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      ${subjectsHtml}
    </div>
  `;

  parentNode.appendChild(wrapper);
}

/**
 * Rule 6: Upgrades Breadcrumbs visually and injects compliant microdata.
 */
function initRefinedBreadcrumbs(context) {
  if (!context || (!context.isUnit && !context.isHub) || !context.subjectKey) return;
  const matchSub = subjectMap[context.subjectKey];
  if (!matchSub) return;

  let pageTitle = document.querySelector('h1')?.innerText || matchSub.name;
  let activeUnitLabel = '';
  if (context.isUnit && context.unitNum) {
    const matchU = matchSub.units.find(u => u.unit === context.unitNum);
    if (matchU) {
      activeUnitLabel = `Unit ${context.unitNum}: ${matchU.title}`;
    }
  }

  // Clear legacy breadcrumbs if any
  const oldElement = document.getElementById('eeat-breadcrumbs');
  if (oldElement) oldElement.remove();

  const mainContainer = document.querySelector('main');
  if (!mainContainer) return;

  const breadcrumbNav = document.createElement('nav');
  breadcrumbNav.id = 'eeat-breadcrumbs';
  breadcrumbNav.className = 'mb-6 md:mb-8 flex items-center text-[11px] md:text-xs font-black text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap px-6 md:px-12 pt-8 max-w-7xl mx-auto';

  let innerLinks = `
    <a href="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider">Home</a>
    <span class="mx-2 text-slate-300 dark:text-slate-700">/</span>
  `;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://engiprephub.in/"
      }
    ]
  };

  if (context.isHub) {
    innerLinks += `<span class="text-slate-900 dark:text-white uppercase tracking-wider truncate max-w-xs font-semibold">${matchSub.name} Topper Notes</span>`;
    structuredData.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": `${matchSub.name} Topper Notes`,
      "item": `https://engiprephub.in${matchSub.hubUrl}`
    });
  } else if (context.isUnit && context.unitNum) {
    innerLinks += `
      <a href="${matchSub.hubUrl}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider">${matchSub.name}</a>
      <span class="mx-2 text-slate-300 dark:text-slate-700">/</span>
      <span class="text-slate-900 dark:text-white uppercase tracking-wider truncate max-w-xs font-semibold">${activeUnitLabel || pageTitle}</span>
    `;

    structuredData.itemListElement.push(
      {
        "@type": "ListItem",
        "position": 2,
        "name": matchSub.name,
        "item": `https://engiprephub.in${matchSub.hubUrl}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": activeUnitLabel || pageTitle,
        "item": window.location.href
      }
    );
  }

  breadcrumbNav.innerHTML = innerLinks;
  mainContainer.insertBefore(breadcrumbNav, mainContainer.firstChild);

  // Inject json-ld block
  const oldScript = document.getElementById('linking-breadcrumb-microdata');
  if (oldScript) oldScript.remove();

  const scriptEl = document.createElement('script');
  scriptEl.id = 'linking-breadcrumb-microdata';
  scriptEl.type = 'application/ld+json';
  scriptEl.textContent = JSON.stringify(structuredData);
  document.head.appendChild(scriptEl);
}

/**
 * Rule 7: Visual step indicator recommending learning tracks.
 */
function initRecommendedLearningPath(context) {
  if (!context || !context.isUnit || !context.subjectKey || !context.unitNum) return;
  const matchSub = subjectMap[context.subjectKey];
  if (!matchSub) return;

  const parentNode = document.querySelector('main');
  if (!parentNode) return;

  if (document.getElementById('learning-pathway')) return;

  const wrapper = document.createElement('section');
  wrapper.id = 'learning-pathway';
  wrapper.className = 'max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-slate-200 dark:border-slate-850 space-y-6';

  const step1Desc = `Unit ${context.unitNum} Comprehensive Lecture Notes`;
  const step2Desc = `Analyze Unit ${context.unitNum} Important Inquiries and external Viva Questions`;
  const step3Desc = `Solve ${matchSub.shortName} Solved Previous Year Exams Calendar (2022-2024)`;

  wrapper.innerHTML = `
    <div>
      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Roadmap Pathway</span>
      <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-2 font-['Space_Grotesk']">Recommended Learning Path</h3>
      <p class="text-xs text-slate-500">Accelerate understanding by following JNTUK's peer-reviewed developmental steps.</p>
    </div>

    <div class="flex flex-col lg:flex-row items-stretch gap-6 select-none">
      <!-- Step 1 -->
      <div class="flex-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-500/20 relative flex flex-col justify-between">
        <span class="absolute top-4 right-4 text-3xl font-black font-mono text-blue-500/15">S1</span>
        <div class="space-y-2">
          <span class="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">✓ Active Chapter</span>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">${step1Desc}</h4>
          <p class="text-xs text-slate-500 font-medium">Study concepts, trace logic proofs, and review code playground exercises.</p>
        </div>
      </div>

      <!-- Arrow -->
      <div class="hidden lg:flex items-center justify-center text-slate-300 dark:text-slate-750 text-xl font-bold">➔</div>

      <!-- Step 2 -->
      <a href="/quiz.html?sub=${encodeURIComponent(matchSub.name)}" class="flex-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 relative hover:border-blue-500/40 transition-colors flex flex-col justify-between" title="Practice external viva queries for better academic readiness.">
        <span class="absolute top-4 right-4 text-3xl font-black font-mono text-slate-400/10">S2</span>
        <div class="space-y-2">
          <span class="text-[9px] font-black text-blue-500 uppercase tracking-widest block">Review practice Viva</span>
          <h4 class="text-sm font-bold text-slate-950 dark:text-slate-100 font-['Space_Grotesk']">${step2Desc}</h4>
          <p class="text-xs text-slate-500 font-medium font-sans">Self-test core topics to lock down memory matrices before final exams.</p>
        </div>
      </a>

      <!-- Arrow -->
      <div class="hidden lg:flex items-center justify-center text-slate-300 dark:text-slate-750 text-xl font-bold">➔</div>

      <!-- Step 3 -->
      <a href="/pyqs.html?subject=${context.subjectKey}&unit=${context.unitNum}" class="flex-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 relative hover:border-blue-500/40 transition-colors flex flex-col justify-between" title="Review compiled JNTUK exam archives for structural focus.">
        <span class="absolute top-4 right-4 text-3xl font-black font-mono text-slate-400/10">S3</span>
        <div class="space-y-2">
          <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest block">Solve PYQs Archives</span>
          <h4 class="text-sm font-bold text-slate-950 dark:text-slate-100 font-['Space_Grotesk']">${step3Desc}</h4>
          <p class="text-xs text-slate-500 font-medium font-sans text-left">Confirm patterns by tracking actual past JNTUK R23 questions.</p>
        </div>
      </a>
    </div>
  `;

  parentNode.appendChild(wrapper);
}

/**
 * Rule 8: Topic clusters linking system. Installs inline cards or horizontal concept clouds.
 */
function initTopicClusters(context) {
  if (!context || (!context.isUnit && !context.isHub) || !context.subjectKey) return;
  const matchSub = subjectMap[context.subjectKey];
  if (!matchSub || !matchSub.clusters) return;

  const parentNode = document.querySelector('main');
  if (!parentNode) return;

  if (parentNode.querySelector('.concept-cluster-container')) return;

  const container = document.createElement('div');
  container.className = 'concept-cluster-container bg-slate-100/40 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 mt-8 mb-4 max-w-7xl mx-auto';
  
  let chipHtml = '';
  matchSub.clusters.forEach(c => {
    chipHtml += `<a href="${c.url}" class="concept-chip" title="Read more about ${c.target}">${c.key}</a>`;
  });

  container.innerHTML = `
    <div class="flex items-center gap-2 mb-2">
      <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
      <h5 class="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">Topical Authority: Related Concepts</h5>
    </div>
    <div class="concept-cluster-wrap">
      ${chipHtml}
    </div>
  `;

  // Find a nice insertion target inside notes content if possible
  const leadContentNode = parentNode.querySelector('.unit-hero') || parentNode.firstChild;
  if (leadContentNode && leadContentNode.nextSibling) {
    parentNode.insertBefore(container, leadContentNode.nextSibling);
  } else {
    parentNode.appendChild(container);
  }
}

/**
 * Rule 9: Frequently Asked Questions of JNTUK Board Exams.
 */
function initPYQConnections(context) {
  if (!context || !context.isUnit || !context.subjectKey) return;
  const matchSub = subjectMap[context.subjectKey];
  if (!matchSub || !matchSub.pyqs) return;

  const parentNode = document.querySelector('main');
  if (!parentNode) return;

  if (document.getElementById('jntuk-frequent-pyqs')) return;

  const wrapper = document.createElement('section');
  wrapper.id = 'jntuk-frequent-pyqs';
  wrapper.className = 'max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-slate-200 dark:border-slate-850 space-y-6';

  let listHtml = '';
  matchSub.pyqs.forEach(item => {
    listHtml += `
      <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex items-start gap-4">
        <div class="px-2.5 py-1 text-[10px] font-black uppercase rounded bg-red-500/10 text-red-500 tracking-wider">
          JNTUK ${item.year}
        </div>
        <div class="flex-1 space-y-2">
          <p class="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 font-sans italic">
            "${item.q}"
          </p>
          <a href="${item.link}" class="inline-flex items-center gap-1 text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 hover:underline">
            <span>Solve JNTUK R23 Exam PYQ derivation</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    `;
  });

  wrapper.innerHTML = `
    <div>
      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 bg-red-50 dark:bg-red-950/20 px-3 py-1 rounded-full">Exam Hot-spot</span>
      <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-2 font-['Space_Grotesk']">Frequently Asked in Exams</h3>
      <p class="text-xs text-slate-500">Rigorous selection of actual past JNTUK board inquiries relevant to this module.</p>
    </div>

    <div class="space-y-3 max-w-4xl">
      ${listHtml}
    </div>
  `;

  parentNode.appendChild(wrapper);
}

/**
 * Rule 10: Injects active chatbot query bridges at end of lesson pages.
 */
function initAIProfessorSection(context) {
  if (!context || !context.isUnit || !context.subjectKey || !context.unitNum) return;
  const matchSub = subjectMap[context.subjectKey];
  if (!matchSub) return;

  const parentNode = document.querySelector('main');
  if (!parentNode) return;

  if (document.getElementById('ai-prof-section-cta')) return;

  const section = document.createElement('section');
  section.id = 'ai-prof-section-cta';
  section.className = 'max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-slate-200 dark:border-slate-850';

  const defaultTopicQuery = `${matchSub.shortName} Unit ${context.unitNum} syllabus`;

  section.innerHTML = `
    <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="absolute -right-24 -bottom-24 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div class="flex items-start gap-4 relative z-10 max-w-xl">
        <div class="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl text-white shrink-0 shadow-lg shadow-blue-500/20">
          🤖
        </div>
        <div class="space-y-1.5">
          <span class="text-[9px] font-black uppercase text-blue-400 tracking-wider">Doubts Clarifier</span>
          <h4 class="text-lg font-black text-white font-[#Space_Grotesk]">Ask AI Professor About This Topic</h4>
          <p class="text-xs text-slate-400 font-medium font-sans">
            Need step-by-step mathematical proofs or a custom explanations of ${matchSub.shortName} formulations? Ask our JNTUK R23 tuned study assistant.
          </p>
        </div>
      </div>

      <div class="shrink-0 relative z-10 w-full md:w-auto">
        <a href="/ai-professor.html?q=${encodeURIComponent(defaultTopicQuery)}" class="w-full md:w-auto text-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 block transition-all">
          Query JNTUK AI Study Assistant
        </a>
      </div>
    </div>
  `;

  parentNode.appendChild(section);
}

/**
 * Main initializer for routing system
 */
export function initInternalLinkingSystem() {
  if (typeof window === 'undefined') return;

  injectLinkingStyles();

  const context = detectPageContext();
  
  // Record history immediately if educational page matching context
  recordStudyHistory(context);

  // Initialize modular elements matching strict compliance rules
  initContinueLearning();
  initRefinedBreadcrumbs(context);
  initTopicClusters(context);
  initSubjectHubUnits(context);
  initUnitNavigation(context);
  initPYQConnections(context);
  initRecommendedLearningPath(context);
  initRelatedResources(context);
  initAIProfessorSection(context);
  initRelatedSubjects(context);
}
