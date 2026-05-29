/**
 * First Year Engineering Hub – JNTUK R23
 * Core functionality
 */

import { supabase, getCurrentUser, getUserProfile } from './supabase'
import { toggleBookmark } from './notes'
import { toast, showEncouragingToast, showSuccessToast, showAchievementToast } from './utils/toast'

// Inject dynamic CSS fallback rules for overlays when loaded on pages without Tailwind CSS
(function() {
    if (typeof document === 'undefined') return;
    const styleId = 'engiprephub-dynamic-overlays';
    if (document.getElementById(styleId)) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
        #academic-navigator, .engiprep-canvas-fallback {
            position: fixed !important;
            bottom: 24px !important;
            right: 24px !important;
            z-index: 9999 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-end !important;
            gap: 12px !important;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            pointer-events: auto !important;
        }
        @media (min-width: 768px) {
            #academic-navigator {
                right: 32px !important;
            }
        }
        #academic-navigator svg, 
        #live-activity-host svg, 
        #cookie-consent-banner svg {
            width: 16px !important;
            height: 16px !important;
            display: inline-block !important;
            vertical-align: middle !important;
        }
        #academic-navigator .w-2\\.5 {
            width: 10px !important;
            height: 10px !important;
        }
        #academic-nav-control-pill {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            background-color: rgb(15 23 42 / 95%) !important;
            border: 1px solid rgb(30 41 59) !important;
            padding: 6px 12px !important;
            border-radius: 9999px !important;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.3) !important;
        }
        .dark #academic-nav-control-pill {
            background-color: rgb(3 7 18 / 95%) !important;
        }
        #academic-nav-control-pill button,
        #academic-nav-control-pill a {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
            min-height: 32px !important;
            border-radius: 9999px !important;
            background-color: rgb(30 41 59) !important;
            color: rgb(203 213 225) !important;
            border: none !important;
            text-decoration: none !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            padding: 0 !important;
        }
        #academic-nav-control-pill button:hover,
        #academic-nav-control-pill a:hover {
            background-color: rgb(51 65 85) !important;
            color: #ffffff !important;
        }
        #academic-nav-control-pill .bg-gradient-to-r {
            background-image: linear-gradient(to right, rgb(37 99 235), rgb(79 70 229)) !important;
            color: #ffffff !important;
        }
        #academic-nav-control-pill .bg-gradient-to-r:hover {
            background-image: linear-gradient(to right, rgb(59 130 246), rgb(99 102 241)) !important;
        }
        #academic-nav-control-pill .w-\\[1px\\] {
            width: 1px !important;
            height: 16px !important;
            background-color: rgb(51 65 85) !important;
            display: inline-block !important;
        }
        #academic-nav-menu-toggle {
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
            padding: 4px 12px !important;
            background-color: rgb(30 41 59) !important;
            color: rgb(226 232 240) !important;
            font-size: 10px !important;
            font-weight: 900 !important;
            border-radius: 9999px !important;
            text-transform: uppercase !important;
            width: auto !important;
            height: 28px !important;
            cursor: pointer !important;
            border: none !important;
        }
        #academic-navigator-menu {
            background-color: #ffffff !important;
            border: 1px solid rgb(226 232 240) !important;
            border-radius: 16px !important;
            padding: 16px !important;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1) !important;
            width: 240px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
            transform: translateY(16px);
            opacity: 0;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .dark #academic-navigator-menu {
            background-color: rgb(3 7 18) !important;
            border-color: rgb(30 41 59) !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
        }
        #academic-navigator-menu.hidden {
            display: none !important;
        }
        #academic-navigator-menu:not(.hidden) {
            transform: translateY(0) !important;
            opacity: 1 !important;
        }
        #academic-navigator-menu h4 {
            font-size: 10px !important;
            font-weight: 900 !important;
            color: rgb(148 163 184) !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
            border-bottom: 1px solid rgb(241 245 249) !important;
            padding-bottom: 8px !important;
            margin-bottom: 6px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
        }
        .dark #academic-navigator-menu h4 {
            border-color: rgb(30 41 59) !important;
            color: rgb(100 116 139) !important;
        }
        #academic-navigator-menu a {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 8px 12px !important;
            border-radius: 12px !important;
            text-decoration: none !important;
            color: rgb(71 85 105) !important;
            font-size: 12px !important;
            font-weight: 800 !important;
            transition: all 0.2s ease !important;
        }
        .dark #academic-navigator-menu a {
            color: rgb(203 213 225) !important;
        }
        #academic-navigator-menu a:hover {
            background-color: rgb(248 250 252) !important;
            color: rgb(15 23 42) !important;
        }
        .dark #academic-navigator-menu a:hover {
            background-color: rgb(22 28 45) !important;
            color: #ffffff !important;
        }
        #academic-navigator-menu a span.text-base {
            font-size: 16px !important;
        }
        #academic-navigator-menu a span.text-\[9px\] {
            font-size: 9px !important;
            font-family: inherit !important;
            color: rgb(148 163 184) !important;
            margin-left: auto !important;
        }
        #live-activity-host {
            position: fixed !important;
            bottom: 24px !important;
            left: 24px !important;
            z-index: 9998 !important;
            max-width: 340px !important;
            pointer-events: none !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        }
        #live-activity-host > div {
            pointer-events: auto !important;
            display: flex !important;
            align-items: flex-start !important;
            gap: 12px !important;
            background-color: rgb(255 255 255 / 95%) !important;
            border: 1px solid rgb(226 232 240) !important;
            padding: 16px !important;
            border-radius: 16px !important;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08) !important;
            transform: translateY(32px);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .dark #live-activity-host > div {
            background-color: rgb(15 23 42 / 95%) !important;
            border-color: rgb(30 41 59) !important;
        }
        #live-activity-host > div:not(.translate-y-8):not(.opacity-0) {
            transform: translateY(0) !important;
            opacity: 1 !important;
        }
        #live-activity-host button {
            background: transparent !important;
            border: none !important;
            padding: 4px !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            border-radius: 8px !important;
        }
        #live-activity-host button:hover {
            background-color: rgb(241 245 249) !important;
        }
        .dark #live-activity-host button:hover {
            background-color: rgb(30 41 59) !important;
        }
        #live-activity-host span.tracking-wider {
            font-size: 9px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            padding: 2px 6px !important;
            border-radius: 6px !important;
            background-color: rgb(239 246 255) !important;
            color: rgb(37 99 235) !important;
            display: inline-block !important;
        }
        .dark #live-activity-host span.tracking-wider {
            background-color: rgb(30 41 59) !important;
            color: rgb(96 165 250) !important;
        }
        #live-activity-host span.tracking-widest {
            font-size: 10px !important;
            font-weight: 800 !important;
            color: rgb(148 163 184) !important;
            letter-spacing: 1.5px !important;
        }
        #live-activity-host p {
            font-size: 11px !important;
            line-height: 1.5 !important;
            color: rgb(71 85 105) !important;
            margin-top: 4px !important;
        }
        .dark #live-activity-host p {
            color: rgb(203 213 225) !important;
        }
        #live-activity-host strong {
            color: rgb(15 23 42) !important;
            font-weight: 800 !important;
        }
        .dark #live-activity-host strong {
            color: #ffffff !important;
        }
        #cookie-consent-banner {
            position: fixed !important;
            bottom: 16px !important;
            right: 16px !important;
            left: 16px !important;
            z-index: 99999 !important;
            padding: 20px !important;
            border-radius: 16px !important;
            background-color: #ffffff !important;
            border: 1px solid rgb(226 232 240) !important;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15) !important;
            transition: all 0.3s ease !important;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        }
        .dark #cookie-consent-banner {
            background-color: rgb(15 23 42) !important;
            border-color: rgb(30 41 59) !important;
        }
        @media (min-width: 768px) {
            #cookie-consent-banner {
                left: auto !important;
                width: 380px !important;
                right: 16px !important;
            }
        }
    `;
    document.head.appendChild(styleEl);
})();

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

function initBreadcrumbs() {
    const fn = window.location.pathname;
    const isEducationalPage = fn.includes('unit-') || fn.includes('notes') || fn.includes('pyq') || fn.includes('cheat-sheet');
    if (!isEducationalPage) return;

    if (document.getElementById('eeat-breadcrumbs')) return;

    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;

    let pageTitle = document.querySelector('h1')?.innerText || 'Academic Notes';
    let subject = "Engineering Resources";
    
    if (fn.includes('physics')) subject = "Physics";
    if (fn.includes('chemistry')) subject = "Chemistry";
    if (fn.includes('mathematics') || fn.includes('maths')) subject = "Mathematics";
    if (fn.includes('programming') || fn.includes('c-fundamentals')) subject = "Programming";
    if (fn.includes('electrical') || fn.includes('beee')) subject = "Electrical Engineering";

    const breadcrumb = document.createElement('nav');
    breadcrumb.id = 'eeat-breadcrumbs';
    breadcrumb.className = 'mb-6 md:mb-8 flex items-center text-[12px] font-medium text-[#64748B] dark:text-slate-500 overflow-x-auto whitespace-nowrap pb-2';
    breadcrumb.innerHTML = `
        <a href="/" class="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors">Home</a>
        <span class="mx-2 text-[#E2E8F0] dark:text-slate-700">/</span>
        <a href="/semester-1.html" class="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors">Semester 1</a>
        <span class="mx-2 text-[#E2E8F0] dark:text-slate-700">/</span>
        <span class="text-[#475569] dark:text-slate-300 font-semibold">${subject}</span>
        <span class="mx-2 text-[#E2E8F0] dark:text-slate-700">/</span>
        <span class="text-[#0F172A] dark:text-white font-bold truncate max-w-[200px] sm:max-w-none">${pageTitle}</span>
    `;

    mainContainer.prepend(breadcrumb);
}

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
    initLiveActivities();
    initBreadcrumbs();
    initAuthorBox();
    
    // Core Link and Navigation Repair systems (Phases 3, 4, 5, 6, 7 & 10)
    repairAndCanonicalizeLinks();
    applyIntelligentTextLinks();
    setupStudyCompanionPanel();
});

// 1. Client-Side Link Repair and Canonicalization (Phase 4 & Phase 10)
function repairAndCanonicalizeLinks() {
    document.querySelectorAll('a').forEach(anchor => {
        let href = anchor.getAttribute('href');
        if (!href) return;
        
        // Convert old subject.html?sub=X path links to canonical SEO-friendly URLs on the fly
        if (href.includes('subject.html?')) {
            try {
                const urlObj = new URL(href, window.location.origin);
                const sub = (urlObj.searchParams.get('sub') || urlObj.searchParams.get('slug') || '').toLowerCase();
                if (sub) {
                    if (sub.includes('physics')) href = '/engineering-physics';
                    else if (sub.includes('chemistry')) href = '/engineering-chemistry';
                    else if (sub.includes('mathematics-2') || sub === 'm2' || sub.includes('maths-2') || sub.includes('maths ii')) href = '/engineering-mathematics-2';
                    else if (sub.includes('mathematics') || sub === 'm1' || sub.includes('maths i') || sub.includes('maths 1')) href = '/engineering-mathematics';
                    else if (sub.includes('graphics') || sub === 'eg' || sub.includes('engineering graphics')) href = '/engineering-graphics';
                    else if (sub.includes('english') || sub.includes('communicative')) href = '/communicative-english';
                    else if (sub.includes('electrical') || sub === 'beee' || sub.includes('basic electrical')) href = '/basic-electrical-engineering';
                    else if (sub.includes('c programming') || sub.includes('pps')) href = '/c-programming';
                    else if (sub.includes('data structure')) href = '/data-structures';
                    else if (sub.includes('civil') || sub.includes('mechanical') || sub.includes('bcme')) href = '/basic-civil-and-mechanical-engineering';
                }
            } catch(e) {}
        }
        
        // Convert old note-viewer.html?subject=X&unit=Y path links to canonical SEO-friendly URLs on the fly
        if (href.includes('note-viewer.html?')) {
            try {
                const urlObj = new URL(href, window.location.origin);
                const subject = (urlObj.searchParams.get('subject') || urlObj.searchParams.get('sub') || '').toLowerCase();
                const unit = urlObj.searchParams.get('unit');
                const slug = urlObj.searchParams.get('slug');
                
                if (subject && unit) {
                    let prefix = '';
                    if (subject.includes('physics')) prefix = 'engineering-physics';
                    else if (subject.includes('chemistry')) prefix = 'engineering-chemistry';
                    else if (subject.includes('mathematics') || subject === 'm1' || subject.includes('math')) prefix = 'engineering-mathematics';
                    else if (subject.includes('c programming') || subject.includes('pps')) prefix = 'c-programming';
                    else if (subject.includes('electrical') || subject.includes('beee')) prefix = 'basic-electrical-engineering';
                    else if (subject.includes('civil') || subject.includes('mechanical')) prefix = 'basic-civil-and-mechanical-engineering';
                    else if (subject.includes('english') || subject.includes('communicative')) prefix = 'communicative-english';
                    else if (subject.includes('data structure')) prefix = 'data-structures';
                    
                    if (prefix) {
                        href = `/${prefix}-unit-${unit}`;
                    }
                } else if (slug) {
                    if (slug.startsWith('m1-')) href = '/engineering-mathematics-unit-1';
                    else if (slug.startsWith('physics-')) href = '/engineering-physics-unit-1';
                    else if (slug.startsWith('chemistry-')) href = '/engineering-chemistry-unit-1';
                    else if (slug.startsWith('c-')) href = '/c-programming-unit-1';
                }
            } catch(e) {}
        }
        
        // Convert raw file extensions endpoints (.html)
        if (href.endsWith('.html') || href.includes('.html?')) {
            const urlParts = href.split('?');
            let pathPart = urlParts[0];
            const params = urlParts[1] || '';
            const filename = pathPart.substring(pathPart.lastIndexOf('/') + 1);
            
            const fileMappings = {
                'index.html': '/',
                'physics-notes.html': '/engineering-physics',
                'chemistry-topper-notes.html': '/engineering-chemistry',
                'maths-1.html': '/engineering-mathematics',
                'engineering-mathematics-2.html': '/engineering-mathematics-2',
                'engineering-graphics-lab.html': '/engineering-graphics',
                'communicative-english.html': '/communicative-english',
                'beee-notes.html': '/basic-electrical-engineering',
                'c-programming-notes.html': '/c-programming',
                'data-structures-basics.html': '/data-structures',
                'basic-civil-mechanical-engineering.html': '/basic-civil-and-mechanical-engineering',
                'dashboard.html': '/dashboard',
                'profile.html': '/profile',
                'about.html': '/about',
                'contact.html': '/contact',
                'bookmarks.html': '/bookmarks',
                'quiz.html': '/quiz',
                'tasks.html': '/tasks',
                'notifications.html': '/notifications',
                'blog.html': '/blog',
                'blogs.html': '/blog',
                'pyqs.html': '/pyqs',
                'cheat-sheets.html': '/c-programming-cheat-sheet'
            };
            
            if (fileMappings[filename]) {
                href = fileMappings[filename];
                if (params) href += '?' + params;
            } else if (filename.endsWith('-unit-1.html') || filename.endsWith('-unit-2.html') || filename.endsWith('-unit-3.html') || filename.endsWith('-unit-4.html') || filename.endsWith('-unit-5.html')) {
                let name = filename.replace('.html', '');
                if (name.startsWith('chemistry-unit-')) {
                    name = name.replace('chemistry-unit-', 'engineering-chemistry-unit-');
                }
                href = '/' + name;
                if (params) href += '?' + params;
            }
        }
        
        anchor.setAttribute('href', href);
    });
}

// 2. Intelligent Text URL Linker Node Walker (Phase 3)
function applyIntelligentTextLinks() {
    const textMatchingRules = [
        { pattern: /\bEngineering Mathematics Unit ([1-5])\b/gi, url: '/engineering-mathematics-unit-$1' },
        { pattern: /\bEngineering Mathematics I Unit ([1-5])\b/gi, url: '/engineering-mathematics-unit-$1' },
        { pattern: /\bM1 Unit ([1-5])\b/gi, url: '/engineering-mathematics-unit-$1' },
        { pattern: /\bMathematics Unit ([1-5])\b/gi, url: '/engineering-mathematics-unit-$1' },
        { pattern: /\bChemistry Unit ([1-5])\b/gi, url: '/engineering-chemistry-unit-$1' },
        { pattern: /\bEngineering Chemistry Unit ([1-5])\b/gi, url: '/engineering-chemistry-unit-$1' },
        { pattern: /\bEngineering Physics Unit ([1-5])\b/gi, url: '/engineering-physics-unit-$1' },
        { pattern: /\bPhysics Unit ([1-5])\b/gi, url: '/engineering-physics-unit-$1' },
        { pattern: /\bC Programming Unit ([1-5])\b/gi, url: '/c-programming-unit-$1' },
        { pattern: /\bC Unit ([1-5])\b/gi, url: '/c-programming-unit-$1' },
        { pattern: /\bBasic Electrical Engineering Unit ([1-5])\b/gi, url: '/basic-electrical-engineering-unit-$1' },
        { pattern: /\bBEEE Unit ([1-5])\b/gi, url: '/basic-electrical-engineering-unit-$1' },
        { pattern: /\bBasic Civil and Mechanical Engineering Unit ([1-5])\b/gi, url: '/basic-civil-and-mechanical-engineering-unit-$1' },
        { pattern: /\bBCME Unit ([1-5])\b/gi, url: '/basic-civil-and-mechanical-engineering-unit-$1' },
        { pattern: /\bCommunicative English Unit ([1-5])\b/gi, url: '/communicative-english-unit-$1' },
        { pattern: /\bEnglish Unit ([1-5])\b/gi, url: '/communicative-english-unit-$1' },
        { pattern: /\bData Structures Unit ([1-5])\b/gi, url: '/data-structures-unit-$1' },
        { pattern: /\bDS Unit ([1-5])\b/gi, url: '/data-structures-unit-$1' },
        
        { pattern: /\bEngineering Mathematics I\b/gi, url: '/engineering-mathematics' },
        { pattern: /\bEngineering Mathematics II\b/gi, url: '/engineering-mathematics-2' },
        { pattern: /\bEngineering Physics\b/gi, url: '/engineering-physics' },
        { pattern: /\bApplied Physics\b/gi, url: '/engineering-physics' },
        { pattern: /\bEngineering Chemistry\b/gi, url: '/engineering-chemistry' },
        { pattern: /\bC Programming\b/gi, url: '/c-programming' },
        { pattern: /\bBasic Electrical Engineering\b/gi, url: '/basic-electrical-engineering' },
        { pattern: /\bBasic Civil and Mechanical Engineering\b/gi, url: '/basic-civil-and-mechanical-engineering' },
        { pattern: /\bCommunicative English\b/gi, url: '/communicative-english' },
        { pattern: /\bData Structures\b/gi, url: '/data-structures' },
        { pattern: /\bEngineering Graphics\b/gi, url: '/engineering-graphics' }
    ];

    const skipElements = new Set(['A', 'BUTTON', 'SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'CODE', 'PRE', 'NOSCRIPT']);
    
    function walk(node) {
        if (!node) return;
        if (skipElements.has(node.nodeName)) return;
        
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            let replaced = false;
            let parent = node.parentNode;
            
            if (parent && (skipElements.has(parent.nodeName) || parent.classList.contains('auto-linked'))) return;
            
            for (const rule of textMatchingRules) {
                if (rule.pattern.test(text)) {
                    rule.pattern.lastIndex = 0;
                    
                    const span = document.createElement('span');
                    span.className = 'auto-linked-container';
                    
                    const htmlContent = text.replace(rule.pattern, (match, unitNum) => {
                        let finalUrl = rule.url;
                        if (unitNum) {
                            finalUrl = finalUrl.replace('$1', unitNum);
                        }
                        return `<a href="${finalUrl}" class="auto-linked text-blue-600 dark:text-blue-400 hover:underline font-semibold" style="cursor: pointer;">${match}</a>`;
                    });
                    
                    span.innerHTML = htmlContent;
                    parent.replaceChild(span, node);
                    replaced = true;
                    break;
                }
            }
            if (replaced) return;
        } else {
            const children = Array.from(node.childNodes);
            for (const child of children) {
                walk(child);
            }
        }
    }
    
    const contentContainers = document.querySelectorAll('main, #notes-view, #notes-content, .note-body, article, .text-slate-300');
    if (contentContainers.length > 0) {
        contentContainers.forEach(container => walk(container));
    } else {
        const containers = document.querySelectorAll('body > div, body > section');
        containers.forEach(container => {
            if (container.id !== 'navbar' && container.id !== 'footer') {
                walk(container);
            }
        });
    }
}

// 3. Subject and Unit Resolver for Active Page Content (Phase 6 & 7)
function getPageSubjectAndUnit() {
    const path = window.location.pathname.toLowerCase();
    const title = document.title.toLowerCase();
    
    let subject = '';
    let subjectUrl = '';
    let unitNum = 0;
    
    if (path.includes('physics') || title.includes('physics')) {
        subject = 'Engineering Physics';
        subjectUrl = '/engineering-physics';
    } else if (path.includes('chemistry') || title.includes('chemistry')) {
        subject = 'Engineering Chemistry';
        subjectUrl = '/engineering-chemistry';
    } else if (path.includes('mathematics-2') || title.includes('mathematics ii') || title.includes('maths-2') || title.includes('maths ii')) {
        subject = 'Engineering Mathematics II';
        subjectUrl = '/engineering-mathematics-2';
    } else if (path.includes('mathematics') || title.includes('mathematics') || path.includes('maths') || title.includes('maths')) {
        subject = 'Engineering Mathematics I';
        subjectUrl = '/engineering-mathematics';
    } else if (path.includes('c-programming') || title.includes('c programming') || path.includes('pps') || title.includes('pps')) {
        subject = 'PPS C Programming';
        subjectUrl = '/c-programming';
    } else if (path.includes('electrical') || title.includes('electrical') || path.includes('beee') || title.includes('beee')) {
        subject = 'Basic Electrical Engineering';
        subjectUrl = '/basic-electrical-engineering';
    } else if (path.includes('civil') || title.includes('civil') || path.includes('mechanical') || title.includes('mechanical') || path.includes('bcme') || title.includes('bcme')) {
        subject = 'Basic Civil and Mechanical Engineering';
        subjectUrl = '/basic-civil-and-mechanical-engineering';
    } else if (path.includes('english') || title.includes('english') || title.includes('communicative english')) {
        subject = 'Communicative English';
        subjectUrl = '/communicative-english';
    } else if (path.includes('data-structure') || title.includes('data structure') || path.includes('dsa') || title.includes('dsa')) {
        subject = 'Data Structures';
        subjectUrl = '/data-structures';
    }
    
    const unitMatch = path.match(/unit-([1-5])/i) || title.match(/unit\s*([1-5])/i);
    if (unitMatch) {
        unitNum = parseInt(unitMatch[1]);
    }
    
    return { subject, subjectUrl, unitNum };
}

// 4. Interactive Floating Study Companion Resources Panel (Phase 5, 6, 7 & 11)
function setupStudyCompanionPanel() {
    const { subject, subjectUrl, unitNum } = getPageSubjectAndUnit();
    if (!subject || unitNum === 0) return;
    
    if (document.getElementById('study-companion-panel')) return;
    
    const companion = document.createElement('div');
    companion.id = 'study-companion-panel';
    companion.className = 'fixed bottom-24 right-6 z-[9990] max-w-sm w-80 bg-slate-900/95 dark:bg-slate-950/95 border border-slate-800 rounded-3xl shadow-2xl p-5 text-white transform translate-y-4 opacity-0 transition-all duration-500 font-sans text-xs flex flex-col gap-4';
    companion.style.pointerEvents = 'auto';
    
    let slugPrefix = 'engineering-physics';
    if (subject.includes('chemistry')) slugPrefix = 'engineering-chemistry';
    else if (subject.includes('mathematics-2') || subject.includes('mathematics ii')) slugPrefix = 'engineering-mathematics-2';
    else if (subject.includes('mathematics')) slugPrefix = 'engineering-mathematics';
    else if (subject.includes('c-programming') || subject.includes('pps')) slugPrefix = 'c-programming';
    else if (subject.includes('electrical') || subject.includes('beee')) slugPrefix = 'basic-electrical-engineering';
    else if (subject.includes('civil') || subject.includes('mechanical') || subject.includes('bcme')) slugPrefix = 'basic-civil-and-mechanical-engineering';
    else if (subject.includes('english') || subject.includes('communicative')) slugPrefix = 'communicative-english';
    else if (subject.includes('data-structure') || subject.includes('dsa')) slugPrefix = 'data-structures';
    
    const prevUnitUrl = unitNum > 1 ? `/${slugPrefix}-unit-${unitNum - 1}` : subjectUrl;
    const nextUnitUrl = unitNum < 5 ? `/${slugPrefix}-unit-${unitNum + 1}` : '/pyqs';
    
    const relatedUnits = [];
    for (let u = 1; u <= 5; u++) {
        if (u === unitNum) continue;
        const matchedRoute = GLOBAL_SEARCH_INDEX.find(r => r.subtitle.includes(subject) && r.subtitle.includes(`Unit ${u}`));
        const topicName = matchedRoute ? matchedRoute.title : `Syllabus Unit ${u}`;
        relatedUnits.push({
            num: u,
            title: topicName,
            url: `/${slugPrefix}-unit-${u}`
        });
    }
    
    companion.innerHTML = `
        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
                <span class="text-[9px] font-black uppercase text-blue-400 tracking-widest pl-0.5">Study Companion</span>
                <h4 class="text-xs font-bold text-slate-100 truncate max-w-[170px]">${subject}</h4>
            </div>
            <div class="flex gap-1.5">
                <button id="minimize-companion-btn" class="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors text-slate-300 hover:text-white cursor-pointer select-none border-0">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5"></path></svg>
                </button>
            </div>
        </div>
        
        <div class="flex flex-col gap-3.5" id="companion-content-body">
            <div class="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/10 rounded-2xl p-3 flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-blue-500 text-white font-black text-xs flex items-center justify-center">U${unitNum}</div>
                <div>
                     <div class="text-[9px] uppercase font-black text-blue-400 tracking-tight">Active Learning Unit</div>
                     <div class="font-bold text-slate-100 italic" id="active-unit-title">Loading unit topic...</div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
                <button id="companion-bookmark-btn" class="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-bold cursor-pointer select-none text-slate-200 border-0">
                    <svg class="w-3.5 h-3.5 text-yellow-500" id="bookmark-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    <span>Save Note</span>
                </button>
                <button id="companion-share-btn" class="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-bold cursor-pointer select-none text-slate-200 border-0">
                    <svg class="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                    <span>Share Note</span>
                </button>
            </div>
            
            <div class="flex justify-between items-center gap-2 bg-slate-800/30 p-2 rounded-xl">
                <a href="${prevUnitUrl}" class="flex items-center gap-1 hover:text-blue-400 transition-colors font-semibold py-1 px-2.5 bg-slate-800 rounded-lg no-underline text-white">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span>Prev</span>
                </a>
                <a href="${subjectUrl}" class="text-[10px] text-slate-400 hover:text-white uppercase font-black no-underline pl-0.5">Subject Hub</a>
                <a href="${nextUnitUrl}" class="flex items-center gap-1 hover:text-blue-400 transition-colors font-semibold py-1 px-2.5 bg-slate-800 rounded-lg no-underline text-white">
                    <span>Next</span>
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </div>
            
            <div class="space-y-1.5">
                <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Related Syllabus Units</div>
                <div class="flex flex-col gap-1 max-h-24 overflow-y-auto pr-1">
                    ${relatedUnits.map(ru => `
                        <a href="${ru.url}" class="flex items-center gap-2 p-1.5 hover:bg-slate-800/80 rounded-lg text-[11px] hover:text-blue-400 transition-colors no-underline text-slate-300">
                            <span class="w-4 h-4 rounded-md bg-slate-800 text-[9px] font-black flex items-center justify-center text-slate-400">U${ru.num}</span>
                            <span class="truncate pr-1">${ru.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>

            <div class="border-t border-slate-800 pt-2.5 flex justify-end gap-3 text-[10px] font-semibold text-slate-400">
                <a href="/pyqs" class="hover:text-blue-400 flex items-center gap-1 no-underline text-slate-400">
                    <svg class="w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253"/></svg>
                    <span>Related PYQs</span>
                </a>
                <a href="${subject.includes('Programming') || subject.includes('Mathematics') ? '/c-programming-cheat-sheet' : '/tools.html'}" class="hover:text-blue-400 flex items-center gap-1 no-underline text-slate-400">
                    <svg class="w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    <span>Cheat Sheet</span>
                </a>
            </div>
        </div>
        
        <button id="companion-minimized-bubble" class="absolute inset-0 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center font-bold text-xs shadow-xl min-w-10 min-h-10 cursor-pointer select-none text-white hidden border-0">
            <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253"/></svg>
        </button>
    `;
    
    document.body.appendChild(companion);
    
    setTimeout(() => {
        companion.classList.remove('translate-y-4', 'opacity-0');
    }, 150);
    
    const matchingUnitRoute = GLOBAL_SEARCH_INDEX.find(r => r.subtitle.includes(subject) && r.subtitle.includes(`Unit ${unitNum}`));
    if (matchingUnitRoute) {
        document.getElementById('active-unit-title').innerText = matchingUnitRoute.title;
    } else {
        document.getElementById('active-unit-title').innerText = 'JNTUK Syllabus Unit Topic';
    }
    
    const isBookmarked = () => {
        const saved = JSON.parse(localStorage.getItem('studyPlanner')) || [];
        return saved.some(i => i.id === `${slugPrefix}_u${unitNum}`);
    };
    
    const updateBookmarkButtonState = () => {
        const pathHeart = document.getElementById('bookmark-heart');
        const btnText = document.querySelector('#companion-bookmark-btn span');
        if (isBookmarked()) {
            pathHeart.classList.add('text-yellow-400', 'fill-yellow-400');
            btnText.innerText = 'Saved!';
        } else {
            pathHeart.classList.remove('text-yellow-400', 'fill-yellow-400');
            btnText.innerText = 'Save Note';
        }
    };
    
    updateBookmarkButtonState();
    
    const minimizeBtn = document.getElementById('minimize-companion-btn');
    const bubble = document.getElementById('companion-minimized-bubble');
    const bBody = document.getElementById('companion-content-body');
    
    minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        companion.style.width = '48px';
        companion.style.height = '48px';
        companion.style.padding = '0';
        companion.style.borderRadius = '9999px';
        
        bBody.classList.add('hidden');
        minimizeBtn.classList.add('hidden');
        document.querySelector('#study-companion-panel h4').parentNode.classList.add('hidden');
        bubble.classList.remove('hidden');
        
        companion.className = 'fixed bottom-24 right-6 z-[9990] w-12 h-12 bg-blue-600 hover:bg-blue-700 shadow-2xl transition-all duration-300 rounded-full flex items-center justify-center border border-transparent';
    });
    
    companion.addEventListener('click', () => {
        if (!bubble.classList.contains('hidden')) {
            companion.style.width = '';
            companion.style.height = '';
            companion.style.padding = '';
            companion.style.borderRadius = '';
            
            bBody.classList.remove('hidden');
            minimizeBtn.classList.remove('hidden');
            document.querySelector('#study-companion-panel h4').parentNode.classList.remove('hidden');
            bubble.classList.add('hidden');
            
            companion.className = 'fixed bottom-24 right-6 z-[9990] max-w-sm w-80 bg-slate-900/95 dark:bg-slate-950/95 border border-slate-800 rounded-3xl shadow-2xl p-5 text-white transition-all duration-300 font-sans text-xs flex flex-col gap-4';
        }
    });
    
    document.getElementById('companion-share-btn').addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast('Success', 'Share link copied to clipboard!');
            if (typeof window.triggerXP === 'function') {
                window.triggerXP(5, 'Shared Note with Friends');
            }
        } catch (err) {
            toast('Success', 'Link copied!');
        }
    });
    
    document.getElementById('companion-bookmark-btn').addEventListener('click', async (e) => {
        e.stopPropagation();
        
        let saved = JSON.parse(localStorage.getItem('studyPlanner')) || [];
        const itemId = `${slugPrefix}_u${unitNum}`;
        const itemObj = {
            id: itemId,
            title: matchingUnitRoute ? matchingUnitRoute.title : `${subject} Unit ${unitNum}`,
            subject: subject,
            slug: slugPrefix + `-unit-` + unitNum
        };
        
        if (isBookmarked()) {
            saved = saved.filter(i => i.id !== itemId);
            localStorage.setItem('studyPlanner', JSON.stringify(saved));
            updateBookmarkButtonState();
            toast('Info', 'Removed from your bookmarks planner');
        } else {
            saved.push(itemObj);
            localStorage.setItem('studyPlanner', JSON.stringify(saved));
            updateBookmarkButtonState();
            
            if (typeof showAchievementToast === 'function') {
                showAchievementToast('Saved! Bookmarked in Local Planner');
            } else {
                toast('Success', 'Saved to local study planner!');
            }
            
            if (typeof window.triggerXP === 'function') {
                window.triggerXP(10, 'Bookmarked Unit Note');
            }
        }
    });
}

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
    initLiveActivities();
    initBreadcrumbs();
    initAuthorBox();
    
    // Core Link and Navigation Repair systems (Phases 3, 4, 5, 6, 7 & 10)
    repairAndCanonicalizeLinks();
    applyIntelligentTextLinks();
    setupStudyCompanionPanel();
});

function initAuthorBox() {
    const fn = window.location.pathname;
    const isEducationalPage = fn.includes('unit-') || fn.includes('notes') || fn.includes('pyq') || fn.includes('cheat-sheet');
    if (!isEducationalPage) return;

    if (document.getElementById('eeat-author-box')) return;

    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;

    const authorBox = document.createElement('div');
    authorBox.id = 'eeat-author-box';
    authorBox.className = 'mt-16 mb-8 p-6 md:p-8 bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 shadow-sm rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start';
    
    authorBox.innerHTML = `
        <div class="w-20 h-20 shrink-0 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-[#E2E8F0] dark:border-slate-800">
            <span class="text-3xl">🎓</span>
        </div>
        <div class="flex-1 text-center md:text-left">
            <div class="inline-block px-3 py-1 bg-[#EFF6FF] dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400 text-[11px] font-black uppercase tracking-widest rounded-full mb-3">
                Verified Academic Content
            </div>
            <h4 class="text-lg font-black text-[#0F172A] dark:text-white font-['Space_Grotesk'] mb-2">Prepared by EngiPrepHub Academic Team</h4>
            <p class="text-[14px] text-[#475569] dark:text-slate-400 leading-relaxed max-w-2xl mb-4">
                Our academic team consists of top-tier university scholars, engineers, and educational experts specializing in the JNTUK curriculum framework. This content has been rigorously peer-reviewed for accuracy, syllabic alignment, and examination relevance to ensure high-yield study sessions.
            </p>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                <span class="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-slate-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    JNTUK R23 Aligned
                </span>
                <span class="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-slate-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Last Modified: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
            </div>
        </div>
    `;

    mainContainer.appendChild(authorBox);
}

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
    const initGA4 = () => {
        if (document.getElementById('ga-script')) return;
        const script = document.createElement('script');
        script.id = 'ga-script';
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        
        // IP anonymization & consent mode
        gtag('config', 'G-XXXXXXXXXX', { 
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
        });
    };

    if (localStorage.getItem('cookie-consent')) {
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'all' || (consent.includes('analytics') && JSON.parse(consent).analytics)) {
            initGA4();
        }
        return; // Consent already given
    }

    // Create the HTML representation
    const consentDiv = document.createElement('div');
    consentDiv.id = 'cookie-consent-banner';
    consentDiv.className = 'fixed bottom-6 right-6 z-[9999] p-6 rounded-3xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 border border-slate-200 dark:border-slate-800 max-w-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100';

    consentDiv.innerHTML = `
        <div class="flex flex-col gap-4">
            <h4 class="text-sm font-black text-slate-900 dark:text-white tracking-tight">We Value Your Privacy 🍪</h4>
            <p class="text-[13px] text-slate-600 dark:text-slate-350 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies as described in our <a href="/cookie-policy.html" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Privacy Policy</a> and <a href="/cookie-policy.html" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Cookie Policy</a>.
            </p>

            <!-- Preferences Panel -->
            <div id="cookie-prefs-panel" class="hidden flex-col gap-2 p-4 rounded-2xl text-[12px] bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850">
                <label class="flex items-center justify-between cursor-pointer">
                    <span class="font-semibold text-slate-805 dark:text-slate-200">Strictly Necessary</span>
                    <input type="checkbox" disabled checked class="accent-blue-600 dark:accent-blue-500">
                </label>
                <label class="flex items-center justify-between cursor-pointer">
                    <span class="text-slate-600 dark:text-slate-350">Analytics & Performance</span>
                    <input type="checkbox" id="cookie-pref-analytics" checked class="accent-blue-600 dark:accent-blue-500">
                </label>
                <label class="flex items-center justify-between cursor-pointer">
                    <span class="text-slate-600 dark:text-slate-350">Google AdSense</span>
                    <input type="checkbox" id="cookie-pref-adsense" checked class="accent-blue-600 dark:accent-blue-500">
                </label>
            </div>

            <div class="flex flex-wrap items-center gap-2 text-xs">
                <button id="cookie-btn-accept" class="px-5 py-2.5 font-bold text-white rounded-xl transition-all bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md shadow-blue-500/10">
                    Accept All
                </button>
                <button id="cookie-btn-reject" class="px-5 py-2.5 font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
                    Reject All
                </button>
                <button id="cookie-btn-manage" class="px-4 py-2.5 font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    Customize
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
            window.showSuccessToast('Preferences Saved', 'Minimal cookies preference saved.');
        }
    });

    acceptBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const analytics = consentDiv.querySelector('#cookie-pref-analytics')?.checked ?? true;
        const adsense = consentDiv.querySelector('#cookie-pref-adsense')?.checked ?? true;
        
        if (analytics && adsense) {
            closeBanner('all');
            initGA4();
        } else {
            closeBanner(JSON.stringify({ analytics, adsense }));
            if (analytics) initGA4();
        }

        if (typeof window.showSuccessToast === 'function') {
            window.showSuccessToast('Preferences Saved', 'Your cookie preferences have been applied successfully.');
        }
    });

    const readPolicyBtn = consentDiv.querySelector('#read-cookie-policy-btn');
    if (readPolicyBtn) {
        readPolicyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.showCookiePolicyModal === 'function') {
                window.showCookiePolicyModal();
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
                    <button id="global-logout-btn" class="flex items-center justify-center p-2 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 transition-colors" title="Logout">
                        <svg class="w-4 h-4 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        <span class="hidden md:block text-[10px] font-bold uppercase tracking-widest">Logout</span>
                    </button>
                </div>
            `;
            setTimeout(() => {
                const logoutBtn = document.getElementById('global-logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', async () => {
                        if (confirm('Are you sure you want to log out?')) {
                            await supabase.auth.signOut();
                            window.location.href = '/';
                        }
                    });
                }
            }, 0);
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
    // Inject custom premium quick-links styles if not already injected
    if (!document.getElementById('quick-links-styles')) {
        const styles = `
            .quick-links {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 16px;
                padding: 0 1.25rem 1.25rem;
                width: 100%;
                box-sizing: border-box;
            }

            .quick-link {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 14px;
                border-radius: 14px;
                background: #F8FAFC;
                border: 1px solid #E2E8F0;
                color: #334155;
                text-decoration: none !important;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                font-size: 14px;
                font-weight: 600;
                letter-spacing: -0.01em;
                transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
                cursor: pointer;
                line-height: 1.2;
                box-sizing: border-box;
            }

            .quick-link:hover {
                background: #EFF6FF !important;
                border-color: #BFDBFE !important;
                color: #2563EB !important;
                transform: translateY(-1px);
            }

            .quick-link.active, .quick-link:active {
                background: #DBEAFE !important;
                color: #1D4ED8 !important;
                border-color: #BFDBFE !important;
            }

            .quick-link-icon {
                width: 16px;
                height: 16px;
                stroke: currentColor;
                stroke-width: 2.2;
                fill: none;
                flex-shrink: 0;
            }

            /* Dark Mode overrides */
            body.dark-mode .quick-link, 
            .dark .quick-link,
            [data-theme="dark"] .quick-link,
            body.exam-mode .quick-link { /* Ensure consistency across custom modes */
                background: #111827;
                border-color: #1F2937;
                color: #9CA3AF;
            }

            body.dark-mode .quick-link:hover, 
            .dark .quick-link:hover,
            [data-theme="dark"] .quick-link:hover,
            body.exam-mode .quick-link:hover {
                background: #1E3A8A !important;
                border-color: #2563EB !important;
                color: #38BDF8 !important;
            }

            body.dark-mode .quick-link.active, 
            .dark .quick-link.active,
            [data-theme="dark"] .quick-link.active,
            body.exam-mode .quick-link.active {
                background: #1E40AF !important;
                color: #60A5FA !important;
                border-color: #2563EB !important;
            }

            /* Structure & hiding behavior for mobileMenu when appended to unit-nav */
            #mobile-menu {
                border: none !important;
                background: transparent !important;
                box-shadow: none !important;
            }

            @media (min-width: 1024px) {
                .unit-nav #mobile-menu,
                .sidebar #mobile-menu,
                aside #mobile-menu {
                    display: block !important;
                    position: static !important;
                    padding: 0 !important;
                    margin-top: 16px !important;
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                }
            }

            @media (max-width: 767px) {
                .quick-links {
                    display: grid !important;
                    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    gap: 8px !important;
                    padding: 0 1rem 1rem !important;
                }
                .quick-link {
                    justify-content: center !important;
                    padding: 9px 10px !important;
                    font-size: 13px !important;
                    border-radius: 12px !important;
                }
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.id = "quick-links-styles";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

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
        const cleanPath = window.location.pathname.split('?')[0].split('#')[0].replace(/^\/|\/$/g, '');
        const activeClass = (linkPath) => {
            const cleanLink = linkPath.replace(/^\/|\/$/g, '');
            return cleanPath === cleanLink ? 'active' : '';
        };

        mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'hidden absolute top-20 left-0 w-full bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xl z-40 flex flex-col p-6 space-y-3 lg:hidden divide-y divide-border/40';
        mobileMenu.innerHTML = `
            <div class="quick-links">
                <a href="/notes.html" class="quick-link ${activeClass('/notes.html')}">
                    <svg class="quick-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    <span>Notes</span>
                </a>
                <a href="/pyqs.html" class="quick-link ${activeClass('/pyqs.html')}">
                    <svg class="quick-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span>PYQs</span>
                </a>
                <a href="/cheat-sheets.html" class="quick-link ${activeClass('/cheat-sheets.html')}">
                    <svg class="quick-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                    <span>Cheat Sheets</span>
                </a>
                <a href="/exam-survival.html" class="quick-link ${activeClass('/exam-survival.html')}">
                    <svg class="quick-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                    <span>Exam Prep</span>
                </a>
                <a href="/tools.html" class="quick-link ${activeClass('/tools.html')}">
                    <svg class="quick-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.7 6.1-1-1a3 3 0 0 0-4.6 4.3l3 3a3 3 0 0 0 4.1l-1.3 1.3a1 1 0 0 1-1.4 0L11 11.2a1 1 0 0 1 0-1.4l1.3-1.3a1 1 0 0 1 1.4 0l.9.9a1 1 0 0 1 0 1.4l-1.1 1.1"/><path d="m5.2 19 1.4-1.4a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 0 1 0 1.4L7.7 21.5a1 1 0 0 1-1.4 0l-1.1-1.1a1 1 0 0 1 0-1.4z"/><path d="m12.3 13.7-2.6-2.6m-2.1 6.8 5-5M4.8 14.8l2.5-2.5"/></svg>
                    <span>Tools</span>
                </a>
                <a href="/blog.html" class="quick-link ${activeClass('/blog.html')}">
                    <svg class="quick-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    <span>Blog</span>
                </a>
                <a href="/dashboard.html" class="quick-link ${activeClass('/dashboard.html')}">
                    <svg class="quick-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                    <span>Dashboard</span>
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

// GLOBAL SEARCH CATALOG INDEX (Phase 8 site-wide index)
const GLOBAL_SEARCH_INDEX = [
  // 1. Subjects
  { title: "Engineering Physics", subtitle: "Physics Complete Hub", url: "/engineering-physics", keywords: ["physics", "applied physics", "wave optics", "lasers", "quantum", "semiconductor", "superconductivity"] },
  { title: "Engineering Chemistry", subtitle: "Chemistry Complete Hub", url: "/engineering-chemistry", keywords: ["chemistry", "water", "electrochemistry", "batteries", "polymer", "spectroscopy", "fuels"] },
  { title: "Engineering Mathematics I", subtitle: "M-I Complete Hub", url: "/engineering-mathematics", keywords: ["math", "maths", "maths 1", "maths i", "m1", "matrices", "calculus", "rolle", "lagrange", "taylor", "beta", "gamma"] },
  { title: "Engineering Mathematics II", subtitle: "M-II Complete Hub", url: "/engineering-mathematics-2", keywords: ["maths 2", "maths ii", "m2", "differential equations", "laplace", "transforms", "multiple integrals", "vector calculus"] },
  { title: "Engineering Graphics", subtitle: "Drawing & CAD Hub", url: "/engineering-graphics", keywords: ["graphics", "drawing", "ellipse", "scales", "involute", "projections", "solids", "autocad", "cad", "isometric"] },
  { title: "Communicative English", subtitle: "English & Verbal Hub", url: "/communicative-english", keywords: ["english", "vocabulary", "grammar", "writing", "listening", "gd", "presentation", "verbal"] },
  { title: "Basic Electrical Engineering", subtitle: "BEEE Complete Hub", url: "/basic-electrical-engineering", keywords: ["electrical", "beee", "circuits", "superposition", "thevenin", "power factor", "transformer", "induction motor", "dc machine", "alternator"] },
  { title: "PPS C Programming", subtitle: "PPS Complete Hub", url: "/c-programming", keywords: ["c", "cpp", "programming", "pps", "struct", "union", "pointers", "pointers", "loops", "functions", "recursion", "file handling"] },
  { title: "Data Structures", subtitle: "Data Structures Complete Hub", url: "/data-structures", keywords: ["dsa", "ds", "data structures", "arrays", "lists", "stacks", "queues", "trees", "graphs", "sorting", "searching"] },
  { title: "Basic Civil and Mechanical Engineering", subtitle: "BCME Complete Hub", url: "/basic-civil-and-mechanical-engineering", keywords: ["civil", "mechanical", "bcme", "surveying", "building", "casting", "gears", "thermal", "engines"] },

  // 2. Physics Units
  { title: "Wave Optics & Newton's Rings", subtitle: "Engineering Physics • Unit 1", url: "/engineering-physics-unit-1", keywords: ["wave optics", "newtons rings", "newton rings", "interference", "wedge", "diffraction", "polarization", "stokes"] },
  { title: "Lasers & Holography", subtitle: "Engineering Physics • Unit 2", url: "/engineering-physics-unit-2", keywords: ["lasers", "einstein coefficients", "stimulated emission", "ruby laser", "he-ne", "semiconductor laser", "holography", "inversion"] },
  { title: "Quantum Mechanics & Schrodinger", subtitle: "Engineering Physics • Unit 3", url: "/engineering-physics-unit-3", keywords: ["quantum", "schrodinger", "de broglie", "wave function", "davisson", "uncertainty", "blackbody", "photoelectric"] },
  { title: "Semiconductor Physics", subtitle: "Engineering Physics • Unit 4", url: "/engineering-physics-unit-4", keywords: ["semiconductor", "fermi level", "hall effect", "drift", "diffusion", "led", "photodiode", "intrinsic", "extrinsic"] },
  { title: "Superconductivity & Nanomaterials", subtitle: "Engineering Physics • Unit 5", url: "/engineering-physics-unit-5", keywords: ["superconductivity", "nanomaterials", "meissner", "cooper pair", "josephson", "sol-gel", "carbon nanotubes", "cnt"] },

  // 3. Chemistry Units
  { title: "Water Demineralization & Boiler", subtitle: "Engineering Chemistry • Unit 1", url: "/engineering-chemistry-unit-1", keywords: ["water", "demineralization", "ion exchange", "zeolite", "boiler", "scale", "sludge", "priming", "foaming", "hardness"] },
  { title: "Electrochemistry, Batteries & Corrosion", subtitle: "Engineering Chemistry • Unit 2", url: "/engineering-chemistry-unit-2", keywords: ["electrochemistry", "corrosion", "battery", "batteries", "lead acid", "lithium ion", "cathode", "anode", "galvanic", "nernst"] },
  { title: "Polymer Chemistry & Plastics", subtitle: "Engineering Chemistry • Unit 3", url: "/engineering-chemistry-unit-3", keywords: ["polymer", "plastics", "bakelite", "elastomers", "vulcanization", "teflon", "nylon", "pvc", "addition", "condensation"] },
  { title: "Instrumental Methods & Spectroscopy", subtitle: "Engineering Chemistry • Unit 4", url: "/engineering-chemistry-unit-4", keywords: ["instrumental", "spectroscopy", "uv-vis", "ir", "nmr", "beer-lambert", "electromagnetic", "vibrational"] },
  { title: "Energy Sources & Fuels", subtitle: "Engineering Chemistry • Unit 5", url: "/engineering-chemistry-unit-5", keywords: ["energy", "fuels", "coal", "petroleum", "octane", "cetane", "gaseous fuels", "calorific value", "bomb calorimeter"] },

  // 4. Maths Units
  { title: "Matrices & Cayley-Hamilton", subtitle: "Engineering Mathematics I • Unit 1", url: "/engineering-mathematics-unit-1", keywords: ["matrices", "matrix", "eigenvalues", "eigenvectors", "cayley hamilton", "rank", "echelon", "unitary", "orthogonal", "quadratic"] },
  { title: "Mean Value Theorems", subtitle: "Engineering Mathematics I • Unit 2", url: "/engineering-mathematics-unit-2", keywords: ["rolle", "rolle's", "mean value", "lagrange", "cauchy", "lmvt", "cmvt", "taylor", "maclaurin"] },
  { title: "Multivariable Calculus", subtitle: "Engineering Mathematics I • Unit 3", url: "/engineering-mathematics-unit-3", keywords: ["multivariable", "partial differentiation", "total derivative", "jacobian", "maxima", "minima", "lagrange multipliers"] },
  { title: "Multiple Integrals", subtitle: "Engineering Mathematics I • Unit 4", url: "/engineering-mathematics-unit-4", keywords: ["multiple integrals", "double integral", "triple integral", "change of order", "area", "volume", "polar"] },
  { title: "Special Functions: Beta-Gamma", subtitle: "Engineering Mathematics I • Unit 5", url: "/engineering-mathematics-unit-5", keywords: ["special functions", "beta", "gamma", "factorial", "symmetrical relationship", "integral"] },

  // 5. C Programming Units
  { title: "Structures & Unions", subtitle: "C Programming • Unit 1", url: "/c-programming-unit-1", keywords: ["structures", "unions", "struct", "union", "padding", "memory alignment", "sizeof"] },
  { title: "Pointers & References", subtitle: "C Programming • Unit 2", url: "/c-programming-unit-2", keywords: ["pointers", "pointer arithmetic", "dynamic memory", "malloc", "calloc", "realloc", "free", "dereference", "address", "null"] },
  { title: "Control Structures & Loops", subtitle: "C Programming • Unit 3", url: "/c-programming-unit-3", keywords: ["control structures", "loops", "if-else", "switch", "while", "for", "do-while", "break", "continue"] },
  { title: "Functions & Recursion", subtitle: "C Programming • Unit 4", url: "/c-programming-unit-4", keywords: ["functions", "recursion", "call by value", "call by reference", "scope", "storage class", "static", "register", "auto", "extern"] },
  { title: "File Handling & CLI", subtitle: "C Programming • Unit 5", url: "/c-programming-unit-5", keywords: ["file handling", "files", "fopen", "fclose", "fread", "fwrite", "fscanf", "fprintf", "command line", "argc", "argv"] },

  // 6. BEEE Units
  { title: "Superposition & DC Circuits", subtitle: "Basic Electrical • Unit 1", url: "/basic-electrical-engineering-unit-1", keywords: ["superposition", "thevenin", "norton", "kirchhoff", "kvl", "kcl", "mesh", "nodal", "dc circuits"] },
  { title: "Power Factor & AC Circuits", subtitle: "Basic Electrical • Unit 2", url: "/basic-electrical-engineering-unit-2", keywords: ["power factor", "ac circuits", "rms", "average value", "impedance", "resonance", "series rlc", "phase angle"] },
  { title: "Transformers & Induction Motors", subtitle: "Basic Electrical • Unit 3", url: "/basic-electrical-engineering-unit-3", keywords: ["transformer", "emf equation", "losses", "efficiency", "regulation", "induction motor", "slip", "torque"] },
  { title: "DC Machines & Alternators", subtitle: "Basic Electrical • Unit 4", url: "/basic-electrical-engineering-unit-4", keywords: ["dc machine", "dc generator", "dc motor", "back emf", "torque equation", "alternator", "synchronous generator"] },
  { title: "Electrical Safety & Batteries", subtitle: "Basic Electrical • Unit 5", url: "/basic-electrical-engineering-unit-5", keywords: ["electrical safety", "fuses", "earthing", "mcb", "batteries", "lead-acid", "nimh", "li-ion"] },

  // 7. BCME Units
  { title: "Civil Materials & Surveying", subtitle: "Civil & Mechanical • Unit 1", url: "/basic-civil-and-mechanical-engineering-unit-1", keywords: ["civil materials", "bricks", "cement", "concrete", "timber", "surveying", "leveling", "chain surveying", "compass"] },
  { title: "Building Components & Structures", subtitle: "Civil & Mechanical • Unit 2", url: "/basic-civil-and-mechanical-engineering-unit-2", keywords: ["building components", "foundation", "superstructure", "roofing", "masonry", "damp proofing", "stress", "strain"] },
  { title: "Mechanical Engineering Materials", subtitle: "Civil & Mechanical • Unit 3", url: "/basic-civil-and-mechanical-engineering-unit-3", keywords: ["mechanical materials", "metals", "alloys", "plastics", "composites", "casting", "sand casting", "forging", "welding"] },
  { title: "Power Transmission & Gears", subtitle: "Civil & Mechanical • Unit 4", url: "/basic-civil-and-mechanical-engineering-unit-4", keywords: ["power transmission", "belt drive", "rope drive", "gear drive", "gear trains", "spur", "helical", "bevel", "worm"] },
  { title: "Thermal Engineering & IC Engines", subtitle: "Civil & Mechanical • Unit 5", url: "/basic-civil-and-mechanical-engineering-unit-5", keywords: ["thermal engineering", "ic engines", "four stroke", "two stroke", "petrol engine", "diesel engine", "refrigeration", "air conditioning"] },

  // Auxiliary
  { title: "Syllabus PYQ Repository", subtitle: "All Subject Papers", url: "/pyqs", keywords: ["pyq", "pyqs", "previous papers", "important questions", "board papers"] },
  { title: "AI Professor Classroom", subtitle: "Academic Tutor Hub", url: "/ai-professor.html", keywords: ["professor", "ai", "viva", "simulation", "roadmap", "class", "weak topics", "classroom"] },
  { title: "C Programming Cheat Sheet", subtitle: "Revision Cards", url: "/c-programming-cheat-sheet", keywords: ["cheat sheet", "revision sheet", "summary cards", "formulas"] }
];

async function initSearch() {
    const inputsList = ['main-search', 'hero-search', 'smart-search-input'];
    
    inputsList.forEach(id => {
        const inputEl = document.getElementById(id);
        if (!inputEl) return;
        
        let resultsBox;
        if (id === 'main-search') {
            resultsBox = document.getElementById('search-results');
        } else if (id === 'smart-search-input') {
            resultsBox = document.getElementById('search-results-box');
        } else if (id === 'hero-search') {
            resultsBox = document.getElementById('hero-search-results-box');
            if (!resultsBox) {
                resultsBox = document.createElement('div');
                resultsBox.id = 'hero-search-results-box';
                resultsBox.className = 'absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto hidden divide-y divide-slate-100 dark:divide-slate-800';
                inputEl.parentNode.appendChild(resultsBox);
            }
        }
        
        if (!resultsBox) return;
        
        let searchTimeout;
        inputEl.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                resultsBox.classList.add('hidden');
                return;
            }
            
            searchTimeout = setTimeout(async () => {
                // Fuzzy terms matching from site catalog
                const results = GLOBAL_SEARCH_INDEX.filter(item => {
                    const matchTitle = item.title.toLowerCase().includes(query);
                    const matchSub = item.subtitle.toLowerCase().includes(query);
                    const matchKeywords = item.keywords.some(kw => kw.toLowerCase().includes(query) || query.includes(kw.toLowerCase()));
                    return matchTitle || matchSub || matchKeywords;
                }).slice(0, 5);
                
                if (results.length === 0) {
                    resultsBox.innerHTML = '<div class="p-6 text-center text-gray-500 text-xs italic">No matching units found. Try another path.</div>';
                } else {
                    resultsBox.innerHTML = results.map(item => `
                        <a href="${item.url}" class="flex items-center gap-3 p-3.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group cursor-pointer text-left block">
                            <div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black group-hover:scale-105 transition-transform">📚</div>
                            <div class="truncate">
                                <div class="font-bold text-slate-800 dark:text-slate-100 truncate">${item.title}</div>
                                <div class="text-[9px] text-slate-400 dark:text-slate-400 uppercase font-bold tracking-tight">${item.subtitle}</div>
                            </div>
                        </a>
                    `).join('');
                }
                
                resultsBox.classList.remove('hidden');
            }, 250);
        });
        
        // Listen on Enter key to open top-matching path immediately
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = inputEl.value.toLowerCase().trim();
                const matched = GLOBAL_SEARCH_INDEX.find(item => {
                    const matchTitle = item.title.toLowerCase().includes(query);
                    const matchKeywords = item.keywords.some(kw => kw.toLowerCase() === query || query.includes(kw.toLowerCase()));
                    return matchTitle || matchKeywords;
                });
                
                if (matched) {
                    window.location.href = matched.url;
                }
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!inputEl.contains(e.target) && !resultsBox.contains(e.target)) {
                resultsBox.classList.add('hidden');
            }
        });
    });
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

    // Highlight active link in the Academic Portal Menu
    const currentPath = window.location.pathname;
    const menuEl = navContainer.querySelector('#academic-navigator-menu');
    const portalLinks = menuEl.querySelectorAll('a');
    portalLinks.forEach(link => {
        const hrefAttr = link.getAttribute('href');
        if (hrefAttr) {
            const isMatch = (hrefAttr === '/' && currentPath === '/') || 
                            (hrefAttr !== '/' && (currentPath === hrefAttr || currentPath.startsWith(hrefAttr + '?') || currentPath.endsWith(hrefAttr)));
            if (isMatch) {
                link.classList.add('bg-blue-50/80', 'dark:bg-blue-950/20', 'text-blue-600', 'dark:text-blue-400', 'border-l-2', 'border-blue-600');
                link.classList.remove('text-slate-700', 'dark:text-slate-300');
            }
        }
    });

    const btnBack = navContainer.querySelector('#academic-nav-back');
    const toggleMenu = navContainer.querySelector('#academic-nav-menu-toggle');
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

/**
 * Universal Live Academic Activity Feed
 * Simulates active global students across different engineering colleges (JNTUK R23)
 * to provide an immersive, inspiring study dashboard mood.
 */
function initLiveActivities() {
    // Prevent duplicate ticker initializations
    if (document.getElementById('live-activity-host')) return;

    // Check if the user has globally disabled notifications in their settings
    const currentMuted = localStorage.getItem('mute-academic-ticks') === 'true';

    // Disjointed pool of highly specific Telugu engineering first & last names
    const studentNames = [
        "Sai Kiran", "Meghana", "Divya", "Venkat S.", "Tarun", "Srinivas", "Anoop K.", 
        "Sireesha", "Prudhvi Raj", "Chaitanya G.", "Anjali S.", "Swapna", "Gautam", 
        "Niharika", "Priya M.", "Teja P.", "Harika", "Satish", "Vamsi", "Ravi", 
        "Mounika", "Kalyan", "Nikhil", "Sneha", "Sowmya", "Bhavana", "Dinesh", 
        "Sravya", "Rohit", "Yamini", "Jaswanth", "Karthik", "Hema", "Vineeth", 
        "Deepika", "Kiran Prasanna", "Pranav", "Lavanya", "Sandeep", "Sai Kumar"
    ];

    // Wide array of real JNTUK affiliated engineering colleges
    const engineeringColleges = [
        "JNTUK Kakinada", "Aditya Engg College", "Vasavi Institute", "Pragati Engg College", 
        "SRKR Bhimavaram", "Vishnu Inst of Tech", "GVP Visakhapatnam", "ANITS Vizag", 
        "GMRIT Rajam", "Lendi Institute", "MVGR Vijayanagram", "Raghu Inst of Tech", 
        "RVR & JC College", "Bapatla Engg College", "Lakireddy Bali Reddy", "JNTUK Vizianagaram", 
        "UCEK Kakinada", "SRK Institute", "Pace Institute", "Dadi Institute"
    ];

    // Set of diverse, highly specific JNTUK engineering academic study actions
    const academicActivities = [
        { action: "downloaded Unit-1 Mathematics integration sheets", badge: "📚 NOTES" },
        { action: "just cleared Polymer Chemistry quiz with 100%", badge: "⚡ QUIZ" },
        { action: "queried the AI Professor on 'Hermitian Matrices proof'", badge: "🤖 AI CHAT" },
        { action: "finished Basic Electrical Unit-1 circuits homework", badge: "✏️ STUDY" },
        { action: "unlocked 'C Programming Master' rank", badge: "🏆 LEVEL" },
        { action: "simulated basic involute curve construction in Graphics", badge: "📐 CAD" },
        { action: "bookmarked Unit-3 Wave Optics Notes", badge: "🔖 BOOKMARK" },
        { action: "solved the 2024 JNTUK Quantum Physics PYQ derivation", badge: "📝 PYQ" },
        { action: "compiled standard AutoCAD command matrix for ellipse locus", badge: "📐 CAD" },
        { action: "unlocked +25 Mastery XP for completing Unit-2 Thermodynamics basics", badge: "⭐ XP" },
        { action: "asked AI Professor: 'Simplify de Broglie wavelength derivation'", badge: "🤖 AI CHAT" },
        { action: "completed practice test for Civil and Mechanical Unit-2", badge: "⚡ QUIZ" },
        { action: "solved water hardness mg/L equivalents calculator challenge", badge: "🧪 LAB" },
        { action: "downloaded Newton's rings dark diameter cheat-sheet", badge: "📚 NOTES" },
        { action: "simulated a Series RLC resonant frequency inside formula sandbox", badge: "📐 TECH" },
        { action: "completed Laplace constant equation practice sets", badge: "✏️ STUDY" },
        { action: "analyzed Phase Rule curves for Lead-Silver eutectic mixture", badge: "🧪 LAB" },
        { action: "tested a Series RLC AC circuit in the Virtual Lab sandbox", badge: "📐 TECH" },
        { action: "bookmarked M2 Integration cheat-sheet for rapid revision", badge: "🔖 BOOKMARK" },
        { action: "created custom formula deck for Applied Physics Bragg's Law", badge: "⭐ XP" }
    ];

    // Strict history limits so the same names and colleges never repeat concurrently or in recent queues
    let lastUsedNames = [];
    let lastUsedColleges = [];
    const maxHistoryCount = 10;

    // Create the persistent mounting container in bottom-left zone
    const host = document.createElement('div');
    host.id = 'live-activity-host';
    host.className = 'fixed bottom-6 left-6 z-[998] max-w-[340px] pointer-events-none font-sans print:hidden flex flex-col gap-2';
    document.body.appendChild(host);

    let tickerTimeout = null;

    // Trigger one initial popup 4.5 seconds after page loads for active styling feedback
    if (!currentMuted) {
        setTimeout(scheduleNextNotification, 4500);
    }

    function createNotificationMarkup(event) {
        const item = document.createElement('div');
        item.className = 'pointer-events-auto flex items-start gap-3 bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-slate-850 p-4 rounded-2xl shadow-xl shadow-slate-100/50 dark:shadow-none backdrop-blur-md translate-y-8 opacity-0 transition-all duration-500 ease-out select-none';
        
        item.innerHTML = `
            <div class="flex-1 space-y-1">
                <div class="flex items-center gap-2">
                    <span class="text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/35 px-1.5 py-0.5 rounded-md tracking-wider">${event.badge}</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest">${event.college}</span>
                </div>
                <p class="text-[11px] font-semibold text-slate-700 dark:text-slate-350 leading-relaxed">
                    <strong class="text-slate-900 dark:text-slate-100 font-black">${event.name}</strong> ${event.action}
                </p>
            </div>
            
            <div class="flex flex-col gap-1 items-end pl-2">
                <!-- Close/Dismiss -->
                <button class="bg-transparent hover:bg-slate-100 dark:hover:bg-slate-900 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer" onclick="this.closest('#live-activity-host').innerHTML='';" title="Dismiss alert">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        `;
        return item;
    }

    function scheduleNextNotification() {
        if (localStorage.getItem('mute-academic-ticks') === 'true') return;

        // Clean out any existing alert inside the host parent
        host.innerHTML = '';

        // Select a premium name, avoiding recently used names
        let acceptableNames = studentNames.filter(n => !lastUsedNames.includes(n));
        if (acceptableNames.length === 0) {
            lastUsedNames = [];
            acceptableNames = studentNames;
        }
        const chosenName = acceptableNames[Math.floor(Math.random() * acceptableNames.length)];
        lastUsedNames.push(chosenName);
        if (lastUsedNames.length > maxHistoryCount) {
            lastUsedNames.shift();
        }

        // Select a premium college, avoiding recently used colleges
        let acceptableColleges = engineeringColleges.filter(c => !lastUsedColleges.includes(c));
        if (acceptableColleges.length === 0) {
            lastUsedColleges = [];
            acceptableColleges = engineeringColleges;
        }
        const chosenCollege = acceptableColleges[Math.floor(Math.random() * acceptableColleges.length)];
        lastUsedColleges.push(chosenCollege);
        if (lastUsedColleges.length > maxHistoryCount) {
            lastUsedColleges.shift();
        }

        // Pick a dynamic activity action
        const activeEvent = academicActivities[Math.floor(Math.random() * academicActivities.length)];

        // Synthesize the randomized non-repetitive event object
        const fullEvent = {
            name: chosenName,
            college: chosenCollege,
            action: activeEvent.action,
            badge: activeEvent.badge
        };

        const el = createNotificationMarkup(fullEvent);
        host.appendChild(el);

        // Slide up with spring effect
        setTimeout(() => {
            el.classList.remove('translate-y-8', 'opacity-0');
        }, 50);

        // Clear out current alert after 6 seconds of exposure
        const fadeoutTimer = setTimeout(() => {
            el.classList.add('-translate-y-4', 'opacity-0');
            setTimeout(() => {
                el.remove();
            }, 500);
        }, 6500);

        // Trigger the loop recursively with random offsets (every 22 to 38 seconds)
        const nextStagger = 22000 + Math.random() * 16000;
        tickerTimeout = setTimeout(scheduleNextNotification, nextStagger);
    }
}

// Global Cookie Policy Modal
window.showCookiePolicyModal = function() {
    let modal = document.getElementById('cookie-policy-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cookie-policy-modal';
        modal.className = 'fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity';
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <h2 class="text-lg font-bold text-slate-800 dark:text-white">Cookie Policy</h2>
                    <button id="close-cookie-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div class="p-6 overflow-y-auto text-sm text-slate-600 dark:text-slate-300 space-y-4">
                    <p><strong>Last Updated: October 2023</strong></p>
                    <h3 class="font-bold text-slate-800 dark:text-white mt-4">1. What are Cookies?</h3>
                    <p>Cookies are small text files stored on your device by your browser to save site preferences, enhance personalization, and provide analytical data.</p>
                    <h3 class="font-bold text-slate-800 dark:text-white mt-4">2. Types of Cookies We Use</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Essential Cookies:</strong> Required to enable core site functionality such as authentication and security features. Cannot be disabled.</li>
                        <li><strong>Analytics & Performance:</strong> Help us understand how you interact with our platform by collecting information anonymously, so we can improve the student experience.</li>
                        <li><strong>Advertising (Google AdSense):</strong> Used to deliver personalized JNTUK high-yield ads that are relevant to you. Google and its partners use these cookies to serve ads based on your visit to this and other sites.</li>
                    </ul>
                    <h3 class="font-bold text-slate-800 dark:text-white mt-4">3. Third-Party Services</h3>
                    <p>We use third-party services like Google AdSense and Analytics. These providers may set their own cookies to track performance and serve personalized content. You can opt out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" class="text-blue-500 hover:underline">Ads Settings</a>.</p>
                    <h3 class="font-bold text-slate-800 dark:text-white mt-4">4. Managing Preferences</h3>
                    <p>You can manage your cookie preferences at any time by clearing your browser cookies, which will prompt the consent banner to appear again, or by using the browser settings to block certain types of cookies.</p>
                </div>
                <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
                    <button id="cookie-modal-ok" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-colors">Understood</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        const closeHandler = () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 200);
        };
        
        modal.querySelector('#close-cookie-modal').addEventListener('click', closeHandler);
        modal.querySelector('#cookie-modal-ok').addEventListener('click', closeHandler);
        modal.addEventListener('click', (ev) => {
            if (ev.target === modal) closeHandler();
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Intercept all links to /cookie-policy.html
    document.querySelectorAll('a[href="/cookie-policy.html"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.showCookiePolicyModal();
        });
    });

    // Initialize the Local Command Palette
    if (typeof window !== 'undefined' && window.COMMAND_PALETTE) {
        window.COMMAND_PALETTE.init();
    }
});

// Import and register advanced offline AI subsystems
import { AI_ENGINE } from './ai/engine/coreEngine.js';
import { AI_ROUTER } from './ai/router/router.js';
import { FUZZY_SEARCH } from './ai/search/searchEngine.js';
import { COMMAND_PALETTE } from './ai/search/commandPalette.js';
import { AI_MEMORY } from './ai/memory/memory.js';

if (typeof window !== 'undefined') {
    window.AI_ENGINE = AI_ENGINE;
    window.AI_ROUTER = AI_ROUTER;
    window.FUZZY_SEARCH = FUZZY_SEARCH;
    window.COMMAND_PALETTE = COMMAND_PALETTE;
    window.AI_MEMORY = AI_MEMORY;
}


