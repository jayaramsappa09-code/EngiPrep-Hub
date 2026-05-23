const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    let title = titleMatch ? titleMatch[1] : 'EngiPrep Hub';
    if (!title.includes('EngiPrep Hub')) {
        title = title.replace('| EngiPrep Hub', '').trim() + ' | EngiPrep Hub';
        content = content.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    }

    // Canonical
    const canonical = `<link rel="canonical" href="https://engiprephub.in/${file === 'index.html' ? '' : file}">`;
    if (!content.includes('rel="canonical"')) {
        content = content.replace('<head>', `<head>\n    ${canonical}`);
    }

    // Description/OG (Simplified)
    const desc = "JNTUK R23 engineering notes, PYQs, and study materials for engineering students.";
    if (!content.includes('name="description"')) {
        content = content.replace('<head>', `<head>\n    <meta name="description" content="${desc}">`);
    }
    
    fs.writeFileSync(file, content);
    console.log("Updated metadata in " + file);
}
