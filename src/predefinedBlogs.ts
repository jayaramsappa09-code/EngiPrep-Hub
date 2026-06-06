// JNTUK R23 Academic Blog & SEO Content Blueprint Vault
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

const rawBlueprints = [
  {
    "category": "PYQs",
    "sub": "Engineering Mathematics 1 All Units Previous Year Questions",
    "kw": "jntuk r23 m1 pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "PYQs",
    "sub": "Engineering Mathematics 1 Repeated Exam Questions",
    "kw": "m1 repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Important Questions",
    "sub": "Engineering Mathematics 1 Top 50 Important Questions",
    "kw": "top 50 m1 important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass Engineering Mathematics 1 in One Day",
    "kw": "pass engineering mathematics 1 in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "Engineering Mathematics 1 Last Minute Revision Notes",
    "kw": "m1 last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Viva Questions",
    "sub": "Engineering Mathematics 1 Top 100 Viva Questions and Answers",
    "kw": "m1 lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Lab Records",
    "sub": "Engineering Mathematics 1 Lab Manual and Record Observations",
    "kw": "m1 lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Assignments",
    "sub": "Engineering Mathematics 1 Assignment Solutions and Answers",
    "kw": "m1 assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Internal Exams",
    "sub": "Engineering Mathematics 1 Mid 1 & Mid 2 Important Questions",
    "kw": "m1 internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Semester Exams",
    "sub": "Engineering Mathematics 1 Semester End Exam Blueprint",
    "kw": "m1 semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear Engineering Mathematics 1 Supply/Backlogs",
    "kw": "how to clear m1 backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "PYQs",
    "sub": "Engineering Physics All Units Previous Year Questions",
    "kw": "jntuk r23 physics pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "PYQs",
    "sub": "Engineering Physics Repeated Exam Questions",
    "kw": "physics repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Important Questions",
    "sub": "Engineering Physics Top 50 Important Questions",
    "kw": "top 50 physics important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/physics-notes.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass Engineering Physics in One Day",
    "kw": "pass engineering physics in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/physics-notes.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "Engineering Physics Last Minute Revision Notes",
    "kw": "physics last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/physics-notes.html"
  },
  {
    "category": "Viva Questions",
    "sub": "Engineering Physics Top 100 Viva Questions and Answers",
    "kw": "physics lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Lab Records",
    "sub": "Engineering Physics Lab Manual and Record Observations",
    "kw": "physics lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Assignments",
    "sub": "Engineering Physics Assignment Solutions and Answers",
    "kw": "physics assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/physics-notes.html"
  },
  {
    "category": "Internal Exams",
    "sub": "Engineering Physics Mid 1 & Mid 2 Important Questions",
    "kw": "physics internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/physics-notes.html"
  },
  {
    "category": "Semester Exams",
    "sub": "Engineering Physics Semester End Exam Blueprint",
    "kw": "physics semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/physics-notes.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear Engineering Physics Supply/Backlogs",
    "kw": "how to clear physics backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "PYQs",
    "sub": "Engineering Chemistry All Units Previous Year Questions",
    "kw": "jntuk r23 chemistry pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "PYQs",
    "sub": "Engineering Chemistry Repeated Exam Questions",
    "kw": "chemistry repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Important Questions",
    "sub": "Engineering Chemistry Top 50 Important Questions",
    "kw": "top 50 chemistry important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass Engineering Chemistry in One Day",
    "kw": "pass engineering chemistry in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "Engineering Chemistry Last Minute Revision Notes",
    "kw": "chemistry last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Viva Questions",
    "sub": "Engineering Chemistry Top 100 Viva Questions and Answers",
    "kw": "chemistry lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Lab Records",
    "sub": "Engineering Chemistry Lab Manual and Record Observations",
    "kw": "chemistry lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Assignments",
    "sub": "Engineering Chemistry Assignment Solutions and Answers",
    "kw": "chemistry assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Internal Exams",
    "sub": "Engineering Chemistry Mid 1 & Mid 2 Important Questions",
    "kw": "chemistry internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Semester Exams",
    "sub": "Engineering Chemistry Semester End Exam Blueprint",
    "kw": "chemistry semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear Engineering Chemistry Supply/Backlogs",
    "kw": "how to clear chemistry backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "PYQs",
    "sub": "C Programming All Units Previous Year Questions",
    "kw": "jntuk r23 c lang pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "PYQs",
    "sub": "C Programming Repeated Exam Questions",
    "kw": "c lang repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Important Questions",
    "sub": "C Programming Top 50 Important Questions",
    "kw": "top 50 c lang important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass C Programming in One Day",
    "kw": "pass c programming in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "C Programming Last Minute Revision Notes",
    "kw": "c lang last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Viva Questions",
    "sub": "C Programming Top 100 Viva Questions and Answers",
    "kw": "c lang lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Lab Records",
    "sub": "C Programming Lab Manual and Record Observations",
    "kw": "c lang lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Assignments",
    "sub": "C Programming Assignment Solutions and Answers",
    "kw": "c lang assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Internal Exams",
    "sub": "C Programming Mid 1 & Mid 2 Important Questions",
    "kw": "c lang internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Semester Exams",
    "sub": "C Programming Semester End Exam Blueprint",
    "kw": "c lang semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear C Programming Supply/Backlogs",
    "kw": "how to clear c lang backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "PYQs",
    "sub": "Data Structures All Units Previous Year Questions",
    "kw": "jntuk r23 ds pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "PYQs",
    "sub": "Data Structures Repeated Exam Questions",
    "kw": "ds repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Important Questions",
    "sub": "Data Structures Top 50 Important Questions",
    "kw": "top 50 ds important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass Data Structures in One Day",
    "kw": "pass data structures in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "Data Structures Last Minute Revision Notes",
    "kw": "ds last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Viva Questions",
    "sub": "Data Structures Top 100 Viva Questions and Answers",
    "kw": "ds lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Lab Records",
    "sub": "Data Structures Lab Manual and Record Observations",
    "kw": "ds lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Assignments",
    "sub": "Data Structures Assignment Solutions and Answers",
    "kw": "ds assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Internal Exams",
    "sub": "Data Structures Mid 1 & Mid 2 Important Questions",
    "kw": "ds internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Semester Exams",
    "sub": "Data Structures Semester End Exam Blueprint",
    "kw": "ds semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear Data Structures Supply/Backlogs",
    "kw": "how to clear ds backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "PYQs",
    "sub": "Engineering Graphics All Units Previous Year Questions",
    "kw": "jntuk r23 eg pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "PYQs",
    "sub": "Engineering Graphics Repeated Exam Questions",
    "kw": "eg repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Important Questions",
    "sub": "Engineering Graphics Top 50 Important Questions",
    "kw": "top 50 eg important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass Engineering Graphics in One Day",
    "kw": "pass engineering graphics in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "Engineering Graphics Last Minute Revision Notes",
    "kw": "eg last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Viva Questions",
    "sub": "Engineering Graphics Top 100 Viva Questions and Answers",
    "kw": "eg lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Lab Records",
    "sub": "Engineering Graphics Lab Manual and Record Observations",
    "kw": "eg lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Assignments",
    "sub": "Engineering Graphics Assignment Solutions and Answers",
    "kw": "eg assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Internal Exams",
    "sub": "Engineering Graphics Mid 1 & Mid 2 Important Questions",
    "kw": "eg internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Semester Exams",
    "sub": "Engineering Graphics Semester End Exam Blueprint",
    "kw": "eg semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear Engineering Graphics Supply/Backlogs",
    "kw": "how to clear eg backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "PYQs",
    "sub": "Basic Electrical Engineering All Units Previous Year Questions",
    "kw": "jntuk r23 beee pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/beee-notes.html"
  },
  {
    "category": "PYQs",
    "sub": "Basic Electrical Engineering Repeated Exam Questions",
    "kw": "beee repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/beee-notes.html"
  },
  {
    "category": "Important Questions",
    "sub": "Basic Electrical Engineering Top 50 Important Questions",
    "kw": "top 50 beee important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass Basic Electrical Engineering in One Day",
    "kw": "pass basic electrical engineering in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "Basic Electrical Engineering Last Minute Revision Notes",
    "kw": "beee last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Viva Questions",
    "sub": "Basic Electrical Engineering Top 100 Viva Questions and Answers",
    "kw": "beee lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/beee-notes.html"
  },
  {
    "category": "Lab Records",
    "sub": "Basic Electrical Engineering Lab Manual and Record Observations",
    "kw": "beee lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/beee-notes.html"
  },
  {
    "category": "Assignments",
    "sub": "Basic Electrical Engineering Assignment Solutions and Answers",
    "kw": "beee assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Internal Exams",
    "sub": "Basic Electrical Engineering Mid 1 & Mid 2 Important Questions",
    "kw": "beee internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Semester Exams",
    "sub": "Basic Electrical Engineering Semester End Exam Blueprint",
    "kw": "beee semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/beee-notes.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear Basic Electrical Engineering Supply/Backlogs",
    "kw": "how to clear beee backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/beee-notes.html"
  },
  {
    "category": "PYQs",
    "sub": "Basic Civil and Mechanical Engineering All Units Previous Year Questions",
    "kw": "jntuk r23 bcme pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "PYQs",
    "sub": "Basic Civil and Mechanical Engineering Repeated Exam Questions",
    "kw": "bcme repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Important Questions",
    "sub": "Basic Civil and Mechanical Engineering Top 50 Important Questions",
    "kw": "top 50 bcme important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass Basic Civil and Mechanical Engineering in One Day",
    "kw": "pass basic civil and mechanical engineering in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "Basic Civil and Mechanical Engineering Last Minute Revision Notes",
    "kw": "bcme last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Viva Questions",
    "sub": "Basic Civil and Mechanical Engineering Top 100 Viva Questions and Answers",
    "kw": "bcme lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Lab Records",
    "sub": "Basic Civil and Mechanical Engineering Lab Manual and Record Observations",
    "kw": "bcme lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Assignments",
    "sub": "Basic Civil and Mechanical Engineering Assignment Solutions and Answers",
    "kw": "bcme assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Internal Exams",
    "sub": "Basic Civil and Mechanical Engineering Mid 1 & Mid 2 Important Questions",
    "kw": "bcme internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Semester Exams",
    "sub": "Basic Civil and Mechanical Engineering Semester End Exam Blueprint",
    "kw": "bcme semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear Basic Civil and Mechanical Engineering Supply/Backlogs",
    "kw": "how to clear bcme backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "PYQs",
    "sub": "Communicative English All Units Previous Year Questions",
    "kw": "jntuk r23 english pyqs previous question papers pdf",
    "difficulty": "Medium",
    "link": "/communicative-english.html"
  },
  {
    "category": "PYQs",
    "sub": "Communicative English Repeated Exam Questions",
    "kw": "english repeated questions jntuk previous year",
    "difficulty": "Medium",
    "link": "/communicative-english.html"
  },
  {
    "category": "Important Questions",
    "sub": "Communicative English Top 50 Important Questions",
    "kw": "top 50 english important questions jntuk r23",
    "difficulty": "Easy",
    "link": "/communicative-english.html"
  },
  {
    "category": "One-Day Preparation",
    "sub": "How to pass Communicative English in One Day",
    "kw": "pass communicative english in one day preparation strategy jntuk",
    "difficulty": "Easy",
    "link": "/communicative-english.html"
  },
  {
    "category": "Last Minute Revision",
    "sub": "Communicative English Last Minute Revision Notes",
    "kw": "english last minute revision notes quick formulas",
    "difficulty": "Easy",
    "link": "/communicative-english.html"
  },
  {
    "category": "Viva Questions",
    "sub": "Communicative English Top 100 Viva Questions and Answers",
    "kw": "english lab viva questions with answers pdf download jntuk",
    "difficulty": "Medium",
    "link": "/communicative-english.html"
  },
  {
    "category": "Lab Records",
    "sub": "Communicative English Lab Manual and Record Observations",
    "kw": "english lab manual record observations pdf jntuk",
    "difficulty": "Medium",
    "link": "/communicative-english.html"
  },
  {
    "category": "Assignments",
    "sub": "Communicative English Assignment Solutions and Answers",
    "kw": "english assignment answers solutions jntuk r23",
    "difficulty": "Easy",
    "link": "/communicative-english.html"
  },
  {
    "category": "Internal Exams",
    "sub": "Communicative English Mid 1 & Mid 2 Important Questions",
    "kw": "english internals mid 1 mid 2 important questions jntuk",
    "difficulty": "Easy",
    "link": "/communicative-english.html"
  },
  {
    "category": "Semester Exams",
    "sub": "Communicative English Semester End Exam Blueprint",
    "kw": "english semester end exam structural blueprint r23 jntuk",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Backlog Preparation",
    "sub": "How to clear Communicative English Supply/Backlogs",
    "kw": "how to clear english backlogs supply jntuk strategy",
    "difficulty": "Medium",
    "link": "/communicative-english.html"
  },
  {
    "category": "SGPA/CGPA",
    "sub": "SGPA to CGPA Converter JNTUK Algorithms",
    "kw": "sgpa to cgpa conversion formula calculations jntuk r23",
    "difficulty": "Easy",
    "link": "/tools.html"
  },
  {
    "category": "SGPA/CGPA",
    "sub": "How to calculate JNTUK R23 Credits efficiently",
    "kw": "how to calculate credits internal external weightage jntuk",
    "difficulty": "Medium",
    "link": "/tools.html"
  },
  {
    "category": "SGPA/CGPA",
    "sub": "JNTUK R23 Grading System Explained",
    "kw": "jntuk r23 grading system passing marks class division",
    "difficulty": "Easy",
    "link": "/tools.html"
  },
  {
    "category": "Coding",
    "sub": "Top 50 C Programs for First Year Exams",
    "kw": "top 50 c programs for engineering first year lab exams",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Coding",
    "sub": "Data Structures Array vs Linked List Implementations",
    "kw": "arrays vs linked list codes algorithms data structures c",
    "difficulty": "Hard",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Coding",
    "sub": "Pointers in C explained simply with memory diagrams",
    "kw": "c pointers memory addressing explanation visual diagrams",
    "difficulty": "Medium",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Coding",
    "sub": "Sorting Algorithms Bubble Selection Insertion Codes",
    "kw": "sorting algorithms source codes c programming jntuk",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Coding",
    "sub": "Binary Search Trees recursive codes C language",
    "kw": "binary search tree traversal coding recursion answers",
    "difficulty": "Hard",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Placement Preparation",
    "sub": "TCS NQT Ninja Prep Guide for First Years",
    "kw": "tcs ninja digital nqt preparation coding round tips",
    "difficulty": "Medium",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Placement Preparation",
    "sub": "Accenture off-campus tech interview questions",
    "kw": "accenture coding technical interview questions c data structures",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Placement Preparation",
    "sub": "Best Resume Template for B.Tech Freshers",
    "kw": "btech fresher resume templates free download ats friendly",
    "difficulty": "Easy",
    "link": "/communicative-english.html"
  },
  {
    "category": "Career Guidance",
    "sub": "Which Engineering Branch is Best for High Salaries",
    "kw": "which btech branch has highest salary placements future",
    "difficulty": "Easy",
    "link": "/semester-1.html"
  },
  {
    "category": "Career Guidance",
    "sub": "How to get an Internship in 1st Year B.Tech",
    "kw": "first year engineering internships how to apply guide",
    "difficulty": "Medium",
    "link": "/semester-1.html"
  },
  {
    "category": "Traffic Magnets",
    "sub": "Top 100 Engineering Viva Questions",
    "kw": "top 100 basic engineering viva questions lab practicals",
    "difficulty": "Easy",
    "link": "/semester-1.html"
  },
  {
    "category": "Traffic Magnets",
    "sub": "Best Engineering Study Timetable",
    "kw": "best engineering student study timetable tracker daily routine",
    "difficulty": "Easy",
    "link": "/semester-1.html"
  },
  {
    "category": "Traffic Magnets",
    "sub": "Topper Strategies to score 10 SGPA",
    "kw": "university topper study strategies secret tricks 10 sgpa",
    "difficulty": "Medium",
    "link": "/semester-1.html"
  },
  {
    "category": "Traffic Magnets",
    "sub": "100 Most Important JNTUK Questions all subjects",
    "kw": "100 most important jntuk regular questions all subjects pdf",
    "difficulty": "Hard",
    "link": "/semester-1.html"
  },
  {
    "category": "Traffic Magnets",
    "sub": "Most Repeated Questions in JNTUK R23 Exams",
    "kw": "most repeated questions in jntuk r23 semester exams pdf",
    "difficulty": "Easy",
    "link": "/semester-1.html"
  },
  {
    "category": "Google Discover",
    "sub": "Student Success Stories: Zero to 9.5 CGPA",
    "kw": "student success story engineering average to topper",
    "difficulty": "Easy",
    "link": "/semester-1.html"
  },
  {
    "category": "Google Discover",
    "sub": "Exam Hacks: Psychological Tricks for Evaluators",
    "kw": "psychological paper writing tricks for exam evaluators",
    "difficulty": "Easy",
    "link": "/semester-1.html"
  },
  {
    "category": "Google Discover",
    "sub": "Memory Tricks to remember complex Chemical Formulas",
    "kw": "how to memorize chemical equations chemistry memory hacks",
    "difficulty": "Easy",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Google Discover",
    "sub": "Productivity Systems for Coder Students",
    "kw": "notion productivity system for engineering students coders",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Google Discover",
    "sub": "Top AI Tools every JNTU Student should use",
    "kw": "best ai tools for engineering homework assignments projects",
    "difficulty": "Easy",
    "link": "/ai-professor.html"
  },
  {
    "category": "Authority Guide",
    "sub": "Ultimate JNTUK R23 Guide",
    "kw": "complete jntuk r23 syllabus regulation guide materials",
    "difficulty": "Hard",
    "link": "/index.html"
  },
  {
    "category": "Authority Guide",
    "sub": "Complete First Year Engineering Roadmap",
    "kw": "first year btech engineering complete roadmap resources",
    "difficulty": "Hard",
    "link": "/semester-1.html"
  },
  {
    "category": "Authority Guide",
    "sub": "Complete Engineering Graphics Tutorial & Commands",
    "kw": "complete engineering graphics autocad tutorials commands guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Authority Guide",
    "sub": "Complete C Programming Handbook for R23",
    "kw": "c programming complete handbook notes solutions code",
    "difficulty": "Hard",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Authority Guide",
    "sub": "Complete Engineering Physics Handbook",
    "kw": "engineering physics textbook standard handbook notes pdf",
    "difficulty": "Hard",
    "link": "/physics-notes.html"
  },
  {
    "category": "Authority Guide",
    "sub": "Complete Engineering Chemistry Roadmap",
    "kw": "engineering chemistry complete subject roadmap topics pdf",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 1 Diagram Drawing Tips",
    "kw": "m1 unit 1 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 2 Numericals Practice Sheet",
    "kw": "physics unit 2 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 3 Objective Bits (MCQs)",
    "kw": "chemistry unit 3 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 4 Syllabus Weightage Analysis",
    "kw": "c lang unit 4 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 5 Previous Mid exam papers",
    "kw": "ds unit 5 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 1 Chapter Summary",
    "kw": "eg unit 1 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 2 Subject Expert Advice",
    "kw": "beee unit 2 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 3 Textbook vs Notes strategy",
    "kw": "bcme unit 3 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 4 Online Simulator tools",
    "kw": "english unit 4 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 5 Diagram Drawing Tips",
    "kw": "m1 unit 5 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 1 Numericals Practice Sheet",
    "kw": "physics unit 1 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 2 Objective Bits (MCQs)",
    "kw": "chemistry unit 2 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 3 Syllabus Weightage Analysis",
    "kw": "c lang unit 3 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 4 Previous Mid exam papers",
    "kw": "ds unit 4 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 5 Chapter Summary",
    "kw": "eg unit 5 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 1 Subject Expert Advice",
    "kw": "beee unit 1 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 2 Textbook vs Notes strategy",
    "kw": "bcme unit 2 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 3 Online Simulator tools",
    "kw": "english unit 3 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 4 Diagram Drawing Tips",
    "kw": "m1 unit 4 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 5 Numericals Practice Sheet",
    "kw": "physics unit 5 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 1 Objective Bits (MCQs)",
    "kw": "chemistry unit 1 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 2 Syllabus Weightage Analysis",
    "kw": "c lang unit 2 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 3 Previous Mid exam papers",
    "kw": "ds unit 3 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 4 Chapter Summary",
    "kw": "eg unit 4 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 5 Subject Expert Advice",
    "kw": "beee unit 5 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 1 Textbook vs Notes strategy",
    "kw": "bcme unit 1 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 2 Online Simulator tools",
    "kw": "english unit 2 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 3 Diagram Drawing Tips",
    "kw": "m1 unit 3 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 4 Numericals Practice Sheet",
    "kw": "physics unit 4 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 5 Objective Bits (MCQs)",
    "kw": "chemistry unit 5 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 1 Syllabus Weightage Analysis",
    "kw": "c lang unit 1 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 2 Previous Mid exam papers",
    "kw": "ds unit 2 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 3 Chapter Summary",
    "kw": "eg unit 3 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 4 Subject Expert Advice",
    "kw": "beee unit 4 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 5 Textbook vs Notes strategy",
    "kw": "bcme unit 5 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 1 Online Simulator tools",
    "kw": "english unit 1 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 2 Diagram Drawing Tips",
    "kw": "m1 unit 2 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 3 Numericals Practice Sheet",
    "kw": "physics unit 3 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 4 Objective Bits (MCQs)",
    "kw": "chemistry unit 4 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 5 Syllabus Weightage Analysis",
    "kw": "c lang unit 5 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 1 Previous Mid exam papers",
    "kw": "ds unit 1 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 2 Chapter Summary",
    "kw": "eg unit 2 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 3 Subject Expert Advice",
    "kw": "beee unit 3 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 4 Textbook vs Notes strategy",
    "kw": "bcme unit 4 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 5 Online Simulator tools",
    "kw": "english unit 5 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 1 Diagram Drawing Tips",
    "kw": "m1 unit 1 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 2 Numericals Practice Sheet",
    "kw": "physics unit 2 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 3 Objective Bits (MCQs)",
    "kw": "chemistry unit 3 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 4 Syllabus Weightage Analysis",
    "kw": "c lang unit 4 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 5 Previous Mid exam papers",
    "kw": "ds unit 5 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 1 Chapter Summary",
    "kw": "eg unit 1 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 2 Subject Expert Advice",
    "kw": "beee unit 2 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 3 Textbook vs Notes strategy",
    "kw": "bcme unit 3 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 4 Online Simulator tools",
    "kw": "english unit 4 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 5 Diagram Drawing Tips",
    "kw": "m1 unit 5 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 1 Numericals Practice Sheet",
    "kw": "physics unit 1 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 2 Objective Bits (MCQs)",
    "kw": "chemistry unit 2 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 3 Syllabus Weightage Analysis",
    "kw": "c lang unit 3 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 4 Previous Mid exam papers",
    "kw": "ds unit 4 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 5 Chapter Summary",
    "kw": "eg unit 5 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 1 Subject Expert Advice",
    "kw": "beee unit 1 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 2 Textbook vs Notes strategy",
    "kw": "bcme unit 2 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 3 Online Simulator tools",
    "kw": "english unit 3 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 4 Diagram Drawing Tips",
    "kw": "m1 unit 4 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 5 Numericals Practice Sheet",
    "kw": "physics unit 5 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 1 Objective Bits (MCQs)",
    "kw": "chemistry unit 1 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 2 Syllabus Weightage Analysis",
    "kw": "c lang unit 2 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 3 Previous Mid exam papers",
    "kw": "ds unit 3 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 4 Chapter Summary",
    "kw": "eg unit 4 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 5 Subject Expert Advice",
    "kw": "beee unit 5 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 1 Textbook vs Notes strategy",
    "kw": "bcme unit 1 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 2 Online Simulator tools",
    "kw": "english unit 2 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 3 Diagram Drawing Tips",
    "kw": "m1 unit 3 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 4 Numericals Practice Sheet",
    "kw": "physics unit 4 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 5 Objective Bits (MCQs)",
    "kw": "chemistry unit 5 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 1 Syllabus Weightage Analysis",
    "kw": "c lang unit 1 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 2 Previous Mid exam papers",
    "kw": "ds unit 2 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 3 Chapter Summary",
    "kw": "eg unit 3 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 4 Subject Expert Advice",
    "kw": "beee unit 4 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 5 Textbook vs Notes strategy",
    "kw": "bcme unit 5 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 1 Online Simulator tools",
    "kw": "english unit 1 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 2 Diagram Drawing Tips",
    "kw": "m1 unit 2 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 3 Numericals Practice Sheet",
    "kw": "physics unit 3 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 4 Objective Bits (MCQs)",
    "kw": "chemistry unit 4 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 5 Syllabus Weightage Analysis",
    "kw": "c lang unit 5 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 1 Previous Mid exam papers",
    "kw": "ds unit 1 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 2 Chapter Summary",
    "kw": "eg unit 2 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 3 Subject Expert Advice",
    "kw": "beee unit 3 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 4 Textbook vs Notes strategy",
    "kw": "bcme unit 4 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 5 Online Simulator tools",
    "kw": "english unit 5 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 1 Diagram Drawing Tips",
    "kw": "m1 unit 1 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 2 Numericals Practice Sheet",
    "kw": "physics unit 2 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 3 Objective Bits (MCQs)",
    "kw": "chemistry unit 3 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 4 Syllabus Weightage Analysis",
    "kw": "c lang unit 4 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 5 Previous Mid exam papers",
    "kw": "ds unit 5 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 1 Chapter Summary",
    "kw": "eg unit 1 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 2 Subject Expert Advice",
    "kw": "beee unit 2 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 3 Textbook vs Notes strategy",
    "kw": "bcme unit 3 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 4 Online Simulator tools",
    "kw": "english unit 4 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 5 Diagram Drawing Tips",
    "kw": "m1 unit 5 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 1 Numericals Practice Sheet",
    "kw": "physics unit 1 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 2 Objective Bits (MCQs)",
    "kw": "chemistry unit 2 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 3 Syllabus Weightage Analysis",
    "kw": "c lang unit 3 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 4 Previous Mid exam papers",
    "kw": "ds unit 4 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 5 Chapter Summary",
    "kw": "eg unit 5 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 1 Subject Expert Advice",
    "kw": "beee unit 1 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 2 Textbook vs Notes strategy",
    "kw": "bcme unit 2 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 3 Online Simulator tools",
    "kw": "english unit 3 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 4 Diagram Drawing Tips",
    "kw": "m1 unit 4 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 5 Numericals Practice Sheet",
    "kw": "physics unit 5 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 1 Objective Bits (MCQs)",
    "kw": "chemistry unit 1 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 2 Syllabus Weightage Analysis",
    "kw": "c lang unit 2 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 3 Previous Mid exam papers",
    "kw": "ds unit 3 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 4 Chapter Summary",
    "kw": "eg unit 4 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 5 Subject Expert Advice",
    "kw": "beee unit 5 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 1 Textbook vs Notes strategy",
    "kw": "bcme unit 1 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 2 Online Simulator tools",
    "kw": "english unit 2 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 3 Diagram Drawing Tips",
    "kw": "m1 unit 3 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 4 Numericals Practice Sheet",
    "kw": "physics unit 4 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 5 Objective Bits (MCQs)",
    "kw": "chemistry unit 5 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 1 Syllabus Weightage Analysis",
    "kw": "c lang unit 1 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 2 Previous Mid exam papers",
    "kw": "ds unit 2 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 3 Chapter Summary",
    "kw": "eg unit 3 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 4 Subject Expert Advice",
    "kw": "beee unit 4 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 5 Textbook vs Notes strategy",
    "kw": "bcme unit 5 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 1 Online Simulator tools",
    "kw": "english unit 1 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 2 Diagram Drawing Tips",
    "kw": "m1 unit 2 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 3 Numericals Practice Sheet",
    "kw": "physics unit 3 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 4 Objective Bits (MCQs)",
    "kw": "chemistry unit 4 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 5 Syllabus Weightage Analysis",
    "kw": "c lang unit 5 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 1 Previous Mid exam papers",
    "kw": "ds unit 1 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 2 Chapter Summary",
    "kw": "eg unit 2 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 3 Subject Expert Advice",
    "kw": "beee unit 3 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 4 Textbook vs Notes strategy",
    "kw": "bcme unit 4 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 5 Online Simulator tools",
    "kw": "english unit 5 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 1 Diagram Drawing Tips",
    "kw": "m1 unit 1 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 2 Numericals Practice Sheet",
    "kw": "physics unit 2 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 3 Objective Bits (MCQs)",
    "kw": "chemistry unit 3 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 4 Syllabus Weightage Analysis",
    "kw": "c lang unit 4 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 5 Previous Mid exam papers",
    "kw": "ds unit 5 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 1 Chapter Summary",
    "kw": "eg unit 1 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 2 Subject Expert Advice",
    "kw": "beee unit 2 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 3 Textbook vs Notes strategy",
    "kw": "bcme unit 3 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 4 Online Simulator tools",
    "kw": "english unit 4 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 5 Diagram Drawing Tips",
    "kw": "m1 unit 5 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 1 Numericals Practice Sheet",
    "kw": "physics unit 1 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 2 Objective Bits (MCQs)",
    "kw": "chemistry unit 2 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 3 Syllabus Weightage Analysis",
    "kw": "c lang unit 3 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 4 Previous Mid exam papers",
    "kw": "ds unit 4 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 5 Chapter Summary",
    "kw": "eg unit 5 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 1 Subject Expert Advice",
    "kw": "beee unit 1 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 2 Textbook vs Notes strategy",
    "kw": "bcme unit 2 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 3 Online Simulator tools",
    "kw": "english unit 3 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 4 Diagram Drawing Tips",
    "kw": "m1 unit 4 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 5 Numericals Practice Sheet",
    "kw": "physics unit 5 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 1 Objective Bits (MCQs)",
    "kw": "chemistry unit 1 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 2 Syllabus Weightage Analysis",
    "kw": "c lang unit 2 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 3 Previous Mid exam papers",
    "kw": "ds unit 3 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 4 Chapter Summary",
    "kw": "eg unit 4 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 5 Subject Expert Advice",
    "kw": "beee unit 5 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 1 Textbook vs Notes strategy",
    "kw": "bcme unit 1 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 2 Online Simulator tools",
    "kw": "english unit 2 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 3 Diagram Drawing Tips",
    "kw": "m1 unit 3 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 4 Numericals Practice Sheet",
    "kw": "physics unit 4 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 5 Objective Bits (MCQs)",
    "kw": "chemistry unit 5 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 1 Syllabus Weightage Analysis",
    "kw": "c lang unit 1 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 2 Previous Mid exam papers",
    "kw": "ds unit 2 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 3 Chapter Summary",
    "kw": "eg unit 3 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 4 Subject Expert Advice",
    "kw": "beee unit 4 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 5 Textbook vs Notes strategy",
    "kw": "bcme unit 5 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 1 Online Simulator tools",
    "kw": "english unit 1 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 2 Diagram Drawing Tips",
    "kw": "m1 unit 2 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 3 Numericals Practice Sheet",
    "kw": "physics unit 3 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 4 Objective Bits (MCQs)",
    "kw": "chemistry unit 4 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 5 Syllabus Weightage Analysis",
    "kw": "c lang unit 5 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 1 Previous Mid exam papers",
    "kw": "ds unit 1 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 2 Chapter Summary",
    "kw": "eg unit 2 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 3 Subject Expert Advice",
    "kw": "beee unit 3 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 4 Textbook vs Notes strategy",
    "kw": "bcme unit 4 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 5 Online Simulator tools",
    "kw": "english unit 5 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 1 Diagram Drawing Tips",
    "kw": "m1 unit 1 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 2 Numericals Practice Sheet",
    "kw": "physics unit 2 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 3 Objective Bits (MCQs)",
    "kw": "chemistry unit 3 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "C Programming Unit 4 Syllabus Weightage Analysis",
    "kw": "c lang unit 4 syllabus weightage analysis jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/c-programming-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Data Structures Unit 5 Previous Mid exam papers",
    "kw": "ds unit 5 previous mid exam papers jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/data-structures-basics.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Graphics Unit 1 Chapter Summary",
    "kw": "eg unit 1 chapter summary jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/engineering-graphics-lab.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Electrical Engineering Unit 2 Subject Expert Advice",
    "kw": "beee unit 2 subject expert advice jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/beee-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Basic Civil and Mechanical Engineering Unit 3 Textbook vs Notes strategy",
    "kw": "bcme unit 3 textbook vs notes strategy jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/basic-civil-mechanical-engineering.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Communicative English Unit 4 Online Simulator tools",
    "kw": "english unit 4 online simulator tools jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/communicative-english.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Mathematics 1 Unit 5 Diagram Drawing Tips",
    "kw": "m1 unit 5 diagram drawing tips jntuk r23 guide",
    "difficulty": "Easy",
    "link": "/engineering-mathematics-1.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Physics Unit 1 Numericals Practice Sheet",
    "kw": "physics unit 1 numericals practice sheet jntuk r23 guide",
    "difficulty": "Medium",
    "link": "/physics-notes.html"
  },
  {
    "category": "Exam Preparation",
    "sub": "Engineering Chemistry Unit 2 Objective Bits (MCQs)",
    "kw": "chemistry unit 2 objective bits (mcqs) jntuk r23 guide",
    "difficulty": "Hard",
    "link": "/chemistry-topper-notes.html"
  }
];

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
    ].join("\n");

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
