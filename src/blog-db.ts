
export interface Blog {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
}

export const blogDatabase: Blog[] = [
    {
        id: 1,
        category: "Chemistry",
        title: "Mastering the Nernst Equation in 10 Minutes",
        excerpt: "The Nernst equation is guaranteed to appear in your R23 Unit 3 exam. Here is how to lock in those 10 marks without memorizing.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-4">The Nernst equation can seem intimidating because of the logarithms and constants, but it boils down to one core concept: calculating cell potential under non-standard conditions.</p>
            <h4 class="text-lg font-black text-slate-50 mb-2 mt-6">The Golden Formula</h4>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 inline-block">
                <p class="text-sky-400 font-mono text-sm font-bold tracking-wider">E_cell = E°_cell - (0.0591 / n) * log10([Products]/[Reactants])</p>
            </div>
            <p class="text-slate-400 text-sm leading-loose mb-4"><strong class="text-rose-400">Common Mistake:</strong> Flipping the products and reactants. Always remember: Anode (Oxidation) goes on top, Cathode (Reduction) goes on bottom when dealing with ion concentrations.</p>
            <p class="text-slate-400 text-sm leading-loose">Practice 3 PYQs tonight substituting standard potentials, and you will secure an O grade here.</p>
        `,
        tags: ["Numericals", "Unit 3", "High Weightage"]
    },
    {
        id: 2,
        category: "Data Structures",
        title: "Why You Keep Failing Linked List Traversals",
        excerpt: "Null pointer exceptions ruining your coding exams? Here is the mental model to traverse Linked Lists flawlessly.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-4">Most R23 students fail Linked Lists because they try to memorize the code instead of visualizing the pointers.</p>
            <h4 class="text-lg font-black text-slate-50 mb-2 mt-6">The Two-Pointer Technique</h4>
            <p class="text-slate-400 text-sm leading-loose mb-4">Whenever you are dealing with middle elements or reversals, use a 'slow' and 'fast' pointer.</p>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 inline-block">
                <pre class="text-sky-400 font-mono font-bold tracking-wider text-xs">Node slow = head;\nNode fast = head;\nwhile(fast != null && fast.next != null) {\n  slow = slow.next;\n  fast = fast.next.next;\n}</pre>
            </div>
            <p class="text-slate-400 text-sm leading-loose mb-4">By the time 'fast' reaches the end, 'slow' is exactly at the middle. No counters needed!</p>
            <div class="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl mt-4">
                <p class="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">PRO TIP</p>
                <p class="text-slate-400 text-sm">Always check \`if(head == null)\` at the very beginning of your function.</p>
            </div>
        `,
        tags: ["Coding", "Pointers", "Algorithms"]
    },
    {
        id: 3,
        category: "Exam Strategy",
        title: "The 'First 15 Minutes' Rule for JNTUK Exams",
        excerpt: "How topper students utilize the paper reading time to secure an extra 10-15 marks.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-4">When the invigilator hands you the question paper, do NOT start writing immediately.</p>
            <ul class="list-disc list-inside text-slate-400 text-sm leading-loose mb-6 space-y-3">
                <li><strong class="text-white">Scan for high-confidence derivations:</strong> Identify the 10-mark questions you know perfectly (e.g., Schrodinger Equation in Chemistry).</li>
                <li><strong class="text-white">Jot down formulas on the back page:</strong> Do this before exam anxiety kicks in. Write down Nernst, Beer-Lambert, or physics wave equations.</li>
                <li><strong class="text-white">Plan the sections:</strong> Allocate 30 minutes per long answer. Never spend 1 hour on a single question.</li>
            </ul>
            <p class="text-slate-400 text-sm leading-loose">By following this plan, you ensure that you don't run out of time for the questions you know best.</p>
        `,
        tags: ["Time Management", "Hacks", "Board Exams"]
    },
    {
        id: 4,
        category: "Physics",
        title: "Demystifying Interference & Diffraction",
        excerpt: "They sound the same, but examiners look for specific keywords to differentiate them. Learn them here.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-6">Interference vs. Diffraction is a guaranteed 5-mark short answer. Do not write vague stories. Write precise definitions.</p>
            <div class="bg-indigo-950/20 p-5 rounded-xl border border-indigo-500/20 mb-4">
                <p class="text-indigo-400 text-sm font-black uppercase tracking-widest mb-2">Interference</p>
                <p class="text-slate-400 text-sm leading-loose">Superposition of waves from <strong class="text-indigo-300">two different coherent sources</strong>.</p>
            </div>
            <div class="bg-rose-950/20 p-5 rounded-xl border border-rose-500/20 mb-4">
                <p class="text-rose-400 text-sm font-black uppercase tracking-widest mb-2">Diffraction</p>
                <p class="text-slate-400 text-sm leading-loose">Superposition of waves from <strong class="text-rose-300">different parts of the same wavefront</strong>.</p>
            </div>
            <p class="text-slate-400 text-sm leading-loose">Underline the bolded words in your exam sheet. Examiners actively look for "coherent sources" vs "same wavefront".</p>
        `,
        tags: ["Unit 1", "Theory", "Definitions"]
    },
    {
        id: 5,
        category: "Chemistry",
        title: "Plastic vs Resin vs Elastomer: 1-Minute Cheat Sheet",
        excerpt: "Stop losing marks on polymer classifications in Unit 4. Here is the absolute distinction guide.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-6">Unit 4 polymer chemistry is massive, but classifications are simple. Examiners love comparison tables.</p>
            <div class="grid gap-4 md:grid-cols-3 mb-6">
                <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <p class="text-sky-400 text-xs font-black uppercase tracking-widest mb-2">Plastics (Thermo)</p>
                    <p class="text-slate-400 text-xs leading-loose">Can be melted and reshaped repeatedly. Mostly linear chains. (e.g., PVC, Teflon)</p>
                </div>
                <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <p class="text-amber-400 text-xs font-black uppercase tracking-widest mb-2">Resins (Thermosetting)</p>
                    <p class="text-slate-400 text-xs leading-loose">Permanent set, high cross-linking. Cannot be remelted once formed. (e.g., Bakelite)</p>
                </div>
                <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <p class="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">Elastomers</p>
                    <p class="text-slate-400 text-xs leading-loose">High elasticity, very weak intermolecular forces. Stretchable. (e.g., Buna-S, Buna-N)</p>
                </div>
            </div>
            <p class="text-slate-400 text-sm leading-loose">Draw this exact structure as a table if asked to differentiate.</p>
        `,
        tags: ["Unit 4", "Polymers", "Quick Revise"]
    },
    {
        id: 6,
        category: "Mathematics",
        title: "Eigenvalues & Eigenvectors: The Visual Proof",
        excerpt: "Stop crunching determinants blindly. Understand what an Eigenvector actually is.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-4">When a matrix multiplies a vector, it normally rotates and stretches it. But for some special vectors, the matrix <em>only</em> stretches it.</p>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 inline-block">
                <p class="text-amber-400 font-mono text-sm font-bold tracking-wider">A · v = λ · v</p>
            </div>
            <ul class="list-disc list-inside text-slate-400 text-sm leading-loose mb-4 space-y-2">
                <li><strong>v (Eigenvector):</strong> The direction that doesn't change.</li>
                <li><strong>λ (Eigenvalue):</strong> How much it stretches or shrinks.</li>
            </ul>
            <p class="text-slate-400 text-sm leading-loose">If you remember this concept, checking your answers becomes trivial: just multiply your found vector by the original matrix.</p>
        `,
        tags: ["Linear Algebra", "Conceptual"]
    },
    {
        id: 7,
        category: "Chemistry",
        title: "Schrodinger Equation: How to Score Full 10 Marks",
        excerpt: "The Schrodinger equation derivation is long, but it breaks down into 3 simple logical steps.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-4">You don't need to memorize the entire page. Just memorize the skeleton.</p>
            <div class="space-y-4 mb-6">
                <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/40 transition-colors">
                    <p class="text-xs font-black text-white mb-1">Step 1: Classical Wave</p>
                    <p class="text-slate-400 text-xs">Start with the standard differential equation for a standing wave.</p>
                </div>
                <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/40 transition-colors">
                    <p class="text-xs font-black text-white mb-1">Step 2: De Broglie Substitute</p>
                    <p class="text-slate-400 text-xs">Replace the wavelength (λ) using De Broglie's relation (λ = h/mv).</p>
                </div>
                <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/40 transition-colors">
                    <p class="text-xs font-black text-white mb-1">Step 3: Total Energy Match</p>
                    <p class="text-slate-400 text-xs">Express kinetic energy in terms of Total Energy (E) minus Potential Energy (V).</p>
                </div>
            </div>
            <p class="text-slate-400 text-sm leading-loose">Substitute step 3 into step 2, and you magically arrive at the final time-independent equation.</p>
        `,
        tags: ["Unit 1", "Derivations", "High Weightage"]
    },
    {
        id: 8,
        category: "Programming",
        title: "Top 5 Recurring C Programming Viva Questions",
        excerpt: "Don't get caught off guard during your external lab evaluation. Master these 5 concepts.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-6">External examiners love asking questions that test your fundamental understanding rather than syntax.</p>
            <div class="space-y-4">
                <details class="bg-slate-900 border border-slate-800 p-4 rounded-xl group cursor-pointer">
                    <summary class="text-slate-50 font-bold text-sm select-none list-none flex justify-between items-center group-open:mb-3">
                        1. What is the exact difference between malloc() and calloc()?
                        <span class="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p class="text-slate-400 text-sm leading-loose">malloc() allocates uninitialized memory (contains garbage values) and takes one argument (total bytes). calloc() allocates zero-initialized memory and takes two arguments (number of elements, size of each element).</p>
                </details>
                <details class="bg-slate-900 border border-slate-800 p-4 rounded-xl group cursor-pointer">
                    <summary class="text-slate-50 font-bold text-sm select-none list-none flex justify-between items-center group-open:mb-3">
                        2. Why do we use pointers instead of returning values?
                        <span class="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p class="text-slate-400 text-sm leading-loose">A C function can only return a single value. Pointers allow us to modify multiple variables passed to a function directly in memory (pass by reference).</p>
                </details>
                <details class="bg-slate-900 border border-slate-800 p-4 rounded-xl group cursor-pointer">
                    <summary class="text-slate-50 font-bold text-sm select-none list-none flex justify-between items-center group-open:mb-3">
                        3. What is a 'dangling pointer'?
                        <span class="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p class="text-slate-400 text-sm leading-loose">A pointer pointing to a memory location that has been deleted (freed). Accessing it causes undefined behavior.</p>
                </details>
            </div>
            <p class="text-slate-400 text-sm mt-6 leading-loose">Pro tip: Always answer concisely. If you trail off, examiners will pick up on your uncertainty.</p>
        `,
        tags: ["Labs", "Viva", "C Lang"]
    },
    {
        id: 9,
        category: "Mathematics",
        title: "Stop Fearing the Laplace Transform",
        excerpt: "Most students lose marks on Laplace transforms because they rely on integration. Here is the shortcut table trick.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-4">You shouldn't be manually integrating <em>e^(-st) * f(t)</em> in the exam hall unless explicitly asked. Memorize the standard transforms to save 15 minutes.</p>
            <div class="overflow-x-auto mb-6">
                <table class="w-full text-left border-collapse border border-slate-800">
                    <thead>
                        <tr class="bg-slate-900">
                            <th class="p-3 border border-slate-800 text-sm text-slate-300">f(t)</th>
                            <th class="p-3 border border-slate-800 text-sm text-slate-300">L{f(t)}</th>
                        </tr>
                    </thead>
                    <tbody class="text-slate-400 font-mono text-sm">
                        <tr>
                            <td class="p-3 border border-slate-800">1</td>
                            <td class="p-3 border border-slate-800">1/s</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-800">t^n</td>
                            <td class="p-3 border border-slate-800">n! / s^(n+1)</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-800">e^(at)</td>
                            <td class="p-3 border border-slate-800">1 / (s - a)</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-800">sin(at)</td>
                            <td class="p-3 border border-slate-800">a / (s^2 + a^2)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-slate-400 text-sm leading-loose">Memorize these 4 fundamental pairs. Almost all complex problems can be simplified down to these using the First Shifting Theorem.</p>
        `,
        tags: ["M2", "Shortcuts", "Formulas"]
    },
    {
        id: 10,
        category: "Study Hacks",
        title: "How to use the 'Pomodoro Technique' effectively for Engineering",
        excerpt: "The standard 25-minute Pomodoro is too short for engineering subjects. Try the 'Deep Work' variant instead.",
        content: `
            <p class="text-slate-400 text-sm leading-loose mb-4">A standard 25-minute study block followed by a 5-minute break works great for memorizing vocabulary, but it's terrible for complex engineering derivations or coding questions.</p>
            <h4 class="text-lg font-black text-slate-50 mb-2 mt-6">The 50/10 Engineering Pomodoro</h4>
            <p class="text-slate-400 text-sm leading-loose mb-4">It takes about 15 minutes just to load the context of a complex thermodynamics problem or a data structures algorithm into your working memory. If you stop at 25 minutes, you break your flow.</p>
            <ul class="list-none text-slate-400 text-sm leading-loose mb-6 space-y-4">
                <li class="flex gap-3">
                    <span class="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</span>
                    <span><strong>50 Minutes Deep Focus:</strong> No phone, no tabs open other than the notes. Work on solving a single complex previous year question from start to finish.</span>
                </li>
                <li class="flex gap-3">
                    <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</span>
                    <span><strong>10 Minutes True Break:</strong> Do not look at a screen. Walk around, stretch, get water. Letting your eyes focus on distant objects reduces eye strain.</span>
                </li>
            </ul>
            <p class="text-slate-400 text-sm leading-loose">Try scheduling just three 50/10 blocks per evening instead of randomly studying for hours. Your retention will skyrocket.</p>
        `,
        tags: ["Productivity", "Focus", "Exam Prep"]
    }
];

export function getSeededDailyBlogs(): Blog[] {
    const today = new Date();
    // Use the start of the day as seed, so it changes perfectly at midnight local time
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    function random(s: number) {
        let x = Math.sin(s) * 10000;
        return x - Math.floor(x);
    }

    const shuffled = [...blogDatabase].sort((a, b) => {
        return random(seed + a.id) - random(seed + b.id);
    });

    return shuffled;
}
