import fs from 'fs';
const files = [
  'complete-physics-guide.html',
  'complete-chemistry-guide.html',
  'complete-c-programming-guide.html',
  'complete-engineering-graphics-guide.html',
  'ultimate-jntuk-r23-guide.html',
  'complete-first-year-roadmap.html',
  'faq.html'
];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const cleanText = content
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleanText.split(' ').filter(w => w.length > 0).length;
  console.log(`${file}: ${words} words`);
});
