import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const semId = parseInt(params.get('id') || '1');

    const container = document.getElementById('semester-content');
    
    // Feature Flags & Config
    const config = {
        enabledSemesters: [1, 2]
    };

    if (!config.enabledSemesters.includes(semId)) {
        container.innerHTML = `
            <div class="text-center py-20">
                <div class="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
                    <span class="text-4xl">🔒</span>
                </div>
                <h1 class="text-3xl font-black text-slate-900 dark:text-white mb-4">Semester Locked</h1>
                <p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">This semester's curriculum is currently under development by our academic team. Stay tuned for updates!</p>
                <a href="/curriculum.html" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all inline-block shadow-md">Return to Curriculum</a>
            </div>
        `;
        return;
    }

    try {
        // Fetch subjects for this semester from database
        const { data: subjects, error } = await supabase
            .from('subjects')
            .select('*')
            .eq('semester', semId);

        if (error) throw error;

        // Render UI Framework capable of supporting Notes, PYQs, Cheat Sheets, Labs
        let html = `
            <div class="mb-12">
                <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Semester ${semId} <span class="text-blue-600 dark:text-blue-400">Hub</span></h1>
                <p class="text-lg text-slate-600 dark:text-slate-400">Comprehensive resources, notes, and previous year questions for all subjects in this semester.</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-6">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Core Subjects</h2>
                    ${subjects && subjects.length > 0 ? subjects.map(sub => `
                        <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50">
                            <div class="flex items-start justify-between mb-4">
                                <div>
                                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1">${sub.title}</h3>
                                    <p class="text-sm text-slate-500 font-mono">${sub.code || 'CORE'}</p>
                                </div>
                                <div class="w-10 h-10 rounded-xl bg-${sub.color || 'blue'}-100 dark:bg-${sub.color || 'blue'}-900/30 flex items-center justify-center text-${sub.color || 'blue'}-600 dark:text-${sub.color || 'blue'}-400">
                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                </div>
                            </div>
                            <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">${sub.description || 'Comprehensive notes and resources for ' + sub.title + '.'}</p>
                            
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <a href="/subject.html?sub=${encodeURIComponent(sub.title)}&tab=notes" class="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group">
                                    <span class="text-xl mb-1 group-hover:scale-110 transition-transform">📚</span>
                                    <span class="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">Notes</span>
                                </a>
                                <a href="/subject.html?sub=${encodeURIComponent(sub.title)}&tab=pyq" class="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200 dark:hover:border-rose-800 transition-colors group">
                                    <span class="text-xl mb-1 group-hover:scale-110 transition-transform">📝</span>
                                    <span class="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400">PYQs</span>
                                </a>
                                <a href="/subject.html?sub=${encodeURIComponent(sub.title)}&tab=cheat-sheet" class="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-200 dark:hover:border-amber-800 transition-colors group">
                                    <span class="text-xl mb-1 group-hover:scale-110 transition-transform">⚡</span>
                                    <span class="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400">Cheats</span>
                                </a>
                                <a href="/subject.html?sub=${encodeURIComponent(sub.title)}&tab=lab" class="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors group">
                                    <span class="text-xl mb-1 group-hover:scale-110 transition-transform">🔬</span>
                                    <span class="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Labs</span>
                                </a>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                            <p class="text-slate-500">Subjects mapping is currently being updated for Semester ${semId}.</p>
                        </div>
                    `}
                </div>
                
                <div class="space-y-6">
                    <div class="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 shadow-xl border border-indigo-500/30 text-white">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
                                <span class="text-xl">🏆</span>
                            </div>
                            <h3 class="text-lg font-bold">Exam Preparation</h3>
                        </div>
                        <p class="text-indigo-200 text-sm mb-6">Master Semester ${semId} with targeted previous year question analysis and high-weightage topics.</p>
                        <a href="/exam-survival.html" class="block w-full py-3 bg-white text-indigo-950 font-bold rounded-xl text-center text-sm hover:bg-indigo-50 transition-colors">Enter Survival Mode</a>
                    </div>
                    
                    <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 class="font-bold text-slate-900 dark:text-white mb-4">Semester Insights</h3>
                        <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 mt-0.5">•</span>
                                <span>Focus on conceptual derivations as they form 40% of the long answer questions.</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 mt-0.5">•</span>
                                <span>Laboratory practicals are heavily integrated with theory subjects.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        document.title = `Semester ${semId} Curriculum | EngiPrepHub`;
        
    } catch (err) {
        console.error(err);
        container.innerHTML = `
            <div class="p-6 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-200 dark:border-rose-800">
                <p class="font-bold">Error loading semester data.</p>
                <p class="text-sm mt-1">Please try again later or check your connection.</p>
            </div>
        `;
    }
});
