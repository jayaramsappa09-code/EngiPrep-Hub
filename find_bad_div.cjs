const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let balance = 2; // we enter the section at balance 2

for (let i = 261; i < 826; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    
    balance += openCount;
    balance -= closeCount;
    
    if (balance < 2) {
        console.log(`Balance dipped below 2 at line ${i+1}: ${line}`);
        break;
    }
}
