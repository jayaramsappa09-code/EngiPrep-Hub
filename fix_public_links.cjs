const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
let count = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    content = content.replace(/\/public\/logo\.png/g, '/logo.png');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});
console.log(`Updated ${count} files with /public/logo.png fixes.`);
