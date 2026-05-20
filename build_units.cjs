const fs = require('fs');
const contentData = require('./src/content.cjs');

function generateHTML(subjectSlug, unit) {
    const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JNTUK R23 ${unit.title} | EngiPrep Hub</title>
    <meta name="description" content="Elite JNTUK R23 ${unit.title}. Simple exam tomorrow explanations, step derivations, board solved PYQs, and interactive viva cards.">
    <link rel="stylesheet" href="/src/style.css">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    <style>
        .glass-card { background-color: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1.5rem; transition: all 0.3s; }
        .light .glass-card { background-color: rgba(255, 255, 255, 0.7); border: 1px solid rgba(148, 163, 184, 0.15); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.03); }
        .glass-card:hover { border-color: rgba(59, 130, 246, 0.3); box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.15); }
    </style>
    <script>document.documentElement.style.display = 'none';</script>
    <script type="module" src="/src/gatekeeper.js"></script>
</head>
<body class="bg-[#050508] dark:bg-[#050508] text-slate-350 dark:text-slate-350 bg-gradient-to-tr from-[#080816] via-[#050508] to-[#0d0714] min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-slate-900 dark:text-slate-50">

    <nav class="fixed top-0 w-full z-50 bg-[#050508]/85 backdrop-blur-md border-b border-slate-800/50 px-6">
        <div class="max-w-7xl mx-auto h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-4 group">
                <div class="relative w-10 h-10 flex items-center justify-center">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl rotate-12 transition-all duration-500 shadow-xl shadow-blue-500/10"></div>
                    <svg class="relative z-10 w-5 h-5 text-slate-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                </div>
                <div class="flex flex-col">
                    <span class="text-xl font-black tracking-tighter text-slate-50 leading-none">EngiPrep <span class="text-blue-500">Hub</span></span>
                    <span class="text-[6px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">Prepare • Practice • Perform</span>
                </div>
            </a>
            <div id="nav-actions" class="flex items-center gap-4">
                <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-950/40 border border-blue-900/30 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-wide">
                    JNTUK R23 Curriculum
                </div>
                <a href="/dashboard.html" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-white">Dashboard</a>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 pt-32 pb-40">
        <header class="mb-14 p-8 glass-card relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white dark:bg-slate-900 shadow-sm">
            <div class="space-y-4 relative z-10 max-w-3xl">
                <div class="flex items-center gap-2.5 flex-wrap">
                    <span class="px-2.5 py-0.5 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">${unit.subtitle} Strategy Kit</span>
                    <span class="px-2.5 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest rounded-full">Score Weighting: ${unit.weightage}</span>
                </div>
                <div>
                    <h1 class="text-4xl lg:text-6xl font-black text-slate-900 dark:text-slate-50 leading-tight tracking-tight">
                        ${unit.title.split('-')[0] || unit.title} <br>
                        <span class="bg-gradient-to-r from-blue-450 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Complete Exam Survival Kit</span>
                    </h1>
                    <p class="text-slate-400 text-xs sm:text-sm mt-3 font-medium leading-relaxed">${unit.desc}</p>
                </div>
            </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div class="lg:col-span-9 space-y-16">
                <!-- Introduction -->
                <section id="intro" class="glass-card p-8 bg-white dark:bg-slate-900 shadow-sm">
                    <div class="flex items-center gap-3 mb-6 border-b border-slate-900 pb-3">
                        <span class="text-xl">01</span>
                        <h2 class="text-xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">${unit.introTitle}</h2>
                    </div>
                    <div class="space-y-4">
                        <p class="text-xs text-slate-350 sm:text-sm">${unit.introBody}</p>
                        <p class="text-xs text-slate-350 sm:text-sm bg-slate-950/60 p-4 border-l-4 border-l-blue-500 rounded-r-xl border border-y-0 border-r-0">
                            <b class="text-slate-100 font-bold">Exam Crux:</b> ${unit.coreHighlight}
                        </p>
                    </div>
                </section>

                <!-- Key Concepts -->
                <section id="concepts" class="glass-card p-8 bg-white dark:bg-slate-900 shadow-sm">
                    <div class="flex items-center gap-3 mb-6 border-b border-slate-900 pb-3">
                        <span class="text-xl text-yellow-500">02</span>
                        <h2 class="text-xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">Fundamental Core Principles</h2>
                    </div>
                    <!-- Form 1 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div class="p-6 bg-slate-950 border border-slate-900 rounded-2xl">
                            <span class="text-[8px] font-black uppercase tracking-widest text-[#f59e0b] block mb-1">Concept 1</span>
                            <h4 class="text-xs font-black text-slate-900 dark:text-slate-50 mb-2">${unit.concept1.title}</h4>
                            <p class="text-[10px] text-slate-500 mt-2 font-medium">${unit.concept1.detail}</p>
                            <div class="p-4 mt-3 bg-[#181825] font-mono text-center text-teal-400 text-sm rounded-xl font-black tracking-wider">
                                ${unit.formula1.title}: ${unit.formula1.eq}
                            </div>
                        </div>
                        <div class="p-6 bg-slate-950 border border-slate-900 rounded-2xl">
                            <span class="text-[8px] font-black uppercase tracking-widest text-blue-400 block mb-1">Concept 2</span>
                            <h4 class="text-xs font-black text-slate-900 dark:text-slate-50 mb-2">${unit.concept2.title}</h4>
                            <p class="text-[10px] text-slate-500 mt-2 font-medium">${unit.concept2.detail}</p>
                            <div class="p-4 mt-3 bg-[#181825] font-mono text-center text-rose-450 text-sm rounded-xl font-bold">
                                ${unit.formula2.title}: ${unit.formula2.eq}
                            </div>
                        </div>
                    </div>
                </section>

                <!-- PYQs -->
                <section id="pyqs" class="glass-card p-8 bg-white dark:bg-slate-900 shadow-sm">
                    <div class="flex items-center gap-3 mb-6 border-b border-slate-900 pb-3">
                        <span class="text-xl text-teal-400">03</span>
                        <h2 class="text-xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">Repeated University Board Patterns (PYQs)</h2>
                    </div>
                    <div class="space-y-4">
                        <div class="p-6 bg-slate-950/60 border border-slate-900 rounded-xl">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="px-2 py-1 bg-red-500/10 text-red-400 font-bold text-[10px] rounded">${unit.pyq1.marks}</span>
                                <h3 class="font-bold text-slate-100 text-sm">${unit.pyq1.title}</h3>
                            </div>
                            <p class="text-xs text-slate-400">${unit.pyq1.body}</p>
                        </div>
                        <div class="p-6 bg-slate-950/60 border border-slate-900 rounded-xl">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="px-2 py-1 bg-amber-500/10 text-amber-400 font-bold text-[10px] rounded">${unit.pyq2.marks}</span>
                                <h3 class="font-bold text-slate-100 text-sm">${unit.pyq2.title}</h3>
                            </div>
                            <p class="text-xs text-slate-400">${unit.pyq2.body}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
</body>
</html>`;
    fs.writeFileSync(subjectSlug + '-' + unit.id + '.html', html);
    console.log("Generated: " + subjectSlug + '-' + unit.id + '.html');
}

Object.keys(contentData).forEach(subject => {
    const slug = subject.toLowerCase().replace(/ /g, '-');
    contentData[subject].units.forEach(unit => {
        generateHTML(slug, unit);
    });
});
