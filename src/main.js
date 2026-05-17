/**
 * First Year Engineering Hub – JNTUK R23
 * Core functionality
 */

import { supabase } from './supabase'
import { toggleBookmark } from './notes'

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSearch();
    initCopyButtons();
    initSmoothScroll();
    initStudyPlanner();
    updateAuthUI();
});

// Sync UI on auth changes
supabase.auth.onAuthStateChange((event, session) => {
    updateAuthUI();
});

async function updateAuthUI() {
    const navActions = document.getElementById('nav-actions');
    if (!navActions) return;

    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            navActions.innerHTML = `
                <div class="flex items-center gap-4">
                    <a href="/bookmarks.html" class="hidden sm:block text-xs font-bold hover:text-primary transition-colors">Bookmarks</a>
                    <a href="/dashboard.html" class="btn-primary text-xs py-2 px-4 shadow-lg shadow-primary/20">Dashboard</a>
                </div>
            `;
        } else {
            navActions.innerHTML = `
                <a href="/auth.html" class="text-xs font-bold hover:text-primary transition-colors">Login</a>
                <a href="/auth.html?signup=true" class="btn-primary text-xs py-2 px-4">Join Hub</a>
            `;
        }
    } catch (err) {
        // Fallback for non-configured Supabase
        navActions.innerHTML = `
            <a href="/auth.html" class="text-xs font-bold hover:text-primary transition-colors">Login</a>
            <a href="/auth.html?signup=true" class="btn-primary text-xs py-2 px-4">Join Hub</a>
        `;
    }
}

async function initStudyPlanner() {
    const plannerList = document.getElementById('planner-list');
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    
    const { data: { user } } = await supabase.auth.getUser();

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
    toast.className = 'fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-fadeIn';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
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
        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }

            // Fetch from database
            const { data: notes } = await supabase
                .from('notes')
                .select('title, slug, subject')
                .ilike('title', `%${query}%`)
                .limit(5);

            const results = notes || [];

            if (results.length > 0) {
                searchResults.innerHTML = results.map(item => `
                    <a href="/note-viewer.html?slug=${item.slug}" class="block p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 border-l-2 border-l-transparent hover:border-l-primary">
                        <div class="text-sm font-bold text-white">${item.title}</div>
                        <div class="text-[10px] text-gray-500 uppercase tracking-widest">${item.subject}</div>
                    </a>
                `).join('');
                searchResults.classList.remove('hidden');
            } else {
                searchResults.innerHTML = '<div class="p-4 text-gray-500 text-xs italic">No matching notes found</div>';
                searchResults.classList.remove('hidden');
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
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
