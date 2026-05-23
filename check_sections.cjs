const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let balance = 0;
let out = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    
    balance += openCount;
    balance -= closeCount;
    
    if (line.includes("</section>")) {
        console.log(`End of a section at ${i+1}. Balance: ${balance}`);
    }
}
