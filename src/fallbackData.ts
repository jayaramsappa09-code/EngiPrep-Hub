export const FALLBACK_TOPICS: Record<string, { explanation: string, quiz: any[], summary: string }> = {
  "computer science": {
    explanation: "Computer Science is the study of algorithmic processes, computational machines, and computation itself. In the context of JNTUK exams, focus on the distinction between hardware and software, and the layers of the OS.",
    summary: "- Study of algorithms and computation.\n- Key focus: Programming, Data Structures, Algorithms, OS, and Networking.\n- Foundations: Logic and Mathematics.",
    quiz: [
      {
        question: "Which data structure follows the LIFO (Last In First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        answer: "Stack",
        explanation: "A Stack adds and removes elements from the same end, making the last one added the first one removed."
      },
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Transfer Main Log", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language",
        explanation: "HTML is the standard markup language for creating web pages."
      }
    ]
  },
  "data structures": {
    explanation: "Data structures are specialized formats for organizing, processing, retrieving, and storing data. Common JNTUK topics include Arrays, Linked Lists, Stacks, Queues, and Trees. Arrays are static; Linked Lists are dynamic.",
    summary: "- Techniques for organizing data efficiently.\n- Linear vs Non-linear structures.\n- Complexity: Time and Space (Big O notation).",
    quiz: [
      {
        question: "What is the time complexity of searching an element in a balanced BST?",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        answer: "O(log n)",
        explanation: "Binary Search Trees cut the search space in half at each step."
      }
    ]
  },
  "thermodynamics": {
    explanation: "Thermodynamics is the branch of physics that deals with heat, work, and temperature. Focus on the Zeroth, First, and Second Laws for your exams. The First Law is essentially the conservation of energy.",
    summary: "- Study of energy conversion.\n- Laws of Thermodynamics are foundational.\n- Key concepts: Entropy, Enthalpy, and internal energy.",
    quiz: [
      {
        question: "Which law of thermodynamics defines the concept of temperature?",
        options: ["First Law", "Second Law", "Third Law", "Zeroth Law"],
        answer: "Zeroth Law",
        explanation: "The Zeroth Law states that if two systems are in thermal equilibrium with a third, they are in equilibrium with each other."
      }
    ]
  },
  "analog communications": {
    explanation: "Analog communication uses continuous signals. Major topics include AM (Amplitude Modulation), FM (Frequency Modulation), and PM. FM is generally superior in noise resistance compared to AM.",
    summary: "- Transmission of continuous signals.\n- Modulation techniques: AM, FM, PM.\n- Important for radio and traditional broadcasting.",
    quiz: [
      {
        question: "Which modulation technique is most affected by noise?",
        options: ["FM", "AM", "PM", "PCM"],
        answer: "AM",
        explanation: "Noise primarily affects the amplitude of a signal, making AM very susceptible."
      }
    ]
  },
  "python": {
    explanation: "Python is a high-level, interpreted programming language known for readability. In engineering, it's used for AI, Data Science, and automation. Remember: Indentation is syntactically significant in Python.",
    summary: "- Readable, interpreted language.\n- Versatile: Web, AI, Science, Scripting.\n- Key feature: Large standard library and ecosystem.",
    quiz: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "func", "def", "lambda"],
        answer: "def",
        explanation: "'def' is used for standard function definitions."
      }
    ]
  },
  "circuits": {
    explanation: "Electric circuits involve the flow of charge. Key laws include Ohm's Law (V=IR) and Kirchhoff's Laws (KCL for current, KVL for voltage). JNTUK exams often test mesh and nodal analysis.",
    summary: "- V=IR (Ohm's Law).\n- KCL: Current entering a junction = Current leaving.\n- KVL: Sum of voltages in a loop = 0.\n- Series vs Parallel connections.",
    quiz: [
      {
        question: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: "Ohm",
        explanation: "Resistance is measured in Ohms (Ω), representing the opposition to current flow."
      }
    ]
  },
  "operating systems": {
    explanation: "An Operating System (OS) is software that manages computer hardware and software resources. Important topics: Process management, CPU scheduling (FCFS, SJF, Round Robin), and Memory management (Paging, Segmentation).",
    summary: "- Resource manager (CPU, Memory, I/O).\n- Scheduling algorithms are critical.\n- Virtual memory and Deadlocks are common exam topics.",
    quiz: [
      {
        question: "Which of the following is NOT a CPU scheduling algorithm?",
        options: ["FCFS", "Round Robin", "SJF", "LIFO"],
        answer: "LIFO",
        explanation: "LIFO is a stack access principle, not a standard CPU scheduling algorithm."
      }
    ]
  },
  "mechanical": {
    explanation: "Mechanical Engineering basics cover statics, dynamics, and materials. Focus on Stress-Strain curves, the laws of motion, and simple machines like levers and pulleys for introductory exams.",
    summary: "- Study of machines and mechanics.\n- Stress = Force / Area.\n- Hooke's Law: Stress is proportional to Strain within elastic limits.",
    quiz: [
      {
        question: "What is Hooke's Law related to?",
        options: ["Fluids", "Elasticity", "Electricity", "Heat"],
        answer: "Elasticity",
        explanation: "Hooke's Law states that the strain of a material is proportional to the applied stress within its elastic limit."
      }
    ]
  }
};

export const FALLBACK_ANSWERS: Record<string, string> = {
  "hello": "Greetings, Scholar! I am your EngiPrep Professor. How can I help you with your JNTUK engineering studies today?",
  "tips": "Here are 3 tips for JNTUK exams:\n1. Focus on previous 3 years' question papers.\n2. Practice drawing neat diagrams.\n3. Master 2-3 units perfectly rather than skimming all five.",
  "jntuk": "Jawaharlal Nehru Technological University, Kakinada (JNTUK) is a leading university in Andhra Pradesh. Their exams often emphasize standard textbook definitions and derivations.",
  "credits": "EngiPrep was built to help engineering students access high-quality notes and AI tutoring for free."
};
