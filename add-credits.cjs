const fs = require('fs');
const cheerio = require('cheerio');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && (f.includes('-unit-') || f.includes('-notes.html') || f.includes('engineering-mathematics-2.html')));

const bio = `
<footer class="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
    <div class="glass-card p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
        <h4 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3">About the Academic Team</h4>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Engi Prep Hub is a modern engineering education platform helping JNTUK students with notes, PYQs, Engineering Graphics tutorials, calculators, and exam preparation resources. Our content is curated by a dedicated Academic Team of university toppers and subject matter experts to provide high-yield, structured, and easy-to-scan study materials for JNTUK R23 Regulation.
        </p>
        <div class="mt-6 flex items-center justify-between text-xs text-slate-500">
            <span>Written by: Engi Prep Hub Academic Team</span>
            <span>Last Updated: ${new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
        </div>
    </div>
</footer>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false });
    
    // Add Bio before body end
    if (!$('footer').length) {
        $('body').append(bio);
        fs.writeFileSync(file, $.html());
        console.log('Added credits to', file);
    }
});
