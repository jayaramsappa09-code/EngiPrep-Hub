import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('.');
const htmlFiles = files.filter(f => f.endsWith('.html'));

let updated = 0;
for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('ai-widget.ts')) {
        content = content.replace('</body>', '    <script type="module" src="/src/ai-widget.ts"></script>\n</body>');
        fs.writeFileSync(file, content);
        updated++;
    }
}
console.log(`Injected AI widget into ${updated} files.`);
