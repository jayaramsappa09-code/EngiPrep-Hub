import { supabase } from './supabase.js';

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
})();

export async function enforceAuthentication() {
    const pathname = window.location.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';
    
    // Define exact protected pages
    const protectedPages = [
        'dashboard.html',
        'profile.html',
        'bookmarks.html',
        'tasks.html',
        'admin.html',
        'notifications.html',
        'ai-professor.html'
    ];
    
    const isProtected = protectedPages.some(page => filename === page);
    const isNotePage = filename.includes('unit-') || filename === 'engineering-graphics-lab.html' || filename.includes('-notes.html');
    
    const { data: { session } } = await supabase.auth.getSession();
    
    // If authenticated, just show the page
    if (session) {
        document.documentElement.style.display = '';
        return;
    }

    if (isProtected) {
        // Feature Preview Modals instead of instant redirect
        document.documentElement.style.display = '';
        showPremiumFeaturePreview(filename);
    } else if (isNotePage) {
        // Smart Partial Content Blur for guests
        document.documentElement.style.display = '';
        applySmartContentLock();
    } else {
        document.documentElement.style.display = '';
    }
}

function showPremiumFeaturePreview(filename) {
    // Inject elegant feature preview gate
    const featureMap = {
        'ai-professor.html': {
            title: '✨ AI Professor',
            desc: 'Unlock personalized AI-guided learning, instant doubts resolution, and custom explanations tailored to your syllabus.',
            perks: ['24/7 AI Tutor', 'Step-by-step problem solver']
        },
        'tasks.html': {
            title: '📚 Smart Revision Planner',
            desc: 'Track your syllabus progress, manage deadlines, and build a personalized daily study routine.',
            perks: ['Gamified Streaks', 'Custom Schedules']
        },
        'dashboard.html': {
            title: '📊 Personal Dashboard',
            desc: 'Your premium academic workspace. View completion analytics, saved notes, and unlock deep insights into your prep.',
            perks: ['Progress Analytics', 'Saved Bookmarks']
        }
    };
    
    const defaultFeature = {
        title: '🔒 Premium Access Required',
        desc: 'Join EngiPrepHub to unlock advanced tools, community features, and full academic trackers.',
        perks: ['Full Library Access', 'Exclusive Content']
    };
    
    const currentFeature = featureMap[filename] || defaultFeature;
    
    // Overwrite body with a beautiful preview overlay
    const modalHTML = `
        <div class="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-50/90 dark:bg-slate-900/95 backdrop-blur-xl p-4">
            <div class="max-w-lg w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl text-center transform transition-all">
                <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-2">${currentFeature.title}</h2>
                <p class="text-slate-600 dark:text-slate-400 font-medium mb-8">${currentFeature.desc}</p>
                <div class="flex flex-col gap-3">
                    <a href="/auth.html?redirect=${encodeURIComponent(window.location.pathname)}" class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">Create Free Account</a>
                    <a href="/" class="w-full py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors">Return to Directory</a>
                </div>
            </div>
        </div>
    `;
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML;
    document.body.appendChild(wrapper.firstElementChild);
    document.body.style.overflow = 'hidden';
}

function applySmartContentLock() {
    // Wait for content to render slightly
    setTimeout(() => {
        // Find main sections or headings
        const sections = Array.from(document.querySelectorAll('section, .note-section'));
        if (sections.length < 3) return; // Not enough content to split lock

        // Calculate index where we slice (roughly 30-35% in)
        const cutoffIdx = Math.max(1, Math.floor(sections.length * 0.35));
        
        let blurWrapper = document.createElement('div');
        blurWrapper.className = "relative";
        
        const lockedContainer = document.createElement('div');
        lockedContainer.className = "select-none pb-32 blur-[6px] opacity-40 pointer-events-none transition-all duration-1000";
        
        let targetParent = sections[cutoffIdx].parentNode;
        
        sections.slice(cutoffIdx).forEach(sec => {
            lockedContainer.appendChild(sec.cloneNode(true));
            sec.remove();
        });
        
        blurWrapper.appendChild(lockedContainer);
        
        // Premium lock CTA
        const lockCTA = document.createElement('div');
        lockCTA.className = "absolute top-10 left-0 right-0 z-10 flex justify-center w-full px-4";
        lockCTA.innerHTML = `
            <div class="max-w-xl w-full bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl text-center">
                <div class="inline-flex py-1 px-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
                    Guest Preview Limit
                </div>
                <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3">Continue Learning on EngiPrepHub</h3>
                <p class="text-slate-500 dark:text-slate-400 font-medium text-sm mb-6">
                    You've unlocked the topic introduction and visual explanations. Create a free account to access complete notes, PYQ solutions, AI tools, and interactive simulations.
                </p>
                <a href="/auth.html?redirect=${encodeURIComponent(window.location.pathname)}" class="inline-block w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-transform hover:scale-105">
                    Continue For Free
                </a>
                <p class="mt-4 text-[10px] text-slate-400 uppercase font-black tracking-widest">Takes exactly 12 seconds</p>
            </div>
        `;
        
        blurWrapper.appendChild(lockCTA);
        targetParent.appendChild(blurWrapper);
        
    }, 500); // 500ms delay to let dynamic JS (markdown/katex) render before picking up nodes
}

enforceAuthentication();

