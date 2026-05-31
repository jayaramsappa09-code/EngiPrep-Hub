import fs from 'fs';
const htmlFiles = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.html'));
console.log(JSON.stringify(htmlFiles, null, 2));
