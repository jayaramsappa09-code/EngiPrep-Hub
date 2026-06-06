const fs = require('fs');

const content = fs.readFileSync('./src/predefinedNotes.js', 'utf8');

// A very simple regex check to see if there are missing slugs
const objs = content.match(/{\s*id:[^}]+}/g) || [];
console.log(objs.length);
