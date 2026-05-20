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
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
};

const htmlFiles = walk(process.cwd());

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Fix duplicated text-slate-900
    content = content.replace(/text-slate-950 dark:text-slate-900 dark:text-slate-50/g, 'text-slate-900 dark:text-slate-50');

    // 2. Fix buttons / badges / highlights. 
    // If an element has bg-blue-xxx, bg-indigo-xxx, bg-primary, btn-primary, bg-emerald-xxx, bg-rose-xxx 
    // AND text-slate-900 dark:text-slate-50, we revert it to text-white.
    
    // Example: class="... bg-blue-600 ... text-slate-900 dark:text-slate-50 ..."
    // The regex approach needs to match within the same class attribute.
    
    const classRegex = /class="([^"]+)"/g;
    content = content.replace(classRegex, (match, classList) => {
        const classes = classList.split(/\s+/);
        
        const hasDarkBg = classes.some(c => 
            (c.startsWith('bg-blue-') && c !== 'bg-blue-50' && c !== 'bg-blue-100') ||
            (c.startsWith('bg-indigo-') && c !== 'bg-indigo-50' && c !== 'bg-indigo-100') ||
            (c.startsWith('bg-emerald-') && c !== 'bg-emerald-50' && c !== 'bg-emerald-100') ||
            (c.startsWith('bg-rose-') && c !== 'bg-rose-50' && c !== 'bg-rose-100') ||
            c.startsWith('bg-primary') && !c.includes('/5') && !c.includes('/10') ||
            c === 'btn-primary' ||
            c === 'btn-secondary'
        );

        if (hasDarkBg) {
            // Revert back and dark classes for text to text-white
            const newClasses = classes.filter(c => c !== 'text-slate-900' && c !== 'dark:text-slate-50');
            if (classes.includes('text-slate-900') || classes.includes('dark:text-slate-50')) {
                newClasses.push('text-white');
            }
            return `class="${newClasses.join(' ')}"`;
        }
        
        // Similarly for SVG icons over colored backgrounds that are NOT themselves bg- colored but are positioned over it.
        // For SVGs inside the logo, we know it's "text-slate-900 dark:text-slate-50" inside SVG, and we can just replace it.
        
        return match;
    });

    // Manual fix for specific known issues:
    // Logo SVG
    content = content.replace(/<svg class="([^"]*)text-slate-900 dark:text-slate-50([^"]*)" viewBox="0 0 24 24"/g, '<svg class="$1text-white$2" viewBox="0 0 24 24"');

    // "Skip to main content"
    content = content.replace(/bg-blue-600 text-slate-900 dark:text-slate-50/g, 'bg-blue-600 text-white');

    // Try to catch text-slate-800 dark:text-slate-200 -> text-slate-900 dark:text-slate-50 as requested by instructions
    // Actually the prompt says: Primary Text (text-slate-900 / dark:text-slate-50)
    // Secondary Text (text-slate-600 / dark:text-slate-400)
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed theme issues");
