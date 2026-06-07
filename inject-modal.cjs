const fs = require('fs');
const path = require('path');

const publicDir = '.';

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

const modalHtml = `
    <!-- Subscribe Modal -->
    <div id="subscribe-modal" class="fixed inset-0 z-[1000] hidden items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onclick="document.getElementById('subscribe-modal').classList.add('hidden')"></div>
        <div class="relative bg-white dark:bg-slate-950 max-w-md w-full rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-up">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <button class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" onclick="document.getElementById('subscribe-modal').classList.add('hidden')">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2">Join 10,000+ Students</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6 font-medium">Get the latest notes, exam tips, and exclusive study guides delivered fresh to your inbox.</p>
            <form id="subscribe-form" onsubmit="event.preventDefault(); document.getElementById('subscribe-form-btn').innerHTML = 'Subscribed &check;'; document.getElementById('subscribe-form-btn').classList.add('bg-emerald-600'); setTimeout(() => document.getElementById('subscribe-modal').classList.add('hidden'), 2000);" class="flex flex-col gap-4">
                <input type="email" required placeholder="Enter your college email..." class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-slate-900 dark:text-white">
                <button type="submit" id="subscribe-form-btn" class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md">Subscribe Now</button>
            </form>
            <p class="text-xs text-center mt-4 text-slate-500 dark:text-slate-500">We respect your inbox. No spam, ever.</p>
        </div>
    </div>
`;

let count = 0;
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('subscribe-modal')) {
        content = content.replace('</body>', modalHtml + '\n</body>');
        fs.writeFileSync(file, content);
        count++;
    }
});

console.log('Injected subscribe modal into ' + count + ' files.');
