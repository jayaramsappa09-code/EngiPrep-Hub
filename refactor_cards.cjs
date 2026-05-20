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

    const classRegex = /class="([^"]+)"/g;
    content = content.replace(classRegex, (match, classList) => {
        let classes = classList.split(/\s+/);
        
        let newClasses = [];
        for (let c of classes) {
            // Remove corrupted replacements like `bg-white` and `dark:bg-slate-900/[0.01]` if they appear separated by mistake?
            // Actually the regex output was `bg-white dark:bg-slate-900/[0.01]` which are two tokens: `bg-white` and `dark:bg-slate-900/[0.01]`
            // Wait, my replacement "bg-white/[0.01]" -> replaced "bg-white" with "bg-white dark:bg-slate-900", so it became "bg-white dark:bg-slate-900/[0.01]".
            // This is actually TWO tokens! "bg-white" and "dark:bg-slate-900/[0.01]".
            
            // Let's identify the corrupted opacities and rebuild the secondary cards correctly.
            if (c.match(/^dark:bg-slate-900\/\[?[0-9\.]+\]?$/) || c.match(/^bg-white\/\[?[0-9\.]+\]?$/)) {
                // Ignore, we will explicitly add `bg-white dark:bg-slate-900` next if glass-card or similar context
                continue; 
            }
            if (c === 'bg-white' && classes.some(x => x.startsWith('dark:bg-slate-900/['))) {
                continue; // We'll re-add it cleanly
            }
            if (c === 'bg-slate-100' && classes.some(x => x.startsWith('dark:bg-slate-800/['))) {
                continue;
            }
            if (c.match(/^dark:bg-slate-800\/\[?[0-9\.]+\]?$/) || c.match(/^bg-slate-100\/\[?[0-9\.]+\]?$/)) {
                continue;
            }
            
            // Clean up borders
            if (c.startsWith('border-white/')) {
                // border-white/5 -> border-slate-200 dark:border-slate-800
                continue;
            }

            if (c === 'border-slate-200' && classes.some(x => x.startsWith('dark:border-slate-800'))) {
                 // Already present
                 continue;
            }
            
            newClasses.push(c);
        }

        // Add semantic cards background if it looks like a card (p-4 to p-12, rounded-xl etc)
        // Check if we stripped out backgrounds
        // If it was a card!
        
        let originalHasGlassOpacity = classes.some(c => c.startsWith('dark:bg-slate-900/[') || c.startsWith('bg-white/[') || (c === 'bg-white' && classList.includes('dark:bg-slate-900/[')));
        let isCodeBlock = classes.includes('p-4') && (classList.includes('bg-slate-100') || classes.some(x => x.startsWith('bg-black/')));
        
        if (originalHasGlassOpacity || classes.includes('glass-card') || classes.includes('card')) {
            // Apply Secondary Cards styling
            if (!newClasses.includes('bg-white')) newClasses.push('bg-white');
            if (!newClasses.includes('dark:bg-slate-900')) newClasses.push('dark:bg-slate-900');
            if (!newClasses.includes('shadow-sm')) newClasses.push('shadow-sm'); // give cards a shadow in light mode
        }
        
        // Add borders back correctly
        if (classes.some(c => c.startsWith('border-white/'))) {
             if (!newClasses.includes('border-slate-200')) newClasses.push('border-slate-200');
             if (!newClasses.includes('dark:border-slate-800')) newClasses.push('dark:border-slate-800');
             if (!newClasses.includes('border')) newClasses.push('border');
        }

        // Fix mathematical blocks/formulas that had bg-slate-100 dark:bg-slate-800/50 added/broken
        // If it's a code snippet or math block
        if (classes.some(x => x.startsWith('dark:bg-slate-800/[')) || isCodeBlock) {
             if (!newClasses.includes('bg-slate-100')) newClasses.push('bg-slate-100');
             if (!newClasses.includes('dark:bg-slate-800/50')) newClasses.push('dark:bg-slate-800/50');
        }

        // Fix "hover:bg-white dark:bg-slate-900/[0.03]" corrupted hovers
        newClasses = newClasses.filter(c => !c.match(/^hover:bg-white$/) && !c.match(/^hover:dark:bg-slate-900/));
        if (classes.some(c => c.match(/^hover:bg-white/) || c.match(/^dark:bg-slate-900\/\[\d/))) {
             // Let's just add proper hover for cards
             if (originalHasGlassOpacity || classes.includes('glass-card')) {
                 newClasses.push('hover:bg-slate-50', 'dark:hover:bg-slate-800', 'transition-colors');
             }
        }

        // Fix unreadable text colors that got missed
        // Check for text-white overriding
        if (newClasses.includes('text-white') && !newClasses.some(c => c.startsWith('bg-blue') || c.startsWith('btn-primary') || c.startsWith('bg-primary') || c.startsWith('bg-emerald') || c.startsWith('bg-red') || c.startsWith('bg-rose') || c.startsWith('bg-amber') || c.startsWith('bg-indigo'))) {
             // In light mode, text-white on bg-white is invisible.
             // If there is no primary BG, replace text-white with text-slate-900 dark:text-slate-50
             newClasses = newClasses.filter(c => c !== 'text-white');
             newClasses.push('text-slate-900', 'dark:text-slate-50');
        }

        // Ensure text-slate-[color] uses matching dark mode
        // Secondary Text: text-slate-600 / dark:text-slate-400
        if (newClasses.includes('text-slate-500') || newClasses.includes('text-slate-600')) {
             if (!newClasses.includes('dark:text-slate-400')) {
                   newClasses.push('dark:text-slate-400');
             }
        }

        return `class="${Array.from(new Set(newClasses)).join(' ')}"`;
    });

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Refactored layout styling");
