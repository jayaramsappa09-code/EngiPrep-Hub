const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes("document.documentElement.style.display = 'none';")) {
        content = content.replace(/<script>\s*document\.documentElement\.style\.display\s*=\s*'none';\s*<\/script>/g, '');
        fs.writeFileSync(file, content);
        console.log("Fixed " + file);
    }
}
