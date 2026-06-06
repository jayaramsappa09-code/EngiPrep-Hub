const content = require('./src/content.cjs');
Object.keys(content).forEach((sub, idx) => {
    const slug = sub.toLowerCase().replace(/ /g, '-');
    console.log(`${idx + 1}. [${sub}] -> slug: ${slug}, units: ${content[sub].units.map(u => u.id).join(', ')}`);
});
