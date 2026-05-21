import fs from 'fs';

const files = [
  'chemistry-unit-1.html',
  'chemistry-unit-2.html',
  'chemistry-unit-3.html',
  'chemistry-unit-4.html',
  'chemistry-unit-5.html',
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Fix duplicates
  content = content.replace(/border border-slate-800 border border-slate-800/g, 'border border-slate-800');
  content = content.replace(/bg-slate-900 bg-slate-900/g, 'bg-slate-900');
  content = content.replace(/bg-slate-950 bg-slate-900/g, 'bg-slate-900');
  
  // also fix the nav bar backdrop-blur
  content = content.replace(/backdrop-blur-md/g, 'backdrop-blur-xl bg-slate-950/80');

  fs.writeFileSync(file, content);
  console.log(`Cleaned duplicates in ${file}`);
});
