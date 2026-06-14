import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Basic verification of login
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return; // handled by gatekeeper

    // Fetch user profile data to make it realistic and fully dynamic
    const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    // Dynamically update standard dashboard header widgets
    const greetingEl = document.getElementById('dash-greeting');
    if (greetingEl) {
        const hour = new Date().getHours();
        const timeOfDay = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';
        const name = profileData?.full_name ? profileData.full_name.split(' ')[0] : 'Engineer';
        greetingEl.innerHTML = `Good ${timeOfDay}, ${name} <span class="animate-pulse">👋</span>`;
    }

    const academicDisplay = document.getElementById('dash-academic-display');
    if (academicDisplay && profileData?.branch) {
        academicDisplay.innerHTML = `<span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-md">B.Tech ${profileData.branch}</span>`;
    }

    // Dynamic stat generation & cache system
    let dashStats = JSON.parse(localStorage.getItem('engiprep_dash_stats'));
    if (!dashStats || (Date.now() - (dashStats.timestamp || 0) > 86400000)) {
        dashStats = {
            streak: Math.floor(Math.random() * 15) + 3,
            hours: (Math.random() * 40 + 10).toFixed(1),
            xp: Math.floor(Math.random() * 800) + 200,
            timestamp: Date.now()
        };
        localStorage.setItem('engiprep_dash_stats', JSON.stringify(dashStats));
    }

    const streakEl = document.getElementById('dash-streak-count');
    if (streakEl) streakEl.innerText = `${dashStats.streak} Days`;
    
    const hoursEl = document.getElementById('dash-study-hours');
    if (hoursEl) hoursEl.innerText = `${dashStats.hours} Hours`;
    
    const xpEl = document.getElementById('dash-xp-count');
    if (xpEl) xpEl.innerText = `${dashStats.xp} XP`;

    const bookmarksList = document.getElementById('bookmarks-dashboard-list');
    const recentActivity = document.getElementById('recent-activity-container');
    const badgeCnt = document.getElementById('bookmark-badge-cnt');
    const chartArea = document.getElementById('dashboardPerformanceChart');

    // Simulate Dynamic Bookmark Loading from localStorage / mock DB
    let customBookmarks = JSON.parse(localStorage.getItem('engiprep_custom_bookmarks')) || [
        { title: 'Cayley-Hamilton Theorem Derivation', subtitle: 'MATHS I • FORMULA SHEET' },
        { title: 'Ruby & He-Ne Gas Lasers Schematics', subtitle: 'PHYSICS • DIAGRAM DEEP-DIVE' },
        { title: 'Bubble Sort vs Selection Sort', subtitle: 'C PROGRAMMING • COMPARISON CARD' }
    ];

    function renderBookmarks() {
        if (!bookmarksList) return;
        bookmarksList.innerHTML = '';
        if (badgeCnt) badgeCnt.innerText = `${customBookmarks.length} Items`;

        if (customBookmarks.length === 0) {
            bookmarksList.innerHTML = `<div class="text-xs text-slate-500 font-mono text-center py-4">No bookmarks saved yet.</div>`;
            return;
        }

        customBookmarks.forEach((bkmk, idx) => {
            const div = document.createElement('div');
            div.className = "p-3 bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-between border border-slate-200/40 dark:border-slate-800/40";
            div.innerHTML = `
                <div>
                    <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">${bkmk.title}</h4>
                    <p class="text-[9px] text-[#64748b] font-mono mt-0.5">${bkmk.subtitle}</p>
                </div>
                <button data-idx="${idx}" class="remove-bkmk text-red-500 hover:text-red-700 text-xs font-mono p-1">Remove</button>
            `;
            bookmarksList.appendChild(div);
        });

        bookmarksList.querySelectorAll('.remove-bkmk').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-idx'));
                customBookmarks.splice(idx, 1);
                localStorage.setItem('engiprep_custom_bookmarks', JSON.stringify(customBookmarks));
                renderBookmarks();
            });
        });
    }

    setTimeout(() => {
        renderBookmarks();
    }, 800);

    // Simulate Recent Activity Feed Tracking
    let lastActivityRaw = localStorage.getItem('engiprep_last_activity');
    let lastActivityArr = lastActivityRaw ? JSON.parse(lastActivityRaw) : {
        subject: "Engineering Mathematics-II",
        desc: "Session stopped at Unit 3: Differential Equations.",
        link: "/maths-1.html"
    };

    if (recentActivity) {
        setTimeout(() => {
            recentActivity.innerHTML = `
                <p class="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">LAST VIEWED SUBJECT</p>
                <h4 class="text-sm font-black text-slate-800 dark:text-white mt-1">${lastActivityArr.subject}</h4>
                <p class="text-xs text-slate-500 mt-1">${lastActivityArr.desc}</p>
                <a href="${lastActivityArr.link}" class="mt-3 inline-block text-[10px] uppercase font-black tracking-widest text-blue-600 dark:text-blue-400 hover:underline">⚡ Instant Resume</a>
            `;
        }, 600);
    }

    const todaysPlan = document.getElementById('todays-plan-container');
    if (todaysPlan) {
        const plans = [
            { title: "Study Chemistry Unit 3 Recap", type: "Focus Session", xp: 30, time: "45 Mins" },
            { title: "Solve 10 Calculus PYQs", type: "Exam Prep", xp: 50, time: "40 Mins" },
            { title: "Review Engineering Physics Lasers", type: "Revision", xp: 20, time: "20 Mins" },
            { title: "Practice C Pointers Logic", type: "Coding Practice", xp: 40, time: "30 Mins" }
        ];
        
        // Shuffle based on today's day to simulate dynamic generation
        const day = new Date().getDay();
        const dailyPlans = plans.slice(day % 2, (day % 2) + 3);

        setTimeout(() => {
            todaysPlan.innerHTML = '';
            dailyPlans.forEach(plan => {
                const id = Math.random().toString(36).substr(2, 9);
                todaysPlan.innerHTML += `
                    <label class="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl cursor-pointer group hover:border-[#3b82f6]">
                        <div class="flex items-center gap-3">
                            <input type="checkbox" onclick="tickStudyGoal(this, ${plan.xp})" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 font-bold scale-110">
                            <div>
                                <p class="text-sm font-black text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${plan.title}</p>
                                <p class="text-[9px] text-[#64748b] uppercase font-black uppercase mt-0.5">${plan.type} • +${plan.xp} XP</p>
                            </div>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400">${plan.time}</span>
                    </label>
                `;
            });
        }, 900);
    }

    const examContainer = document.getElementById('exam-readiness-container');
    if (examContainer) {
        const topics = [
            { title: "M1 Calculus Formulae", status: "High Preparedness", score: Math.floor(Math.random() * 20 + 75), color: "green" },
            { title: "Physics semiconductor laws", status: "Moderate Prep", score: Math.floor(Math.random() * 20 + 50), color: "amber" },
            { title: "Chemistry Electrodes recap", status: "Outstanding Prep", score: Math.floor(Math.random() * 10 + 90), color: "green" },
            { title: "C Pointer Memory logic", status: "Low Preparedness", score: Math.floor(Math.random() * 20 + 30), color: "red" }
        ];

        setTimeout(() => {
            examContainer.innerHTML = '';
            topics.forEach(t => {
                examContainer.innerHTML += `
                    <div class="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-between">
                        <div>
                            <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">${t.title}</h4>
                            <span class="text-[9px] font-black uppercase tracking-wider text-${t.color}-600 dark:text-${t.color}-400 block mt-1">● ${t.status} (${t.score}%)</span>
                        </div>
                        <span class="w-2.5 h-2.5 rounded-full bg-${t.color}-500 shadow-[0_0_8px_rgba(0,0,0,0.5)] shadow-${t.color}-500/50"></span>
                    </div>
                `;
            });
        }, 1100);
    }

    const achvsContainer = document.getElementById('achievements-dashboard-grid-box');
    if (achvsContainer) {
        const achvs = [
            { icon: "🔥", title: "7-Day Streak", state: "UNLOCKED", unlocked: true },
            { icon: "🎯", title: "100 PYQs Solved", state: "UNLOCKED", unlocked: true },
            { icon: "⚡", title: "Revision Master", state: "UNLOCKED", unlocked: true },
            { icon: "👑", title: "Sem Smasher", state: "LOCKED", unlocked: false }
        ];

        setTimeout(() => {
            achvsContainer.innerHTML = '';
            achvs.forEach(a => {
                let divClass = a.unlocked ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200" : "bg-slate-50 dark:bg-[#090911]/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale";
                let textClass = a.unlocked ? "text-amber-600" : "text-slate-500";
                
                achvsContainer.innerHTML += `
                    <div class="p-3 ${divClass} border rounded-xl flex items-center gap-2.5 transition transform hover:scale-105">
                        <span class="text-xl">${a.icon}</span>
                        <div>
                            <h4 class="text-[10px] font-black uppercase text-slate-800 dark:text-slate-200 tracking-tight leading-none">${a.title}</h4>
                            <span class="text-[8px] ${textClass} mt-1 block font-mono">${a.state}</span>
                        </div>
                    </div>
                `;
            });
        }, 1300);
    }

    // Dynamic Study Progress Checkboxes
    const subjectPrefixes = ['math', 'phy', 'chem', 'c'];
    subjectPrefixes.forEach(prefix => {
        const labelTextContainer = document.getElementById(`card-%-${prefix}`);
        const barContainer = document.getElementById(`card-bar-${prefix}`);
        if (!labelTextContainer || !barContainer) return;

        // Try dynamically adjusting checkmarks
        const cardBox = barContainer.closest('.p-6');
        if (cardBox) {
            const checkboxes = cardBox.querySelectorAll('input[type="checkbox"]');
            
            // Randomly reset and assign progress
            let completed = 0;
            checkboxes.forEach((chk, idx) => {
                // Determine true/false state dynamically based on cache or random initial
                const cachedState = localStorage.getItem(`engiprep_subject_${prefix}_chk_${idx}`);
                let isChecked;
                if (cachedState !== null) {
                    isChecked = cachedState === 'true';
                } else {
                    isChecked = Math.random() > 0.4;
                    localStorage.setItem(`engiprep_subject_${prefix}_chk_${idx}`, isChecked);
                }

                chk.checked = isChecked;
                const spanItem = chk.nextElementSibling;
                if (isChecked) {
                    spanItem.classList.add('line-through', 'opacity-60');
                    completed++;
                } else {
                    spanItem.classList.remove('line-through', 'opacity-60');
                }

                // Append listener
                chk.addEventListener('change', (e) => {
                    localStorage.setItem(`engiprep_subject_${prefix}_chk_${idx}`, e.target.checked);
                    // recalculate progress
                    let activeCount = 0;
                    checkboxes.forEach(c => { if(c.checked) activeCount++; });
                    const newPerc = Math.round((activeCount / checkboxes.length) * 100);
                    labelTextContainer.innerText = `${newPerc}%`;
                    barContainer.style.width = `${newPerc}%`;
                });
            });

            const initialPerc = Math.round((completed / checkboxes.length) * 100);
            labelTextContainer.innerText = `${initialPerc}%`;
            barContainer.style.width = `${initialPerc}%`;
        }
    });

});
