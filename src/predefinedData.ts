export const PREDEFINED_EXPLANATIONS: Record<string, string> = {
  "binary to decimal": "To convert binary to decimal, multiply each bit by 2 raised to the power of its position (starting from 0 on the right) and sum the results. For example: 1011 = (1×2³) + (0×2²) + (1×2¹) + (1×2⁰) = 8 + 0 + 2 + 1 = 11.",
  "python": "Python is a high-level, interpreted programming language known for its readability and large standard library. It's widely used in Data Science, AI, and Web Development. Key features: Dynamic typing, automatic memory management, and multi-paradigm support.",
  "thermodynamics": "Thermodynamics is the branch of physics that deals with heat, work, and temperature, and their relation to energy, entropy, and the physical properties of matter and radiation. The four laws of thermodynamics govern these quantities.",
  "circuits": "Electric circuits involve the flow of charge. Key laws include Ohm's Law (V=IR) and Kirchhoff's Laws (KCL for current, KVL for voltage). JNTUK exams often test mesh and nodal analysis.",
  "operating systems": "An Operating System (OS) is software that manages computer hardware and software resources. Important topics: Process management, CPU scheduling (FCFS, SJF, Round Robin), and Memory management (Paging, Segmentation).",
  "mechanical": "Mechanical Engineering basics cover statics, dynamics, and materials. Focus on Stress-Strain curves, the laws of motion, and simple machines like levers and pulleys for introductory exams."
};

export const PREDEFINED_ANSWERS: Record<string, string> = {
  "who are you": "I am the EngiPrep Professor, your AI-powered companion for JNTUK engineering studies. I'm here to simplify complex concepts and help you ace your exams!",
  "what is your name": "You can call me Professor. I'm part of the EngiPrep Hub ecosystem.",
  "how to study": "The best way to study for JNTUK exams is to: 1. Review previous year question papers. 2. Focus on high-weightage units. 3. Practice derivations and numericals. 4. Use EngiPrep's AI Assistant for clarifications!",
  "hello": "Hello, Scholar! I'm ready to help you with your engineering queries. What can I explain for you today?",
  "hi": "Greetings! Ready to dive into some engineering concepts?"
};

export const PREDEFINED_QUIZZES: Record<string, any[]> = {
  "python": [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "define", "def", "lambda"],
      answer: "def",
      explanation: "'def' is used for standard function definitions in Python."
    },
    {
      question: "What is the correct file extension for Python files?",
      options: [".py", ".pyt", ".ptl", ".pyc"],
      answer: ".py",
      explanation: ".py is the standard extension for Python source files."
    }
  ]
};
