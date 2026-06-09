import './unit-weightage-widget.css';

document.addEventListener('DOMContentLoaded', () => {
    // Locate all main content areas to scope our selections to notes/learning pages
    const isNotesPage = document.querySelector('.unit-section, [id^="unit-1"], [id^="unit1"], .notes-content, .content-area, [id^="rev-sec-"]');
    if (!isNotesPage) return;

    // Find all unit sections. Typical selectors in EngiPrepHub pages
    const unitSections = document.querySelectorAll(`
        section.unit-section, 
        div.unit-section,
        section[id^="unit-"],
        div[id^="unit-"],
        section[id^="unit1"],
        section[id^="unit2"],
        section[id^="unit3"],
        section[id^="unit4"],
        section[id^="unit5"],
        section[id^="rev-sec-"]
    `);
    
    const processed = new Set<Element>();
    
    unitSections.forEach(section => {
        if (processed.has(section)) return;
        
        // Filter out tiny containers that happen to match our selectors conceptually
        if (section.clientHeight < 100 && section.innerHTML.length < 200) return;

        processed.add(section);
        
        const id = section.getAttribute('id') || '';
        let unitNum = 1;
        
        // Attempt to parse unit number from ID e.g., "unit-3" or "unit3" or "rev-sec-3"
        const match = id.match(/(?:unit|rev-sec)[-_]?(\d+)/i);
        if (match) {
            unitNum = parseInt(match[1], 10);
        }

        // Generate context-aware academic data
        const stats = {
            weight: "14 Marks",
            freq: "High (2-3 Qs)",
            diff: "Medium",
            time: "3-4 Hours"
        };
        const badges = ["📚 Fundamentals", "🎯 Scoring", "⚙️ Core Logic", "🔥 High Yield", "🚀 Applications"];
        
        let priorityBadge = badges[0];
        let diffColor = "bg-green-500";
        let dotsCount = 1;
        let insight = `This section provides the basic building blocks for the subject. Don't skip it!`;

        if (unitNum === 1) {
            stats.diff = "Conceptual";
            stats.time = "3 Hours";
            priorityBadge = badges[0];
            diffColor = "bg-green-500";
            dotsCount = 1;
            insight = `Unit 1 is your foundation. Master it perfectly, as later units mathematically built upon these concepts.`;
        } else if (unitNum === 2) {
            stats.diff = "Medium-Hard";
            stats.time = "4-5 Hours";
            stats.freq = "Very High (3+ Qs)";
            priorityBadge = badges[2];
            diffColor = "bg-amber-500";
            dotsCount = 2;
            insight = `Heavy derivations typically appear here. Practice writing out proofs step-by-step.`;
        } else if (unitNum === 3) {
            stats.diff = "Advanced / Hard";
            stats.time = "5-6 Hours";
            priorityBadge = badges[3];
            diffColor = "bg-red-500";
            dotsCount = 3;
            insight = `Historically the toughest section in the R23 curriculum. Focus entirely on PYQ patterns instead of brute-force reading.`;
        } else if (unitNum === 4) {
            stats.diff = "Medium";
            stats.time = "3.5 Hours";
            priorityBadge = badges[1];
            diffColor = "bg-amber-500";
            dotsCount = 2;
            insight = `A great unit to secure your 14 marks. The questions are usually straightforward and formula-based.`;
        } else if (unitNum === 5) {
            stats.diff = "Scoring (Easy)";
            stats.time = "2-3 Hours";
            priorityBadge = badges[4];
            diffColor = "bg-emerald-500";
            dotsCount = 1;
            insight = `Application-oriented chapter. Often features diagram-based short answers. Finish this unit early to guarantee marks.`;
        }
        
        // Build dots visualization
        const diffDots = Array(dotsCount).fill(`<div class="w-1.5 h-1.5 rounded-full ${diffColor}"></div>`).join('');

        // Create widget element
        const widget = document.createElement('div');
        widget.className = 'unit-weightage-widget animate-fade-in-up my-8 p-6 rounded-3xl bg-slate-50 dark:bg-[#111116] border border-slate-200 dark:border-slate-800 relative z-10 w-full overflow-hidden shadow-sm';
        
        // Add minimal structural design to the widget
        widget.innerHTML = `
            <!-- Glow Effect -->
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div class="flex items-center gap-3">
                    <div class="bg-indigo-100 dark:bg-indigo-900/40 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800/50">
                        <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="m-0 text-[1.1rem] font-bold text-slate-900 dark:text-white leading-tight">Unit Weightage & Analysis</h3>
                        <p class="m-0 text-sm text-slate-500 dark:text-slate-400 mt-0.5">JNTUK R23 Blueprint Analytics</p>
                    </div>
                </div>
                <div>
                    <span class="inline-flex items-center px-3.5 py-1.5 text-[0.8rem] tracking-wide font-black uppercase rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        ${priorityBadge}
                    </span>
                </div>
            </div>
            
            <!-- Bento Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                <div class="rounded-2xl bg-white dark:bg-[#1a1a24] p-4 lg:p-5 border border-slate-100 dark:border-slate-800/60 transition hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:shadow-md hover:-translate-y-0.5 duration-300">
                   <div class="text-[0.65rem] lg:text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Marks Weightage</div>
                   <div class="text-xl lg:text-2xl font-black text-slate-800 dark:text-white">${stats.weight}</div>
                </div>
                
                <div class="rounded-2xl bg-white dark:bg-[#1a1a24] p-4 lg:p-5 border border-slate-100 dark:border-slate-800/60 transition hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:shadow-md hover:-translate-y-0.5 duration-300">
                   <div class="text-[0.65rem] lg:text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">PYQ Frequency</div>
                   <div class="text-[1.1rem] lg:text-[1.3rem] font-black text-slate-800 dark:text-white">${stats.freq}</div>
                </div>
                
                <div class="rounded-2xl bg-white dark:bg-[#1a1a24] p-4 lg:p-5 border border-slate-100 dark:border-slate-800/60 transition hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:shadow-md hover:-translate-y-0.5 duration-300">
                   <div class="text-[0.65rem] lg:text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Difficulty</div>
                   <div class="text-[1.1rem] lg:text-[1.3rem] font-black w-full text-slate-800 dark:text-white flex items-center gap-2 flex-wrap">
                      <div class="flex items-center gap-1 opacity-90">${diffDots}</div>
                      <span class="truncate">${stats.diff}</span>
                   </div>
                </div>
                
                <div class="rounded-2xl bg-white dark:bg-[#1a1a24] p-4 lg:p-5 border border-slate-100 dark:border-slate-800/60 transition hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:shadow-md hover:-translate-y-0.5 duration-300">
                   <div class="text-[0.65rem] lg:text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Estimated Time</div>
                   <div class="text-[1.1rem] lg:text-[1.3rem] font-black text-slate-800 dark:text-white">${stats.time}</div>
                </div>
            </div>
            
            <div class="mt-4 lg:mt-5 p-4 rounded-xl bg-white dark:bg-[#1a1a24] border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                <div class="mt-0.5 text-indigo-500 hidden sm:block">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div class="text-[0.85rem] lg:text-sm text-slate-600 dark:text-slate-300 leading-relaxed md:leading-normal">
                    <strong class="text-indigo-600 dark:text-indigo-400 uppercase tracking-wide text-xs">Strategy Insight:</strong> ${insight}
                </div>
            </div>
        `;
        
        // Find insert location safely
        let inserted = false;
        const potentialHeaders = section.querySelectorAll('.unit-header, h1, h2, h3, .section-title');
        for (const header of Array.from(potentialHeaders)) {
            // Find the highest level header logically representing the unit start
            // Check if it's a direct child or near direct child to avoid matching deeply nested h2s
            const depth = Array.from(header.parentNode.children).indexOf(header);
            if (depth >= 0 && depth < 5) {
                // Insert after
                if (header.nextSibling) {
                    header.parentNode.insertBefore(widget, header.nextSibling);
                } else {
                    header.parentNode.appendChild(widget);
                }
                inserted = true;
                break;
            }
        }
        
        if (!inserted) {
            section.insertBefore(widget, section.firstChild);
        }
    });

});
