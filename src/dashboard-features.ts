document.addEventListener('DOMContentLoaded', () => {
    // Continue Learning Simulation
    const continueGrid = document.getElementById('continue-learning-grid');
    if(continueGrid) {
        continueGrid.innerHTML = `
            <a href="/data-structures-unit-3.html" class="block p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500/40 transition-all group">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] font-black uppercase tracking-widest text-[#10b981]">DSA • Unit 3</span>
                    <span class="text-xs text-slate-400">70%</span>
                </div>
                <h4 class="text-sm font-black text-slate-900 dark:text-slate-50 mb-3 group-hover:text-blue-500 transition-colors">Stack Operations & Queues</h4>
                <div class="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-[#10b981] rounded-full w-[70%]"></div>
                </div>
            </a>
            <a href="/physics-notes.html" class="block p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500/40 transition-all group">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] font-black uppercase tracking-widest text-indigo-500">AP • Unit 2</span>
                    <span class="text-xs text-slate-400">35%</span>
                </div>
                <h4 class="text-sm font-black text-slate-900 dark:text-slate-50 mb-3 group-hover:text-blue-500 transition-colors">Wave Optics & Diffraction</h4>
                <div class="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 rounded-full w-[35%]"></div>
                </div>
            </a>
        `;
    }

    // Heatmap Simulation
    const heatmapGrid = document.getElementById('heatmap-grid');
    if(heatmapGrid) {
        let cellsHTML = '';
        for(let i = 0; i < 7*15; i++) {
            const level = Math.floor(Math.random() * 5); // 0-4
            let colorClass = 'bg-slate-100 dark:bg-slate-800';
            if(level === 1) colorClass = 'bg-blue-100 dark:bg-blue-900/40';
            if(level === 2) colorClass = 'bg-blue-300 dark:bg-blue-700/60';
            if(level === 3) colorClass = 'bg-blue-500 dark:bg-blue-500';
            if(level === 4) colorClass = 'bg-indigo-600 dark:bg-indigo-600';
            
            cellsHTML += `<div class="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] ${colorClass} hover:ring-2 hover:ring-indigo-400 cursor-pointer transition-all"></div>`;
        }
        heatmapGrid.innerHTML = cellsHTML;
    }
});
