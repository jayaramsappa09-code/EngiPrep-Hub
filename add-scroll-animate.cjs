const fs = require('fs');

const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Add scroll animations to Hero tags
content = content.replace(
    /<h1 class="text-4xl/,
    '<h1 class="scroll-animate opacity-0 text-4xl'
);
content = content.replace(
    /<p class="text-lg md:text-xl/,
    '<p class="scroll-animate opacity-0 [animation-delay:200ms] text-lg md:text-xl'
);
content = content.replace(
    /<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">/,
    '<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 scroll-animate opacity-0 [animation-delay:400ms]">'
);

// 2. Add scroll animations to Bento cards
const cardRegex = /<div class="bg-white dark:bg-slate-950 p-8 rounded-3xl/g;
let cardIndex = 1;
content = content.replace(cardRegex, () => {
    let delay = (cardIndex % 3) * 150;
    cardIndex++;
    return `<div class="bg-white dark:bg-slate-950 p-8 rounded-3xl scroll-animate opacity-0 [animation-delay:${delay}ms]`;
});

// Write it back
fs.writeFileSync(file, content);
console.log('Added scroll classes');
