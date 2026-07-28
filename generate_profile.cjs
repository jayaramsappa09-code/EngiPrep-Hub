const fs = require('fs');

let dashboard = fs.readFileSync('dashboard.html', 'utf8');

// Replace title
let profile = dashboard.replace('<title>Smart Student Dashboard | EngiPrepHub</title>', '<title>My Profile | EngiPrepHub</title>');

// Replace active nav state (assuming dashboard was active)
profile = profile.replace('class="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold"', 'class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"');
profile = profile.replace('class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors" href="/profile.html"', 'class="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold" href="/profile.html"');

// Extract everything from <main ...> up to closing </main>
const mainMatch = profile.match(/(<main[^>]*>)([\s\S]*?)(<\/main>)/);

if (mainMatch) {
    const mainStart = mainMatch[1];
    const mainEnd = mainMatch[3];
    
    const profileContent = `
            <!-- Top Navigation / Header -->
            <header class="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                <div class="flex items-center gap-4">
                    <button id="mobile-menu-btn" class="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <div>
                        <h1 class="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">My Profile</h1>
                        <p class="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Manage your account and view study progress.</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button class="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all hover:shadow">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </button>
                </div>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- User Info -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-white dark:bg-[#0B1020] rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center">
                        <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 mb-4">
                            <div class="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-black text-blue-600 dark:text-blue-400" id="profile-avatar-initials">US</div>
                        </div>
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white" id="profile-full-name">Loading...</h2>
                        <p class="text-sm text-slate-500 font-mono mt-1" id="profile-email">Loading...</p>
                        
                        <div class="w-full mt-6 space-y-2">
                            <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <span class="text-sm text-slate-600 dark:text-slate-400">Branch</span>
                                <span class="text-sm font-bold text-slate-900 dark:text-slate-100" id="profile-branch">CSE</span>
                            </div>
                            <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <span class="text-sm text-slate-600 dark:text-slate-400">Semester</span>
                                <span class="text-sm font-bold text-slate-900 dark:text-slate-100" id="profile-semester">Semester 2</span>
                            </div>
                        </div>

                        <button id="logout-btn" class="w-full mt-6 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            Sign Out
                        </button>
                    </div>
                </div>

                <!-- Study Progress Tracker -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-white dark:bg-[#0B1020] rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">Study Progress Tracker</h3>
                                <p class="text-sm text-slate-500">Modules completed per subject</p>
                            </div>
                            <div class="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            </div>
                        </div>

                        <div class="space-y-6" id="progress-bars-container">
                            <!-- Progress Bars will be generated here -->
                            <div class="text-center text-sm text-slate-500 py-4">Loading your progress...</div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    
    profile = profile.replace(mainMatch[0], mainStart + '\n' + profileContent + '\n' + mainEnd);
}

fs.writeFileSync('profile.html', profile, 'utf8');
console.log('Regenerated profile.html successfully');
