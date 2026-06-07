const fs = require('fs');
const path = require('path');

const publicDir = '.';

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist') && !fullPath.includes('.git') && !fullPath.includes('api') && !fullPath.includes('app') && !fullPath.includes('src')) {
                results = results.concat(getHtmlFiles(fullPath));
            }
        } else if (fullPath.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(publicDir);

const indexContent = fs.readFileSync('index.html', 'utf8');

// The new header block in index.html starts with <!-- Top Header and ends with </header>
const headerRegex = /(<!-- Top Header[\s\S]*?<\/header>)/;
const headerMatch = indexContent.match(headerRegex);

if (!headerMatch) {
    console.error('Could not find header in index.html');
    process.exit(1);
}

const newHeader = headerMatch[1];

const cookieRegex = /(<!-- Comprehensive Cookie Consent Widget -->[\s\S]*?<\/script>)/;
const cookieMatch = indexContent.match(cookieRegex);

if (!cookieMatch) {
    console.error('Could not find cookie banner in index.html');
    process.exit(1);
}

const newCookie = cookieMatch[1];


let updatedCount = 0;

htmlFiles.forEach(file => {
    if (file === 'index.html' || file === 'index.html') return; // ignore index
    
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace old nav or header
    // Some files have <nav class="fixed top-0 ...
    // Some have <header ...
    
    // Try to find the old top-level nav or header.
    // It's usually the first <nav or <header after <body>
    const oldHeaderRegex1 = /<nav\s+class="fixed top-0[^>]*>[\s\S]*?<\/nav>/;
    const oldHeaderRegex2 = /(?:<!--\s*Navbar\s*-->\s*)?<header\s+class="fixed top-0[^>]*>[\s\S]*?<\/header>(?:\s*<!-- Mobile Navigation Menu -->\s*<div[^>]*>[\s\S]*?<\/div>)?/;
    const oldHeaderRegex3 = /(?:<!--\s*Navbar\s*-->\s*)?<nav\s+class="fixed top-0[^>]*>[\s\S]*?<\/nav>/;
    const oldHeaderRegex4 = /<!-- Top Header[\s\S]*?<\/header>/;

    if (oldHeaderRegex4.test(content)) {
        content = content.replace(oldHeaderRegex4, newHeader);
    } else if (oldHeaderRegex2.test(content)) {
        content = content.replace(oldHeaderRegex2, newHeader);
    } else if (oldHeaderRegex3.test(content)) {
        content = content.replace(oldHeaderRegex3, newHeader);
    } else if (oldHeaderRegex1.test(content)) {
        content = content.replace(oldHeaderRegex1, newHeader);
    }

    // Now adding cookie banner
    if (!content.includes('cookie-consent-banner')) {
        // Insert right before </body>
        // if has <!-- Global Footer --> ... it's before main js entry, so before </body> is fine
        content = content.replace('</body>', '\n' + newCookie + '\n</body>');
    }

    // Let's also fix the duplicate script from fix_footer etc if any.
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        updatedCount++;
    }
});

console.log('Updated nav and cookie banner in ' + updatedCount + ' HTML files.');
