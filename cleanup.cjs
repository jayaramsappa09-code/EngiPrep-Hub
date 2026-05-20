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

    // Clean up duplicate text-slate declarations
    const classRegex = /class="([^"]+)"/g;
    content = content.replace(classRegex, (match, classList) => {
        let classes = classList.split(/\s+/);
        
        let hasPrimaryDark = classes.includes('dark:text-slate-50') || classes.includes('dark:text-white');
        if (hasPrimaryDark) {
            classes = classes.filter(c => c !== 'dark:text-slate-900' && c !== 'dark:text-slate-800' && c !== 'text-slate-950');
        }

        let hasPrimaryLight = classes.includes('text-slate-900') || classes.includes('text-slate-800');
        if (classes.includes('text-slate-900') && classes.includes('text-slate-800')) {
            classes = classes.filter(c => c !== 'text-slate-800');
        }
        
        // Remove trailing borders without color for codeblocks? No border is fine if accompanied by a color.
        
        // Remove duplicate dark:border
        if (classes.includes('dark:border-slate-800') && classes.includes('dark:border-slate-850/50')) {
            classes = classes.filter(c => c !== 'dark:border-slate-850/50');
        }

        return `class="${Array.from(new Set(classes)).join(' ')}"`;
    });

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Cleanup complete");
