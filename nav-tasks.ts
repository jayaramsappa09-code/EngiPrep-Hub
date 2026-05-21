import fs from 'fs';
import path from 'path';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'tasks.html');
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('tasks.html') && content.includes('/dashboard.html')) {
        content = content.replace(
            /(<a[^>]*href="\/dashboard.html"[^>]*>)/, 
            '<a href="/tasks.html" class="hidden md:block px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">Tasks</a>\n                $1'
        );
        fs.writeFileSync(file, content);
        console.log(`Added Tasks link to ${file}`);
    }
});
