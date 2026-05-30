export const ROUTES = [
  {
    id: "m1_u1",
    subject: "Mathematics I",
    unit: "Unit 1",
    topic: "Matrices & Cayley-Hamilton",
    aliases: ["m1", "maths 1", "matrices", "maths unit 1", "cayley hamilton", "cayley-hamilton", "inverse of matrix", "characteristic equation", "eigenvalues", "eigenvectors"],
    keywords: ["matrix", "eigenvalue", "eigenvector", "cayley", "hamilton", "trace", "determinant", "characteristic"],
    intentTags: ["notes", "explanation", "formulas"],
    difficulty: "Hard",
    url: "/engineering-mathematics"
  },
  {
    id: "m1_u2",
    subject: "Mathematics I",
    unit: "Unit 2",
    topic: "Mean Value Theorems",
    aliases: ["mean value", "lmvt", "cmvt", "rolle's theorem", "calculus", "differential calculus", "lagrange", "cauchy", "bernoulli equations", "bernoulli"],
    keywords: ["rolle", "lagrange", "cauchy", "mean", "value", "theorem", "derivative", "differentiable", "continuous", "bernoulli"],
    intentTags: ["notes", "explanation", "formulas"],
    difficulty: "Medium",
    url: "/engineering-mathematics"
  },
  {
    id: "physics_u1",
    subject: "Engineering Physics",
    unit: "Unit 1",
    topic: "Wave Optics & Newton's Rings",
    aliases: ["physics", "physics notes", "wave optics", "newtons rings", "newton rings", "interference", "optics", "spectral lines"],
    keywords: ["ring", "wavelength", "refractive", "interference", "film", "lens", "wedge", "coherent", "stokes"],
    intentTags: ["notes", "explanation", "sheet", "formulas"],
    difficulty: "Hard",
    url: "/engineering-physics"
  },
  {
    id: "physics_u2",
    subject: "Engineering Physics",
    unit: "Unit 2",
    topic: "Lasers & Einstein Coefficients",
    aliases: ["laser", "einstein", "einstein coefficients", "stimulated emission", "spontaneous emission"],
    keywords: ["coeff", "population inversion", "laser", "pumping", "stimulated", "absorption", "emission"],
    intentTags: ["notes", "explanation"],
    difficulty: "Medium",
    url: "/engineering-physics"
  },
  {
    id: "c_u1",
    subject: "PPS C Programming",
    unit: "Unit 1",
    topic: "Structure & Union Sizing",
    aliases: ["c structures", "unions", "struct", "union", "structures and unions", "pps", "sizeof class", "c programming"],
    keywords: ["struct", "union", "size", "bytes", "alignment", "padding", "memory", "recursion", "factorial"],
    intentTags: ["notes", "explanation", "lab"],
    difficulty: "Medium",
    url: "/c-programming"
  },
  {
    id: "c_u2",
    subject: "PPS C Programming",
    unit: "Unit 2",
    topic: "Pointers & References",
    aliases: ["pointers", "dereference", "address-of", "pointer arithmetic", "c pointers", "c pointers", "c lab", "clab"],
    keywords: ["pointer", "dereference", "address", "ampersand", "asterisk", "allocation", "memory"],
    intentTags: ["notes", "explanation", "visualizer"],
    difficulty: "Hard",
    url: "/c-programming"
  },
  {
    id: "chemistry_u1",
    subject: "Engineering Chemistry",
    unit: "Unit 1",
    topic: "Water Demineralization",
    aliases: ["chemistry", "water", "demineralization", "ion exchange", "hardness of water", "chemistry notes"],
    keywords: ["resin", "cation", "anion", "demin", "ion", "exchange", "zeolite", "clarke"],
    intentTags: ["notes", "explanation"],
    difficulty: "Medium",
    url: "/engineering-chemistry"
  },
  {
    id: "chemistry_u2",
    subject: "Engineering Chemistry",
    unit: "Unit 2",
    topic: "Battery Cells & Electrochemistry",
    aliases: ["electrochemistry", "batteries", "lead acid", "galvanic cell", "lithium ion"],
    keywords: ["cathode", "anode", "cell", "electrolyte", "lead-acid", "oxidation", "reduction"],
    intentTags: ["notes", "explanation", "formulas"],
    difficulty: "Hard",
    url: "/engineering-chemistry"
  },
  {
    id: "beee_u1",
    subject: "Basic Electrical Engineering",
    unit: "Unit 1",
    topic: "Superposition Theorem",
    aliases: ["beee", "beee lab", "superposition", "mesh analysis", "circuit theorem", "thevenin"],
    keywords: ["resistor", "voltage source", "current source", "short circuit", "open circuit", "superposition"],
    intentTags: ["notes", "explanation", "calc"],
    difficulty: "Hard",
    url: "/basic-electrical-engineering"
  },
  {
    id: "beee_u2",
    subject: "Basic Electrical Engineering",
    unit: "Unit 2",
    topic: "Power Factor & AC Circuits",
    aliases: ["power factor", "ac circuits", "impedance", "resonance", "reactive power"],
    keywords: ["phase", "apparent", "reactive", "active", "power", "cos phi", "inductor", "capacitor"],
    intentTags: ["notes", "explanation", "formulas"],
    difficulty: "Medium",
    url: "/basic-electrical-engineering"
  },
  {
    id: "graphics_u1",
    subject: "Engineering Graphics",
    unit: "Unit 1",
    topic: "Drawing Scales & Curves",
    aliases: ["graphics", "engg graphics", "curves", "ellipses", "involutes", "parabolas", "conic sections", "drawing scales", "eg", "how to draw ellipse", "ellipse"],
    keywords: ["scale", "ellipse", "parabola", "hyperbola", "involute", "cycloid", "tangent"],
    intentTags: ["notes", "explanation", "drawing", "lab"],
    difficulty: "Medium",
    url: "/engineering-graphics"
  },
  {
    id: "graphics_u2",
    subject: "Engineering Graphics",
    unit: "Unit 2",
    topic: "Projections of Points & Lines",
    aliases: ["projections", "projection of lines", "hp vp", "true length", "inclination", "autocad", "drawing"],
    keywords: ["projection", "hp", "vp", "ground line", "xy", "elevation", "plan", "coordinate"],
    intentTags: ["notes", "explanation", "drawing", "lab"],
    difficulty: "Hard",
    url: "/engineering-graphics"
  },
  {
    id: "ai_professor",
    subject: "All Subjects",
    unit: "Suite",
    topic: "AI Professor & Simulator Suite",
    aliases: ["professor", "ai class", "viva trainer", "roadmap", "memory index", "weak topics", "classroom"],
    keywords: ["viva", "simulation", "roadmap", "matrix", "game", "gaps", "academic", "class"],
    intentTags: ["simulator", "lab"],
    difficulty: "Easy",
    url: "/ai-professor.html"
  },
  {
    id: "pyqs",
    subject: "All Subjects",
    unit: "Core",
    topic: "Syllabus PYQ Repository",
    aliases: ["pyq", "pyqs", "previous papers", "important questions", "board papers", "most important pyqs"],
    keywords: ["question", "papers", "exam", "jntuk", "nov", "may", "model", "r23"],
    intentTags: ["sheet", "test"],
    difficulty: "Medium",
    url: "/jntuk-r23-previous-question-papers"
  },
  {
    id: "cheat_sheets",
    subject: "All Subjects",
    unit: "Core",
    topic: "C Programming & Engineering Cheat Sheets",
    aliases: ["cheat sheet", "revision sheet", "summary cards", "formulas", "formula lab"],
    keywords: ["cheat", "sheet", "summary", "cards", "quick", "reference", "formula", "formulas"],
    intentTags: ["sheet"],
    difficulty: "Easy",
    url: "/c-programming-cheat-sheet"
  }
];
