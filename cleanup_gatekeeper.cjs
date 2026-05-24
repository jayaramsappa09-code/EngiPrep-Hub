const fs = require('fs');
const path = require('path');

// Pages that must REMAIN locked (and can keep the black screen fallback until JS runs)
const protectedPages = [
    'dashboard.html',
    'profile.html',
    'bookmarks.html',
    'tasks.html',
    'admin.html',
    'notifications.html',
    'ai-professor.html'
];

const files = fs.readdirSync(__dirname);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const isProtected = protectedPages.some(page => file === page);
        
        if (!isProtected) {
            const filePath = path.join(__dirname, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Remove the inline hiding script for public pages
            if (content.includes("<script>document.documentElement.style.display = 'none';</script>")) {
                content = content.replace("<script>document.documentElement.style.display = 'none';</script>", "<!-- Inline blocker removed for SEO/AdSense Crawlability -->");
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Cleaned up visibility blocking script in public page: ${file}`);
            }
        }
    }
});
