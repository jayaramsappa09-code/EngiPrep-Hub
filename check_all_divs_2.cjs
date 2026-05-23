const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let balance = 0;
let out = []
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    
    balance += openCount;
    balance -= closeCount;
    out.push(balance)
}
console.log('Balance at end of <nav> (130):', out[129])
console.log('Balance at start of <main> (133):', out[132])
console.log('Balance before <div grid> (202):', out[201])
console.log('Balance before lg:col-span-9 (259):', out[257])
console.log('Balance at end of step-player (420):', out[420])
console.log('Balance at end of module-sandboxes (826):', out[826])
console.log('Balance at 1186 (</section>):', out[1186])
console.log('Final balance:', out[out.length-1])
