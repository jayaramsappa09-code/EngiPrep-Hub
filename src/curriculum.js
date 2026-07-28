document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('curriculum-container');
    if (!container) return;

    // Feature Flags & Config
    const config = {
        enabledSemesters: [1, 2], // Only Sem 1 and 2 are publicly accessible
    };

    const curriculumData = [
        {
            year: 1,
            title: "First Year (Freshman)",
            semesters: [
                { id: 1, name: "Semester 1", desc: "Foundational sciences, basic mathematics, and introductory programming." },
                { id: 2, name: "Semester 2", desc: "Advanced calculus, basic electrical/civil engineering, and advanced chemistry/physics." }
            ]
        },
        {
            year: 2,
            title: "Second Year (Sophomore)",
            semesters: [
                { id: 3, name: "Semester 3", desc: "Core departmental subjects, data structures, and advanced engineering mathematics." },
                { id: 4, name: "Semester 4", desc: "Design principles, operating systems, and specialized mechanics." }
            ]
        },
        {
            year: 3,
            title: "Third Year (Junior)",
            semesters: [
                { id: 5, name: "Semester 5", desc: "Advanced departmental electives, networks, and thermodynamics." },
                { id: 6, name: "Semester 6", desc: "AI, Machine Learning, structural analysis, and VLSI design." }
            ]
        },
        {
            year: 4,
            title: "Fourth Year (Senior)",
            semesters: [
                { id: 7, name: "Semester 7", desc: "Major project phase I, industrial electives, and advanced specializations." },
                { id: 8, name: "Semester 8", desc: "Major project phase II, internship, and final comprehensive exams." }
            ]
        }
    ];

    let html = '';

    curriculumData.forEach(yearData => {
        html += `
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span class="text-blue-600 dark:text-blue-400 mr-2">Year ${yearData.year}:</span> ${yearData.title}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        `;

        yearData.semesters.forEach(sem => {
            const isEnabled = config.enabledSemesters.includes(sem.id);
            const lockedClass = isEnabled ? '' : 'feature-locked';
            const href = isEnabled ? `/semester.html?id=${sem.id}` : `/semester.html?id=${sem.id}`;

            html += `
                <a href="${href}" class="block group ${lockedClass}">
                    <div class="h-full p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 relative overflow-hidden">
                        ${isEnabled ? '<div class="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>' : ''}
                        
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                ${sem.name}
                            </h3>
                            ${isEnabled ? `
                            <div class="w-8 h-8 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                            </div>
                            ` : ''}
                        </div>
                        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${sem.desc}</p>
                    </div>
                </a>
            `;
        });

        html += `
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
});
