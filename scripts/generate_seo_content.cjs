const fs = require('fs');

const subjects = [
    { name: "Engineering Mathematics 1", link: "/engineering-mathematics-1.html",  short: "M1" },
    { name: "Engineering Physics", link: "/physics-notes.html", short: "Physics" },
    { name: "Engineering Chemistry", link: "/chemistry-topper-notes.html", short: "Chemistry" },
    { name: "C Programming", link: "/c-programming-notes.html", short: "C Lang" },
    { name: "Data Structures", link: "/data-structures-basics.html", short: "DS" },
    { name: "Engineering Graphics", link: "/engineering-graphics-lab.html", short: "EG" },
    { name: "Basic Electrical Engineering", link: "/beee-notes.html", short: "BEEE" },
    { name: "Basic Civil and Mechanical Engineering", link: "/basic-civil-mechanical-engineering.html", short: "BCME" },
    { name: "Communicative English", link: "/communicative-english.html", short: "English" }
];

const units = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"];

const categories = [
    "Exam Preparation", "PYQs", "Important Questions", "One-Day Preparation",
    "Last Minute Revision", "Viva Questions", "Lab Records", "Assignments",
    "Internal Exams", "Semester Exams", "Backlog Preparation", "SGPA/CGPA",
    "Career Guidance", "Coding", "Placement Preparation", "Traffic Magnets",
    "Google Discover", "Authority Guide"
];

const blueprints = [];

function add(category, sub, kw, difficulty, link) {
    blueprints.push({ category, sub, kw, difficulty, link });
}

// 1. Generate Silo Content for Subjects x Categories (mix them)
subjects.forEach(subj => {
    add("PYQs", `${subj.name} All Units Previous Year Questions`, `jntuk r23 ${subj.short.toLowerCase()} pyqs previous question papers pdf`, "Medium", subj.link);
    add("PYQs", `${subj.name} Repeated Exam Questions`, `${subj.short.toLowerCase()} repeated questions jntuk previous year`, "Medium", subj.link);
    add("Important Questions", `${subj.name} Top 50 Important Questions`, `top 50 ${subj.short.toLowerCase()} important questions jntuk r23`, "Easy", subj.link);
    add("One-Day Preparation", `How to pass ${subj.name} in One Day`, `pass ${subj.name.toLowerCase()} in one day preparation strategy jntuk`, "Easy", subj.link);
    add("Last Minute Revision", `${subj.name} Last Minute Revision Notes`, `${subj.short.toLowerCase()} last minute revision notes quick formulas`, "Easy", subj.link);
    add("Viva Questions", `${subj.name} Top 100 Viva Questions and Answers`, `${subj.short.toLowerCase()} lab viva questions with answers pdf download jntuk`, "Medium", subj.link);
    add("Lab Records", `${subj.name} Lab Manual and Record Observations`, `${subj.short.toLowerCase()} lab manual record observations pdf jntuk`, "Medium", subj.link);
    add("Assignments", `${subj.name} Assignment Solutions and Answers`, `${subj.short.toLowerCase()} assignment answers solutions jntuk r23`, "Easy", subj.link);
    add("Internal Exams", `${subj.name} Mid 1 & Mid 2 Important Questions`, `${subj.short.toLowerCase()} internals mid 1 mid 2 important questions jntuk`, "Easy", subj.link);
    add("Semester Exams", `${subj.name} Semester End Exam Blueprint`, `${subj.short.toLowerCase()} semester end exam structural blueprint r23 jntuk`, "Hard", subj.link);
    add("Backlog Preparation", `How to clear ${subj.name} Supply/Backlogs`, `how to clear ${subj.short.toLowerCase()} backlogs supply jntuk strategy`, "Medium", subj.link);
});

// 2. Specific Topic additions (Coding, SGPA, GD, Placement, etc.)
add("SGPA/CGPA", "SGPA to CGPA Converter JNTUK Algorithms", "sgpa to cgpa conversion formula calculations jntuk r23", "Easy", "/tools.html");
add("SGPA/CGPA", "How to calculate JNTUK R23 Credits efficiently", "how to calculate credits internal external weightage jntuk", "Medium", "/tools.html");
add("SGPA/CGPA", "JNTUK R23 Grading System Explained", "jntuk r23 grading system passing marks class division", "Easy", "/tools.html");

add("Coding", "Top 50 C Programs for First Year Exams", "top 50 c programs for engineering first year lab exams", "Easy", "/c-programming-notes.html");
add("Coding", "Data Structures Array vs Linked List Implementations", "arrays vs linked list codes algorithms data structures c", "Hard", "/data-structures-basics.html");
add("Coding", "Pointers in C explained simply with memory diagrams", "c pointers memory addressing explanation visual diagrams", "Medium", "/c-programming-notes.html");
add("Coding", "Sorting Algorithms Bubble Selection Insertion Codes", "sorting algorithms source codes c programming jntuk", "Medium", "/data-structures-basics.html");
add("Coding", "Binary Search Trees recursive codes C language", "binary search tree traversal coding recursion answers", "Hard", "/data-structures-basics.html");

add("Placement Preparation", "TCS NQT Ninja Prep Guide for First Years", "tcs ninja digital nqt preparation coding round tips", "Medium", "/c-programming-notes.html");
add("Placement Preparation", "Accenture off-campus tech interview questions", "accenture coding technical interview questions c data structures", "Medium", "/data-structures-basics.html");
add("Placement Preparation", "Best Resume Template for B.Tech Freshers", "btech fresher resume templates free download ats friendly", "Easy", "/communicative-english.html");

add("Career Guidance", "Which Engineering Branch is Best for High Salaries", "which btech branch has highest salary placements future", "Easy", "/semester-1.html");
add("Career Guidance", "How to get an Internship in 1st Year B.Tech", "first year engineering internships how to apply guide", "Medium", "/semester-1.html");

add("Traffic Magnets", "Top 100 Engineering Viva Questions", "top 100 basic engineering viva questions lab practicals", "Easy", "/semester-1.html");
add("Traffic Magnets", "Best Engineering Study Timetable", "best engineering student study timetable tracker daily routine", "Easy", "/semester-1.html");
add("Traffic Magnets", "Topper Strategies to score 10 SGPA", "university topper study strategies secret tricks 10 sgpa", "Medium", "/semester-1.html");
add("Traffic Magnets", "100 Most Important JNTUK Questions all subjects", "100 most important jntuk regular questions all subjects pdf", "Hard", "/semester-1.html");
add("Traffic Magnets", "Most Repeated Questions in JNTUK R23 Exams", "most repeated questions in jntuk r23 semester exams pdf", "Easy", "/semester-1.html");

add("Google Discover", "Student Success Stories: Zero to 9.5 CGPA", "student success story engineering average to topper", "Easy", "/semester-1.html");
add("Google Discover", "Exam Hacks: Psychological Tricks for Evaluators", "psychological paper writing tricks for exam evaluators", "Easy", "/semester-1.html");
add("Google Discover", "Memory Tricks to remember complex Chemical Formulas", "how to memorize chemical equations chemistry memory hacks", "Easy", "/chemistry-topper-notes.html");
add("Google Discover", "Productivity Systems for Coder Students", "notion productivity system for engineering students coders", "Easy", "/c-programming-notes.html");
add("Google Discover", "Top AI Tools every JNTU Student should use", "best ai tools for engineering homework assignments projects", "Easy", "/ai-professor.html");

add("Authority Guide", "Ultimate JNTUK R23 Guide", "complete jntuk r23 syllabus regulation guide materials", "Hard", "/index.html");
add("Authority Guide", "Complete First Year Engineering Roadmap", "first year btech engineering complete roadmap resources", "Hard", "/semester-1.html");
add("Authority Guide", "Complete Engineering Graphics Tutorial & Commands", "complete engineering graphics autocad tutorials commands guide", "Hard", "/engineering-graphics-lab.html");
add("Authority Guide", "Complete C Programming Handbook for R23", "c programming complete handbook notes solutions code", "Hard", "/c-programming-notes.html");
add("Authority Guide", "Complete Engineering Physics Handbook", "engineering physics textbook standard handbook notes pdf", "Hard", "/physics-notes.html");
add("Authority Guide", "Complete Engineering Chemistry Roadmap", "engineering chemistry complete subject roadmap topics pdf", "Hard", "/chemistry-topper-notes.html");

const extraTopics = [
    "Diagram Drawing Tips", "Numericals Practice Sheet", "Objective Bits (MCQs)", 
    "Syllabus Weightage Analysis", "Previous Mid exam papers", "Chapter Summary",
    "Subject Expert Advice", "Textbook vs Notes strategy", "Online Simulator tools"
];

let counter = 0;
while (blueprints.length < 320) {
    const subj = subjects[counter % subjects.length];
    const unit = units[counter % units.length];
    const difficulty = ["Easy", "Medium", "Hard"][counter % 3];
    const extra = extraTopics[counter % extraTopics.length];
    
    add(
        "Exam Preparation",
        `${subj.name} ${unit} ${extra}`,
        `${subj.short.toLowerCase()} ${unit.toLowerCase()} ${extra.toLowerCase()} jntuk r23 guide`,
        difficulty,
        subj.link
    );
    counter++;
}

const fileContent = `// JNTUK R23 Academic Blog & SEO Content Blueprint Vault
// Contains 300+ high-yield, specific topics covering light and dark theme pairings.

export interface BlogTopic {
  id: string;
  category: string;
  title: string;
  slug: string;
  metaDescription: string;
  primaryKeyword: string;
  searchIntent: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  trafficPotential: string;
  internalLinks: string[];
  schemaType: string;
  outline: string;
}

const rawBlueprints = ${JSON.stringify(blueprints, null, 2)};

export const getBlogTopics = (): BlogTopic[] => {
  return rawBlueprints.map((item, idx) => {
    const id = "blog-idx-" + (idx + 1);
    const cleanTitle = "JNTUK R23 Guide: " + item.sub;
    const slug = item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + item.kw.replace(/[^a-z0-9]+/g, "-");
    const primaryKeyword = item.kw;
    
    let textVibe = "notes and complete unit breakdown";
    if (item.category === "PYQs") textVibe = "compiled board previous papers and important chapterwise questions with solutions";
    if (item.category === "Exam Prep" || item.category === "Exam Preparation") textVibe = "study frameworks, time allocation cheats, and standard engineering trends";
    if (item.category === "Viva Questions") textVibe = "crucial lab viva, oral exam questions with complete answers";
    if (item.category === "Formulas") textVibe = "complete mathematical formulas, equations, definitions cheat sheets";
    
    const metaDescription = "Download the comprehensive guide on " + item.sub + " with complete " + textVibe + " for JNTUK R23 syllabus first year. Maximize your CGPA today!";
    
    let searchIntent = "Informational";
    if (["SGPA/CGPA", "Calculator Pages", "Placement Preparation"].includes(item.category)) searchIntent = "Commercial";

    let trafficPotential = "4.1K - 5.8K Monthly";
    if (item.difficulty === "Easy") trafficPotential = "9.5K - 12K Monthly";
    if (item.difficulty === "Medium") trafficPotential = "6.2K - 8.5K Monthly";

    let schemaType = "TechArticle";
    if (item.category === "Viva Questions" || item.category === "FAQs") schemaType = "FAQPage";
    
    const outline = [
      "1. Introduction",
      "   - Introduction to " + item.sub,
      "   - Learning Outcomes",
      "2. Theory & Structural Breakdown",
      "   - Core concepts, formulas, derivations",
      "   - Real-time Examples",
      "3. Important Exam Questions (PYQ Analysis)",
      "   - Frequently asked questions",
      "   - Common Mistakes & Exam Tips",
      "4. Summarized FAQs",
      "   - Practical student queries",
      "5. Next Steps",
      "   - Summary and Related Topics"
    ].join("\\n");

    return {
      id,
      category: item.category,
      title: cleanTitle,
      slug,
      metaDescription,
      primaryKeyword,
      searchIntent,
      difficulty: item.difficulty,
      trafficPotential,
      internalLinks: [item.link || "/semester-1.html", "/tools.html", "/notes.html", "/pyqs.html", "/ai-professor.html"],
      schemaType,
      outline
    };
  });
};
`;

fs.writeFileSync('src/predefinedBlogs.ts', fileContent);
console.log('Successfully generated 300+ blog blueprints into src/predefinedBlogs.ts');
