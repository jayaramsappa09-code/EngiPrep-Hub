const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let balance = 0;
// strictly inside the module-sandboxes section
for (let i = 262; i < 825; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    balance += openCount;
    balance -= closeCount;
    
    if (balance < 0) {
        console.log(`First drop below 0 at line ${i+1}: balance=${balance}, content:`, line);
        break;
    }
}
