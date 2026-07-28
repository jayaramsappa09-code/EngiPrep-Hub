import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Fetch user profile data
    const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    // Populate profile card
    const nameEl = document.getElementById('profile-full-name');
    const emailEl = document.getElementById('profile-email');
    const branchEl = document.getElementById('profile-branch');
    const semEl = document.getElementById('profile-semester');
    const initialsEl = document.getElementById('profile-avatar-initials');

    if (nameEl) nameEl.innerText = profileData?.full_name || 'Engineering Student';
    if (emailEl) emailEl.innerText = session.user.email;
    if (branchEl) branchEl.innerText = profileData?.branch || 'CSE';
    if (semEl) semEl.innerText = profileData?.semester ? 'Semester ' + profileData.semester : 'Semester 2';
    
    if (initialsEl) {
        const name = profileData?.full_name || 'US';
        const parts = name.split(' ');
        if (parts.length > 1) {
            initialsEl.innerText = parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
        } else {
            initialsEl.innerText = name.substring(0, 2).toUpperCase();
        }
    }

    // Populate Study Progress Tracker
    const progressContainer = document.getElementById('progress-bars-container');
    if (progressContainer) {
        const subjects = [
            { name: "Engineering Mathematics-I", color: "blue", modulesTotal: 5 },
            { name: "Engineering Physics", color: "purple", modulesTotal: 5 },
            { name: "Engineering Chemistry", color: "green", modulesTotal: 5 },
            { name: "C Programming", color: "amber", modulesTotal: 5 },
            { name: "Basic Civil & Mechanical", color: "rose", modulesTotal: 5 }
        ];

        // Simulate reading from DB or localStorage (for dynamic logic)
        let html = '';
        let totalCompletedModules = 0;
        
        subjects.forEach(sub => {
            // Check cache or randomize a realistic progress
            const cacheKey = "engiprep_prog_" + sub.name.replace(/\s+/g, '_');
            let completed = localStorage.getItem(cacheKey);
            if (completed === null) {
                completed = Math.floor(Math.random() * (sub.modulesTotal + 1));
                localStorage.setItem(cacheKey, completed);
            } else {
                completed = parseInt(completed);
            }
            totalCompletedModules += completed;
            
            const percentage = Math.round((completed / sub.modulesTotal) * 100);

            html += `
                <div class="space-y-2">
                    <div class="flex justify-between items-end">
                        <div>
                            <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">${sub.name}</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">${completed} / ${sub.modulesTotal} Modules</p>
                        </div>
                        <span class="text-sm font-black text-${sub.color}-600 dark:text-${sub.color}-400">${percentage}%</span>
                    </div>
                    <div class="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div class="h-full bg-${sub.color}-500 transition-all duration-1000 ease-out rounded-full relative" style="width: 0%" data-target-width="${percentage}%">
                            <div class="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]"></div>
                        </div>
                    </div>
                </div>
            `;
        });

        progressContainer.innerHTML = html;

        // Animate the bars
        setTimeout(() => {
            progressContainer.querySelectorAll('[data-target-width]').forEach(bar => {
                bar.style.width = bar.getAttribute('data-target-width');
            });
        }, 100);

        // Update XP and Streak Tracker
        const xpEarned = totalCompletedModules * 50;
        let streak = localStorage.getItem('engiprep_dash_stats');
        if (streak) {
            streak = JSON.parse(streak).streak || 0;
        } else {
            streak = Math.floor(Math.random() * 10) + 1;
        }

        const streakEl = document.getElementById('profile-streak');
        if (streakEl) streakEl.innerText = `${streak} Day Streak`;

        const badgeIconEl = document.getElementById('profile-badge-icon');
        const badgeTitleEl = document.getElementById('profile-level-badge');
        const xpTextEl = document.getElementById('profile-xp-text');
        const xpBarEl = document.getElementById('profile-xp-bar');
        const xpNextEl = document.getElementById('profile-xp-next');

        let levelTitle = "Novice";
        let levelIcon = "⭐";
        let nextXp = 250;
        let prevXp = 0;

        if (xpEarned >= 1000) {
            levelTitle = "Master Engineer";
            levelIcon = "👑";
            nextXp = 2000;
            prevXp = 1000;
        } else if (xpEarned >= 500) {
            levelTitle = "Scholar";
            levelIcon = "🎓";
            nextXp = 1000;
            prevXp = 500;
        } else if (xpEarned >= 250) {
            levelTitle = "Apprentice";
            levelIcon = "🏅";
            nextXp = 500;
            prevXp = 250;
        }

        if (badgeIconEl) badgeIconEl.innerText = levelIcon;
        if (badgeTitleEl) badgeTitleEl.innerText = levelTitle;
        if (xpTextEl) xpTextEl.innerText = `${xpEarned} XP`;
        
        if (xpNextEl) {
            xpNextEl.innerText = `${nextXp - xpEarned} XP to next level`;
        }

        if (xpBarEl) {
            const range = nextXp - prevXp;
            const currentIntoRange = xpEarned - prevXp;
            const xpPercentage = Math.min(100, Math.max(0, (currentIntoRange / range) * 100));
            setTimeout(() => {
                xpBarEl.style.width = `${xpPercentage}%`;
            }, 300);
        }
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.href = '/auth.html';
        });
    }
});
