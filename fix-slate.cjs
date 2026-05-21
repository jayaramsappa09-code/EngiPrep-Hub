const fs = require('fs');

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = dir + '/' + file;
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules')) traverse(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('text-slate-650')) {
                content = content.replace(/text-slate-650/g, 'text-slate-600');
                fs.writeFileSync(fullPath, content);
            }
        }
    });
}
traverse('.');
