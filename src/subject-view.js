import { supabase } from './supabase.js';
import { createStudyRoadmapElement } from './study-roadmap.ts';

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
            .maybeSingle();

        const subjectTitle = subject?.title || subTitle;
        const subjectCode = subject?.code || 'CORE';
        const semesterNum = subject?.semester || 1;

        // Fetch Units if available
        let units = null;
        if (subject) {
            const { data: unitsData } = await supabase
                .from('units')
                .select('*')
                .eq('subject_id', subject.id)
                .order('unit_number', { ascending: true });
            units = unitsData;
        }

        // Populate breadcrumbs
        document.getElementById('bc-semester').textContent = `Semester ${semesterNum}`;
        document.getElementById('bc-semester').href = `/semester.html?id=${semesterNum}`;
        document.getElementById('bc-subject').textContent = subjectTitle;
        document.title = `${subjectTitle} | EngiPrepHub`;

        // Generate Tabs UI
        const tabs = [
            { id: 'notes', label: 'Foundation Notes & Roadmap', icon: '📚' },
            { id: 'pyq', label: 'PYQ Solutions', icon: '📝' },
            { id: 'cheat-sheet', label: 'Cheat Sheets', icon: '⚡' },
            { id: 'lab', label: 'Lab Guidelines', icon: '🔬' }
        ];

        let tabsHtml = tabs.map(t => `
            <a href="?sub=${encodeURIComponent(subjectTitle)}&tab=${t.id}" class="px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === t.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}">
                <span class="mr-2">${t.icon}</span> ${t.label}
            </a>
        `).join('');

        // Generate Content based on Tab
        let contentHtml = '';
        if (activeTab === 'notes') {
            contentHtml = `
                <div id="study-roadmap-mount" class="mt-8"></div>
            `;
        } else if (activeTab === 'pyq') {
            contentHtml = `
                <div class="space-y-6 mt-8">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Previous Year Questions</h3>
                    <div id="study-roadmap-mount" class="mb-8"></div>
                </div>
            `;
        } else if (activeTab === 'cheat-sheet') {
            contentHtml = `
                <div class="space-y-6 mt-8">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Important Formulas & Cheat Sheets</h3>
                    <div id="study-roadmap-mount" class="mb-8"></div>
                </div>
            `;
        } else if (activeTab === 'lab') {
            contentHtml = `
                <div class="space-y-6 mt-8">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Laboratory Guidelines</h3>
                    <div id="study-roadmap-mount" class="mb-8"></div>
                </div>
            `;
        }

        // Render whole page
        container.innerHTML = `
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
                <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div class="relative z-10">
                    <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase mb-4">
                        ${subjectCode}
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">${subjectTitle}</h1>
                    <p class="text-lg text-slate-300 max-w-2xl">${subject?.description || 'Master the complete JNTUK R23 curriculum with our unit-wise study roadmap, notes, derivations, and PYQs.'}</p>
                </div>
            </div>
            
            <div class="flex flex-wrap gap-3 mb-8">
                ${tabsHtml}
            </div>
            
            ${contentHtml}
        `;

        // Mount Study Roadmap Element
        const roadmapMount = document.getElementById('study-roadmap-mount');
        if (roadmapMount) {
            const roadmapElem = createStudyRoadmapElement(subjectTitle, units);
            roadmapMount.appendChild(roadmapElem);
        }

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
