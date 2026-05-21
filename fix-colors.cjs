const fs = require('fs');

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = dir + '/' + file;
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist')) traverse(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let orig = content;
            
            // replace x50 with x00
            content = content.replace(/(text-[a-z]+)-[1-9]50/g, (match, prefix) => {
                let currentNumStr = match.split('-').pop();
                let correctedNum = parseInt(currentNumStr) - 50;
                return `${prefix}-${correctedNum}`;
            });

            if (content !== orig) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed invalid tailwind colors in', fullPath);
            }
        }
    });
}
traverse('.');
