import fs from 'fs';

// Load files
const regsFile = 'ultimate-jntuk-r23-guide.html';
const roadmapFile = 'complete-first-year-roadmap.html';
const faqFile = 'faq.html';

// ---------------- regs addition ----------------
const regsAddition = `
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded font-mono">Regulations Appendix D</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Credit Structure and Multi-Disciplinary Curriculum for non-CSE Branches</h2>
                <p class="mb-4">While CSE and digital technology branches have high student enrollment rates across JNTUK colleges, traditional core departments such as Civil, Mechanical, Electronics and Communication (ECE), and Electrical and Electronics Engineering (EEE) follow equally rigorous academic pathways under the R23 framework. This appendix outlines their specific semester credits distribution along with core lab objectives:</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">D.1 Electrical and Electronics Engineering (EEE) Core Objectives</h3>
                <p class="mb-4">The electrical engineering track focuses on electrical circuit analysis, power systems, electromagnetic fields, electrical machines, control systems, power electronics, and electrical measurements. In their first year, EEE students study Basic Electrical and Electronics Engineering (BEEE) and practical lab work to build a foundation in Kirchhoff's laws and network analysis before studying AC machines in later semesters.</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">D.2 Mechanical Engineering (ME) Workshop and Manufacturing Systems</h3>
                <p class="mb-4">The mechanical engineering curriculum focuses on thermodynamics, fluid mechanics, heat transfer, machine design, theory of machines, computer-aided design (CAD), manufacturing processes, and industrial engineering. First-year ME students complete Engineering Workshop labs to learn basic fitting, carpentry, blacksmithy, tin-smithy, house-wiring, and foundry operations by hand, which helps them appreciate manufacturing tolerances before working on CNC machine tools in subsequent semesters.</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">D.3 Civil Engineering (CE) Mechanics and Surveying Foundations</h3>
                <p class="mb-4">The civil engineering program covers engineering mechanics, strength of materials, fluid mechanics, hydraulics, structural analysis, surveying, concrete technology, geotechnical engineering, environmental engineering, transportation engineering, and estimation and costing. CE students focus on learning structural mechanisms, static load balancing on beams, centroid and moment calculations, and spatial surveying under different terrain contours.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded font-mono">Regulations Appendix E</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">University Academic Calendar Coordination and Milestone Timelines</h2>
                <p class="mb-4">Succeeding academically under JNTUK requires understanding the university's academic calendar. The university operates on a 16-week semester basis. A typical semester-wise academic calendar coordinates several key events:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>Week 1-2 (Class Commencement & Registration):</strong> Students register for courses, including choosing Open and Professional Electives under continuous evaluation frameworks.</li>
                    <li><strong>Week 8 (Midterm-1 Evaluations):</strong> Mid-term tests assess the first half of the syllabus. Consistent preparation is important as these marks contribute directly to your internal assessment score.</li>
                    <li><strong>Week 16 (Practical Examinations):</strong> Semester-end practical examinations assess lab logs, records, viva-voce answers, and hands-on performance.</li>
                    <li><strong>Week 17-18 (Final External Exams):</strong> Theory exams are administered at designated exam centers, requiring consistent preparation throughout the semester to perform effectively.</li>
                </ul>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded font-mono">Regulations Appendix F</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">National Education Policy (NEP) 2020 Guidelines & Integrity</h2>
                <p class="mb-4">The JNTUK R23 regulations integrate key recommendations of India's National Education Policy (NEP) 2020. This framework introduces credit transfer facilities and multi-disciplinary pathways to provide a more flexible educational experience:</p>
                <p class="mb-4"><strong>Academic Bank of Credits (ABC):</strong> The ABC acts as a digital repository for students' academic credits earned across approved institutions. This database tracks and aggregates credits, simplifying credit verification and transfer during admissions or program transitions.</p>
                <p class="mb-4"><strong>Continuous Internal Evaluation (CIE) Integrity:</strong> CIE ensures consistent academic assessments through regular class participations, assignments, and presentations. This balanced approach reduces reliance on final end-semester exam scores alone.</p>
            </section>
`;

// ---------------- roadmap addition ----------------
const roadmapAddition = `
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded">Advanced Milestone 5</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Advanced Study Sprints for Engineering Mathematics-2 (ODE & Vector Fields)</h2>
                <p class="mb-4">Mathematics-2 builds on first-semester calculus to analyze vector field properties and ordinary differential equations. Students must master these core topics:</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-6 mb-3">5.1 Ordinary Differential Equations of Higher Order</h3>
                <p class="mb-4">Solving non-homogeneous linear differential equations with constant coefficients requires finding both the complementary function (CF) and the particular integral (PI). CF is found by finding the roots of the auxiliary equation f(m) = 0. Depending on whether roots are real with distinct properties, real with repeated properties, or complex conjugates, different formulations are applied. Finding the PI requires applying operator methods based on the non-homogeneous term (for example, exponential functions, trigonometric terms, or polynomials).</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">5.2 Vector Field Calculus</h3>
                <p class="mb-4">Vector calculus analyzes spatial field variations. The gradient operator maps scalar fields to three-dimensional vector systems, while divergence measures vector outflows from a coordinate point. Curl measures rotation or twisting around an axis. These concepts are fundamental in physics and engineering applications, such as calculating fluid flow velocities and electric fields.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded">Advanced Milestone 6</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Technical Writing, Structuring Project Reports & Presentation Methodologies</h2>
                <p class="mb-4">Developing strong technical communication skills is essential for your engineering career. Research and development projects require clear presentation of data, methodologies, and conclusions in formal reports:</p>
                <p class="mb-4"><strong>Structuring Project Reports:</strong> Standard technical reports include a concise abstract, introduction, methodology, results and discussion, conclusions, and a reference list. Following this clear structure helps communicate your findings effectively.</p>
                <p class="mb-4"><strong>Presenting and Public Speaking:</strong> Presenting your work clearly in technical seminars or project evaluations is an important skill. Focus on defining clear visual aids, structuring the logical flow of your slides, and practicing delivery to build confidence.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded">Advanced Milestone 7</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Setup of Development Environments: VS Code, Git Actions & Compiler Configurations</h2>
                <p class="mb-4">Establishing a clean, efficient development environment is essential for effective coding. Configuring your tools correctly can save time and streamline your workflow:</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-6 mb-3">7.1 Installing VS Code and Recommended Extensions</h3>
                <p class="mb-4">VS Code is a versatile code editor for modern software development. Install the editor from official portals, then configure extensions for C/C++ (by Microsoft) and Prettier for automatic formatting. This setup helps write clean, well-formatted code more efficiently.</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">7.2 Managing GCC Compiler Tools on Local Terminals</h3>
                <p class="mb-4">Compiling C code locally requires installing the GNU Compiler Collection (GCC) via MinGW for Windows or Homebrew for macOS. Once installed, configure your system's PATH variable to compile and run programs directly from the terminal, simplifying the debugging process.</p>
            </section>
`;

// ---------------- faq addition ----------------
const faqAddition = `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">41. What is the role of an academic mentor?</h3>
                    <p class="text-slate-650 dark:text-slate-440 text-sm">Academic mentors are assigned to guide you through your studies, helping you select elective courses, plan your academic schedule, and navigate college academic procedures.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">42. How are industrial visits organized at JNTU colleges?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Industrial visits are typically scheduled from the third year, coordinating with manufacturing facilities or corporate offices to expose students to practical applications of engineering concepts.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">43. What is the minimum attendance required to write final exams?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Students must maintain at least 75% overall attendance. Attendance between 65% and 75% due to medical reasons can be condoned by submitting medical documents and paying a condonation fee to the college office.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">44. Are there mock assessments before end-semester exams?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Yes, many college departments run preparatory or mock examinations prior to final tests to help students practice and manage their time effectively under exam conditions.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">45. How does the choice-based credit system benefit students?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">The CBCS allows students to select elective courses that align with their career goals, enabling them to customize their studies and specialize in newer technologies.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">46. What is the difference between a backlog and a supplementary exam?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">A backlog refers to a subject you did not pass on your first attempt, while supplementary exams are scheduled during subsequent semesters to allow you to clear backlogs without delaying graduation.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">47. What is the process for declaring end-semester results?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">JNTUK evaluates exam scripts centrally, and publishes official results online within 30 to 45 days of the final exam dates, followed by individual mark sheet distributions.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">48. Are there student clubs on campus?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Most colleges have active student clubs, including coding clubs, robotics clubs, dramatic setups, cultural forums, and sports leagues, encouraging active participation outside class hours.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">49. What facilities are available in college digital libraries?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Digital libraries offer high-speed internet access, enabling researchers and students to browse academic journals, download e-books, and read publications on databases like IEEE or ScienceDirect.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">50. Can I get support for start-up concepts or incubator facilities?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Yes, several JNTUK institutions run dedicated Entrepreneurship Incubation Centers (EICs). EICs provide early funding, work spaces, and mentorship programs to support students who want to develop technology businesses.</p>
                </div>
`;

// Helper to inject addition right inside the prose area before the last structural element
function injectBefore(filePath, additionContent, anchorTag) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('Regulations Appendix D') || content.includes('Advanced Milestone 5') || content.includes('41. What is the role of an academic mentor')) {
        console.log(`${filePath} already monumentalized.`);
        return;
    }
    const index = content.lastIndexOf(anchorTag);
    if (index !== -1) {
        const firstPart = content.substring(0, index);
        const secondPart = content.substring(index);
        const newContent = firstPart + additionContent + secondPart;
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Successfully extended ${filePath}`);
    } else {
        console.log(`Could not find anchor in ${filePath}, appending before main.`);
        const fbIndex = content.lastIndexOf('</main>');
        if (fbIndex !== -1) {
            const firstPart = content.substring(0, fbIndex);
            const secondPart = content.substring(fbIndex);
            const newContent = firstPart + additionContent + secondPart;
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Successfully appended into ${filePath}`);
        }
    }
}

injectBefore(regsFile, regsAddition, '</section>\n        </div>\n    </main>');
injectBefore(roadmapFile, roadmapAddition, '</section>\n        </div>\n    </main>');
injectBefore(faqFile, faqAddition, '</div>\n        </div>\n    </main>');

console.log('MONUMENTAL PIPELINE EXECUTION COMPLETE!');
