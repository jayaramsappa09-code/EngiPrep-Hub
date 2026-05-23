const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const cookieLink = '<li><a href="/cookie-policy.html" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Cookie Policy</a></li>';

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Security & Legal') && !content.includes('Cookie Policy')) {
        content = content.replace('<li><a href="/sitemap.xml" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Sitemap</a></li>', 
            '<li><a href="/sitemap.xml" class="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Sitemap</a></li>\n                        ' + cookieLink);
        fs.writeFileSync(file, content);
        console.log("Updated footer in " + file);
    }
}
