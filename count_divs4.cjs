const fs = require('fs');
const html = fs.readFileSync('./engineering-graphics-lab.html', 'utf8');
const lines = html.split('\n');

let balance = 0;
// trace strictly inside the module-sandboxes section
for (let i = 262; i < 825; i++) {
    const line = lines[i];
    const openCount = (line.match(/<div/gi) || []).length;
    const closeCount = (line.match(/<\/div>/gi) || []).length;
    
    balance += openCount;
    balance -= closeCount;
    
    if (line.includes("id=\"interactive-suite-container\"")) {
        console.log("interactive suite start: ", balance, "at line", i+1)
    }
    if (line.includes("id=\"step-player-sec\"")) console.log("step-player-sec start: ", balance, "at line", i+1)
    if (line.includes("id=\"scales-solver\"")) console.log("scales-solver start: ", balance, "at line", i+1)
    if (line.includes("id=\"quad-solver\"")) console.log("quad-solver start: ", balance, "at line", i+1)
    if (line.includes("id=\"conic-solver\"")) console.log("conic-solver start: ", balance, "at line", i+1)
    if (line.includes("id=\"solid-solver\"")) console.log("solid-solver start: ", balance, "at line", i+1)
    if (line.includes("id=\"ai-evaluation-panel\"")) console.log("ai start: ", balance, "at line", i+1)
}
