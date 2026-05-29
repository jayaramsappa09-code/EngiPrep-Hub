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
            const name = path.basename(file);
            // Process note and unit pages
            if (
                name.includes('unit-') || 
                name.includes('-notes') || 
                name.includes('maths-1.html') || 
                name.includes('civil-mechanical') || 
                name.includes('english') || 
                name.includes('graphics-lab') || 
                name.includes('notebook')
            ) {
                results.push(file);
            }
        }
    });
    return results;
};

const htmlFiles = walk(process.cwd());
console.log(`Found ${htmlFiles.length} note/unit files to map theme colors dynamically.`);

let totalReplacements = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;

    const replacements = [
        // Background buttons and indicators
        { from: /\bbg-blue-600\b/g, to: 'bg-primary' },
        { from: /\bbg-blue-500\b/g, to: 'bg-primary' },
        { from: /\bhover:bg-blue-700\b/g, to: 'hover:opacity-90' },
        { from: /\bhover:bg-blue-600\b/g, to: 'hover:opacity-90' },

        // Text color classes
        { from: /\btext-blue-650\b/g, to: 'text-primary' },
        { from: /\btext-blue-600\b/g, to: 'text-primary' },
        { from: /\btext-blue-550\b/g, to: 'text-primary' },
        { from: /\btext-blue-500\b/g, to: 'text-primary' },
        { from: /\btext-blue-450\b/g, to: 'text-primary' },
        { from: /\btext-blue-400\b/g, to: 'text-primary' },
        { from: /\btext-blue-300\b/g, to: 'text-primary/80' },
        
        // Hover text color
        { from: /\bhover:text-blue-600\b/g, to: 'hover:text-primary' },
        { from: /\bhover:text-blue-500\b/g, to: 'hover:text-primary' },
        { from: /\bhover:text-blue-400\b/g, to: 'hover:text-primary' },
        { from: /\bdark:hover:text-blue-400\b/g, to: 'dark:hover:text-accent' },
        
        // Border focus and colors
        { from: /\bfocus:ring-blue-500\b/g, to: 'focus:ring-primary' },
        { from: /\bfocus:ring-blue-400\b/g, to: 'focus:ring-primary' },
        { from: /\bfocus:border-blue-500\b/g, to: 'focus:border-primary' },
        { from: /\bborder-blue-500\b/g, to: 'border-primary' },
        { from: /\bborder-blue-600\b/g, to: 'border-primary' },

        // Transparent combinations and badges
        { from: /\bbg-blue-500\/10\b/g, to: 'bg-primary/10' },
        { from: /\bbg-blue-500\/20\b/g, to: 'bg-primary/20' },
        { from: /\bbg-blue-600\/10\b/g, to: 'bg-primary/10' },
        { from: /\bbg-blue-600\/20\b/g, to: 'bg-primary/20' },
        { from: /\bbg-blue-900\/10\b/g, to: 'bg-primary/10' },
        { from: /\bhover:bg-blue-600\/20\b/g, to: 'hover:bg-primary/20' },
        
        { from: /\bborder-blue-500\/10\b/g, to: 'border-primary/10' },
        { from: /\bborder-blue-500\/20\b/g, to: 'border-primary/20' },
        { from: /\bborder-blue-500\/40\b/g, to: 'border-primary/40' },
        { from: /\bhover:border-blue-500\/40\b/g, to: 'hover:border-primary/40' },

        // Shadows
        { from: /\bshadow-blue-500\/20\b/g, to: 'shadow-primary/10' },
        { from: /\bshadow-blue-600\/30\b/g, to: 'shadow-primary/15' },
        
        // Dark mode accents
        { from: /\bdark:text-blue-400\b/g, to: 'dark:text-accent' },
        { from: /\bdark:text-blue-500\b/g, to: 'dark:text-accent' },
        { from: /\bdark:bg-blue-900\/40\b/g, to: 'dark:bg-primary/20' },
        { from: /\bdark:bg-blue-950\/10\b/g, to: 'dark:bg-primary/10' },
        { from: /\bdark:bg-blue-900\/10\b/g, to: 'dark:bg-primary/10' },
        { from: /\bdark:border-blue-900\/30\b/g, to: 'dark:border-primary/10' },
        
        // Light high-contrast boxes
        { from: /\bbg-blue-10n\b/g, to: 'bg-primary/10' },
        { from: /\bbg-blue-100\b/g, to: 'bg-primary/10' },
        { from: /\bbg-blue-50\b/g, to: 'bg-primary/5' },
        { from: /\bborder-blue-200\b/g, to: 'border-primary/20' },
        { from: /\btext-blue-700\b/g, to: 'text-primary' },
        { from: /\btext-blue-800\b/g, to: 'text-primary' }
    ];

    replacements.forEach(rep => {
        content = content.replace(rep.from, rep.to);
    });

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        totalReplacements++;
        console.log(`  - Updated colors in: ${path.basename(file)}`);
    }
});

console.log(`Success! Fixed hardcoded themes in ${totalReplacements} files.`);
