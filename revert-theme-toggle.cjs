const fs = require('fs');

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = dir + '/' + file;
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist')) traverse(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Revert it
            let origContent = content;
            if (content.includes('<div class="flex items-center gap-2">')) {
                // Find blocks like:
                // <div class="flex items-center gap-2">\s*<button id="theme-toggle" .*?</button>\s*(<div[^>]*id="nav-actions"[^>]*>)\s*</div>
                const regex = /<div class="flex items-center gap-2">[\s\S]*?<button id="theme-toggle"[\s\S]*?<\/button>\s*(<div[^>]*id="nav-actions"[^>]*>)\s*<\/div>/g;
                content = content.replace(regex, '$1');
                
                // ALSO fix earlier injections:
                if (content === origContent) {
                    const regex2 = /<button id="theme-toggle"[\s\S]*?<\/button>\s*(<div[^>]*id="nav-actions"[^>]*>)/g;
                    content = content.replace(regex2, '$1');
                }
                
                if (content !== origContent) {
                    fs.writeFileSync(fullPath, content);
                    console.log('Reverted theme toggle from', fullPath);
                }
            } else if (content.includes('id="theme-toggle"')) {
                const regex2 = /<button id="theme-toggle"[\s\S]*?<\/button>\s*(<div[^>]*id="nav-actions"[^>]*>)/g;
                content = content.replace(regex2, '$1');
                if (content !== origContent) {
                    fs.writeFileSync(fullPath, content);
                    console.log('Reverted theme toggle from', fullPath);
                }
            }
        }
    });
}
traverse('.');
