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
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
};

const htmlFiles = walk(process.cwd());

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Add dark:text-blue-400 wherever text-blue-600 is used on text (not bg)
    const classRegex = /class="([^"]+)"/g;
    content = content.replace(classRegex, (match, classList) => {
        let classes = classList.split(/\s+/);
        
        if (classes.includes('text-blue-600') && !classes.includes('dark:text-blue-400') && !classes.some(c => c.startsWith('dark:text-'))) {
            classes.push('dark:text-blue-400');
        }
        
        if (classes.includes('hover:text-blue-600') && !classes.includes('dark:hover:text-blue-400')) {
            classes.push('dark:hover:text-blue-400');
        }

        return `class="${Array.from(new Set(classes)).join(' ')}"`;
    });

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Blue text contrast fixed");
