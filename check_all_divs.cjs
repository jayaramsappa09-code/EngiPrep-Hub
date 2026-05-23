const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let balance = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    
    balance += openCount;
    balance -= closeCount;
    if (balance < 0) {
        console.log(`Balance dipped below 0 at line ${i+1}! Content: ${line}`);
        break;
    }
}
console.log(`Final balance: ${balance}`);
