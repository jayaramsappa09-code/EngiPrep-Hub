import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const subTitle = params.get('sub');
    const activeTab = params.get('tab') || 'notes'; // notes, pyq, cheat-sheet, lab

    const container = document.getElementById('subject-content');

    if (!subTitle) {
        container.innerHTML = `<div class="p-6 text-center text-rose-600 bg-rose-50 rounded-2xl">Subject not specified.</div>`;
        return;
    }

    try {
        // Fetch Subject Details
        const { data: subject, error: subError } = await supabase
            .from('subjects')
            .select('*')
            .ilike('title', subTitle)
            .limit(1)
            .single();

        if (subError) throw subError;

        // Fetch Units
        const { data: units, error: unitsError } = await supabase
            .from('units')
            .select('*')
            .eq('subject_id', subject.id)
            .order('unit_number', { ascending: true });
            
        // Populate breadcrumbs
        document.getElementById('bc-semester').textContent = `Semester ${subject.semester || 1}`;
        document.getElementById('bc-semester').href = `/semester.html?id=${subject.semester || 1}`;
        document.getElementById('bc-subject').textContent = subject.title;
        document.title = `${subject.title} | EngiPrepHub`;

        // Generate Tabs UI
        const tabs = [
            { id: 'notes', label: 'Foundation Notes', icon: '📚' },
            { id: 'pyq', label: 'PYQ Solutions', icon: '📝' },
            { id: 'cheat-sheet', label: 'Cheat Sheets', icon: '⚡' },
            { id: 'lab', label: 'Lab Guidelines', icon: '🔬' }
        ];

        let tabsHtml = tabs.map(t => `
            <a href="?sub=${encodeURIComponent(subject.title)}&tab=${t.id}" class="px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === t.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}">
                <span class="mr-2">${t.icon}</span> ${t.label}
            </a>
        `).join('');

        // Generate Content based on Tab
        let contentHtml = '';
        if (activeTab === 'notes') {
            contentHtml = `
                <div class="space-y-6 mt-8">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Unit-wise Foundation Notes</h3>
                    ${units && units.length > 0 ? units.map(u => `
                        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Unit ${u.unit_number}: ${u.title}</h4>
                            <p class="text-slate-600 dark:text-slate-400 mb-4">${u.description || 'Comprehensive foundational concepts for this unit.'}</p>
                            <button class="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">Read Notes</button>
                        </div>
                    `).join('') : `
                        <div class="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                            <p class="text-slate-500">Unit notes are currently being uploaded for this subject.</p>
                        </div>
                    `}
                </div>
            `;
        } else if (activeTab === 'pyq') {
            contentHtml = `
                <div class="space-y-6 mt-8">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Previous Year Questions</h3>
                    <div class="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p class="text-slate-500">PYQ database is being indexed for ${subject.title}.</p>
                    </div>
                </div>
            `;
        } else if (activeTab === 'cheat-sheet') {
            contentHtml = `
                <div class="space-y-6 mt-8">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Important Formulas & Cheat Sheets</h3>
                    <div class="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p class="text-slate-500">Cheat sheets for ${subject.title} are in development.</p>
                    </div>
                </div>
            `;
        } else if (activeTab === 'lab') {
            contentHtml = `
                <div class="space-y-6 mt-8">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Laboratory Guidelines</h3>
                    <div class="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p class="text-slate-500">Lab resources are being verified by our academic team.</p>
                    </div>
                </div>
            `;
        }

        // Render whole page
        container.innerHTML = `
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
                <div class="absolute -right-20 -top-20 w-64 h-64 bg-${subject.color || 'blue'}-500/20 rounded-full blur-3xl"></div>
                <div class="relative z-10">
                    <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase mb-4">
                        ${subject.code || 'Subject'}
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">${subject.title}</h1>
                    <p class="text-lg text-slate-300 max-w-2xl">${subject.description || 'Master the complete curriculum, derivations, and numericals.'}</p>
                </div>
            </div>
            
            <div class="flex flex-wrap gap-3 mb-8">
                ${tabsHtml}
            </div>
            
            ${contentHtml}
        `;

    } catch (err) {
        console.error(err);
        container.innerHTML = `
            <div class="p-6 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-200 dark:border-rose-800 text-center">
                <h3 class="text-xl font-bold mb-2">Subject Not Found</h3>
                <p>We couldn't locate "${subTitle}" in the database or there was an error loading it.</p>
                <a href="/curriculum.html" class="inline-block mt-4 text-sm underline font-medium">Return to Curriculum</a>
            </div>
        `;
    }
});
