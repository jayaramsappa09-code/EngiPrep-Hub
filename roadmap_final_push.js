import fs from 'fs';

const roadmapFile = 'complete-first-year-roadmap.html';

const furtherContent = `
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded">Advanced Milestone 11</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">First Year Coding Platforms Strategy & Profile Development</h2>
                <p class="mb-4">To build strong programming skills, practicing regularly on online coding platforms can be highly effective. This section outlines recommended platforms and how to use them to support your studies:</p>
                <ul class="list-disc pl-6 space-y-4 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>1. HackerRank:</strong> A student-friendly platform with structured tutorials on programming fundamentals, math, and SQL. Completing these challenges can help you build confidence before attempting more complex tasks.</li>
                    <li><strong>2. LeetCode:</strong> Excellent for practicing data structures and algorithms, which are key components of technical interviews. Focus on solving "Easy" and "Medium" difficulty problems to build solid problem-solving skills.</li>
                    <li><strong>3. GeeksforGeeks:</strong> A comprehensive learning platform containing detailed tutorials, articles, and practice challenges on a wide range of computer science topics.</li>
                    <li><strong>4. Codeforces:</strong> Best for competitive programming enthusiasts who want to test their skills in timed coding contests against students worldwide.</li>
                </ul>
                <p class="mb-4">We encourage first-year students to dedicate 2-3 hours weekly to practicing on these platforms to reinforce technical concepts and prepare for future coursework.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-101 dark:bg-slate-909 px-3 py-1 rounded">Advanced Milestone 12</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Preparing for Technical Hackathons and Collaborative Projects</h2>
                <p class="mb-4">Participating in technical hackathons is an excellent way to apply your skills, collaborate with peers, and build unique projects for your portfolio:</p>
                <p class="mb-4"><strong>What is a Hackathon:</strong> Hackathons are continuous, timed events (typically 24 to 48 hours) where teams collaborate to build software or hardware solutions to designated challenges.</p>
                <p class="mb-4"><strong>Building Your First Hackathon Team:</strong> Form team configurations with classmates having complementary skills (such as a designer, standard programmer, and a presenter), choose a clearly defined project scope, and focus on building a working prototype to present to panels.</p>
            </section>

            <section class="pb-4">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk'] font-semibold">Active Study Routines Summary</h3>
                <p class="mb-4">To excel academically, maintain consistent study habits throughout the semester. Focus on active recall, solve practice question sets, and collaborate with supportive peers to build a strong foundation of success in your engineering studies.</p>
            </section>
`;

let content = fs.readFileSync(roadmapFile, 'utf8');
if (content.includes('Advanced Milestone 11')) {
    console.log('Already expanded roadmap.');
} else {
    const anchor = '</main>';
    const idx = content.lastIndexOf(anchor);
    if (idx !== -1) {
        fs.writeFileSync(roadmapFile, content.substring(0, idx) + furtherContent + content.substring(idx), 'utf8');
        console.log('Successfully expanded roadmap!');
    }
}
