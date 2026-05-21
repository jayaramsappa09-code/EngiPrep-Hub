import fs from 'fs';
let content = fs.readFileSync('src/tasks-app.ts', 'utf8');
content = content.replace(/\\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('src/tasks-app.ts', content);
