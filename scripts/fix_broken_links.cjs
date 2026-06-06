const fs = require('fs');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  if (content.includes('"/author/engiprephub-academic-team"')) {
    content = content.replace(/"\/author\/engiprephub-academic-team"/g, '"/author-academic-team.html"');
    changed = true;
  }
  
  if (f === 'physics-notes.html' && content.includes('href="/engineering-physics-unit-2"')) {
    content = content.replace(/href="\/engineering-physics-unit-2"/g, 'href="/engineering-physics-unit-2.html"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Fixed links in ${f}`);
  }
});
