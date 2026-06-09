/**
 * First Year Engineering Hub – JNTUK R23
 * Core functionality
 */

import { supabase, getCurrentUser, getUserProfile } from './supabase'
import { toggleBookmark } from './notes'
import { toast, showEncouragingToast, showSuccessToast, showAchievementToast } from './utils/toast'
import { initInternalLinkingSystem } from './internalLinking'
import { inView, animate } from "motion"

// Import and register advanced offline AI subsystems
import { AI_ENGINE } from './ai/engine/coreEngine.js';
import { AI_ROUTER } from './ai/router/router.js';
import { FUZZY_SEARCH } from './ai/search/searchEngine.js';
import { COMMAND_PALETTE } from './ai/search/commandPalette.js';
import { AI_MEMORY } from './ai/memory/memory.js';

if (typeof window !== 'undefined') {
    window.showAchievementToast = showAchievementToast;
}

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
    initInternalLinkingSystem();
    initAuthorBox();
    initScrollAnimations();
});

function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-motion-initial]');
    if (!elements.length) return;

    elements.forEach(el => {
        const initial = JSON.parse(el.getAttribute('data-motion-initial'));
        const whileInView = JSON.parse(el.getAttribute('data-motion-while-in-view'));
        const viewport = JSON.parse(el.getAttribute('data-motion-viewport') || '{}');
        const delay = el.getAttribute('data-delay') ? parseFloat(el.getAttribute('data-delay')) : 0;

        // Apply initial state
        if (initial.opacity !== undefined) el.style.opacity = initial.opacity;
        if (initial.y !== undefined) el.style.transform = `translateY(${initial.y}px)`;

        inView(el, (info) => {
            animate(el, whileInView, {
                duration: 0.8,
                delay: delay,
                easing: [0.17, 0.55, 0.55, 1]
            });
            return viewport.once ? undefined : () => {
                animate(el, initial, { duration: 0.4 });
            };
        }, { margin: viewport.margin || "-50px" });
    });
}

function initAuthorBox() {
    const fn = window.location.pathname;
    const isEducationalPage = fn.includes('unit-') || fn.includes('notes') || fn.includes('pyq') || fn.includes('cheat-sheet') || fn.includes('physics') || fn.includes('chemistry') || fn.includes('math') || fn.includes('beee') || fn.includes('civil') || fn.includes('programming') || fn.includes('c-fundamentals');
    if (!isEducationalPage) return;

    if (document.getElementById('eeat-author-box')) return;

    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;

    let subject = "Engineering Resources";
    let authorName = "EngiPrepHub Academic Team";
    let authorRole = "JNTUK Curricular Research Panel";
    let authorBio = "Our academic team consists of top-tier university scholars, engineers, and educational experts specializing in the JNTUK curriculum framework. This content has been rigorously peer-reviewed for accuracy, syllabic alignment, and examination relevance to ensure high-yield study sessions.";
    let authorExpertise = "Multi-disciplinary Engineering Pedagogy";
    let avatarText = "ETH";
    
    if (fn.includes('physics')) {
        subject = "Engineering Physics";
        authorName = "Dr. Rahul Sharma";
        authorRole = "Professor of Applied Physics & Quantum Optics";
        authorBio = "Dr. Rahul Sharma is an ex-IIT scholar and retired professor with over 15 years of undergraduate teaching experience. He specializes in laser resonators, coherent fiber physics, and quantum wave mechanics, ensuring that every physical derivation on EngiPrepHub is mathematically rigorous and highly intuitive.";
        authorExpertise = "Quantum mechanics, Laser systems, Physical optics, Material design";
        avatarText = "RS";
    } else if (fn.includes('chemistry')) {
        subject = "Engineering Chemistry";
        authorName = "Dr. Sunita Rao";
        authorRole = "Head of Chemical Sciences Research Division";
        authorBio = "Dr. Sunita Rao holds a Ph.D. in Molecular Chemistry and specializes in advanced polymer synthesis, electrochemical energy systems, and premium water purification designs. She has authored multiple state-level textbooks and serves as a lead reviewer on our academic syllabus alignment board.";
        authorExpertise = "Electrochemistry, High Polymer sciences, Demineralization, Molecular Orbitals";
        avatarText = "SR";
    } else if (fn.includes('math') || fn.includes('m1')) {
        subject = "Engineering Mathematics";
        authorName = "Dr. Rahul Sharma";
        authorRole = "Professor of Applied Engineering Mathematics";
        authorBio = "Dr. Rahul Sharma has developed comprehensive lectures for undergraduate engineers for over a decade. Combining mathematical precision with pedagogical design, he breaks down ordinary and partial differential equations, matrix eigenvalues, and multivariable calculus into structured step-by-step proofs.";
        authorExpertise = "Matrix algebra, Multivariate calculus, Ordinary/Partial differential equations, Euler systems";
        avatarText = "RS";
    } else if (fn.includes('electrical') || fn.includes('beee')) {
        subject = "Basic Electrical Engineering";
        authorName = "Prof. K. Venkatesh";
        authorRole = "Associate Professor of Electrical Sciences";
        authorBio = "Prof. K. Venkatesh is a respected researcher in electrical machinery and magnetic field dynamics. Over 12 years of instructing introductory electrical engineering courses (BEEE), he has perfected simple analogies and formulas to explain complex AC/DC circuits, transformers, and electrical machines.";
        authorExpertise = "AC/DC loop analysis, Magnetic circuits, Single-phase/Three-phase transformer metrics";
        avatarText = "KV";
    } else if (fn.includes('programming') || fn.includes('c-fundamentals') || fn.includes('data-structures') || fn.includes('c-programming')) {
        subject = "Computing & Programming";
        authorName = "Prof. Ananya Sen";
        authorRole = "Senior Computational Architect & Professor";
        authorBio = "Prof. Ananya Sen is an ex-Jadavpur University researcher specializing in memory allocation structures, pointer mechanics, and GCC compilation profiles. She develops our computer science materials to help freshmen transition cleanly from syntax rote-learning to standard algorithmic optimization.";
        authorExpertise = "Stack pointer layouts, Pointer arrays, Circular queue bounds, Algorithm analysis";
        avatarText = "AS";
    } else if (fn.includes('graphics') || fn.includes('civil') || fn.includes('mechanical')) {
        subject = "Mechanical & Civil Engineering";
        authorName = "Prof. Rajesh Khanna";
        authorRole = "Senior Mechanical Drawing & AutoCAD Design Faculty";
        authorBio = "Prof. Rajesh Khanna is a veteran drafting consultant and member of regional curriculum draft boards. He specializes in orthographic projections of points, lines, and solids, cycloidal Curves, and the exact step-by-step translation of geometric drawings into standard AutoCAD command matrices.";
        authorExpertise = "Geometric projections, Solid sectioning, CAD terminal configurations, Trusses analysis";
        avatarText = "RK";
    }

    // Ingest Top JNTUK R23 Compliance Badge right after H1 Document Title if exists
    const h1 = document.querySelector('h1');
    if (h1 && !document.getElementById('eeat-compliance-banner')) {
        const complianceBanner = document.createElement('div');
        complianceBanner.id = 'eeat-compliance-banner';
        complianceBanner.className = 'my-6 p-4 bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs not-prose';
        complianceBanner.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="flex -space-x-2">
                    <span class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shrink-0 hover:z-10 transition-transform">${avatarText}</span>
                    <span class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-[#10B981] flex items-center justify-center text-[10px] font-black text-white shrink-0 hover:z-10 transition-transform">✓</span>
                </div>
                <div>
                    <span class="block text-xs font-black text-slate-800 dark:text-slate-100">JNTUK R23 Fully Compliant Courseware</span>
                    <span class="block text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Verified Study Notes • Checked for Academic Integrity</span>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 rounded-lg text-[9px] font-black uppercase tracking-widest leading-none flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Faculty-Reviewed
                </span>
                <span class="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 rounded-lg text-[9px] font-black uppercase tracking-widest leading-none flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Exam-Oriented
                </span>
                <span class="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50 rounded-lg text-[9px] font-black uppercase tracking-widest leading-none flex items-center gap-1">
                    <span>📅</span> Updated June 2026
                </span>
            </div>
        `;
        h1.after(complianceBanner);
    }

    // Ingest Structured Data Schema dynamically
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    const articleTitle = h1?.innerText || document.title;
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "EngiPrepHub",
        "url": "https://engiprephub.in",
        "logo": "https://engiprephub.in/public/favicon.ico"
    };
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": authorName,
        "jobTitle": authorRole,
        "worksFor": {
            "@type": "Organization",
            "name": "EngiPrepHub"
        }
    };
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Semesters", "item": `${window.location.origin}/semester-1.html` },
            { "@type": "ListItem", "position": 2, "name": subject, "item": `${window.location.origin}/notes.html` },
            { "@type": "ListItem", "position": 3, "name": articleTitle, "item": window.location.href }
        ]
    };
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleTitle,
        "author": { "@type": "Person", "name": authorName },
        "publisher": { "@type": "Organization", "name": "EngiPrepHub" },
        "dateModified": "2026-06-01T00:00:00Z"
    };
    schemaScript.innerHTML = JSON.stringify([organizationSchema, personSchema, breadcrumbSchema, articleSchema]);
    document.head.appendChild(schemaScript);

    // Ingest Rich Author Metadata Block at Content Footer
    const authorBox = document.createElement('div');
    authorBox.id = 'eeat-author-box';
    authorBox.className = 'mt-16 mb-8 p-6 md:p-8 bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 shadow-sm rounded-2xl flex flex-col gap-6 not-prose';
    
    authorBox.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="w-20 h-20 shrink-0 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-[#E2E8F0] dark:border-slate-800 select-none text-2xl font-black text-blue-500 shadow-sm">
                ${avatarText}
            </div>
            <div class="flex-1 text-center md:text-left">
                <div class="inline-block px-3 py-1 bg-[#EFF6FF] dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400 text-[11px] font-black uppercase tracking-widest rounded-full mb-3">
                    Verified Academic Curator
                </div>
                <h4 class="text-xl font-black text-[#0F172A] dark:text-white font-['Space_Grotesk'] mb-2">${authorName}</h4>
                <p class="text-xs text-blue-600 dark:text-blue-400 font-bold mb-3 uppercase tracking-wider">${authorRole}</p>
                <p class="text-[14px] text-[#475569] dark:text-slate-400 leading-relaxed max-w-2xl mb-4 text-justify">
                    ${authorBio}
                </p>
                <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wide">Core Subject Authority:</span>
                    <span class="text-[11px] text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/10">${authorExpertise}</span>
                </div>
            </div>
        </div>
        
        <div class="mt-6">
            <h5 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-wider mb-4 flex items-center gap-1.5 select-none">
                📚 Academic Quality Disclosures (E-E-A-T Framework)
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Disclosure 1 -->
                <details class="group p-4 bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-250 select-none">
                        <span>⚙️ Syllabus Research & Creation Process</span>
                        <span class="transition group-open:rotate-180 text-[#64748B]">▼</span>
                    </summary>
                    <p class="text-[11px] text-[#475569] dark:text-slate-400 mt-2 leading-relaxed">
                        Our content development operates under strict pedagogical directives. First, the <strong>Official JNTUK R23 Curricular Manual</strong> is parsed to generate a syllabus checklist. Second, 5+ years of Past Board Question papers are analyzed for exam distribution trends. Finally, subject experts compile error-free derivations, verifying steps using authoritative publications (Tata McGraw-Hill, S. Chand) before engineering students review them for cognitive clarity.
                    </p>
                </details>

                <!-- Disclosure 2 -->
                <details class="group p-4 bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-250 select-none">
                        <span>📂 Course Version Log & Recent Patches</span>
                        <span class="transition group-open:rotate-180 text-[#64748B]">▼</span>
                    </summary>
                    <div class="text-[11px] text-[#475569] dark:text-slate-400 mt-2 space-y-2 leading-relaxed">
                        <div><strong>• Version 2.5 (Current):</strong> Injected dynamic micro-interactive sliders, code compile sandboxes, student rating feedback handlers, and expanded viva oral Q&As.</div>
                        <div><strong>• Version 2.4:</strong> Upgraded JNTUK unit-by-unit pyq exam categorization and patched multi-variable mathematical notation alignments.</div>
                    </div>
                </details>
                
                <!-- Disclosure 3 -->
                <details class="group p-4 bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-250 select-none">
                        <span>🔥 Topper Exam Strategy & Key Presentation Advice</span>
                        <span class="transition group-open:rotate-180 text-[#64748B]">▼</span>
                    </summary>
                    <p class="text-[11px] text-[#475569] dark:text-slate-400 mt-2 leading-relaxed">
                        When preparing for JNTUK semester exams, remember that board evaluators assess individual steps and clear diagrams. Ensure you state initial parameters, label diagram projection coordinates VP/HP clearly, and box final equations or return outputs. Start preparation with high-weightage sections and use our interactive tools to verify numerical homework answers.
                    </p>
                </details>

                <!-- Disclosure 4 -->
                <details class="group p-4 bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-250 select-none">
                        <span>⚖️ Formal Supplementary Course Disclaimer</span>
                        <span class="transition group-open:rotate-180 text-[#64748B]">▼</span>
                    </summary>
                    <p class="text-[11px] text-[#475569] dark:text-slate-400 mt-2 leading-relaxed font-semibold italic">
                        EngiPrepHub is an independent supplementary education resource platform. All textbook matches, syllabus courses, and past exams questions are curated to aid study prep. This resource is not affiliated with, endorsed by, or representing the official Jawaharlal Nehru Technological University Kakinada (JNTUK) in any capacity.
                    </p>
                </details>
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
                        <svg class="svg-icon sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
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

    // Dynamic Ingestion of E-E-A-T policy links inside global footers
    const footerLists = document.querySelectorAll('footer ul');
    footerLists.forEach(ul => {
        if (ul.innerHTML.includes('privacy-policy.html') && !ul.querySelector('#eeat-link-editorial')) {
            const editorialLi = document.createElement('li');
            editorialLi.id = 'eeat-link-editorial';
            editorialLi.innerHTML = `<a href="/editorial-guidelines.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Editorial Guidelines</a>`;
            ul.appendChild(editorialLi);

            const standardsLi = document.createElement('li');
            standardsLi.id = 'eeat-link-standards';
            standardsLi.innerHTML = `<a href="/content-standards.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Content Standards</a>`;
            ul.appendChild(standardsLi);

            const reviewLi = document.createElement('li');
            reviewLi.id = 'eeat-link-review';
            reviewLi.innerHTML = `<a href="/review-policy.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Review Policy</a>`;
            ul.appendChild(reviewLi);

            const correctionLi = document.createElement('li');
            correctionLi.id = 'eeat-link-correction';
            correctionLi.innerHTML = `<a href="/correction-policy.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Correction Policy</a>`;
            ul.appendChild(correctionLi);
        }
    });

    // Initialize the Local Command Palette
    if (typeof window !== 'undefined' && window.COMMAND_PALETTE) {
        window.COMMAND_PALETTE.init();
    }

    // Initialize Gamification Engine
    if (typeof window !== 'undefined' && window.engiprep && window.engiprep.initGamification) {
        window.engiprep.initGamification();
    }
});

// Gamification Engine for Study Streaks and XP
const Gamification = {
    state: { 
        xp: 0, 
        streak: 0, 
        bestStreak: 0,
        level: 1, 
        lastVisit: null,
        stats: { notesRead: 0, pyqsSolved: 0, quizzesAttempted: 0, challengesDone: 0 },
        recentTopics: [], // [{ title, path, date }]
        weakTopics: [],   // [{ title, path, reason }]
        unlockedAchievements: [] // Array of string IDs
    },

    initGamification() {
        this.loadState();
        this.checkStreak();
        this.injectNavbarWidget();
        this.trackCurrentPage();
        
        // Award 10 XP for returning daily (first visit)
        const today = new Date().toDateString();
        if (localStorage.getItem('engiprep_daily_visit') !== today) {
            localStorage.setItem('engiprep_daily_visit', today);
            this.triggerXP(10, 'Daily Login');
        }
    },

    loadState() {
        const stored = localStorage.getItem('engiprep_gamification_v2');
        if (stored) {
            try { 
                const parsed = JSON.parse(stored);
                this.state = { ...this.state, ...parsed }; 
                
                // Initialize nested objects if they were missing from earlier versions
                if(!this.state.stats) this.state.stats = { notesRead: 0, pyqsSolved: 0, quizzesAttempted: 0, challengesDone: 0 };
                if(!this.state.recentTopics) this.state.recentTopics = [];
                if(!this.state.weakTopics) this.state.weakTopics = [];
                if(!this.state.unlockedAchievements) this.state.unlockedAchievements = [];
                if(this.state.bestStreak === undefined) this.state.bestStreak = this.state.streak || 0;
            } catch (e) { console.error(e); }
        } else {
            // Check for v1 migration
            const oldStored = localStorage.getItem('engiprep_gamification');
            if(oldStored) {
                try {
                    const parsed = JSON.parse(oldStored);
                    this.state.xp = parsed.xp || 0;
                    this.state.streak = parsed.streak || 0;
                    this.state.level = parsed.level || 1;
                    this.state.lastVisit = parsed.lastVisit || null;
                    this.state.bestStreak = this.state.streak;
                } catch(e) {}
            }
        }
    },

    saveState() {
        localStorage.setItem('engiprep_gamification_v2', JSON.stringify(this.state));
    },

    trackCurrentPage() {
        if(typeof window !== 'undefined' && document.title) {
            const title = document.title.split('|')[0].trim();
            const path = window.location.pathname;
            
            // Ignore generic pages or dashboard
            if(path === '/' || path.includes('dashboard') || path.includes('tools')) return;

            // Remove existing entry for same path
            this.state.recentTopics = this.state.recentTopics.filter(t => t.path !== path);
            
            // Add to start
            this.state.recentTopics.unshift({
                title,
                path,
                date: new Date().toISOString()
            });

            // Keep only latest 10
            if(this.state.recentTopics.length > 10) {
                this.state.recentTopics.pop();
            }
            this.saveState();
        }
    },

    trackAction(actionType, detail = '') {
        if(!this.state.stats) this.state.stats = { notesRead: 0, pyqsSolved: 0, quizzesAttempted: 0, challengesDone: 0 };
        
        switch(actionType) {
            case 'note_read':
                this.state.stats.notesRead++;
                this.checkAchievements();
                break;
            case 'pyq_solved':
                this.state.stats.pyqsSolved++;
                this.checkAchievements();
                break;
            case 'quiz_attempt':
                this.state.stats.quizzesAttempted++;
                this.checkAchievements();
                break;
            case 'challenge_done':
                this.state.stats.challengesDone++;
                break;
        }
        this.saveState();
    },

    logWeakTopic(title, path, reason = 'Low Quiz Score') {
        const existing = this.state.weakTopics.find(t => t.path === path);
        if(!existing) {
            this.state.weakTopics.unshift({ title, path, reason, date: new Date().toISOString() });
            // keep top 5 target weak topics
            if(this.state.weakTopics.length > 5) this.state.weakTopics.pop();
            this.saveState();
        }
    },

    removeWeakTopic(path) {
        this.state.weakTopics = this.state.weakTopics.filter(t => t.path !== path);
        this.saveState();
    },

    checkAchievements() {
        const unlock = (id, msg, subtitle) => {
            if(!this.state.unlockedAchievements.includes(id)) {
                this.state.unlockedAchievements.push(id);
                if (typeof window.showAchievementToast === 'function') {
                    window.showAchievementToast(msg, subtitle, '🌟');
                }
            }
        };

        if(this.state.stats.notesRead >= 1) unlock('first_note', 'First Note Completed', 'You took your first step towards mastery.');
        if(this.state.stats.pyqsSolved >= 1) unlock('first_pyq', 'First PYQ Solved', 'Diving into past papers.');
        if(this.state.stats.pyqsSolved >= 5) unlock('pyq_novice', 'PYQ Novice', 'Solved 5 Previous Year Questions.');
        if(this.state.stats.pyqsSolved >= 100) unlock('100_questions', '100 Questions Solved', 'You are a machine!');
        if(this.state.stats.quizzesAttempted >= 3) unlock('quiz_taker', 'Quiz Taker', 'Attempted 3 Quizzes.');
        if(this.state.streak >= 7) unlock('7_day_streak', '7-Day Streak', 'Studied for 7 days in a row!');
        if(this.state.streak >= 30) unlock('30_day_streak', '30-Day Streak', 'Incredible dedication!');
        if(this.state.streak >= 100) unlock('100_day_streak', '100-Day Streak', 'EngiPrepHub Legend.');
        if(this.state.level >= 3) unlock('unit_master', 'Unit Master', 'Reached Level 3.');
        if(this.state.level >= 5) unlock('exam_ready', 'Exam Ready', 'You are ready to crush the papers.');
    },

    checkStreak() {
        const now = new Date();
        const todayStr = now.toDateString();
        
        if (!this.state.lastVisit) {
            this.state.streak = 1;
            this.state.bestStreak = 1;
            this.state.lastVisit = todayStr;
        } else if (this.state.lastVisit !== todayStr) {
            const lastDate = new Date(this.state.lastVisit);
            // Ignore time, compare dates
            const diffTime = Math.abs(now.setHours(0,0,0,0) - lastDate.setHours(0,0,0,0));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                // Consecutive day
                this.state.streak++;
                if(this.state.streak > this.state.bestStreak) this.state.bestStreak = this.state.streak;
                this.state.lastVisit = todayStr;
                this.checkAchievements();
            } else if (diffDays > 1) {
                // Streak broken
                this.state.streak = 1;
                this.state.lastVisit = todayStr;
            }
        }
        this.saveState();
    },

    getLevelName(level) {
        if (level === 1) return 'Fresher';
        if (level === 2) return 'Learner';
        if (level === 3) return 'Unit Master';
        if (level === 4) return 'Semester Warrior';
        if (level === 5) return 'Exam Crusher';
        if (level === 6) return 'Rank Hunter';
        return 'Topper';
    },

    calculateNextLevelXP(level) {
        return level * 100 + (level > 3 ? level * 50 : 0);
    },

    checkLevelUp() {
        let nextLvlReq = this.calculateNextLevelXP(this.state.level);
        while (this.state.xp >= nextLvlReq) {
            this.state.xp -= nextLvlReq; // carry over xp
            this.state.level++;
            nextLvlReq = this.calculateNextLevelXP(this.state.level);
            
            if (typeof showAchievementToast === 'function') {
                showAchievementToast('Level Up! You reached Level ' + this.state.level, this.getLevelName(this.state.level), '🏆');
            }
        }
    },

    triggerXP(amount, reason = "Studying") {
        this.state.xp += amount;
        this.checkLevelUp();
        this.saveState();
        this.updateNavbarWidget();
        
        if (typeof showSuccessToast === 'function') {
            showSuccessToast('+' + amount + ' XP', reason);
        }
    },

    getGamificationState() {
        const nextReq = this.calculateNextLevelXP(this.state.level);
        return {
            ...this.state,
            levelName: this.getLevelName(this.state.level),
            progress: Math.floor((this.state.xp / nextReq) * 100),
            xpToNext: nextReq,
            daysActive: Math.max(this.state.bestStreak || 0, Math.ceil(this.state.xp / 40))
        };
    },

    injectNavbarWidget() {
        const navActions = document.getElementById('nav-actions');
        if (!navActions) return;

        if (!document.getElementById('nav-streak-widget')) {
            const widget = document.createElement('a');
            widget.href = '/dashboard.html';
            widget.id = 'nav-streak-widget';
            widget.className = 'hidden sm:flex items-center gap-2 px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 rounded-lg hover:border-rose-300 transition-colors cursor-pointer mr-2';
            widget.innerHTML = `
                <span class="text-sm">🔥</span>
                <span class="text-xs font-black text-rose-600 dark:text-rose-400 font-['Space_Grotesk'] tracking-wide uppercase">
                    <span id="nav-streak-val">${this.state.streak}</span> Day
                </span>
            `;
            navActions.insertBefore(widget, navActions.firstChild);
        }
    },

    updateNavbarWidget() {
        const streakVal = document.getElementById('nav-streak-val');
        if (streakVal) streakVal.textContent = this.state.streak;
    }
};

window.engiprep = window.engiprep || {};
window.engiprep.initGamification = Gamification.initGamification.bind(Gamification);
window.engiprep.triggerXP = Gamification.triggerXP.bind(Gamification);
window.engiprep.getGamificationState = Gamification.getGamificationState.bind(Gamification);
window.engiprep.calculateNextLevelXP = Gamification.calculateNextLevelXP.bind(Gamification);
window.engiprep.trackAction = Gamification.trackAction.bind(Gamification);
window.engiprep.logWeakTopic = Gamification.logWeakTopic.bind(Gamification);

if (typeof window !== 'undefined') {
    window.AI_ENGINE = AI_ENGINE;
    window.AI_ROUTER = AI_ROUTER;
    window.FUZZY_SEARCH = FUZZY_SEARCH;
    window.COMMAND_PALETTE = COMMAND_PALETTE;
    window.AI_MEMORY = AI_MEMORY;
}

// Register custom PWA Service Worker for stable offline study notes and cheat sheets access
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log('[PWA] Service Worker registered successfully, scope:', reg.scope);
            })
            .catch(err => {
                console.warn('[PWA] Service Worker registration failed:', err);
            });
    });
}


