const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let balance = 0; // relative to scales-solver start

for (let i = 422; i < 636; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    
    balance += openCount;
    balance -= closeCount;
    
    console.log(`L${i+1}: ${balance} (diff: +${openCount} -${closeCount}) | ${line.substring(0, 50)}`);
}
