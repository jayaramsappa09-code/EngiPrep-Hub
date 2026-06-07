const fs = require('fs');

const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

// Section headers
content = content.replace(
    /<h2 class="text-3xl md:text-4xl font-black text-slate-900/g,
    '<h2 class="scroll-animate opacity-0 text-3xl md:text-4xl font-black text-slate-900'
);

content = content.replace(
    /<h2 class="text-3xl font-black text-slate-900 dark:text-white/g,
    '<h2 class="scroll-animate opacity-0 text-3xl font-black text-slate-900 dark:text-white'
);

content = content.replace(
    /<h2 class="text-3xl md:text-4xl font-extrabold mb-4/g,
    '<h2 class="scroll-animate opacity-0 text-3xl md:text-4xl font-extrabold mb-4'
);

fs.writeFileSync(file, content);
