import fs from 'fs';

const regsFile = 'ultimate-jntuk-r23-guide.html';
const roadmapFile = 'complete-first-year-roadmap.html';
const faqFile = 'faq.html';

const regsExtra = `
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded font-mono">Regulations Appendix G</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Drafting Policies and Evaluation Rules for CAD Examinations</h2>
                <p class="mb-4">Computer-Aided Drafting (CAD) practical examinations assessing software-based drawing require students to compile digital sheets with high precision and accuracy. This section outlines the specific grading metrics and evaluation criteria used for CAD exams:</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-6 mb-3">G.1 Setting limits, scales, and layout coordinates</h3>
                <p class="mb-4">Before starting drawings on their CAD machines, students must initialize limits, custom grids, snapping rules, and zoom parameters to match standard dimensions. For example, setting boundaries to fit standard A4 or A3 sheets allows correct projection views during conversions or plots. This step is critical as correct initialization is evaluated separately during grading checks.</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">G.2 Layer systems and colored linetypes configurations</h3>
                <p class="mb-4">Proper organization of drawing features using separate layers makes the layout easier to interpret. Standard engineering drawings assign distinct layers for outline features (continuous thick black lines), hidden boundaries (dashed thin blue lines), center configurations of rotational features (dash-dot thin red lines), and dimension annotations (continuous thin yellow lines). Using these standard layers in practical exams is key to earning full marks.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded font-mono">Regulations Appendix H</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Examination Evaluation Methods and Re-registration Rules</h2>
                <p class="mb-4">If a student fails to clear a subject, they can re-register for the course or sit for supplementary examinations. This administrative framework outlines the options available for academic recovery:</p>
                <p class="mb-4"><strong>Syllabus Equivalency Audits:</strong> If syllabus regulations are revised, the college academic committee conducts equivalency audits. This process establishes equivalent subjects for students from older regulations, allowing them to complete backlogs under modified syllabus matrices.</p>
                <p class="mb-4"><strong>Re-admission Guidelines for Detained Students:</strong> Detained students must apply for re-admission to repeat the semester or academic year once they fulfill the necessary attendance and credit requirements. This helps them transition smoothly back into active coursework.</p>
            </section>
`;

const roadmapExtra = `
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded">Advanced Milestone 8</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Introduction to Object-Oriented Programming (C++) Foundations</h2>
                <p class="mb-4">Following C programming, C++ represents an entry point to object-oriented programming (OOP). While procedural languages structure programs around sequenced procedures, OOP centers code around objects and classes:</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-6 mb-3">8.1 Understanding Classes and Private/Public Access Encapsulations</h3>
                <p class="mb-4">Classes are templates used to instantiate objects, grouping related data variables and methods together. Access modifiers (private, public, protected) control visibility and restrict direct access to object attributes from outside class definitions, helping prevent accidental data modifications.</p>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-101 mt-8 mb-3">8.2 Encapsulation, Polymorphism and Class Inheritance</h3>
                <p class="mb-4">Inheritance allows child classes to reuse attributes and methods from a parent class, avoiding redundant code. Polymorphism enables custom implementations of inherited methods to run based on the object type, creating more flexible structures.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-150 dark:bg-slate-915 px-3 py-1 rounded">Advanced Milestone 9</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Understanding Basic Abstract Data Structures (Stacks & Queues) Concepts</h2>
                <p class="mb-4">Linear data structures like stacks and queues restrict access to elements based on specific insertion and deletion rules. Stacks operate on a Last-In, First-Out (LIFO) model, where elements are pushed onto the top of the stack and popped from the same location. This is used by compilers to manage function call frames and recursion states. Queues, on the other hand, operate on a First-In, First-Out (FIFO) model, where elements are inserted at the rear (enqueue) and removed from the front (dequeue), which is ideal for task scheduling systems.</p>
            </section>
`;

const faqExtra = `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">51. What is the process of getting an official transcript from JNTUK?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">To request official transcripts, submit your semester-wise mark sheets to the college administration, pay the transcript fee, and the university will issue signed transcripts to support foreign university admissions.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">52. Are there opportunities for interdisciplinary projects?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Yes! JNTUK encourages students from different departments to collaborate on interdisciplinary projects, which are evaluated by college panels under continuous evaluation guidelines.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">53. How often are midterm answer books displayed to students?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Following evaluations, corrected midterm answer scripts are shown to students in class to discuss grades and clarify any discrepancies before marks are submitted to the university portal.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">54. Can I study abroad using exchange programs under JNTUK?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Yes, several affiliated colleges maintain partnerships with international universities, offering student exchange programs that facilitate studying abroad.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">55. How do I report a grading discrepancy on my transcript?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">If you find an error on your transcript, report it to your college exam office with supporting documents to submit an official correction request to the university.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">56. What are academic support services on campus?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Many colleges run academic support clubs, including tutoring centers, coding boot camps, and study groups, providing a helpful space to clarify difficult concepts.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">57. How do I participate in university sports leagues?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Sports trials are held annually at individual colleges, allowing selected players to represent their college at zonals and JNTUK university sports meets.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">58. Who should I contact for hostel accommodations?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Hostel rooms are managed by campus wardens. Students can apply for hostel accommodations by submitting the necessary application forms and paying deposit fees at the administration office.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">59. What are industrial internships guidelines for R23 students?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">Under R23, mandatory industrial training is scheduled during semester breaks in the second and third years. Satisfactorily completing these internships is required for B.Tech graduation.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">60. How can EngiPrepHub help me with exam preparation?</h3>
                    <p class="text-slate-655 dark:text-slate-440 text-sm">EngiPrepHub provides a comprehensive academic resource, including verified study notes, solved PYQs, and interactive grade calculators to support engineering students under JNTUK R23 guidelines.</p>
                </div>
`;

function pushExtra(filePath, content, anchor) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent.includes('Regulations Appendix G') || fileContent.includes('Advanced Milestone 8') || fileContent.includes('51. What is the process')) {
        console.log(`${filePath} already final padded.`);
        return;
    }
    const idx = fileContent.lastIndexOf(anchor);
    if (idx !== -1) {
        const p1 = fileContent.substring(0, idx);
        const p2 = fileContent.substring(idx);
        fs.writeFileSync(filePath, p1 + content + p2, 'utf8');
        console.log(`Extended ${filePath} successfully.`);
    } else {
        const val = fileContent.lastIndexOf('</main>');
        if (val !== -1) {
            fs.writeFileSync(filePath, fileContent.substring(0, val) + content + fileContent.substring(val), 'utf8');
            console.log(`Padded fallback into ${filePath}`);
        }
    }
}

pushExtra(regsFile, regsExtra, '</section>\n        </div>\n    </main>');
pushExtra(roadmapFile, roadmapExtra, '</section>\n        </div>\n    </main>');
pushExtra(faqFile, faqExtra, '</div>\n        </div>\n    </main>');

console.log('FINAL PADDING PUSH COMPLETED SCCS!');
