const fs = require('fs');
const path = require('path');

const publicDir = '.'; // project root where HTML files are

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist') && !fullPath.includes('.git') && !fullPath.includes('api') && !fullPath.includes('app') && !fullPath.includes('src')) {
                results = results.concat(getHtmlFiles(fullPath));
            }
        } else if (fullPath.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(publicDir);

const newFooterHtml = `<!-- Global Footer -->
    <footer class="pt-24 pb-12 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 transition-colors" aria-label="Academic Resource Footer">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
                <div>
                    <a href="/" class="flex items-center gap-3 mb-6" aria-label="EngiPrep Hub Homepage Link">
                        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 text-slate-50">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                            </svg>
                        </div>
                        <span class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tighter">EngiPrep Hub</span>
                    </a>
                    <p class="text-sm text-slate-400 dark:text-slate-400 leading-loose mb-8 font-medium">
                        The ultimate JNTUK R23 engineering academic ecosystem. Built for future scholars, by university toppers.
                    </p>
                    <div class="flex gap-4">
                        <a href="mailto:engiprephub@gmail.com" class="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Send us an Email at engiprephub@gmail.com">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.433-.232 3.01.765.577-1 .577-2.338 0-3.338-.577-1-1.864-1.341-3.01-.768l-.01.005c-1.146.573-1.488 1.861-.915 3.01s1.861 1.488 3.01.915c1.146-.573 1.488-1.861.915-3.01l-.01.005z"/></svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Resources</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/notes.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Study Notes PDF</a></li>
                        <li><a href="/pyqs.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">JNTUK Solved PYQs</a></li>
                        <li><a href="/cheat-sheets.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Formula Sheets</a></li>
                        <li><a href="/tools.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">SGPA Calculators</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Organization</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/about.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">About Us</a></li>
                        <li><a href="/faq.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">FAQ</a></li>
                        <li><a href="/blog.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Academic Blog</a></li>
                        <li><a href="/contribute.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Become a Contributor</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Security & Legal</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/privacy-policy.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Privacy Policy</a></li>
                        <li><a href="/cookie-policy.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Cookie Policy</a></li>
                        <li><a href="/terms-conditions.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Terms & Conditions</a></li>
                        <li><a href="/contact.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-12 border-t border-slate-100 dark:border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold">© 2026 EngiPrep Hub. All rights reserved.</p>
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold italic tracking-tight">Engineered for Academic Excellence</p>
            </div>
        </div>
    </footer>`;

let changedCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Some files have <!-- Global Footer --> ... </footer>
    // others have <footer ...> ... </footer>
    // Let's replace anything from <footer to </footer> if it looks like the main footer
    // To be safe, we replace the entire <footer ...> ... </footer> block that is at the end of the body.
    
    // Standardize to use the new footer
    const footerRegex = /(<!-- Global Footer -->\s*)?<footer[^>]*>[\s\S]*?<\/footer>/;
    
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooterHtml);
        fs.writeFileSync(file, content);
        changedCount++;
    }
});

console.log('Replaced footer in ' + changedCount + ' HTML files.');
