const fs = require('fs');

const completeBtnHtml = `
            <!-- Gamification & Progress Marker -->
            <div class="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                <button class="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto complete-topic-btn">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    Mark as Complete <span class="bg-emerald-700/50 px-2 py-0.5 rounded text-xs ml-2">+10 XP</span>
                </button>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-4 font-bold max-w-sm mx-auto">Login via Dashboard to save your progress, secure your streak, and unlock AI features.</p>
            </div>
`;

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = dir + '/' + file;
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist')) traverse(fullPath);
        } else if (fullPath.endsWith('.html') && fullPath.includes('unit-')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            if (!content.includes('complete-topic-btn')) {
                // Find the end of the <main> element or the last </section> before </main>
                content = content.replace(/(<\/main>)/, completeBtnHtml + '\\n$1');
                fs.writeFileSync(fullPath, content);
                console.log('Injected gamification into', fullPath);
            }
        }
    });
}
traverse('.');
