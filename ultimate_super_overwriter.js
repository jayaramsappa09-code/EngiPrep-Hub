import fs from 'fs';

const regulationsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate JNTUK R23 Academic Regulations Guide | EngiPrepHub</title>
    <link rel="canonical" href="https://engiprephub.in/ultimate-jntuk-r23-guide">
    <meta name="description" content="Official regulatory metrics handbook for JNTUK R23 Choice Based Credit System (CBCS). Learn credit distributions, CGPA limits, and attendance rules.">
    <link rel="stylesheet" href="/src/style.css">
    <link rel="alternate" hreflang="en-IN" href="https://engiprephub.in/ultimate-jntuk-r23-guide.html">
    <link rel="alternate" hreflang="x-default" href="https://engiprephub.in/ultimate-jntuk-r23-guide.html">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-gray-300">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span class="font-black text-xl text-white">E</span>
                </div>
                <span class="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 italic">Hub</span></span>
            </a>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
                <a href="/semester-1.html" class="hover:text-blue-600 transition-colors">Semesters</a>
                <a href="/tools.html" class="hover:text-blue-600 transition-colors">Tools</a>
                <a href="/blog.html" class="hover:text-blue-600 transition-colors">Blog</a>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto py-32 px-6 lg:px-8">
        <span class="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] block mb-4">CORNERSTONE AUTHORITY GUIDE</span>
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-50 mb-7 font-['Space_Grotesk'] leading-tight tracking-tight">Ultimate JNTUK R23 Guide</h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 dark:bg-slate-900/50 rounded-r-xl">JNTUK B.Tech R23 Regulations, Credit Frameworks, GPA Multipliers & Condonation Rules</p>
        
        <div class="prose prose-slate dark:prose-invert max-w-none space-y-12 leading-loose text-base sm:text-lg text-slate-800 dark:text-gray-300">
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mb-6 font-['Space_Grotesk']">Choice Based Credit System (CBCS) & Syllabus Alignment</h2>
                <p class="mb-4">The Jawaharlal Nehru Technological University Kakinada (JNTUK) introduced the R23 Academic Regulations to align engineering education with national standards. These regulations structure courses around student-centric learning objectives, continuous internal evaluation, and final semester-end examinations. This guide provides an in-depth review of these rules to help you navigate your academic path successfully.</p>
                <p class="mb-4">Courses are categorised into key areas: Basic Sciences and Humanities (BS&H), Engineering Sciences (ES), Professional Core Courses (PC), Professional Elective Courses (PE), Open Elective Courses (OE), and Mandatory Non-Credit courses (such as Environmental Sciences, Human Values, and Constitution of India). Each course category plays a specific role in your engineering education.</p>
                <p class="mb-4">To earn a B.Tech degree, a student must successfully complete 160 credits over four academic years. These credits are distributed across semesters to maintain a balanced workload. Tracking your credit accumulation is essential to maintain eligibility for promotion to higher semesters.</p>
                <p class="mb-4">Every subject is allocated a specific number of credits based on its lecture, tutorial, and practical lab hours. A typical semester consists of 20 to 22 credits, representing a structured sequence of coursework. Understanding this credit framework helps students manage their studies effectively and plan their academic progress.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">SGPA and CGPA Calculation Methodology</h3>
                <p class="mb-4">The Semester Grade Point Average (SGPA) is computed by dividing the sum of credits earned multiplied by grade points by the total credits attempted. Attendance of at least 75% is required in each course, with medical condonation possible down to 65% for verified reasons. Keeping your attendance above this threshold is vital to avoid academic detention.</p>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">The exact formulation is given below:</p>
                <div class="bg-indigo-50/50 dark:bg-slate-900/50 p-4 rounded-xl text-center font-mono my-4 border border-indigo-100 dark:border-slate-800">
                    SGPA = &Sigma;(Course_Credits &times; Grade_Points) / Total_Credits_Attempted
                </div>
                <p class="mb-4">The Cumulative Grade Point Average (CGPA) is calculated similarly across all completed semesters:</p>
                <div class="bg-indigo-50/50 dark:bg-slate-900/50 p-4 rounded-xl text-center font-mono my-4 border border-indigo-100 dark:border-slate-800">
                    CGPA = &Sigma;(Semester_Credits &times; SGPA) / Total_Accumulated_Credits
                </div>
                <p class="mb-4">To help students better understand, let us work through a solved calculation scenario. Assume a student completes a semester with four subjects having the following credit weights and grade points:</p>
                <ul class="list-disc pl-6 space-y-2 mb-4">
                    <li>Subject 1: 3 Credits, Grade Point: 9 (S Grade). Credit Point total: 27.</li>
                    <li>Subject 2: 3 Credits, Grade Point: 8 (A Grade). Credit Point total: 24.</li>
                    <li>Subject 3: 4 Credits, Grade Point: 10 (O Grade). Credit Point total: 40.</li>
                    <li>Subject 4: 2 Credits, Grade Point: 7 (B Grade). Credit Point total: 14.</li>
                </ul>
                <p class="mb-4">Sum of Credit Points = 27 + 24 + 40 + 14 = 105. Sum of Credits = 3 + 3 + 4 + 2 = 12. Using the SGPA formula, SGPA = 105 / 12 = 8.75. This numerical method forms the exact basis of our SGPA Calculators available across the portal. Practicing these calculations can help you set realistic grade targets and plan your study time effectively.</p>

                <div class="overflow-x-auto my-6 bg-slate-101 dark:bg-slate-900 p-4 rounded-xl">
                    <table class="min-w-full text-sm">
                        <thead>
                            <tr class="border-b border-slate-300 dark:border-slate-700 font-bold">
                                <th class="p-2 text-left">Academic Category</th>
                                <th class="p-2 text-left">Typical Course Credit Allocation</th>
                                <th class="p-2 text-left">Required Core Hours / Week</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-slate-200 dark:border-slate-800">
                                <td class="p-2 font-semibold">Theory Subject</td>
                                <td class="p-2">3 Credits</td>
                                <td class="p-2">3 Lectures + 0 Tutorials / Week</td>
                            </tr>
                            <tr class="border-b border-slate-100 dark:border-slate-850">
                                <td class="p-2 font-semibold">Laboratory Practice</td>
                                <td class="p-2">1.5 Credits</td>
                                <td class="p-2">3 Laboratory Practicals / Week</td>
                            </tr>
                            <tr class="border-b border-slate-100 dark:border-slate-850">
                                <td class="p-2 font-semibold">Mandatory Non-Credit</td>
                                <td class="p-2">0 Credits</td>
                                <td class="p-2">2 Session Lectures (EVS, Human Values)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">Internal Assessment and Continuous Evaluation System</h3>
                <p class="mb-4">The total score for each course (100 marks) is divided into 30% internal continuous evaluation and 70% final external examinations. The internal evaluation (30 marks) combines midterm tests and regular classroom assessments:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>Midterm Tests (20 marks):</strong> Two midterm tests are conducted per semester. To reduce exam pressure, the best performance contributes 80% weight, while the other contributes 20%. This incentivizes consistent performance throughout the semester.</li>
                    <li><strong>Continuous Development (10 marks):</strong> Evaluated based on regular assignments, surprise quizzes, and student presentations, promoting active engagement in classes.</li>
                </ul>
                <p class="mb-4">This structured internal assessment system reduces reliance on final exam scores, helping students maintain steady progress and receive regular feedback on their performance.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6">Promotion Threshold Regulations and Credit Slices</h2>
                <p class="mb-4">Promotion from one academic year to the next is governed by specific credit accumulation requirements. This deficient credit control system ensures students resolve backlogs before taking advanced coursework, maintaining academic quality:</p>
                <div class="overflow-x-auto my-6 bg-slate-101 dark:bg-slate-905 p-4 rounded-xl">
                    <ul class="space-y-4 text-sm">
                        <li><strong>Promotion from Year 1 to Year 2:</strong> No credit promotion limits are active; students progress as long as they maintain minimum attendance, regardless of backlog counts. This allows students to adapt to university expectations in their first year.</li>
                        <li><strong>Promotion from Year 2 to Year 3:</strong> The student must secure at least 40% of the total credits allocated during Semesters 1 and 2 (normally 16 out of 40 credits) to avoid academic detention. This ensures they have a solid foundation before taking advanced core subjects.</li>
                        <li><strong>Promotion from Year 3 to Year 4:</strong> The student must secure at least 40% of the combined credits allocated across the first four semesters (normally 32 out of 80 credits) to be eligible for final year study. This helps them prepare effectively for major projects and industry readiness.</li>
                    </ul>
                </div>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded font-mono">Regulations Appendix B</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Exhaustive Curriculum Index for Higher Semester Promotions</h2>
                <p class="mb-4">To help students align their choices with their career goals, we have compiled an exhaustive elective course directory for student review under both Professional Elective and Open Elective streams:</p>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">B.1 Core Professional Elective (PE) Syllabus Pathways</h3>
                <p class="mb-4">Under choice-based tracks, students can choose elective subjects starting from the fifth semester, allowing them to specialize in emerging technology domains. Some of the popular elective pathways include:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>Artificial Intelligence and Machine Learning:</strong> Includes Machine Learning algorithms, Deep Learning, Natural Language Processing, Computer Vision, and AI ethics. This track prepares students for careers in AI and automation.</li>
                    <li><strong>Data Science and Big Data Analytics:</strong> Covers Big Data architectures, Data Visualization, Predictive Analytics, and NoSQL databases. Best for analytical and database careers.</li>
                    <li><strong>Cyber Security and Cryptography:</strong> Covers Applied Cryptography, Network Security protocols, Ethical Hacking, Forensics, and secure coding practices.</li>
                    <li><strong>Internet of Things (IoT) and Embedded Design:</strong> Includes Microcontrollers programming, IoT networks, Sensor networks, and Real-time operating systems.</li>
                </ul>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">B.2 MOOCs (Massive Open Online Courses) Credit Transfer Guidelines</h3>
                <p class="mb-4">The R23 regulations allow students to earn academic credits by completing certified online courses on platforms like NPTEL or SWAYAM. This choice-based credit transfer system helps students study advanced topics that may not be offered locally on campus:</p>
                <ul class="list-decimal pl-6 space-y-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>Eligibility Check:</strong> The online course must be approved by the college academic committee before the semester begins.</li>
                    <li><strong>Credit Equivalency:</strong> An 8-week online course is equivalent to 2 academic credits, while a 12-week course is equivalent to 3 credits.</li>
                    <li><strong>Verification Strategy:</strong> Credits are transferred after the student submits their official platform certification and passes any internal exams administered by the college department.</li>
                </ul>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded font-mono">Regulations Appendix C</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Comprehensive Year 1 Semester 2 Curriculum & Syllabus Mapping</h2>
                <p class="mb-4">To ensure academic path coordination across all departments of JNTUK R23, here is the complete course directory mapping for Semester-2 courses, including lecture hours and credit weights:</p>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">C.1 Course Table: Year 1 Semester 2</h3>
                <div class="overflow-x-auto my-6 bg-slate-101 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <table class="min-w-full text-xs">
                        <thead>
                            <tr class="border-b border-slate-300 dark:border-slate-700 font-bold">
                                <th class="p-2 text-left">Course Code</th>
                                <th class="p-2 text-left">Course Name</th>
                                <th class="p-2 text-left">L-T-P Hours</th>
                                <th class="p-2 text-left">Credit Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-slate-200 dark:border-slate-800">
                                <td class="p-2 font-mono">R231201</td>
                                <td class="p-2 font-semibold">Differential Equations & Vector Calculus (Maths-2)</td>
                                <td class="p-2">3-0-0</td>
                                <td class="p-2 font-bold text-green-600">3.0 Credits</td>
                            </tr>
                            <tr class="border-b border-slate-200 dark:border-slate-800">
                                <td class="p-2 font-mono">R231202</td>
                                <td class="p-2 font-semibold">Applied Physics</td>
                                <td class="p-2">3-0-0</td>
                                <td class="p-2 font-bold text-green-600">3.0 Credits</td>
                            </tr>
                            <tr class="border-b border-slate-200 dark:border-slate-800">
                                <td class="p-2 font-mono">R231203</td>
                                <td class="p-2 font-semibold">Engineering Mechanics</td>
                                <td class="p-2">3-0-0</td>
                                <td class="p-2 font-bold text-green-600">3.0 Credits</td>
                            </tr>
                            <tr class="border-b border-slate-200 dark:border-slate-800">
                                <td class="p-2 font-mono">R231204</td>
                                <td class="p-2 font-semibold">Basic Electrical & Electronics Engineering</td>
                                <td class="p-2">3-0-0</td>
                                <td class="p-2 font-bold text-green-600">3.0 Credits</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">C.2 Differential Equations & Vector Calculus Syllabus Breakdown</h3>
                <p class="mb-4">Mathematics-2 builds on first-semester calculus to analyze vector field properties and ordinary differential equations. Students must master these core topics:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>Unit 1: Linear Differential Equations of Higher Order:</strong> Learn non-homogeneous linear differential equations with constant coefficients, focusing on finding particular integrals using operator methods. This is essential for modeling physical vibration systems.</li>
                    <li><strong>Unit 2: Special Equations and Applications:</strong> Covers Cauchy-Euler equations, Legendre equations, and the method of variation of parameters to solve second-order equations with variable coefficients.</li>
                    <li><strong>Unit 3: Partial Differential Equations:</strong> Covers first-order partial differential equations, Lagrange's linear equation methods, and standard nonlinear PDE classifications.</li>
                    <li><strong>Unit 4: Vector Differentiation:</strong> Covers vector field operators: gradient of a scalar field, divergence of a vector field, curl of a vector field, and physical interpretations of these quantities. An operator is solenoidal if its divergence is zero, and irrotational if its curl is zero.</li>
                    <li><strong>Unit 5: Vector Integration:</strong> Covers line integrals, surface integrals, volume integrals, and the transition theorems of vector calculus: Green's theorem, Gauss divergence theorem, and Stokes' theorem. Resolving these double and triple integrals is a key part of final examinations.</li>
                </ul>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">C.3 Applied Physics Syllabus Breakdown & Crystal Lattices</h3>
                <p class="mb-4">Physics courses under the R23 framework cover solid-state mechanics and wave optics. Students must study semiconductor band theory, laser populations, and crystal geometry parameters:</p>
                <p class="mb-4">Crystal lattices are categorized into 14 Bravais lattices across 7 distinct systems (cubic, tetragonal, orthorhombic, monoclinic, triclinic, hexagonal, and rhombohedral). Key metrics include coordination number, atomic packing factor, and Miller indices of lattice planes. When drawing these crystal models, students must identify Miller indices by calculating intercept reciprocals and clearing fractions, a process frequently tested in exams.</p>
            </section>

            <section class="pb-4">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-55 font-['Space_Grotesk'] font-semibold">Passing Standard and Grades Threshold Spreadsheet</h3>
                <p class="mb-4">To clear any theoretical subject, the student must secure a minimum of 35% of the allocated marks in the final external exam (24 out of 70) and a minimum of 40% when combined with the internal midterm score (40 out of 100 overall, combining internal and external scores).</p>
                <p class="mb-4">Letter grades are assigned based on percentage scores: O (Outstanding, 10 grade points, 90-100%), S (Excellent, 9 points, 80-89%), A (Very Good, 8 points, 70-79%), B (Good, 7 points, 60-69%), C (Average, 6 points, 50-59%), D (Pass, 5 points, 40-49%), and F (Fail/Backlog, 0 points). This clear, standardized grading system promotes fairness and transparent evaluations.</p>
            </section>
        </div>
    </main>

    <!-- Global Footer -->
    <footer class="pt-24 pb-12 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 transition-colors">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
                <div>
                    <a href="/" class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 text-slate-50">
                            <span class="font-black text-xl">E</span>
                        </div>
                        <span class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tighter">EngiPrep Hub</span>
                    </a>
                    <p class="text-sm text-slate-400 dark:text-slate-400 leading-loose mb-8 font-medium">
                        The ultimate JNTUK R23 engineering academic ecosystem. Built for future scholars, by university toppers.
                    </p>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Resources</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/notes.html" class="hover:text-blue-600 transition-colors">Study Notes PDF</a></li>
                        <li><a href="/pyqs.html" class="hover:text-blue-600 transition-colors">JNTUK Solved PYQs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Cornerstones</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/ultimate-jntuk-r23-guide.html" class="hover:text-blue-600 transition-colors">Ultimate JNTUK Guide</a></li>
                        <li><a href="/complete-first-year-roadmap.html" class="hover:text-blue-600 transition-colors">1st Year Roadmap</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Security & Legal</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/privacy-policy.html" class="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="/cookie-policy.html" class="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-12 border-t border-slate-100 dark:border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-slate-400 dark:text-slate-505 text-xs font-semibold">© 2026 EngiPrep Hub. All rights reserved.</p>
                <p class="text-slate-400 dark:text-slate-550 text-xs font-semibold italic tracking-tight">Engineered for Academic Excellence</p>
            </div>
        </div>
    </footer>
    <script type="module" src="/src/main.js"></script>

    <!-- EngiPrepAuthorBox -->
    <section class="max-w-4xl mx-auto my-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
      <img src="/public/logo.png" alt="EngiPrepHub Logo" class="w-20 h-20 rounded-full border border-slate-700">
      <div>
        <h3 class="text-lg font-bold text-white">About the Author</h3>
        <p class="text-slate-300 text-sm mt-2">EngiPrepHub is an academic initiative aimed at providing high-quality, verified, and structured JNTUK R23 study notes, PYQs, and interactive tools for engineering students. Our materials are reviewed by expert students and engineers to ensure syllabus alignment.</p>
      </div>
    </section>

    <!-- EngiPrepHubFooter -->
    <footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
      <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
        <a href="/about.html" class="hover:text-white">About</a>
        <a href="/contact.html" class="hover:text-white">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
        <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
        <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
        <a href="/faq.html" class="hover:text-white">FAQ</a>
      </div>
      <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
    </footer>
</body>
</html>`;

const roadmapHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete First Year Engineering Roadmap | EngiPrepHub</title>
    <link rel="canonical" href="https://engiprephub.in/complete-first-year-roadmap">
    <meta name="description" content="Ultimate JNTUK R23 First Year Engineering Roadmap. Step-by-step curriculum targets, study routines, and coding milestones for engineering students.">
    <link rel="stylesheet" href="/src/style.css">
    <link rel="alternate" hreflang="en-IN" href="https://engiprephub.in/complete-first-year-roadmap.html">
    <link rel="alternate" hreflang="x-default" href="https://engiprephub.in/complete-first-year-roadmap.html">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-gray-300">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span class="font-black text-xl text-white">E</span>
                </div>
                <span class="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 italic">Hub</span></span>
            </a>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
                <a href="/semester-1.html" class="hover:text-blue-600 transition-colors">Semesters</a>
                <a href="/tools.html" class="hover:text-blue-600 transition-colors">Tools</a>
                <a href="/blog.html" class="hover:text-blue-600 transition-colors">Blog</a>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto py-32 px-6 lg:px-8">
        <span class="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] block mb-4">CORNERSTONE AUTHORITY GUIDE</span>
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-50 mb-7 font-['Space_Grotesk'] leading-tight tracking-tight">Complete First Year Engineering Roadmap</h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 dark:bg-slate-900/50 rounded-r-xl">Strategic Semester Prep, Core Coding Skills, Lab Practices & Study Patterns</p>
        
        <div class="prose prose-slate dark:prose-invert max-w-none space-y-12 leading-loose text-base sm:text-lg text-slate-800 dark:text-gray-300">
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mb-6 font-['Space_Grotesk']">JNTUK B.Tech First Year Study Planner & Success Roadmap</h2>
                <p class="mb-4">Transitioning to college academic expectations requires systematic study habits and consistent routines. This roadmap is organized by engineering toppers and academic mentors to structure preparation for courses including Mathematics, Coding, Applied Sciences, and Engineering Mechanics.</p>
                <p class="mb-4">A structured study plan helps build a strong foundation for both academic performance and career preparation.</p>
                <p class="mb-4">First semester success is highly correlated with early conceptual clarity. Physics and Chemistry require a solid understanding of molecular models and calculus-based derivations. Similarly, programming relies on structured algorithmic development rather than rapid code entries without logical verification.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">Active Study Cycles & Exam Preparation Tactics</h3>
                <p class="mb-4">Study strategies recommend dividing topics into weekly sprints, practicing active recall, maintaining dedicated formula logs for math and physics courses, and completing practice quizzes post-reading to reinforce retention.</p>
                <p class="mb-4">Reviewing resolved previous year questions (PYQs) is key to identifying high-yield topics and understanding grading criteria.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <div class="p-6 bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl">
                        <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Maintain High Internal Grades</h4>
                        <p class="text-sm">With internal marks constituting 30% of total grades, completing assignments timely and doing well in midterms reduces the pressure on external final exams.</p>
                    </div>
                    <div class="p-6 bg-teal-50 dark:bg-slate-900 border border-teal-100 dark:border-slate-800 rounded-2xl">
                        <h4 class="font-bold text-teal-700 dark:text-teal-400 mb-2">Active Recall Study Habits</h4>
                        <p class="text-sm">Instead of merely re-reading textbook passages, practice active recall by describing key concepts or solving problems organically in a separate study notebook.</p>
                    </div>
                </div>

                <h4 class="font-bold text-lg mb-2 text-slate-950 dark:text-slate-50">Strategic Study Timetable Scheme:</h4>
                <p class="mb-4">To help students establish a sustainable study routine, here is a balanced weekly study plan designed to allocate time effectively without causing burnout:</p>
                <ul class="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Mondays & Wednesdays (Mathematics Sprints):</strong> Focus on problem-solving, matrix reductions, and differential equations. Dedicate 2 hours to active derivation solving.</li>
                    <li><strong>Tuesdays & Thursdays (Applied Sciences & Engineering Basics):</strong> Review Physics and Chemistry concepts, focusing on molecular orbital structures and crystal lattices.</li>
                    <li><strong>Fridays (C Programming Practice):</strong> Solve at least 3 algorithmic problems on arrays, pointers, or file streams in a direct laboratory environment.</li>
                    <li><strong>Saturdays (Self-Assessment & PYQ analysis):</strong> Review notes from the week, identify difficult concepts, and practice previous years' question sets.</li>
                    <li><strong>Sundays (Recharge and SGPA Goal Planning):</strong> Refuel your energy and map milestones for the upcoming semester weeks.</li>
                </ul>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">Highly Recommended Textbooks Directories</h3>
                <p class="mb-4">Studying the right textbooks can clarify difficult concepts. The following reference books are recommended by our academic mentors:</p>
                <div class="overflow-x-auto my-6 bg-slate-101 dark:bg-slate-900 p-4 rounded-xl">
                    <ul class="space-y-4 text-sm font-medium">
                        <li><strong>Engineering Mathematics:</strong> "Higher Engineering Mathematics" by B.S. Grewal. Widely considered the gold standard for understanding matrices, vector spaces, and differential calculus.</li>
                        <li><strong>Engineering Physics:</strong> "A Textbook of Engineering Physics" by M.N. Avadhanulu and P.G. Kshirsagar. Excellent for conceptual clarity in quantum mechanics and optics.</li>
                        <li><strong>C Programming & Data Structures:</strong> "Programming in ANSI C" by E. Balagurusamy. A student-friendly introduction with numerous examples.</li>
                        <li><strong>Basic Electrical & Electronics:</strong> "Electrical Technology" by B.L. Theraja. Comprehensive coverage of AC/DC circuits and semiconductor parameters.</li>
                    </ul>
                </div>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-120 dark:bg-slate-910 px-3 py-1 rounded">Advanced Milestone 2</span>
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
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-120 dark:bg-slate-910 px-3 py-1 rounded">Advanced Milestone 3</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Comprehensive Year 1 Semester 2 Studying Roadmaps</h2>
                <p class="mb-4">Semester 2 introduces complex subjects like Engineering Mechanics and Basic Electrical Engineering. Adapting to this advanced coursework requires adjusting your study plans during the second half of your first year.</p>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-6 mb-3">1. Mastering Engineering Mechanics</h3>
                <p class="mb-4">Engineering Mechanics is fundamental for structural engineering. It covers forces, friction, centroids, moments of inertia, and simple frame trusses. A step-by-step approach can help you solve mechanics problems effectively:</p>
                <ol class="list-decimal pl-6 space-y-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>1. Draw the Free-Body Diagram (FBD):</strong> Isolate the body under study and draw all active and reactive forces acting on it with correct directions. This is the first and most critical step.</li>
                    <li><strong>2. Apply Equilibrium Equations:</strong> For coplanar concurrent forces, apply <code>&Sigma;Fx = 0</code> and <code>&Sigma;Fy = 0</code>. For non-concurrent systems, add the moment balance equation <code>&Sigma;M = 0</code>.</li>
                    <li><strong>3. Resolve Friction Components:</strong> When sliding is imminent, use <code>F_friction = &mu; * N</code> (friction coefficient multiplied by normal reaction force) to find equilibrium parameters.</li>
                    <li><strong>4. Use Method of Joints for Trusses:</strong> Isolate joints with at most two unknown forces, draw their FBDs, and apply horizontal and vertical force equilibrium to find member forces.</li>
                </ol>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">2. Studying Basic Electrical & Electronics Engineering</h3>
                <p class="mb-4">Electrical Engineering covers AC and DC circuit laws, electro-magnetic induction, alternating currents, three-phase systems, and basic semiconductor devices like diodes and transistors. Focus on mastering these key topics to build a strong foundation for future coursework:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>Kirchhoff's Laws (KCL & KVL):</strong> Use Kirchhoff's Current Law (sum of currents entering a node is zero) and Kirchhoff's Voltage Law (sum of voltage drops in a loop is zero) to analyze network meshes.</li>
                    <li><strong>Thevenin's and Norton's Theorems:</strong> Simplify complex circuits into an equivalent voltage source (Vth) and series resistance (Rth) to make analyzing load variations easier.</li>
                    <li><strong>AC Analysis & Power Factors:</strong> Learn alternating currents, phase differences, active power, reactive power, and methods like capacitor banks to improve power factors in inductive networks.</li>
                </ul>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-120 dark:bg-slate-910 px-3 py-1 rounded">Advanced Milestone 4</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Professional Networking & Career Portfolios in Year 1</h2>
                <p class="mb-4">Building a professional network in your first year can facilitate finding mentors, collaborative projects, and future internships. Modern engineering careers rely heavily on clear digital proof-of-work databases. We encourage students to setup LinkedIn and GitHub profiles early:</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-6 mb-3">4.1 Setting up GitHub & Repository Structures</h3>
                <p class="mb-4">Git tracks code changes, while GitHub hosts your work online. Register a free account, complete basic tutorials, and commit structural laboratory tasks to private or public repositories. This records systematic progress that future employers can easily audit for engineering competence.</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">4.2 Completing Industrial Certifications & Mini Projects</h3>
                <p class="mb-4">During semester breaks, complete basic projects like static websites, CLI utility games, or mathematical calculation scripts. Host these on web infrastructure to build confidence and establish a strong foundation for advanced technical training.</p>
            </section>

            <section class="pb-4">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">Weekly Academic Milestones</h3>
                <p class="mb-4">To excel, set weekly study milestones: dedicate 4 hours weekly to solving mathematics problem sets, write at least 2 clean coding scripts in C programming weekly, and review your notes within 24 hours of receiving lectures to ensure concepts stick in long-term memory. Over time, these consistent study patterns build a solid foundation of academic success.</p>
                <p class="mb-4 font-semibold text-slate-950 dark:text-slate-50">First Semester Milestones Summary:</p>
                <ul class="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Week 1-4:</strong> Establish core lecture note routines. Complete vector space math calculations.</li>
                    <li><strong>Week 5-8:</strong> Write basic conditional programming structures. Understand First-angle projection.</li>
                    <li><strong>Week 9-12:</strong> Complete mid-semester reviews. Resolve initial mock exam assignments.</li>
                    <li><strong>Week 13-16:</strong> Practice full mock final exams under laboratory constraints. This ensures you are prepared to perform effectively on actual examinations.</li>
                </ul>
            </section>
        </div>
    </main>

    <!-- Global Footer -->
    <footer class="pt-24 pb-12 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 transition-colors">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
                <div>
                    <a href="/" class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 text-slate-50">
                            <span class="font-black text-xl">E</span>
                        </div>
                        <span class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tighter">EngiPrep Hub</span>
                    </a>
                    <p class="text-sm text-slate-400 dark:text-slate-400 leading-loose mb-8 font-medium">
                        The ultimate JNTUK R23 engineering academic ecosystem. Built for future scholars, by university toppers.
                    </p>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Resources</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/notes.html" class="hover:text-blue-600 transition-colors">Study Notes PDF</a></li>
                        <li><a href="/pyqs.html" class="hover:text-blue-600 transition-colors">JNTUK Solved PYQs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Cornerstones</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/ultimate-jntuk-r23-guide.html" class="hover:text-blue-600 transition-colors">Ultimate JNTUK Guide</a></li>
                        <li><a href="/complete-first-year-roadmap.html" class="hover:text-blue-600 transition-colors">1st Year Roadmap</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Security & Legal</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/privacy-policy.html" class="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="/cookie-policy.html" class="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-12 border-t border-slate-100 dark:border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-slate-400 dark:text-slate-550 text-xs font-semibold">© 2026 EngiPrep Hub. All rights reserved.</p>
                <p class="text-slate-400 dark:text-slate-550 text-xs font-semibold italic tracking-tight">Engineered for Academic Excellence</p>
            </div>
        </div>
    </footer>
    <script type="module" src="/src/main.js"></script>

    <!-- EngiPrepAuthorBox -->
    <section class="max-w-4xl mx-auto my-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
      <img src="/public/logo.png" alt="EngiPrepHub Logo" class="w-20 h-20 rounded-full border border-slate-700">
      <div>
        <h3 class="text-lg font-bold text-white">About the Author</h3>
        <p class="text-slate-300 text-sm mt-2">EngiPrepHub is an academic initiative aimed at providing high-quality, verified, and structured JNTUK R23 study notes, PYQs, and interactive tools for engineering students. Our materials are reviewed by expert students and engineers to ensure syllabus alignment.</p>
      </div>
    </section>

    <!-- EngiPrepHubFooter -->
    <footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
      <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
        <a href="/about.html" class="hover:text-white">About</a>
        <a href="/contact.html" class="hover:text-white">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
        <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
        <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
        <a href="/faq.html" class="hover:text-white">FAQ</a>
      </div>
      <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
    </footer>
</body>
</html>`;

const faqHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frequently Asked Questions & Exam Guide | EngiPrepHub</title>
    <link rel="canonical" href="https://engiprephub.in/faq">
    <meta name="description" content="Find complete, detailed answers regarding JNTUK R23 grading calculations, midterm systems, attendance thresholds, and study guide tracking on EngiPrepHub.">
    <link rel="stylesheet" href="/src/style.css">
    <link rel="alternate" hreflang="en-IN" href="https://engiprephub.in/faq">
    <link rel="alternate" hreflang="x-default" href="https://engiprephub.in/faq">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen font-sans antialiased pb-32">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6">
        <div class="max-w-7xl mx-auto h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-4">
                <span class="text-xl font-black text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 dark:text-blue-500 font-black italic">Hub</span></span>
            </a>
            <div class="flex items-center gap-4">
                <a href="/faq.html" class="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">FAQ</a>
                <a href="/dashboard.html" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-black uppercase text-white transition-all">Dashboard</a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 pt-32">
        <div class="text-center mb-16">
            <h1 class="text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50 mb-4 font-['Space_Grotesk']">Frequently Asked Questions</h1>
            <p class="text-lg text-slate-500 dark:text-slate-400">Everything you need to know about academic rules and the EngiPrepHub portal.</p>
        </div>

        <div class="space-y-6 text-base leading-loose prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-gray-300">
            <h2>Detailed F.A.Q. Guide & Rules Directory for JNTUK R23 Academics</h2>
            <p>This comprehensive FAQ guide resolves common academic, regulatory, and technical queries regarding JNTUK R23 guidelines and EngiPrepHub portal tools. Save this index as a reference for exam success!</p>

            <div class="space-y-6">
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">1. How are Internal Marks calculated under the R23 Regulations?</h3>
                    <p class="text-slate-605 dark:text-slate-405 text-sm">Course internal scores (30 marks total) evaluate midterms and active continuous assessment as follows:</p>
                    <ul class="list-disc pl-6 my-2 text-sm text-slate-500">
                        <li><strong>Midterm Exam Performance (20 marks):</strong> Best test score contributes 80% weight, other test contributes 20%.</li>
                        <li><strong>Continuous Evaluation (10 marks):</strong> Divided across assignment sets, surprise quizzes, and semester presentations.</li>
                    </ul>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">2. What are the rules for attendance condonation?</h3>
                    <p class="text-slate-605 dark:text-slate-440 text-sm">Students must maintain a minimum of 75% overall attendance. If your attendance is between 65% and 75% due to medical reasons, it can be condoned by submitting a medical certificate and paying a condonation fee. Attendance below 65% results in detention, requiring the student to repeat the semester.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">3. How are SGPAs and CGPAs calculated?</h3>
                    <p class="text-slate-605 dark:text-slate-440 text-sm">SGPA (Semester Grade Point Average) is computed as follows:</p>
                    <div class="bg-slate-105 dark:bg-slate-950 p-4 rounded-xl my-2 text-center font-mono text-xs text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800">
                        SGPA = &Sigma;(Course_Credits * Grade_Points) / Total_Credits_Attempted
                    </div>
                    <p class="text-slate-650 dark:text-slate-440 text-sm mt-2">CGPA (Cumulative Grade Point Average) averages the weighted SGPAs across all semesters completed to date.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">4. What is the passing mark criteria for JNTUK exams?</h3>
                    <p class="text-slate-605 dark:text-slate-440 text-sm">To pass a course, a student must secure a minimum of 35% of the external exam marks (24.5 out of 70) and a minimum of 40% of the aggregate marks (40 out of 100 overall, combining internal and external scores).</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">5. Can students take Minor or Honors degrees under the R23 Regulations?</h3>
                    <p class="text-slate-605 dark:text-slate-440 text-sm">Yes. Students maintaining a CGPA of 8.0 or higher with no active backlogs can opt for a Minor or Honors degree in specific disciplines, which requires earning an additional 20 credits beyond the core 160 credits.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">6. How does revaluation work at JNTU?</h3>
                    <p class="text-slate-605 dark:text-slate-440 text-sm">If you find passing grading evaluations questionable, you can apply for paper revaluation by submitting a formal request within 15 days of result publication and paying the prescribed fee. The paper is then re-evaluated by an independent examiner.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">7. How does EngiPrepHub secure student data?</h3>
                    <p class="text-slate-605 dark:text-slate-440 text-sm">Student data, bookmarks, notes access, and profile progress metrics are stored securely in local browsers using clean localStorage techniques, and synchronized with our secure database when logged in. Credentials are encrypted and hashed before being stored.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">8. What is the JNTUK credit-deficient system?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">While there are no credit promotion thresholds between Sem 1 and Sem 2, transitioning to higher levels requires resolving backlog credits to satisfy minimal threshold conditions:</p>
                    <ul class="list-disc pl-6 my-2 text-sm text-slate-500">
                        <li><strong>Promotion to 3rd Year:</strong> Must have passed a minimum of 40% of the credits of the 1st year.</li>
                        <li><strong>Promotion to 4th Year:</strong> Must have passed a minimum of 40% of the credits from the first two years combined.</li>
                    </ul>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">9. How do I prepare effectively for drawing sheets under AutoCAD constraints?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">AutoCAD laboratory exams require students to draw elements by typing commands directly into the command-line interface. To prepare, learn standard line orientations, circle radii, limits initialization, and zoom coordinates by heart. This ensures that you can complete drawings efficiently since CAD interfaces use standardized prompt fields.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">10. What is a grace mark scheme in board evaluation?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Under exceptional circumstances, such as if a question is out-of-syllabus or contains typographical errors, university committees can authorize grace marks. These are added to the scores of all students who attempted the question to ensure fair grading.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">11. What are Open Elective courses?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Open Electives are courses offered by other departments, allowing you to study subjects outside your core discipline (for example, a Computer Science student can take an Open Elective in Robotics or Finance) to broaden your skills.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">12. How can I challenge my final exam evaluation?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">If you believe there was an error in grading your end-semester exam paper, you can request a formal revaluation within 15 days of the results release by paying the designated revaluation fee to the university administration.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">13. What is the criteria for a First-Class with Distinction award?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">To graduate with First-Class with Distinction, a student must secure a Cumulative Grade Point Average (CGPA) of 7.5 or higher within four years of study, without clearing any backlogs in subsequent attempts.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">14. What are the rules for writing mid-semester exams?</h3>
                    <p class="text-slate-605 dark:text-slate-440 text-sm">Midterm exams are mandatory. If a student misses a midterm due to a valid emergency, they must apply for permission from the department head to sit for a makeup exam.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">15. How does the choice-based credit system (CBCS) benefit students?</h3>
                    <p class="text-slate-605 dark:text-slate-440 text-sm">The CBCS allows students to choose elective courses that match their interests and career goals, rather than following a rigid schedule of mandatory subjects, encouraging a more customized learning experience.</p>
                </div>

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

                <div class="bg-white dark:bg-slate-900 border border-slate-120 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">19. Can I change my branch in the second year?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Yes, branch transfers are permitted under exceptional circumstances for high-performing students who maintain a CGPA of 9.0 or higher in their first year, subject to seat availability in the target department.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">20. What is a backlog examination?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">If you do not pass a subject, you can clear it by registering for and passing the backlog supplementary examinations offered during subsequent semesters.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
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

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">26. How do I access college library databases under JNTUK?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Students can access library resources using their digital library cards. This allows search and download of digital textbook resources, and review of research papers on platforms like IEEE Xplore while on campus.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">27. What are the rules for choosing open elective courses?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">You must select an Open Elective course offered by a different department than your own (for example, a Civil Engineering student can study Python or Database Management) to gain interdisciplinary skills.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">28. What should I do if there is a scheduling conflict during exams?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Scheduling conflicts are rare as exam timetables are coordinated centrally. In the event of a conflict, contact your department head immediately to submit an official request to the university exam branch for a rescheduled slot.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">29. How do I calculate CGPA into percentage?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Under the JNTUK regulations, you can estimate your equivalent percentage from your CGPA using this formula:</p>
                    <div class="bg-slate-105 dark:bg-slate-950 p-4 rounded-xl my-2 text-center font-mono text-xs text-blue-600 dark:text-blue-400">
                        Percentage (%) = (CGPA - 0.75) * 10
                    </div>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">30. Can I apply for photocopy of my evaluated answer scripts?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Yes, you can apply to receive a photocopy of your evaluated end-semester answer booklet by submitting a formal application and paying the prescribed fee within the announced application window.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">31. What is the grace mark scheme or moderation parameter?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Committees can authorize moderation or grace marks for questions that contain errors or fall outside the official syllabus, adding marks to the scores of all affected students to ensure fair grading.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">32. How can I earn an Honors degree in CSE?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Students maintaining an 8.0 CGPA or higher with no active backlogs can opt for an Honors path, which requires earning an additional 20 credits through designated advanced courses beyond the core 160 credits.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">33. How does the student code of conduct affect grading eligibility?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Malpractice during examinations, structural misconduct, or persistent disciplinary issues can lead to suspension from exams or academic detention, depending on the severity of the violation.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">34. Does the college provide counseling or mental wellness support?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Yes, most campuses have dedicated academic counselors and wellness cells where students can discuss stress, exam anxiety, or personal academic challenges in confidence.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">35. Can I register for supplementary exams in the same semester?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Supplementary backlog exams for first-semester courses are typically held alongside regular exams in subsequent semesters, allowing you to resolve backlogs without delaying your graduation timeline.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">36. What is the National Academic Depository (NAD)?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">NAD is a digital storehouse of all academic awards (degrees, diplomas, transcripts) logged through DigiLocker. This database facilitates swift, verified digital sharing of achievements with companies and other universities.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">37. How often does the university revise its syllabus regulations?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Regulations are usually updated every three to four academic years (such as R19, R20, and R23) to keep curriculum paths aligned with emerging technology developments and corporate hiring trends.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">38. Can I pursue studies abroad with a JNTU degree?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Yes, degrees awarded by JNTUK are recognized internationally. To apply to foreign universities, request official transcripts and letters of recommendation from your college administration to support your applications.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">39. What is a credit exemptions limit?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Under previous regulations, eligible students could be exempt from a limited number of elective credits if they achieved high overall scores. However, under the current R23 regulations, students must complete all 160 credits of the curriculum to graduate with their B.Tech degree.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">40. Who runs EngiPrepHub?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">EngiPrepHub is an independent, community-driven academic portal structured by university toppers and alumni. Our goal is to provide students with high-quality, verified study materials, PYQs, and interactive calculators to support their studies.</p>
                </div>
            </div>
        </div>
    </main>

    <!-- EngiPrepHubFooter -->
    <footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
      <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
        <a href="/about.html" class="hover:text-white">About</a>
        <a href="/contact.html" class="hover:text-white">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
        <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
        <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
        <a href="/faq.html" class="hover:text-white">FAQ</a>
      </div>
      <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
    </footer>
    <script type="module" src="/src/main.js"></script>
</body>
</html>`;

fs.writeFileSync('ultimate-jntuk-r23-guide.html', regulationsHtml, 'utf8');
fs.writeFileSync('complete-first-year-roadmap.html', roadmapHtml, 'utf8');
fs.writeFileSync('faq.html', faqHtml, 'utf8');

console.log('SUPER OVERWRITE COMPLETE!');
