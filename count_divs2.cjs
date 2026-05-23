const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let divOpen = 0;
let divClose = 0;

// strictly inside the module-sandboxes section
for (let i = 262; i < 825; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    divOpen += openCount;
    divClose += closeCount;
}
console.log(`Inside module-sandboxes (263-825): Open=${divOpen}, Close=${divClose}, Diff=${divOpen - divClose}`);
