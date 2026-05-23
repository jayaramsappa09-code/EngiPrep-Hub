const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const breadcrumbHtml = `
<nav aria-label="Breadcrumb" class="mx-auto max-w-7xl px-6 py-4">
  <ol class="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
    <li><a href="/" class="hover:text-primary">Home</a></li>
    <li class="text-slate-300">/</li>
    <li><span aria-current="page" class="text-primary" id="breadcrumb-current">Notes</span></li>
  </ol>
</nav>`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add breadcrumb after header/nav if not exists
    if (!content.includes('aria-label="Breadcrumb"')) {
        content = content.replace('</header>', `</header>\n${breadcrumbHtml}`);
        // Simple heuristic to set current breadcrumb text
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1].split('|')[0].trim() : 'Page';
        content = content.replace('id="breadcrumb-current">Notes</span>', `id="breadcrumb-current">${title}</span>`);
        
        fs.writeFileSync(file, content);
        console.log("Injected breadcrumbs into " + file);
    }
}
