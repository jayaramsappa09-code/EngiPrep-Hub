const fs = require('fs');
const path = require('path');

const targetFiles = [
    'index.html',
    'notes.html',
    'pyqs.html',
    'tools.html',
    'cheat-sheets.html'
]; // Only root navigation pages need the bottom nav
// Actually, it's better to add the nav to all HTML files just in case, or limit to these

function fixAllHtmlFiles() {
    const files = fs.readdirSync(__dirname);
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    const mobileNavHTML = `
    <!-- Mobile Bottom Navigation -->
    <nav class="md:hidden fixed bottom-0 w-full z-[100] bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] transition-colors">
        <div class="flex items-center justify-around h-16 px-2">
            <a href="/index.html" class="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 focus:text-blue-600 dark:focus:text-blue-400">
                <svg class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                <span class="text-[10px] font-bold">Home</span>
            </a>
            <a href="/notes.html" class="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 focus:text-indigo-600 dark:focus:text-indigo-400">
                <svg class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                <span class="text-[10px] font-bold">Notes</span>
            </a>
            <a href="/pyqs.html" class="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 focus:text-rose-600 dark:focus:text-rose-400">
                <svg class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                <span class="text-[10px] font-bold">PYQs</span>
            </a>
            <a href="/tools.html" class="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 focus:text-emerald-600 dark:focus:text-emerald-400">
               <svg class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span class="text-[10px] font-bold">Tools</span>
            </a>
            <a href="/profile.html" class="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 focus:text-purple-600 dark:focus:text-purple-400">
                <svg class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                <span class="text-[10px] font-bold">Profile</span>
            </a>
        </div>
    </nav>
    <style>@media (max-width: 768px) { body { padding-bottom: 5rem; } }</style>
`;

    for (const file of htmlFiles) {
        let content = fs.readFileSync(file, 'utf8');

        // Apply bottom nav
        if(!content.includes('Mobile Bottom Navigation')) {
            content = content.replace('</body>', `${mobileNavHTML}\n</body>`);
        }

        // Simplify header on mobile (Rule 3)
        // Ensure Engineering Concepts subtitle is hidden on mobile
        content = content.replace(
            /<span class="text-\[9px\](.*?)mt-1">/g, 
            '<span class="hidden md:inline-block text-[9px] $1mt-1">'
        );
        // Hide top mobile menu entirely if it exists and uses id="mobile-menu"
        // Wait, rule 3 says "Menu Only" in the header if needed. The prompt says "Mobile header: Logo, Search, Menu Only."
        // We will leave the regular hamburger menu for now, but ensure bottom nav works.
        // And hide subscribe/theme toggle from top bar maybe? The prompt just says Logo, Search, Menu.
        // We'll hide the Subscribe button on mobile, it already is hidden natively in our template (hidden md:flex).
        
        fs.writeFileSync(file, content, 'utf8');
    }
}

fixAllHtmlFiles();
