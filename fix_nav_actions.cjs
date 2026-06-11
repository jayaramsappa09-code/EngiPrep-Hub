const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<div class="flex items-center gap-3">')) {
     content = content.replace(
        /<div class="flex items-center gap-3">/g, 
        '<div class="flex items-center gap-3" id="nav-actions">'
     );
     fs.writeFileSync(file, content);
     console.log(`Fixed ${file}`);
  }
});
