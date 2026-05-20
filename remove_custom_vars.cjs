const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
                results = results.concat(walk(file));
            }
        } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
};

const files = walk(process.cwd());

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace custom CSS variable usages everywhere with static dark mode pairs requested
    content = content.replace(/\bbg-background\b/g, 'bg-slate-50 dark:bg-slate-950');
    content = content.replace(/\bbg-surface\b/g, 'bg-white dark:bg-slate-900');
    content = content.replace(/\btext-text-main\b/g, 'text-slate-900 dark:text-slate-50');
    content = content.replace(/\btext-text-muted\b/g, 'text-slate-600 dark:text-slate-400');
    content = content.replace(/\bborder-border\b/g, 'border-slate-200 dark:border-slate-800');
    
    // Also remove them from style.css completely so there's no confusion, though tailwind might complain if they're used. We are wiping their usage.
    
    // "bento-card" in style.css uses @apply bg-surface ... Let's make sure bento cards explicitly have these colors in style.css if it's there.
    
    if (file.endsWith('.css')) {
        content = content.replace(/@apply(.*?)\bbg-background\b/g, '@apply$1 bg-slate-50 dark:bg-slate-950');
        content = content.replace(/@apply(.*?)\bbg-surface\b/g, '@apply$1 bg-white dark:bg-slate-900');
        content = content.replace(/@apply(.*?)\bborder-border\b/g, '@apply$1 border-slate-200 dark:border-slate-800');
        content = content.replace(/@apply(.*?)\btext-text-main\b/g, '@apply$1 text-slate-900 dark:text-slate-50');
        content = content.replace(/@apply(.*?)\btext-text-muted\b/g, '@apply$1 text-slate-600 dark:text-slate-400');
    }

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Custom var cleanup complete");
