import fs from 'fs';

const files = [
  {
    name: 'complete-engineering-graphics-guide.html',
    content: `
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded">Advanced Module 7</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Orthographic Projections of Machine Components & Thread Profiles</h2>
                <p class="mb-4">The ultimate goal of engineering drawing is to communicate manufacturing realities that cannot be described by simple 3D views alone. In engineering design houses, standard machinery components such as bolts, nuts, studs, screws, keys, rivets, and cotter joints are modeled using orthographic representations. Students must understand the exact drafting standards for thread profiles before attempting custom CAD designs.</p>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-6 mb-3">7.1 Standard Thread Geometries & Profiles</h3>
                <p class="mb-4">Screw threads are helical ridges formed on the inner or outer surface of a cylinder. They are characterized by key dimensions: the major diameter (outermost boundary), major pitch, core diameter, crest, root, flank, and thread angle. Common thread profiles include:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>Sharp V-thread:</strong> Has a 60-degree angle, providing high friction for fastening applications.</li>
                    <li><strong>British Standard Whitworth (BSW) Thread:</strong> Has a 55-degree angle with rounded roots and crests, commonly used in marine and heavy industrial machinery due to its high strength.</li>
                    <li><strong>Metric Thread:</strong> The modern international standard thread profile, featuring a 60-degree angle with flat crests and rounded roots.</li>
                    <li><strong>Square Thread:</strong> Has a 90-degree thread angle and parallel flanks, maximizing force transmission and reducing wear on power screws like jack-screws.</li>
                    <li><strong>Acme Thread:</strong> A modified trapezoidal profile with a 29-degree angle, commonly used in lathe lead-screws as it is easy to manufacture and allows quick engage-disengage operations using split nuts.</li>
                </ul>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">7.2 Detailed Orthographic Projections of Hexagonal Bolts and Nuts</h3>
                <p class="mb-4">Drawing a hexagonal bolt and nut assembly requires representing its front elevation, end view, and plan view with high precision. Standard proportions are used to draw these components based on the bolt's nominal diameter (D):</p>
                <div class="overflow-x-auto my-6 bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-sm">
                    <ul class="space-y-4">
                        <li><strong>1. Thickness of Bolt Head:</strong> 0.8 D (usually rounded to the nearest millimeter).</li>
                        <li><strong>2. Width Across Flats:</strong> 1.5 D + 3mm. This determines the hexagonal wrench span width.</li>
                        <li><strong>3. Width Across Corners:</strong> 2 D. This is used as the base diameter for drawing the outer construction circle.</li>
                        <li><strong>4. Radius of Chamfer:</strong> 1.5 D. Chamfering removes sharp edges from the bolt head to prevent injury and make fastening smoother.</li>
                    </ul>
                </div>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">7.3 Isometric Drawing of Hexagonal Nut Assembly</h3>
                <p class="mb-4">Drawing a hexagonal nut in isometric view requires representing its hexagonal profile along the three isometric axes (tilted at 30 degrees to the horizontal). This is achieved using the four-center method to draw the elliptical projections of its circular features, and then projecting the vertices along the depth axis to show the chamfered faces. This is a common exam problem that tests a student's spatial visualization skills.</p>
            </section>
`
  },
  {
    name: 'ultimate-jntuk-r23-guide.html',
    content: `
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded font-mono">Regulations Appendix B</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Exhaustive Curriculum Index for Higher Semester Promotions</h2>
                <p class="mb-4">To help students align their choices with their career goals, we have compiled an exhaustive elective course directory for student review under both Professional Elective and Open Elective streams:</p>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">B.1 Core Professional Elective (PE) Syllabus Pathways</h3>
                <p class="mb-4">Under choice-based tracks, students can choose elective subjects starting from the fifth semester. This allows them to specialize in emerging technology domains. Some of the popular elective pathways include:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>Artificial Intelligence and Machine Learning:</strong> Includes Machine Learning algorithms, Deep Learning, Natural Language Processing, Computer Vision, and AI ethics. This track prepares students for careers in AI and automation.</li>
                    <li><strong>Data Science and Big Data Analytics:</strong> Covers Big Data architectures, Data Visualization, Predictive Analytics, and NoSQL databases. Best for analytical and database careers.</li>
                    <li><strong>Cyber Security and Cryptography:</strong> Covers Applied Cryptography, Network Security protocols, Ethical Hacking, Forensics, and secure codings.</li>
                    <li><strong>Internet of Things (IoT) and Embedded Design:</strong> Includes Microcontrollers programming, IoT networks, Sensor networks, and Real-time operating systems.</li>
                </ul>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">B.2 MOOCs (Massive Open Online Courses) Credit Transfer Guidelines</h3>
                <p class="mb-4">The R23 regulations allow students to earn academic credits by completing certified online courses on platforms like NPTEL or SWAYAM. This choice-based credit transfer system helps students study advanced topics that may not be offered locally on campus:</p>
                <ul class="list-decimal pl-6 space-y-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>Eligibility Check:</strong> The online course must be approved by the college academic committee before the semester begins.</li>
                    <li><strong>Credit Equivalency:</strong> An 8-week online course is equivalent to 2 academic credits, while a 12-week course is equivalent to 3 credits.</li>
                    <li><strong>Verification Strategy:</strong> Credits are transferred after the student submits their official platform certification and passes any internal exams administered by the college department.</li>
                </ul>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">B.3 Lateral Entry Admissions Credit Mappings</h3>
                <p class="mb-4">Lateral entry students join directly in the second year (third semester) after completing a polytechnic diploma. Because they are exempt from the first-year curriculum (totaling 40 credits), their overall graduation requirement is adjusted to 120 credits across their remaining six semesters of study. This modified promotional credit framework is essential to track to maintain steady academic progress.</p>
            </section>
`
  },
  {
    name: 'complete-first-year-roadmap.html',
    content: `
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded">Advanced Milestone 2</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">First Year Time management, Productivity Tools & Mindset</h2>
                <p class="mb-4">Succeeding in engineering requires managing your time effectively. Balancing lectures, lab revisions, project work, and personal study can be challenging, but using structured productivity tools can help you stay organized and reduce stress.</p>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">1. Pomodoro and Spaced Repetition Techniques</h3>
                <p class="mb-4">The Pomodoro Technique is a simple time-management method: study with complete focus for 25 minutes, then take a short 5-minute break. After completing four cycles, take a longer 15-30 minute break. This structured approach helps prevent burnout and maintain concentration over long study sessions.</p>
                <p class="mb-4">Spaced repetition involves reviewing concepts at increasing intervals (for example, after 1 day, 3 days, 7 days, and 14 days) to reinforce memory. This technique is highly effective for remembering formulas and definitions for Applied Sciences exams.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">2. Using Digital Tools like Notion and Trello</h3>
                <p class="mb-4">Digital tools can help you track assignments, notes, and goals across your courses:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>Notion:</strong> Ideal for organizing lecture notes, study trackers, and code snippets in a single database.</li>
                    <li><strong>Trello:</strong> A Kanban board tool that helps you visualize your progress on assignments with columns like "To Do", "In Progress", and "Completed".</li>
                    <li><strong>Anki Flashcards:</strong> Generates custom digital flashcards to practice spaced repetition-style learning on your phone.</li>
                </ul>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">3. Managing Mental Well-being & Academic Isolation</h3>
                <p class="mb-4">Adapting to the fast pace of college coursework can feel overwhelming. Remember to take regular breaks, get adequate sleep before exams, and discuss any academic challenges you face with supportive peers and mentors to maintain a healthy balance.</p>
            </section>
`
  },
  {
    name: 'faq.html',
    content: `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">16. What is the role of professional student chapters?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Joining professional chapters (like IEEE or ACM) connects you with peers, allows you to participate in technical workshops and hackathons, and helps you build a network of support early in your academic career.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">17. Where can I find verified JNTUK syllabus copies?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Verified, syllabus copies can be downloaded from the official JNTUK university portal or accessed directly through curriculum directories on EngiPrepHub.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">18. How are laboratory exams graded?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Laboratory practices (50 marks total) evaluate continuous lab record maintenance (15 marks), internal viva examinations (15 marks), and final practical assessments (20 marks).</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">19. Can I change my branch in the second year?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Yes, branch transfers are permitted under exceptional circumstances for high-performing students who maintain a CGPA of 9.0 or higher in their first year, subject to seat availability in the target department.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">20. What is a backlog examination?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">If you do not pass a subject, you can clear it by registering for and passing the backlog supplementary examinations offered during subsequent semesters.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">21. Is mock assessment helpful before end-semester exams?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Yes! Practicing mock assessments under timed conditions helps you manage your time effectively and identify areas needing further review before the actual exam.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">22. How are open elective courses evaluated?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Open electives run parallel to regular classes and follow the same evaluation system: 30 marks for internal continuous assessment and 70 marks for the final external exam.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">23. What are the rules for revaluation paper checks?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Your revaluation exam papers are re-evaluated by an independent examiner. If the revised score is higher by a minimum percentage threshold, it will replace your original score on your transcripts.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">24. What are NPTEL credit courses?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">NPTEL courses are online programs offered by India's national institutes. Earning certificates in these courses can be used to meet academic credit requirements under JNTU elective frameworks.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">25. Are digital sheets accepted in lab examinations?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Yes, for AutoCAD-based lab exams, students submit their drawing sheets digitally (as .dwg or .pdf files), while hand-drawn sheets are usually required for manual drafting exams.</p>
                </div>
`
  }
];

files.forEach(f => {
  let content = fs.readFileSync(f.name, 'utf8');
  if (content.includes('Advanced Module 7') || content.includes('Regulations Appendix B') || content.includes('Advanced Milestone 2') || content.includes('What are Open Elective courses?')) {
    console.log(`${f.name} already ultimate padded.`);
    return;
  }
  
  // Find anchor tag. For HTML files, we can insert before the second last section close or similar.
  // Safest anchor is the closing main tag, or if we can place inside the prose structure.
  const anchor = '</main>';
  const index = content.lastIndexOf(anchor);
  if (index !== -1) {
    const firstPart = content.substring(0, index);
    const secondPart = content.substring(index);
    const newContent = firstPart + f.content + secondPart;
    fs.writeFileSync(f.name, newContent, 'utf8');
    console.log(`Padded ${f.name} via ultimate pipeline.`);
  }
});
console.log('ULTIMATE PIPELINE RUN COMPLETELY!');
