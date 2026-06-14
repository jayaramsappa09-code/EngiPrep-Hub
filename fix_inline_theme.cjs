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

let totalReplacements = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;

    content = content.replace(
        `if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }`,
        `const savedTheme = localStorage.getItem('color-theme');
        if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark', 'theme-dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('theme-light');
        }`
    );

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        totalReplacements++;
        console.log(`  - Updated theme inline script in: ${path.basename(file)}`);
    } else {
        // Handle varying indentation
        const lines = content.split('\\n');
        let modified = false;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes("if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage)")) {
                let match = lines[i].match(/^\\s*/);
                let indent = match ? match[0] : '';
                lines[i] = indent + "const savedTheme = localStorage.getItem('color-theme');";
                lines[i+1] = indent + "if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {";
                lines[i+2] = indent + "    document.documentElement.classList.add('dark', 'theme-dark');";
                lines[i+3] = indent + "} else {";
                lines[i+4] = indent + "    document.documentElement.classList.remove('dark');";
                lines[i+5] = indent + "    document.documentElement.classList.add('theme-light');";
                lines[i+6] = indent + "}";
                modified = true;
                break;
            }
        }
        if (modified) {
            fs.writeFileSync(file, lines.join('\\n'), 'utf8');
            totalReplacements++;
            console.log(`  - Updated theme inline script in: ${path.basename(file)} (using line replacement)`);
        }
    }
});

console.log(`Success! Fixed hardcoded themes in ${totalReplacements} files.`);
