const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
const fileSet = new Set(htmlFiles);
const brokenLinks = new Map();

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /href=["']([^"']+)["']/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let link = match[1];
        if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('#')) {
            continue;
        }
        
        // Exclude template literals
        if (link.includes('${')) {
             continue;
        }

        // Exclude javascript hrefs
        if (link.startsWith('javascript:')) {
             continue;
        }
        
        let targetFile = link.split('#')[0].split('?')[0]; // remove hash and query
        
        if (targetFile === '') {
             continue; // just a hash link
        }
        
        if (targetFile.startsWith('/')) {
            targetFile = targetFile.substring(1);
        }
        
        if (targetFile === '') {
             continue; // valid '/'
        }

        const existsInRoot = fileSet.has(targetFile) || fs.existsSync(path.join(__dirname, targetFile));
        const existsInPublic = fs.existsSync(path.join(__dirname, 'public', targetFile));

        if (!existsInRoot && !existsInPublic) {
            if (!brokenLinks.has(targetFile)) {
                brokenLinks.set(targetFile, []);
            }
            brokenLinks.get(targetFile).push(file);
        }
    }
});

let output = '';
for (const [link, files] of brokenLinks.entries()) {
    output += `Broken link: ${link}\n`;
    output += `  Found in: ${Array.from(new Set(files)).join(', ')}\n\n`;
}

if (output === '') {
    console.log('No broken links found!');
} else {
    console.log(output);
}
