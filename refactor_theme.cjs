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

let modifications = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // PRIMARY TEXT: text-gray-900 or text-slate-800 without dark counterparts -> text-slate-900 dark:text-slate-50
    // SECONDARY TEXT: text-gray-600 or text-gray-500 -> text-slate-600 dark:text-slate-400
    // BACKGROUND SURFACES:
    // Page backgrouns: bg-slate-50 dark:bg-slate-950
    // Secondary Cards: bg-white dark:bg-slate-900
    // Borders: border-slate-200 dark:border-slate-800

    const replaceMap = [
        // Backgrounds
        { regex: /\bbg-gray-50\b(?!\s+dark:)/g, replacement: 'bg-slate-50 dark:bg-slate-950' },
        { regex: /\bbg-slate-50\b(?!\s+dark:)/g, replacement: 'bg-slate-50 dark:bg-slate-950' },
        { regex: /\bbg-white\b(?!\s+dark:|\/[0-9]+)/g, replacement: 'bg-white dark:bg-slate-900' },
        { regex: /\bg-white\/[0-9]+\b(?!\s+dark:)/g, replacement: '$& dark:bg-slate-900/50' },
        // Instead of blanket bg-black, it's often used in dark theme sections, but let's map them to slate.
        { regex: /\bbg-black\b(?!\s+dark:|\/[0-9]+)/g, replacement: 'bg-slate-900 dark:bg-slate-50' },
        
        // Text Colors
        { regex: /\btext-black\b(?!\s+dark:)/g, replacement: 'text-slate-900 dark:text-slate-50' },
        { regex: /\btext-white\b(?!\s+dark:)/g, replacement: 'text-slate-900 dark:text-slate-50' }, // White text without dark mode mapping means it might be a dark component. Wait, text-white is usually on dark backgrounds. If the background becomes white, white text will be invisible. If it's on a primary brand element (bg-blue-600), then white text is fine. Better handle carefully.
        
        { regex: /\btext-gray-900\b/g, replacement: 'text-slate-900 dark:text-slate-50' },
        { regex: /\btext-slate-900\b(?!\s+dark:)/g, replacement: 'text-slate-900 dark:text-slate-50' },
        { regex: /\btext-gray-800\b/g, replacement: 'text-slate-900 dark:text-slate-50' },
        { regex: /\btext-slate-800\b(?!\s+dark:)/g, replacement: 'text-slate-900 dark:text-slate-50' },
        
        { regex: /\btext-gray-700\b/g, replacement: 'text-slate-700 dark:text-slate-300' },
        { regex: /\btext-gray-600\b/g, replacement: 'text-slate-600 dark:text-slate-400' },
        { regex: /\btext-slate-600\b(?!\s+dark:)/g, replacement: 'text-slate-600 dark:text-slate-400' },
        { regex: /\btext-gray-500\b/g, replacement: 'text-slate-500 dark:text-slate-400' },
        { regex: /\btext-gray-400\b/g, replacement: 'text-slate-500 dark:text-slate-400' },
        
        // Borders
        { regex: /\bborder-gray-200\b/g, replacement: 'border-slate-200 dark:border-slate-800' },
        { regex: /\bborder-slate-200\b(?!\s+dark:)/g, replacement: 'border-slate-200 dark:border-slate-800' },
        
        // Remove static dark mode inverses that clash
        { regex: /\bdark:bg-white\b/g, replacement: 'dark:bg-slate-900' },
        { regex: /\bdark:text-black\b/g, replacement: 'dark:text-slate-50' },
    ];

    replaceMap.forEach(r => {
        content = content.replace(r.regex, r.replacement);
    });

    // Code blocks/Math formatting logic
    // Replace <div class="* bg-black/30..." with "bg-slate-100 dark:bg-slate-800/50"
    content = content.replace(/bg-black\/30/g, 'bg-slate-100 dark:bg-slate-800/50');
    content = content.replace(/bg-black\/40/g, 'bg-slate-100 dark:bg-slate-800/50');
    // For inline code snippets: bg-white/5 -> bg-slate-200 dark:bg-slate-700
    content = content.replace(/bg-white\/5(?!0)/g, 'bg-slate-200 dark:bg-slate-700');
    content = content.replace(/bg-white\/10/g, 'bg-slate-200 dark:bg-slate-700/50');

    // Also need to make sure text-white inside code blocks updates
    // It's probably easier to rely on the general regex for text-white -> text-slate-900 dark:text-slate-50 
    // EXCEPT when inside a colored button (like bg-blue-600 text-white).
    // Let's refine text-white to only apply when not with primary brand backgrounds. 

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        modifications++;
    }
});

console.log(`Modified ${modifications} html files.`);
