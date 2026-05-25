/**
 * First Year Engineering Hub – JNTUK R23
 * Core functionality
 */

import { supabase, getCurrentUser, getUserProfile } from './supabase'
import { toggleBookmark } from './notes'
import { toast, showEncouragingToast, showSuccessToast, showAchievementToast } from './utils/toast'

// Make toast globally available to inline scripts and other HTML pages
window.showToast = toast.show.bind(toast);
window.showEncouragingToast = showEncouragingToast;
window.showSuccessToast = showSuccessToast;
window.showAchievementToast = showAchievementToast;

// Auto Apply Themes based on Subject URL or query slug
(function() {
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get('slug') || '';
    
    let subject = '';
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    
    if (filename.includes('physics') || filename.includes('wave') || slug.includes('physics')) {
        subject = 'physics';
    } else if (filename.includes('mathematics') || filename.includes('maths') || filename.includes('eigen') || slug.includes('mathematics') || slug.includes('maths')) {
        subject = 'mathematics';
    } else if (filename.includes('chemistry') || slug.includes('chemistry')) {
        subject = 'chemistry';
    } else if (filename.includes('english') || slug.includes('english')) {
        subject = 'english';
    } else if (filename.includes('programming') || filename.includes('dsa') || filename.includes('c-fundamentals') || slug.includes('c-programming') || slug.includes('data-structures') || filename.includes('c-fundamentals')) {
        subject = 'programming';
    } else if (filename.includes('electrical') || filename.includes('beee') || slug.includes('electrical') || slug.includes('beee')) {
        subject = 'beee';
    } else if (filename.includes('graphics') || filename.includes('drawing') || slug.includes('graphics')) {
        subject = 'graphics';
    } else if (filename.includes('civil') || filename.includes('mechanical') || slug.includes('civil-and-mechanical') || slug.includes('civil')) {
        subject = 'civil-mechanical';
    }
    
    if (subject) {
        document.documentElement.setAttribute('data-subject-theme', subject);
    }

    // Dynamic Page Context Selection (Unique Creative Identity Mode)
    let pageContext = 'general';
    if (filename.includes('blog') || filename.includes('post') || filename.includes('about')) {
        pageContext = 'blog';
    } else if (filename.includes('ai-professor') || filename.includes('professor') || slug.includes('ai')) {
        pageContext = 'ai-advisor';
    } else if (filename.includes('dashboard')) {
        pageContext = 'dashboard';
    } else if (filename.includes('tasks') || filename.includes('planner')) {
        pageContext = 'tasks';
    } else if (filename.includes('tools') || filename.includes('calculator') || filename.includes('visualizer')) {
        pageContext = 'tools';
    }

    document.documentElement.setAttribute('data-page-context', pageContext);
})();

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCookieConsent();
    initMobileMenu();
    initActiveNavLinks();
    initSearch();
    initCopyButtons();
    initSmoothScroll();
    initStudyPlanner();
    updateAuthUI();
    initGamification();
    initAcademicNavigator();
});

// Theme Management & Custom Multi-Theme System
function applyTheme(themeName) {
    if (!themeName) themeName = 'light';
    
    // Clear all theme classes
    document.documentElement.classList.remove('dark', 'theme-dark', 'theme-light', 'theme-blueprint', 'theme-focus', 'theme-exam');
    
    // Set custom theme class
    document.documentElement.classList.add(`theme-${themeName}`);
    
    // Add legacy .dark class dynamically for dark-toned themes to preserve Tailwind utility compatibility
    if (themeName === 'dark' || themeName === 'blueprint' || themeName === 'exam') {
        document.documentElement.classList.add('dark');
    }
    
    // Store in localStorage
    localStorage.setItem('color-theme', themeName);

    // Sync button icons based on light vs dark spectrum of the active theme
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    
    const isDarkSpectrum = (themeName === 'dark' || themeName === 'blueprint' || themeName === 'exam');
    if (isDarkSpectrum) {
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
    } else {
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
    }
}

window.applyTheme = applyTheme;

function initTheme() {
    const savedTheme = localStorage.getItem('color-theme') || 'light';
    applyTheme(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Prevent stacking listeners
        themeToggleBtn.replaceWith(themeToggleBtn.cloneNode(true));
        const newThemeBtn = document.getElementById('theme-toggle');

        newThemeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            let dropdown = document.getElementById('theme-dropdown-menu');
            if (dropdown) {
                dropdown.remove();
                return;
            }
            
            dropdown = document.createElement('div');
            dropdown.id = 'theme-dropdown-menu';
            dropdown.className = 'theme-dropdown-card';
            
            const themes = [
                { id: 'dark', label: 'Default Dark', dot: '#0B1020', desc: 'Vercel Deep Slate' },
                { id: 'light', label: 'Light Mode', dot: '#FFFFFF', desc: 'Notion Clean Paper' },
                { id: 'blueprint', label: 'Blueprint Mode', dot: '#00D2FF', desc: 'Civil/Mech Drafting' },
                { id: 'focus', label: 'Focus Mode', dot: '#FAF6EE', desc: 'Distraction-free Ink' },
                { id: 'exam', label: 'Exam Mode', dot: '#F59E0B', desc: 'High-Yield Alert' }
            ];
            
            const activeTheme = localStorage.getItem('color-theme') || 'dark';
            
            let htmlContent = '';
            themes.forEach(t => {
                const isActive = t.id === activeTheme;
                htmlContent += `
                    <div class="theme-dropdown-item ${isActive ? 'active' : ''}" data-theme-id="${t.id}">
                        <span class="theme-dot" style="background-color: ${t.dot}; border: 1px solid rgba(255, 255, 255, 0.2);"></span>
                        <div class="flex flex-col">
                            <span class="font-bold text-[12px] leading-tight text-text-main">${t.label}</span>
                            <span class="text-[9px] text-slate-400 leading-tight">${t.desc}</span>
                        </div>
                    </div>
                `;
            });
            
            dropdown.innerHTML = htmlContent;
            
            newThemeBtn.style.position = 'relative';
            newThemeBtn.appendChild(dropdown);
            
            // Add click events for item selection
            dropdown.querySelectorAll('.theme-dropdown-item').forEach(item => {
                item.addEventListener('click', function(evt) {
                    evt.stopPropagation();
                    const selTheme = this.getAttribute('data-theme-id');
                    applyTheme(selTheme);
                    dropdown.remove();
                });
            });
        });
    }

    // Close on clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('theme-dropdown-menu');
        const themeBtn = document.getElementById('theme-toggle');
        if (dropdown && themeBtn && !themeBtn.contains(e.target)) {
            dropdown.remove();
        }
    });
}

function initCookieConsent() {
    if (localStorage.getItem('cookie-consent')) {
        return; // Consent already given
    }

    // Create the HTML representation
    const consentDiv = document.createElement('div');
    consentDiv.id = 'cookie-consent-banner';
    consentDiv.className = 'fixed bottom-4 right-4 left-4 md:left-auto md:w-[380px] z-[9999] p-5 rounded-2xl shadow-2xl transition-all duration-300 transform translate-y-12 opacity-0 border';
    consentDiv.style.backgroundColor = 'var(--surface-color)';
    consentDiv.style.borderColor = 'var(--border-color)';
    consentDiv.style.backdropFilter = 'blur(12px)';

    consentDiv.innerHTML = `
        <div class="flex flex-col gap-3">
            <div class="flex items-start gap-3">
                <div class="p-2 rounded-xl" style="background-color: rgba(var(--theme-primary-rgb, 139, 92, 246), 0.1); color: var(--theme-primary, #6366F1);">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                    </svg>
                </div>
                <div class="flex-1">
                    <h4 class="text-[14px] font-bold tracking-tight text-text-main" style="color: var(--text-main, #ffffff)">Cookie Consent</h4>
                    <p class="text-[11px] mt-1 text-slate-400 font-sans leading-relaxed">
                        We use cookies to personalize academic notes, analyze traffic flow, and deliver compliant JNTUK high-yield ads.
                    </p>
                </div>
            </div>

            <!-- Preferences Panel -->
            <div id="cookie-prefs-panel" class="hidden flex-col gap-2 p-3 rounded-lg text-[11px] select-none" style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color);">
                <label class="flex items-center justify-between cursor-pointer">
                    <span class="font-semibold" style="color: var(--text-main, #ffffff)">Strictly Necessary</span>
                    <input type="checkbox" disabled checked class="accent-[var(--theme-primary)]">
                </label>
                <div class="h-[1px] bg-slate-800/40 my-1 font-sans"></div>
                <label class="flex items-center justify-between cursor-pointer">
                    <div class="flex flex-col">
                        <span class="font-semibold" style="color: var(--text-main, #ffffff)">Analytics & Performance</span>
                        <span class="text-[9px] text-slate-500">Track study times & navigation</span>
                    </div>
                    <input type="checkbox" id="cookie-pref-analytics" checked style="accent-color: var(--theme-primary, #6366F1);">
                </label>
                <div class="h-[1px] bg-slate-800/40 my-1 font-sans"></div>
                <label class="flex items-center justify-between cursor-pointer">
                    <div class="flex flex-col">
                        <span class="font-semibold" style="color: var(--text-main, #ffffff)">Google AdSense</span>
                        <span class="text-[9px] text-slate-500">Deliver highly targeted premium ads</span>
                    </div>
                    <input type="checkbox" id="cookie-pref-adsense" checked style="accent-color: var(--theme-primary, #6366F1);">
                </label>
            </div>

            <div class="flex items-center justify-end gap-2 text-[11px] mt-1">
                <button id="cookie-btn-manage" class="px-2.5 py-1.5 font-bold rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer">
                    Manage
                </button>
                <button id="cookie-btn-reject" class="px-3 py-1.5 font-semibold text-slate-400 border rounded-xl hover:text-white transition-all cursor-pointer" style="border-color: var(--border-color);">
                    Reject
                </button>
                <button id="cookie-btn-accept" class="px-4 py-1.5 font-bold text-white rounded-xl transition-all hover:scale-[1.02] cursor-pointer" style="background: var(--theme-primary, #4F46E5);">
                    Accept All
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(consentDiv);

    // Fade-in animation
    setTimeout(() => {
        consentDiv.classList.remove('translate-y-12', 'opacity-0');
        consentDiv.classList.add('translate-y-0', 'opacity-100');
    }, 100);

    const prefsPanel = consentDiv.querySelector('#cookie-prefs-panel');
    const manageBtn = consentDiv.querySelector('#cookie-btn-manage');
    const rejectBtn = consentDiv.querySelector('#cookie-btn-reject');
    const acceptBtn = consentDiv.querySelector('#cookie-btn-accept');

    manageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (prefsPanel.classList.contains('hidden')) {
            prefsPanel.classList.remove('hidden');
            prefsPanel.classList.add('flex');
            manageBtn.textContent = 'Hide';
        } else {
            prefsPanel.classList.remove('flex');
            prefsPanel.classList.add('hidden');
            manageBtn.textContent = 'Manage';
        }
    });

    const closeBanner = (consentType) => {
        consentDiv.classList.add('translate-y-12', 'opacity-0');
        setTimeout(() => {
            consentDiv.remove();
        }, 300);
        localStorage.setItem('cookie-consent', consentType);
    };

    rejectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeBanner('minimal');
        if (typeof window.showSuccessToast === 'function') {
            window.showSuccessToast('Minimal cookies preference saved.');
        }
    });

    acceptBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const analytics = consentDiv.querySelector('#cookie-pref-analytics')?.checked ?? true;
        const adsense = consentDiv.querySelector('#cookie-pref-adsense')?.checked ?? true;
        
        if (analytics && adsense) {
            closeBanner('all');
        } else {
            closeBanner(JSON.stringify({ analytics, adsense }));
        }

        if (typeof window.showSuccessToast === 'function') {
            window.showSuccessToast('Your cookie preferences have been applied successfully.');
        }
    });
}

// Sync UI on auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth State Change:', event, session?.user?.email);
    updateAuthUI(session?.user);
    
    // Diagnostic check for errors in URL
    const url = new URL(window.location.href);
    const error = url.searchParams.get('error') || url.hash.includes('error=') ? 'error' : null;
    if (error) {
        const errorDesc = url.searchParams.get('error_description') || 'Unknown Auth Error';
        console.warn('Auth Error Detected:', errorDesc);
    }
});

async function updateAuthUI(providedUser = null) {
    const navActions = document.getElementById('nav-actions');
    if (!navActions) return;

    const isDark = document.documentElement.classList.contains('dark') || 
                  localStorage.getItem('color-theme') === 'dark';

    const themeBtnPlaceholder = `
        <button id="theme-toggle" type="button" class="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none" aria-label="Toggle Dark Mode">
            <svg id="theme-toggle-dark-icon" class="${isDark ? 'hidden' : ''} w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg id="theme-toggle-light-icon" class="${isDark ? '' : 'hidden'} w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
    `;

    try {
        const user = providedUser || await getCurrentUser();

        if (user) {
            // Fetch basic profile for the navbar using helper for schema resilience
            let profile = await getUserProfile(user.id);

            const displayName = profile?.username || user.email.split('@')[0];
            const avatar = profile?.avatar_url 
                ? `<img src="${profile.avatar_url}" class="w-8 h-8 rounded-lg object-cover">`
                : `<div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">${displayName.charAt(0).toUpperCase()}</div>`;

            navActions.innerHTML = `
                <div class="flex items-center gap-4">
                    ${themeBtnPlaceholder}
                    <a href="/dashboard.html" class="flex items-center gap-3 p-1 pr-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 transition-all">
                        ${avatar}
                        <span class="text-[10px] font-black tracking-widest text-[#0d0d12] dark:text-white uppercase truncate max-w-[80px]">${displayName}</span>
                    </a>
                </div>
            `;
        } else {
            navActions.innerHTML = `
                <div class="flex items-center gap-4">
                    ${themeBtnPlaceholder}
                    <a href="/auth.html" class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors dark:hover:text-blue-400">Login</a>
                    <a href="/auth.html?signup=true" class="btn-primary text-[10px] py-2 px-6 shadow-md shadow-blue-500/20">Join Hub</a>
                </div>
            `;
        }
        initTheme(); // Re-initialize theme toggle since we just added it to the DOM
    } catch (err) {
        // Fallback for non-configured Supabase
        navActions.innerHTML = `
            <div class="flex items-center gap-4">
                ${themeBtnPlaceholder}
                <a href="/auth.html" class="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors dark:hover:text-blue-400">Login</a>
                <a href="/auth.html?signup=true" class="btn-primary text-[10px] py-2 px-6 shadow-md shadow-blue-500/20">Join Hub</a>
            </div>
        `;
        initTheme();
    }
}

async function initStudyPlanner() {
    const plannerList = document.getElementById('planner-list');
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    
    const user = await getCurrentUser();

    const renderPlanner = async () => {
        if (!plannerList) return;
        
        let items = [];
        if (user) {
            const { data } = await supabase
                .from('bookmarks')
                .select('notes (*)')
                .eq('user_id', user.id);
            items = data ? data.map(d => d.notes).filter(Boolean) : [];
        } else {
            items = JSON.parse(localStorage.getItem('studyPlanner')) || [];
        }

        if (items.length === 0) {
            plannerList.innerHTML = '<p class="text-xs text-white/30 italic">No notes bookmarked yet.</p>';
            return;
        }

        plannerList.innerHTML = items.map((item, idx) => `
            <div class="planner-item animate-fadeIn" style="animation-delay: ${idx * 0.1}s">
                <div>
                    <a href="${item.slug ? `/note-viewer.html?slug=${item.slug}` : '#'}" class="text-xs font-bold text-white/80 hover:text-primary transition-colors">${item.title}</a>
                    <div class="text-[10px] text-white/40">${item.subject || 'Note'}</div>
                </div>
                <button data-remove="${item.id}" class="text-white/20 hover:text-red-400 p-1 remove-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
        `).join('');

        // Add remove handlers
        plannerList.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-remove');
                if (user) {
                    await toggleBookmark(user.id, id);
                } else {
                    let saved = JSON.parse(localStorage.getItem('studyPlanner')) || [];
                    saved = saved.filter(i => i.id !== id);
                    localStorage.setItem('studyPlanner', JSON.stringify(saved));
                }
                renderPlanner();
            });
        });
    };

    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const title = btn.getAttribute('data-title');
            const category = btn.getAttribute('data-category');

            if (user) {
                try {
                    await toggleBookmark(user.id, id);
                    showNotification(`Updated Planner`);
                    btn.classList.toggle('text-blue-400');
                } catch (err) {
                    showNotification(`Sync Error: Check if note exists in DB`);
                }
            } else {
                let savedItems = JSON.parse(localStorage.getItem('studyPlanner')) || [];
                const exists = savedItems.findIndex(i => i.id === id);
                if (exists > -1) {
                    savedItems.splice(exists, 1);
                    btn.classList.remove('text-blue-400');
                } else {
                    savedItems.push({ id, title, category });
                    btn.classList.add('text-blue-400');
                    showNotification(`Added ${title} to Planner (Local)`);
                }
                localStorage.setItem('studyPlanner', JSON.stringify(savedItems));
            }
            renderPlanner();
        });
    });

    renderPlanner();
}

function showNotification(msg) {
    showSuccessToast('Success', msg);
}

function initMobileMenu() {
    // Dynamically inject the mobile menu hamburger button and mobile menu drawer if they aren't already hardcoded in the DOM.
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Check if we already have the button
    let menuBtn = document.getElementById('mobile-menu-btn');
    let mobileMenu = document.getElementById('mobile-menu');

    if (!menuBtn) {
        // Find navbar action block to inject the mobile menu button beautifully
        const navActions = document.getElementById('nav-actions') || nav.querySelector('.max-w-7xl > div:last-child');
        if (navActions) {
            menuBtn = document.createElement('button');
            menuBtn.id = 'mobile-menu-btn';
            menuBtn.className = 'lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-blue-500';
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-controls', 'mobile-menu');
            menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
            menuBtn.innerHTML = `
                <svg class="w-5 h-5 transition-transform duration-300" id="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path class="line-1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16"></path>
                    <path class="line-2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 12h16"></path>
                    <path class="line-3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 18h16"></path>
                </svg>
            `;
            // Insert inside actions container
            navActions.parentNode.insertBefore(menuBtn, navActions.nextSibling || navActions);
        }
    }

    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'hidden absolute top-20 left-0 w-full bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xl z-40 flex flex-col p-6 space-y-3 lg:hidden divide-y divide-border/40';
        mobileMenu.innerHTML = `
            <div class="flex flex-col space-y-2 pb-3">
                <a href="/notes.html" class="px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-50 flex items-center gap-3 transition-colors">
                    📚 Notes
                </a>
                <a href="/pyqs.html" class="px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-50 flex items-center gap-3 transition-colors">
                    📝 PYQs
                </a>
                <a href="/cheat-sheets.html" class="px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-50 flex items-center gap-3 transition-colors">
                    ⚡ Cheat Sheets
                </a>
                <a href="/exam-survival.html" class="px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-50 flex items-center gap-3 transition-colors">
                    🔥 Exam Prep
                </a>
                <a href="/tools.html" class="px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-50 flex items-center gap-3 transition-colors">
                    🛠 Tools
                </a>
                <a href="/blog.html" class="px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-50 flex items-center gap-3 transition-colors">
                    ✍️ Blog
                </a>
            </div>
            <div class="pt-3 flex flex-col space-y-3">
                <a href="/dashboard.html" class="px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest text-center">
                    Dashboard
                </a>
            </div>
        `;
        nav.appendChild(mobileMenu);
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon animation
            const icon = menuBtn.querySelector('#hamburger-icon');
            if (icon) {
                if (!isExpanded) {
                    icon.innerHTML = `
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    `;
                } else {
                    icon.innerHTML = `
                        <path class="line-1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16"></path>
                        <path class="line-2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 12h16"></path>
                        <path class="line-3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 18h16"></path>
                    `;
                }
            }
        });

        // Close when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('hidden');
                const icon = menuBtn.querySelector('#hamburger-icon');
                if (icon) {
                    icon.innerHTML = `
                        <path class="line-1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16"></path>
                        <path class="line-2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 12h16"></path>
                        <path class="line-3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 18h16"></path>
                    `;
                }
            }
        });
    }
}

async function initSearch() {
    const searchInput = document.getElementById('main-search');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout)
            const query = e.target.value.trim()
            
            if (query.length < 2) {
                searchResults.classList.add('hidden')
                return
            }

            searchTimeout = setTimeout(async () => {
                try {
                    // Manual fetch for now to avoid circular deps if needed, 
                    // or just use common logic
                    const { data: notes } = await supabase
                        .from('notes')
                        .select('title, slug, subject, type')
                        .ilike('title', `%${query}%`)
                        .limit(5)
                    
                    const { data: subjects } = await supabase
                        .from('subjects')
                        .select('title, code')
                        .ilike('title', `%${query}%`)
                        .limit(3)
                    
                    if ((!notes || notes.length === 0) && (!subjects || subjects.length === 0)) {
                        searchResults.innerHTML = '<div class="p-6 text-center text-gray-500 text-sm italic">No resources found. Try another keyword.</div>'
                    } else {
                        searchResults.innerHTML = `
                            ${(subjects || []).map(s => `
                                <a href="/subject.html?sub=${encodeURIComponent(s.title)}" class="flex items-center gap-4 p-4 hover:bg-white/5 border-b border-white/5 transition-all group">
                                    <div class="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-black text-xs group-hover:scale-110 transition-transform">${s.code}</div>
                                    <div>
                                        <div class="text-sm font-bold text-white">${s.title}</div>
                                        <div class="text-[10px] text-gray-500 uppercase font-black">Subject Archive</div>
                                    </div>
                                </a>
                            `).join('')}
                            ${(notes || []).map(n => `
                                <a href="/note-viewer.html?slug=${n.slug}" class="flex items-center gap-4 p-4 hover:bg-white/5 border-b border-white/5 last:border-0 transition-all group">
                                    <div class="w-10 h-10 bg-white/5 text-gray-500 rounded-lg flex items-center justify-center text-xs group-hover:text-primary transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                    </div>
                                    <div>
                                        <div class="text-sm font-bold text-white">${n.title}</div>
                                        <div class="text-[10px] text-gray-500 uppercase font-black tracking-tight">${n.subject} • ${n.type}</div>
                                    </div>
                                </a>
                            `).join('')}
                        `
                    }
                    searchResults.classList.remove('hidden')
                } catch (e) { 
                    console.error('Search failed:', e) 
                }
            }, 300)
        })

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden')
            }
        })
    }
}

function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetId = btn.getAttribute('data-target');
            const codeBlock = document.getElementById(targetId);
            if (codeBlock) {
                const text = codeBlock.innerText;
                try {
                    await navigator.clipboard.writeText(text);
                    const originalText = btn.innerHTML;
                    btn.innerHTML = 'Copied!';
                    btn.classList.add('bg-green-600');
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('bg-green-600');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy!', err);
                }
            }
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            try {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } catch (err) {
                console.warn('Invalid selector:', href);
            }
        });
    });
}

function initActiveNavLinks() {
    const links = document.querySelectorAll('nav a, #mobile-menu a');
    const currentPath = window.location.pathname;
    
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (!linkPath) return;

        // Ignore empty/hash links, ignore trailing slash differences
        const cleanPath = currentPath.split('?')[0].split('#')[0].replace(/^\/|\/$/g, '');
        const cleanLinkPath = linkPath.split('?')[0].split('#')[0].replace(/^\/|\/$/g, '');

        if (cleanPath === cleanLinkPath && cleanPath !== '') {
            link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-black', 'relative');
            
            // Append a tiny microdot beneath the text to signify selected category
            const dot = document.createElement('span');
            dot.className = 'absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse-slow';
            link.appendChild(dot);
        }
    });
}

function initGamification() {
    const completeBtns = document.querySelectorAll('.complete-topic-btn');
    completeBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const user = await getCurrentUser();
            if (!user) {
                if (confirm('Create a free account to save your progress and earn XP! Proceed to login?')) {
                    window.location.href = '/auth.html?signup=true';
                }
            } else {
                btn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Completed & XP Earned!`;
                btn.className = 'px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 mx-auto complete-topic-btn cursor-default';
                
                const encouragements = [
                    "You're crushing it! Keep the momentum going.",
                    "Awesome work! Every step counts.",
                    "Brilliant! Another topic mastered.",
                    "Great dedication! Your future self will thank you."
                ];
                const text = encouragements[Math.floor(Math.random() * encouragements.length)];
                
                showAchievementToast('+10 Mastery XP', text);
                
                try {
                    // This is where you would increment user XP in Supabase
                    // For now we just visually alter the UI.
                } catch (e) {
                    console.error("XP Error", e);
                }
            }
        });
    });
}

/**
 * Universal Academic Navigator Widget
 * Enables instant breadcrumb backtracking, quick Hub linkage, Dashboard access
 * and an expandable mini-nav of all academic pages everywhere!
 */
function initAcademicNavigator() {
    if (document.getElementById('academic-navigator')) return;

    const navContainer = document.createElement('div');
    navContainer.id = 'academic-navigator';
    navContainer.className = 'fixed bottom-6 right-6 md:right-8 z-[999] flex flex-col items-end gap-3 font-sans print:hidden animate-fade-in-up';
    
    navContainer.innerHTML = `
        <!-- Expandable Menu -->
        <div id="academic-navigator-menu" class="hidden flex flex-col gap-1.5 bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 rounded-2xl p-4 shadow-2xl w-60 transform translate-y-4 opacity-0 transition-all duration-300">
            <h4 class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-900 pb-2 mb-1.5 flex items-center justify-between">
                <span>Academic Portal</span>
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            </h4>
            
            <div class="space-y-0.5">
                <a href="/" class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                    <span class="text-base select-none">🏠</span>
                    <span class="flex-1">Academic Hub</span>
                    <span class="text-[9px] font-mono text-slate-400/90">HOME</span>
                </a>
                <a href="/dashboard.html" class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                    <span class="text-base select-none">⚡</span>
                    <span class="flex-1">Student Dashboard</span>
                    <span class="text-[9px] font-mono text-slate-400/90">DASH</span>
                </a>
                <a href="/notes.html" class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                    <span class="text-base select-none">📚</span>
                    <span class="flex-1">Syllabus Notes PDF</span>
                    <span class="text-[9px] font-mono text-slate-400/90">NOTES</span>
                </a>
                <a href="/pyqs.html" class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                    <span class="text-base select-none">📝</span>
                    <span class="flex-1">Solved PYQs Archive</span>
                    <span class="text-[9px] font-mono text-slate-400/90">PAPERS</span>
                </a>
                <a href="/exam-survival.html" class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                    <span class="text-base select-none">🔥</span>
                    <span class="flex-1">Exam Survival Guidance</span>
                    <span class="text-[9px] font-mono text-slate-400/90">TIPS</span>
                </a>
                <a href="/ai-professor.html" class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                    <span class="text-base select-none">🤖</span>
                    <span class="flex-1">AI Professor Advisor</span>
                    <span class="text-[9px] font-mono text-slate-400/90">CHAT</span>
                </a>
            </div>
        </div>
        
        <!-- Interactive Pill Control -->
        <div class="flex items-center gap-2 bg-slate-900/95 dark:bg-slate-950/95 hover:bg-slate-900 dark:hover:bg-slate-950 border border-slate-800/80 dark:border-slate-850 rounded-full py-1.5 px-3 shadow-2xl backdrop-blur-md transition-all">
            <!-- Go Back Button -->
            <button id="academic-nav-back" style="font-family: inherit" title="Go back to history" class="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white transition-all cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            
            <span class="w-[1px] h-4 bg-slate-800"></span>
            
            <!-- Home Hub Button -->
            <a href="/" title="Go to Home Hub" class="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </a>
            
            <span class="w-[1px] h-4 bg-slate-800"></span>

            <!-- Dashboard Button -->
            <a href="/dashboard.html" title="Go to Dashboard" class="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="M16 8v8m-4-5v5m-4-2v2M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"></path></svg>
            </a>

            <span class="w-[1px] h-4 bg-slate-800"></span>

            <!-- Related Pages Menu Toggle -->
            <button id="academic-nav-menu-toggle" title="Explore Academics Menu" class="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-[10px] font-black uppercase text-slate-200 hover:text-white rounded-full transition-all cursor-pointer select-none">
                <span>Menu</span>
                <svg id="academic-nav-menu-icon" class="w-2.5 h-2.5 transition-transform duration-350" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
            </button>
        </div>
    `;

    document.body.appendChild(navContainer);

    const btnBack = navContainer.querySelector('#academic-nav-back');
    const toggleMenu = navContainer.querySelector('#academic-nav-menu-toggle');
    const menuEl = navContainer.querySelector('#academic-navigator-menu');
    const iconEl = navContainer.querySelector('#academic-nav-menu-icon');

    btnBack.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.history.length > 1 && document.referrer) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    });

    toggleMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !menuEl.classList.contains('hidden');
        if (isOpen) {
            menuEl.classList.add('translate-y-4', 'opacity-0');
            iconEl.classList.remove('rotate-180');
            setTimeout(() => {
                menuEl.classList.add('hidden');
            }, 300);
        } else {
            menuEl.classList.remove('hidden');
            setTimeout(() => {
                menuEl.classList.remove('translate-y-4', 'opacity-0');
                iconEl.classList.add('rotate-180');
            }, 10);
        }
    });

    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target)) {
            if (!menuEl.classList.contains('hidden')) {
                menuEl.classList.add('translate-y-4', 'opacity-0');
                iconEl.classList.remove('rotate-180');
                setTimeout(() => {
                    menuEl.classList.add('hidden');
                }, 300);
            }
        }
    });
}
