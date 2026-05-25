const fs = require('fs');
let html = fs.readFileSync('engineering-mathematics-2.html', 'utf8');
html = html.replace(/Mathematics III/g, 'Mathematics II');
html = html.replace(/Maths III/g, 'Maths II');
html = html.replace(/Mathematics II\./g, 'Mathematics II.');
fs.writeFileSync('engineering-mathematics-2.html', html);
