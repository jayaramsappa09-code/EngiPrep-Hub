import fs from 'fs';

const files = [
  'index.html',
  'dashboard.html',
  'chemistry-topper-notes.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Background and Main fixes
  content = content.replace(/bg-\[#[0-9a-fA-F]+\]/g, 'bg-slate-950');
  content = content.replace(/bg-transparent/g, 'bg-slate-950');
  
  // Replace card backgrounds
  content = content.replace(/bg-[-a-z]+-950\/[0-9]+/g, 'bg-slate-900 border border-slate-800');
  content = content.replace(/bg-black\/[0-9]+/g, 'bg-slate-900');
  content = content.replace(/bg-slate-900\/[0-9]+/g, 'bg-slate-900');
  content = content.replace(/border-white\/5/g, 'border-slate-800');
  content = content.replace(/border-white\/10/g, 'border-slate-700');
  content = content.replace(/border-[-a-z]+-500\/[0-9]+/g, 'border-slate-800');
  
  // Cards
  // Any rounded-2xl needs standard card classes if background looks muddy
  content = content.replace(/class="([^"]*rounded-2xl[^"]*)"/g, (match, classes) => {
      let newClasses = classes;
      if (!newClasses.includes('hover:border-blue-500/40')) {
          newClasses += ' hover:border-blue-500/40 transition-all duration-300';
      }
      if (!newClasses.includes('bg-slate-900') && !newClasses.includes('bg-slate-950')) {
          newClasses = newClasses.replace(/bg-[-a-z0-9]+\/?[0-9]*/g, '');
          newClasses += ' bg-slate-900';
      }
      return `class="${newClasses.trim().replace(/\s+/g, ' ')}"`;
  });

  // Text sizes fixes
  content = content.replace(/text-\[8px\]/g, 'text-xs');
  content = content.replace(/text-\[9px\]/g, 'text-xs');
  content = content.replace(/text-\[9\.5px\]/g, 'text-xs');
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  
  // Specific wrong Tailwind classes
  content = content.replace(/text-slate-450/g, 'text-slate-400');
  content = content.replace(/text-rose-505/g, 'text-rose-500');
  content = content.replace(/border-purple-650/g, 'border-purple-600');
  
  // Formulas highlight
  content = content.replace(/<p class="([^"]*font-mono[^"]*)">/g, '<p class="$1 bg-slate-800/80 p-2 rounded-lg text-sky-400 font-bold tracking-wider inline-block">');

  // Text Colors Contrast
  content = content.replace(/text-slate-500/g, 'text-slate-400');
  
  // Typography fixes
  content = content.replace(/leading-relaxed/g, 'leading-loose'); // Give more breath

  // Ensure high contrast headings
  content = content.replace(/text-slate-200/g, 'text-slate-50');
  content = content.replace(/text-white/g, 'text-slate-50');
  
  // Headings
  content = content.replace(/<h([1-6]) class="([^"]*)"/g, (match, level, classes) => {
      let newCls = classes.replace(/font-bold/g, 'font-black');
      return `<h${level} class="${newCls}"`;
  });
  
  // Fix duplicates
  content = content.replace(/border border-slate-800 border border-slate-800/g, 'border border-slate-800');
  content = content.replace(/bg-slate-900 bg-slate-900/g, 'bg-slate-900');
  content = content.replace(/bg-slate-950 bg-slate-900/g, 'bg-slate-900');
  content = content.replace(/backdrop-blur-md/g, 'backdrop-blur-xl bg-slate-950/80');

  fs.writeFileSync(file, content);
  console.log(`Refactored ${file}`);
});
