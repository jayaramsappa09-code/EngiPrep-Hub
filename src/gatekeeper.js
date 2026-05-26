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
    const isNotePage = filename.includes('unit-') || 
                       filename.includes('-unit') || 
                       filename === 'engineering-graphics-lab.html' || 
                       filename.includes('-notes.html') ||
                       (filename.includes('mathematics') && filename.endsWith('.html')) ||
                       (filename.includes('physics') && filename.endsWith('.html')) ||
                       (filename.includes('chemistry') && filename.endsWith('.html'));
    
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
        <div class="fixed inset-0 z-[99999] flex items-center justify-center bg-[#F8FAFC]/95 backdrop-blur-xl p-4">
            <div class="max-w-lg w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-[24px] p-8 shadow-2xl text-center shadow-black/5 transform transition-all">
                <div class="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-7 h-7 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h2 class="text-[24px] font-black text-[#0F172A] mb-3 tracking-tight font-['Space_Grotesk']">${currentFeature.title}</h2>
                <p class="text-[#475569] leading-relaxed text-[15px] font-medium mb-8">${currentFeature.desc}</p>
                <div class="flex flex-col gap-3">
                    <a href="/auth.html?redirect=${encodeURIComponent(window.location.pathname)}" class="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] font-bold transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5">Create Free Account</a>
                    <a href="/" class="w-full py-3 text-[#64748B] hover:text-[#0F172A] font-bold transition-colors">Return to Directory</a>
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
            <div class="max-w-xl w-full bg-[#FFFFFF] border border-[#E2E8F0] p-8 rounded-[24px] shadow-2xl text-center shadow-black/5">
                <div class="inline-flex py-1 px-3 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[11px] font-black uppercase tracking-widest mb-4">
                    Guest Preview Limit
                </div>
                <h3 class="text-[20px] md:text-[24px] font-black text-[#0F172A] mb-3 leading-tight tracking-tight mt-2 font-['Space_Grotesk']">Continue Learning on EngiPrepHub</h3>
                <p class="text-[#475569] font-medium text-[15px] mb-8 leading-relaxed max-w-sm mx-auto">
                    You've unlocked the topic introduction and visual explanations. Create a free account to access complete notes, PYQ solutions, AI tools, and interactive simulations.
                </p>
                <a href="/auth.html?redirect=${encodeURIComponent(window.location.pathname)}" class="inline-block w-full sm:w-auto px-8 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                    Continue For Free
                </a>
                <p class="mt-5 text-[10px] text-[#64748B] font-bold uppercase tracking-widest">Secure • Subject Aligned • Guaranteed Exam Focus</p>
            </div>
        `;
        
        blurWrapper.appendChild(lockCTA);
        targetParent.appendChild(blurWrapper);
        
    }, 500); // 500ms delay to let dynamic JS (markdown/katex) render before picking up nodes
}

enforceAuthentication();

