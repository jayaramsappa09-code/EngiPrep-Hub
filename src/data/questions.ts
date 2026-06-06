export interface Question {
  id: string;
  subject: string;
  unit: number;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  frequencyScore: number;
  questionType: 'Long Answer' | 'Short Answer' | 'Derivation' | 'Numerical' | 'Viva' | 'Lab';
  question: string;
  solution: string;
  shortcutMethod?: string;
  formulaUsed: string[];
  commonMistakes: string[];
  examTips: string;
  keywords: string[];
  relatedQuestions: string[];
  expectedInExam2026: boolean;
  slug: string;
}

export const QUESTION_DATABASE: Question[] = [
  {
    id: "M1-U1-Q001",
    subject: "Engineering Mathematics I",
    unit: 1,
    topic: "Differential Equations",
    difficulty: "Medium",
    marks: 10,
    frequencyScore: 5,
    questionType: "Long Answer",
    question: "Solve the differential equation: (dy/dx) + y tan(x) = sec(x).",
    solution: "1. Identify linear form: dy/dx + Py = Q. Here P = tan(x), Q = sec(x).\n2. Find Integrating Factor (IF) = e^(∫P dx) = e^(∫tan(x) dx) = e^(ln(sec x)) = sec(x).\n3. General solution: y·IF = ∫(Q·IF) dx + C\n4. y·sec(x) = ∫(sec(x)·sec(x)) dx + C = ∫sec²(x) dx + C\n5. y·sec(x) = tan(x) + C. Final form: y = sin(x) + C cos(x).",
    shortcutMethod: "Recognize that IF is sec(x), then multiply and integrate the squared secant term directly.",
    formulaUsed: ["∫tan(x) dx = ln(sec x)", "∫sec²(x) dx = tan(x)"],
    commonMistakes: ["Applying Bernoulli instead of linear", "Incorrect sign on tan(x) integration"],
    examTips: "Check if the equation is homogeneous before attempting linear method.",
    keywords: ["Differential Equations", "Integrating Factor", "Linear"],
    relatedQuestions: ["M1-U1-Q002"],
    expectedInExam2026: true,
    slug: "solve-dy-dx-plus-ytanx-equals-secx"
  },
  {
    id: "CP-U1-Q001",
    subject: "C Programming",
    unit: 1,
    topic: "Fundamentals",
    difficulty: "Easy",
    marks: 5,
    frequencyScore: 5,
    questionType: "Short Answer",
    question: "Differentiate between 'a' and \"a\" in C.",
    solution: "'a' is a character constant (represented as an integer ASCII value, e.g., 97).\n\"a\" is a string literal (an array of characters terminated by a null character '\\0', size 2 bytes: 'a' and '\\0').",
    shortcutMethod: "Single quotes = single char (int size), Double quotes = string (array + \\0).",
    formulaUsed: [],
    commonMistakes: ["Treating character constant as string", "Incorrectly assigning string to a char variable"],
    examTips: "Always emphasize the null terminator in strings.",
    keywords: ["C Programming", "Strings", "Character Constants"],
    relatedQuestions: ["CP-U1-Q002"],
    expectedInExam2026: true,
    slug: "difference-between-a-and-string-a"
  },
  {
    id: "PHYS-U1-Q001",
    subject: "Engineering Physics",
    unit: 1,
    topic: "Wave Optics",
    difficulty: "Hard",
    marks: 10,
    frequencyScore: 4,
    questionType: "Derivation",
    question: "Derive the condition for maxima and minima in Newton's rings experiment.",
    solution: "1. Path difference Δ = 2μt cos(r) + λ/2.\n2. For air film, μ=1, r=0 (normal incidence), Δ = 2t + λ/2.\n3. Maxima (Bright): 2t = (n + 1/2)λ.\n4. Minima (Dark): 2t = nλ.",
    shortcutMethod: "Remember 2t = nλ for dark, and add λ/2 shift for interference condition.",
    formulaUsed: ["Δ = 2μt cos(r) + λ/2"],
    commonMistakes: ["Omitting the λ/2 correction factor", "Assuming glass film without correction"],
    examTips: "Draw the ray diagram accurately; it's worth half the marks.",
    keywords: ["Newton's Rings", "Interference", "Optics"],
    relatedQuestions: ["PHYS-U1-Q002"],
    expectedInExam2026: true,
    slug: "derive-newtons-rings-condition"
  }
];
