import fs from 'fs';
import path from 'path';

function rewrite() {
    const html = fs.readFileSync('index.html', 'utf8');
    const headMatch = html.match(/([\s\S]*?<head>[\s\S]*?<\/head>)/i);
    if (!headMatch) {
         console.error("Head not found");
         return;
    }
    const headContent = headMatch[1];
    
    const newBody = `
<body class="selection:bg-blue-100 dark:selection:bg-blue-900/50 bg-slate-50 dark:bg-[#0B1020] text-slate-800 dark:text-[#F3F4F6] antialiased italic-text-prevention">
    <!-- Accessibility Skip Link -->
    <a href="#main-content" class="sr-only focus:not-only-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 px-4 py-2 rounded-xl text-xs font-bold z-50 shadow-lg text-slate-50">
        Skip to main content
    </a>

    <!-- Top Header (Trust + Navigation) -->
    <header class="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-[#030306]/85 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <nav class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" aria-label="Main Navigation">
            <a href="/" class="flex items-center gap-4 group" aria-label="EngiPrep Hub Homepage">
                <div class="relative w-12 h-12 flex items-center justify-center bg-slate-900 rounded-2xl">
                    <svg class="relative z-10 w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                </div>
                <div class="flex flex-col">
                    <span class="text-2xl font-black tracking-tighter text-slate-900 dark:text-slate-50 leading-none">EngiPrep <span class="text-blue-600 dark:text-blue-400">Hub</span></span>
                    <span class="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Engineering Concepts Made Simple & Practical</span>
                </div>
            </a>
            
            <div class="hidden lg:flex items-center gap-6" id="dekstop-nav-menu">
                <a href="/" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Home</a>
                <a href="/all-subjects.html" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Subjects</a>
                <a href="/notes.html" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Notes & Tutorials</a>
                <a href="/cheat-sheets.html" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Important Formulas</a>
                <a href="/pyqs.html" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Previous Year Papers</a>
                <a href="/quiz.html" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Practice Questions</a>
                <a href="/blog.html" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Blog</a>
                <a href="/about.html" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">About</a>
                <a href="/contact.html" class="nav-link text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Contact</a>
            </div>

            <div class="flex items-center gap-4">
                <button id="theme-toggle" type="button" class="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500" aria-label="Toggle Dark Mode">
                    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </nav>
    </header>

    <main id="main-content" class="pt-20">
        <!-- Hero Section -->
        <section class="relative pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-slate-950 transition-colors">
            <div class="absolute top-0 right-0 w-1/2 h-full bg-blue-50 dark:bg-blue-900/10 -skew-x-12 origin-top-right"></div>
            <div class="max-w-7xl mx-auto text-center relative z-10">
                <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                    Learn Engineering <span class="text-blue-600 dark:text-blue-400">Smarter</span>, Not Harder
                </h1>
                <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
                    High-quality explanations, solved examples, and structured study materials for engineering students.
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <a href="/notes.html" class="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-500/20 text-center">Start Learning</a>
                    <a href="/all-subjects.html" class="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl font-bold hover:border-slate-300 dark:hover:border-slate-700 transition-all text-center">Browse Subjects</a>
                </div>
                
                <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-slate-600 dark:text-slate-400 font-medium">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
                        Original explanations
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
                        Step-by-step solutions
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
                        Exam-focused content
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Learning Categories -->
        <section class="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">Featured Learning Categories</h2>
                    <p class="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">Master core concepts, practice solving complex problems, and prepare effectively for your exams.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Core Engineering Subjects -->
                    <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow">
                        <div class="w-14 h-14 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Core Engineering Subjects</h3>
                        <ul class="space-y-4">
                            <li><a href="/maths-1.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"></span> Engineering Mathematics</a></li>
                            <li><a href="/subject.html?sub=Engineering%20Physics" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"></span> Physics for Engineers</a></li>
                            <li><a href="/complete-beee-guide.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"></span> Basic Electrical Engineering</a></li>
                            <li><a href="/subject.html?sub=Engineering%20Mechanics" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"></span> Mechanics</a></li>
                            <li><a href="/complete-c-programming-guide.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"></span> Programming Basics</a></li>
                        </ul>
                    </div>

                    <!-- Exam Preparation -->
                    <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow">
                        <div class="w-14 h-14 bg-rose-50 dark:bg-slate-800 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6">
                            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Exam Preparation</h3>
                        <ul class="space-y-4">
                            <li><a href="/pyqs.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-rose-500 transition-colors"></span> Important Questions</a></li>
                            <li><a href="/pyqs.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-rose-500 transition-colors"></span> Previous Year Papers</a></li>
                            <li><a href="/notes.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-rose-500 transition-colors"></span> Model Answers</a></li>
                        </ul>
                    </div>

                    <!-- Concept Learning -->
                    <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow">
                        <div class="w-14 h-14 bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Concept Learning</h3>
                        <ul class="space-y-4">
                            <li><a href="/notes.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-500 transition-colors"></span> Step-by-step Tutorials</a></li>
                            <li><a href="/engineering-physics-unit-2.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-500 transition-colors"></span> Visual Explanations</a></li>
                            <li><a href="/cheat-sheets.html" class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium group"><span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-500 transition-colors"></span> Formula Derivations</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Start Learning Today Section -->
        <section class="py-20 px-6 bg-white dark:bg-slate-950">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-2">Start Learning Today</h2>
                        <p class="text-slate-600 dark:text-slate-400 font-medium">Dive into our most popular, deeply explained engineering topics.</p>
                    </div>
                    <a href="/all-subjects.html" class="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">View All Topics</a>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a href="/basic-electrical-engineering-unit-2.html" class="group p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex items-start gap-6">
                        <div class="hidden sm:flex w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center text-2xl group-hover:scale-110 transition-transform">⚡</div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">Kirchhoff's Laws Explained with Examples</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">A complete breakdown of KCL and KVL, including step-by-step solved numericals for complex circuits.</p>
                        </div>
                    </a>
                    <a href="/engineering-mathematics-unit-3.html" class="group p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex items-start gap-6">
                        <div class="hidden sm:flex w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center text-2xl group-hover:scale-110 transition-transform">∫</div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2">Laplace Transform Step-by-Step</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">Learn the fundamentals of Laplace transforms, properties, and inverse functions with detailed derivations.</p>
                        </div>
                    </a>
                    <a href="/basic-civil-and-mechanical-engineering-unit-4.html" class="group p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex items-start gap-6">
                        <div class="hidden sm:flex w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center text-2xl group-hover:scale-110 transition-transform">🏗️</div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mb-2">Strength of Materials Basics</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">Understanding stress, strain, Hooke's Law, and structural analysis concepts essential for mechanical profiles.</p>
                        </div>
                    </a>
                    <a href="/engineering-mathematics-unit-1.html" class="group p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all flex items-start gap-6">
                        <div class="hidden sm:flex w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center text-2xl group-hover:scale-110 transition-transform">📊</div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 mb-2">Engineering Maths Short Notes (With Explanation)</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">Matrix algebra, eigenvalues, eigenvectors, and theorems condensed into high-yield exam revision materials.</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Featured Articles Section -->
        <section class="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">Deep Engineering Articles</h2>
                    <p class="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">Explore our structured, long-form educational guides crafted for deep conceptual mastery.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Article 1 -->
                    <a href="/engineering-mathematics-unit-2.html" class="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                        <div class="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80" alt="Differential Equations" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-6">
                            <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">Mathematics</span>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">Complete Guide to Differential Equations</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">A thorough 2000-word structured guide on solving first-order and higher-order linear differential equations with complex roots.</p>
                        </div>
                    </a>
                    
                    <!-- Article 2 -->
                    <a href="/basic-civil-and-mechanical-engineering-unit-5.html" class="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                        <div class="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1533611311029-baadf6e6932a?auto=format&fit=crop&w=600&q=80" alt="Thermodynamics" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-6">
                            <span class="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-2 block">Mechanical</span>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">Step-by-Step Solved Problems in Thermodynamics</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">Master the laws of thermodynamics with fully solved numericals covering work, heat transfer, and Carnot cycles.</p>
                        </div>
                    </a>

                    <!-- Article 3 -->
                    <a href="/subject.html?sub=Engineering%20Mechanics" class="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                        <div class="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=600&q=80" alt="Engineering Mechanics" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-6">
                            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 block">Civil & Mech</span>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">Engineering Mechanics: Concepts + Examples</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">Understand statics and dynamics, friction, and centroids with detailed visual explanations and real-world diagrams.</p>
                        </div>
                    </a>

                    <!-- Article 4 -->
                    <a href="/subject.html?sub=Digital%20Logic%20Design" class="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                        <div class="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1555661530-abca628178d4?auto=format&fit=crop&w=600&q=80" alt="Boolean Algebra" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-6">
                            <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 block">Digital Electronics</span>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">Boolean Algebra Explained for Beginners</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">Learn logic gates, truth tables, and K-map minimization techniques through an easy-to-follow introductory framework.</p>
                        </div>
                    </a>
                    
                    <!-- Article 5 -->
                    <a href="/c-programming-unit-3.html" class="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                        <div class="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80" alt="C Pointers" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-6">
                            <span class="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 block">Programming</span>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">Mastering Pointers in C: A Visual Guide</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">Demystifying memory management, arrays, and pointer arithmetic with clear illustrations and code examples.</p>
                        </div>
                    </a>

                    <!-- Article 6 -->
                    <a href="/engineering-physics-unit-4.html" class="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                        <div class="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1627885065095-2ab5a31deed1?auto=format&fit=crop&w=600&q=80" alt="Quantum Physics" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-6">
                            <span class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 block">Physics</span>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">Quantum Mechanics for Engineers</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">A deep dive into Schrödinger's wave equation and particle in a box models, removing the jargon and focusing on logic.</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Why Engiprep Hub? (Trust Building) -->
        <section class="py-20 px-6 bg-white dark:bg-slate-950">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">Why Engiprep Hub?</h2>
                    <p class="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">We don't just dump PDFs. We build structural understanding through quality, educator-driven content.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-2xl mb-6 font-bold">A</div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3">Simple Language</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Written in a student-friendly tone, breaking down complex engineering jargon into understandable pieces.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-2xl mb-6 font-bold">B</div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3">Concepts + Apps</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">We don't just teach the theory; we show you how it applies to real-world engineering problems.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center text-2xl mb-6 font-bold">C</div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3">Step-by-Step Learning</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Every numerical derivation and mathematical problem is solved with a transparent, logical workflow.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center text-2xl mb-6 font-bold">D</div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3">Exam Success Focused</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Structured specifically around syllabus requirements to maximize scoring clarity and retention.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Preview / E-E-A-T Section -->
        <section class="py-16 px-6 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
            <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div class="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-blue-100 dark:bg-slate-800 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl">
                    <!-- Replace with author image if applicable, using Dicebear for placeholder -->
                    <img src="https://api.dicebear.com/7.x/shapes/svg?seed=engiprep" alt="Engiprep Hub Logo Shape" class="w-full h-full object-cover">
                </div>
                <div class="text-center md:text-left">
                    <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-4">About EngiPrep Hub</h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Engiprep Hub is an educational platform designed to help engineering students understand core concepts through structured explanations, examples, and practice materials. Our team of educators creates long-form, reliable study guides to ensure you pass your exams with deep understanding, not just surface-level memorization.
                    </p>
                    <a href="/about.html" class="inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        Read full About page <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- Latest Updates / Blog Section -->
        <section class="py-20 px-6 bg-white dark:bg-slate-950">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center justify-between mb-12">
                    <h2 class="text-3xl font-black text-slate-900 dark:text-white">Latest Updates</h2>
                    <a href="/blog.html" class="text-blue-600 dark:text-blue-400 font-bold hover:underline">View all posts</a>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-shadow">
                        <span class="text-[10px] font-black uppercase text-rose-500 mb-2 block">New Notes Added</span>
                        <h3 class="font-bold text-slate-900 dark:text-white mb-2"><a href="/complete-chemistry-guide.html" class="hover:text-blue-600">Complete Environmental Chemistry Module</a></h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">Just published a 3000-word deep dive into hardness of water and complexometric titrations.</p>
                    </div>
                    <div class="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-shadow">
                        <span class="text-[10px] font-black uppercase text-emerald-500 mb-2 block">Solved Problems</span>
                        <h3 class="font-bold text-slate-900 dark:text-white mb-2"><a href="/pyqs.html" class="hover:text-blue-600">10 Solved Kirchhoff's Circuit Analysis Questions</a></h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">Practice with step-by-step nodal and mesh analysis from previous year exam papers.</p>
                    </div>
                    <div class="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-shadow">
                        <span class="text-[10px] font-black uppercase text-blue-500 mb-2 block">Study Tips</span>
                        <h3 class="font-bold text-slate-900 dark:text-white mb-2"><a href="/blog.html" class="hover:text-blue-600">How to Master Engineering Mathematics in 30 Days</a></h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">A structured calendar approach to conquering M1, integrating practice routines and concept focus.</p>
                    </div>
                    <div class="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:shadow-md transition-shadow">
                        <span class="text-[10px] font-black uppercase text-amber-500 mb-2 block">Exam Updates</span>
                        <h3 class="font-bold text-slate-900 dark:text-white mb-2"><a href="/blog.html" class="hover:text-blue-600">JNTUK R23 Common Syllabus Mistakes</a></h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">Avoid these common preparation pitfalls when tackling the updated R23 curriculum guidelines.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Subscription -->
        <section class="py-24 px-6 relative overflow-hidden bg-blue-600 text-white">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800"></div>
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div class="max-w-3xl mx-auto relative z-10 text-center">
                <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Stay Updated</h2>
                <p class="text-blue-100 mb-10 text-lg leading-relaxed">Get new engineering notes, comprehensive study guides, and solved problem sets delivered directly to your inbox every week.</p>
                
                <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                    <input type="email" placeholder="Enter your student email..." required class="flex-1 px-6 py-4 rounded-xl border-none text-slate-900 focus:ring-4 focus:ring-white/30 outline-none shadow-xl text-sm font-medium">
                    <button type="submit" class="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-xl whitespace-nowrap">Subscribe Free</button>
                </form>
                <p class="text-xs text-blue-200 mt-6 font-medium">We respect your privacy. No spam, just pure educational value.</p>
            </div>
        </section>

    </main>

    <!-- AdSense Compliant Footer -->
    <footer class="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div class="md:col-span-1">
                    <a href="/" class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        </div>
                        <span class="text-xl font-black text-slate-900 dark:text-white">EngiPrep Hub</span>
                    </a>
                    <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                        A structured educational platform dedicated to providing deep explanations, solved engineering problems, and comprehensive syllabus guides.
                    </p>
                </div>
                
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Learning</h4>
                    <ul class="space-y-3">
                        <li><a href="/all-subjects.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">All Subjects</a></li>
                        <li><a href="/notes.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Detailed Notes</a></li>
                        <li><a href="/pyqs.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Previous Year Papers</a></li>
                        <li><a href="/cheat-sheets.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Formula Sheets</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Platform</h4>
                    <ul class="space-y-3">
                        <li><a href="/about.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
                        <li><a href="/blog.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Educational Blog</a></li>
                        <li><a href="/contact.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Legal</h4>
                    <ul class="space-y-3">
                        <li><a href="/privacy-policy.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
                        <li><a href="/terms-conditions.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Terms & Conditions</a></li>
                        <li><a href="/disclaimer.html" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    &copy; 2024 EngiPrep Hub. Educational purposes only. Not affiliated with JNTUK.
                </p>
                <div class="flex items-center gap-4">
                    <!-- Social icons placeholders -->
                    <a href="#" class="text-slate-400 hover:text-blue-600" aria-label="Twitter"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                    <a href="#" class="text-slate-400 hover:text-blue-600" aria-label="GitHub"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg></a>
                </div>
            </div>
        </div>
    </footer>
    
    <script src="/src/client.ts" type="module"></script>
</body>
</html>
`;
    
    const finalHtml = headContent + "\n" + newBody;
    fs.writeFileSync('index.html', finalHtml);
    console.log("Rewrote index.html");
}

rewrite();
