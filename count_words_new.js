import fs from 'fs';
const files = [
  'complete-physics-guide.html',
  'complete-chemistry-guide.html',
  'complete-c-programming-guide.html',
  'complete-engineering-graphics-guide.html',
  'ultimate-jntuk-r23-guide.html',
  'complete-first-year-roadmap.html',
  'faq.html',
  'beee-notes.html',
  'physics-notes.html',
  'c-programming-notes.html',
  'beee-exam-prep.html',
  'chemistry-topper-notes.html',
  'engineering-mathematics-1.html',
  'engineering-mathematics-2.html'
];
files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const cleanText = content
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = cleanText.split(' ').filter(w => w.length > 0).length;
    console.log(`${file}: ${words} words`);
  } else {
    console.log(`${file}: Not found`);
  }
});
