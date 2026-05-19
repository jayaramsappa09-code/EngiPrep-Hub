/**
 * First Year Engineering Hub – JNTUK R23
 * Core functionality
 */

import { supabase, getCurrentUser, getUserProfile } from './supabase'
import { toggleBookmark } from './notes'

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSearch();
    initCopyButtons();
    initSmoothScroll();
    initStudyPlanner();
    updateAuthUI();
});

// Theme Management
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // toggle icons inside button
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    }
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

    try {
        const user = providedUser || await getCurrentUser();
        
        const isDark = document.documentElement.classList.contains('dark') || 
                      localStorage.getItem('color-theme') === 'dark';

        const themeBtnPlaceholder = `
            <button id="theme-toggle" class="w-10 h-10 flex items-center justify-center rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all active:scale-95 mr-2">
                <svg id="theme-toggle-dark-icon" class="${isDark ? 'hidden' : ''} w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                <svg id="theme-toggle-light-icon" class="${isDark ? '' : 'hidden'} w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
        `;

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
                    <a href="/dashboard.html" class="flex items-center gap-3 p-1 pr-4 bg-slate-50 dark:bg-slate-900 border border-border rounded-xl hover:bg-slate-100 transition-all">
                        ${avatar}
                        <span class="text-[10px] font-black tracking-widest text-[#0d0d12] dark:text-white uppercase truncate max-w-[80px]">${displayName}</span>
                    </a>
                </div>
            `;
        } else {
            navActions.innerHTML = `
                <div class="flex items-center gap-4">
                    ${themeBtnPlaceholder}
                    <a href="/auth.html" class="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-blue-600 transition-colors">Login</a>
                    <a href="/auth.html?signup=true" class="btn-primary text-[10px] py-2 px-6 shadow-md shadow-blue-500/20">Join Hub</a>
                </div>
            `;
        }
        initTheme(); // Re-initialize theme toggle since we just added it to the DOM
    } catch (err) {
        // Fallback for non-configured Supabase
        navActions.innerHTML = `
            <div class="flex items-center gap-4">
                <a href="/auth.html" class="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-blue-600 transition-colors">Login</a>
                <a href="/auth.html?signup=true" class="btn-primary text-[10px] py-2 px-6 shadow-md shadow-blue-500/20">Join Hub</a>
            </div>
        `;
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
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-fade-up text-[10px] font-bold uppercase tracking-widest ring-1 ring-white/10';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
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
