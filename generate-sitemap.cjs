const fs = require('fs');
const path = require('path');

const domain = 'https://engiprephub.in';
const publicDir = path.join(__dirname, 'dist');

if (!fs.existsSync(publicDir)) {
  console.log('dist directory not found. Please run build first.');
  process.exit(1);
}

const files = fs.readdirSync(publicDir);
const htmlFiles = files.filter(f => f.endsWith('.html'));

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

htmlFiles.forEach(file => {
  const urlPath = file === 'index.html' ? '' : `/${file.replace(/\.html$/, '')}`;
  sitemap += `  <url>
    <loc>${domain}${urlPath}</loc>
    <changefreq>weekly</changefreq>
    <priority>${file === 'index.html' ? '1.0' : '0.8'}</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Generated sitemap.xml in dist/ directory');
