const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let divOpen = 0;
let divClose = 0;

for (let i = 258; i < 828; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    divOpen += openCount;
    divClose += closeCount;
    
    // Check local balance for the block
    if (divOpen - divClose < 0) {
        console.log(`Line ${i + 1} has an extra closing div: ${line}`);
    }
}
console.log(`Total Open (259-828):`, divOpen);
console.log(`Total Close (259-828):`, divClose);
console.log(`Difference:`, divOpen - divClose);
