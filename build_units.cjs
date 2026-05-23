const fs = require('fs');
const contentData = require('./src/content.cjs');

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

function generateHTML(subjectSlug, unit) {
    const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JNTUK R23 ${escapeHTML(unit.title)} | EngiPrep Hub</title>
    <meta name="description" content="Elite JNTUK R23 ${escapeHTML(unit.title)}. Simple exam tomorrow explanations, step derivations, board solved PYQs, and interactive viva cards.">
    <link rel="stylesheet" href="/src/style.css">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    <style>
        .glass-card { background-color: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1.5rem; transition: all 0.3s; }
        .light .glass-card { background-color: rgba(255, 255, 255, 0.7); border: 1px solid rgba(148, 163, 184, 0.15); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.03); }
        .glass-card:hover { border-color: rgba(59, 130, 246, 0.3); box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.15); }
        .viva-card-inner { transition: transform 0.6s; transform-style: preserve-3d; }
        .viva-card-front, .viva-card-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .viva-card-back { transform: rotateY(180deg); }
    </style>
    <script>document.documentElement.style.display = 'none';</script>
    <script type="module" src="/src/gatekeeper.js"></script>
</head>
<body class="bg-[#050508] dark:bg-[#050508] text-slate-350 dark:text-slate-350 min-h-screen font-sans antialiased">
    <nav class="fixed top-0 w-full z-50 bg-[#050508]/85 backdrop-blur-md border-b border-slate-800/50 px-6">
        <div class="max-w-7xl mx-auto h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-4">
                <span class="text-xl font-black text-slate-100">EngiPrep <span class="text-blue-500">Hub</span></span>
            </a>
            <a href="/dashboard.html" class="px-5 py-2.5 bg-blue-600 rounded-xl text-xs font-black uppercase text-white">Dashboard</a>
        </div>
    </nav>
    <main class="max-w-7xl mx-auto px-6 pt-32 pb-40">
        <nav class="flex text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider" aria-label="Breadcrumb">
            <ol class="flex items-center gap-2">
                <li><a href="/" class="hover:text-blue-500">Home</a></li>
                <li>/</li>
                <li><a href="/all-subjects.html" class="hover:text-blue-500">Subjects</a></li>
                <li>/</li>
                <li><a href="/subject.html?slug=${subjectSlug}" class="hover:text-blue-500">${subjectSlug.replace(/-/g, ' ')}</a></li>
                <li>/</li>
                <li class="text-blue-500" aria-current="page">${escapeHTML(unit.title)}</li>
            </ol>
        </nav>
        <header class="mb-14 p-8 glass-card bg-white dark:bg-slate-900 shadow-sm">
            <h1 class="text-4xl lg:text-6xl font-black text-slate-900 dark:text-slate-50">${escapeHTML(unit.title)} <span class="text-blue-500">Survival Kit</span></h1>
            <p class="text-slate-400 mt-4">${escapeHTML(unit.desc)}</p>
        </header>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-9 space-y-16">
                <section id="intro" class="glass-card p-8 bg-white dark:bg-slate-900">
                    <h2 class="text-xl font-black mb-4">${escapeHTML(unit.introTitle)}</h2>
                    <p>${escapeHTML(unit.introBody)}</p>
                </section>

                ${unit.definitions ? `
                <section id="definitions" class="glass-card p-8 bg-white dark:bg-slate-900">
                    <h2 class="text-xl font-black mb-6">Key Definitions</h2>
                    <div class="space-y-4">
                        ${unit.definitions.map(def => `
                            <div>
                                <h4 class="font-bold text-slate-100">${escapeHTML(def.term)}</h4>
                                <p class="text-sm text-slate-400">${escapeHTML(def.desc)}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>` : ''}

                <section id="formulas" class="glass-card p-8 bg-white dark:bg-slate-900">
                    <h2 class="text-xl font-black mb-6">Core Formulas & Logic</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                            <h4 class="text-xs font-bold text-blue-400 uppercase">${escapeHTML(unit.formula1.title)}</h4>
                            <p class="font-mono text-sm mt-2">${escapeHTML(unit.formula1.eq)}</p>
                        </div>
                        <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                            <h4 class="text-xs font-bold text-blue-400 uppercase">${escapeHTML(unit.formula2.title)}</h4>
                            <p class="font-mono text-sm mt-2">${escapeHTML(unit.formula2.eq)}</p>
                        </div>
                    </div>
                </section>

                <section id="pyqs" class="glass-card p-8 bg-white dark:bg-slate-900">
                    <h2 class="text-xl font-black mb-6">Board Exam PYQs</h2>
                    <div class="space-y-6">
                        <div class="border-l-2 border-blue-600 pl-4">
                            <h4 class="font-bold text-slate-100">${escapeHTML(unit.pyq1.title)} <span class="text-blue-500">(${escapeHTML(unit.pyq1.marks)})</span></h4>
                            <p class="text-sm mt-1 text-slate-400">${escapeHTML(unit.pyq1.body)}</p>
                        </div>
                        <div class="border-l-2 border-blue-600 pl-4">
                            <h4 class="font-bold text-slate-100">${escapeHTML(unit.pyq2.title)} <span class="text-blue-500">(${escapeHTML(unit.pyq2.marks)})</span></h4>
                            <p class="text-sm mt-1 text-slate-400">${escapeHTML(unit.pyq2.body)}</p>
                        </div>
                    </div>
                </section>

                <section id="quick-prep" class="glass-card p-8 bg-white dark:bg-slate-900 border-l-4 border-yellow-500">
                    <h2 class="text-xl font-black mb-4">1-Day Prep Strategies</h2>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-bold text-slate-100">Revision Points</h4>
                            <ul class="list-disc list-inside text-sm mt-2 text-slate-400">
                                ${unit.revisionPoints ? unit.revisionPoints.map(point => `<li>${escapeHTML(point)}</li>`).join('') : ''}
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-100">Memory Trick</h4>
                            <p class="text-sm mt-2 text-slate-400 italic">"${escapeHTML(unit.memoryTricks || 'N/A')}"</p>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-100">Exam-Time Strategy</h4>
                            <p class="text-sm mt-2 text-slate-400">${escapeHTML(unit.examStrategy || 'N/A')}</p>
                        </div>
                    </div>
                </section>

                <section id="viva" class="glass-card p-8 bg-white dark:bg-slate-900">
                    <h2 class="text-xl font-black mb-6">Interactive Viva Cards</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Card 1 -->
                        <div class="relative w-full h-36 cursor-pointer group" onclick="flipVivaCard(this)">
                            <div class="viva-card-inner absolute inset-0 w-full h-full duration-500 border border-slate-800 rounded-2xl bg-slate-950/80">
                                <div class="viva-card-front absolute inset-0 p-5 flex flex-col justify-between">
                                    <h4 class="text-xs font-black text-slate-100">${escapeHTML(unit.concept1.title)}?</h4>
                                </div>
                                <div class="viva-card-back absolute inset-0 p-5 bg-[#11111e] rounded-2xl" style="transform: rotateY(180deg);">
                                    <p class="text-[10.5px] text-slate-300">${escapeHTML(unit.concept1.detail)}</p>
                                </div>
                            </div>
                        </div>
                        <!-- Card 2 -->
                        <div class="relative w-full h-36 cursor-pointer group" onclick="flipVivaCard(this)">
                            <div class="viva-card-inner absolute inset-0 w-full h-full duration-500 border border-slate-800 rounded-2xl bg-slate-950/80">
                                <div class="viva-card-front absolute inset-0 p-5 flex flex-col justify-between">
                                    <h4 class="text-xs font-black text-slate-100">${escapeHTML(unit.concept2.title)}?</h4>
                                </div>
                                <div class="viva-card-back absolute inset-0 p-5 bg-[#11111e] rounded-2xl" style="transform: rotateY(180deg);">
                                    <p class="text-[10.5px] text-slate-300">${escapeHTML(unit.concept2.detail)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="unit-quiz-wrapper" class="glass-card p-8 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden">
                    <div id="unit-quiz-mount">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-black text-slate-900 dark:text-slate-50 italic uppercase">Interactive Practice <span class="text-blue-500">Unit Quiz</span></h3>
                            <span class="text-[9px] font-black font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">UNIT TEST</span>
                        </div>
                        <p class="text-sm text-slate-400 mb-6">Test your mastery of this unit's concepts with flash feedback and explanations.</p>
                        <button id="start-unit-quiz-btn" class="btn-primary w-full text-sm py-3.5">
                            Start Unit Practice Quiz
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </main>
    <script>
        function flipVivaCard(card) {
            const inner = card.querySelector('.viva-card-inner');
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0deg)';
            } else {
                inner.style.transform = 'rotateY(180deg)';
            }
        }
    </script>
    <script type="module" src="/src/unit-quiz.js"></script>
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
