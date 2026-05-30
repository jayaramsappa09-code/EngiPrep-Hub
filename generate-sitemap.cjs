const fs = require('fs');
const path = require('path');

const domain = 'https://engiprephub.in';
const publicDir = path.join(__dirname, 'dist');

if (!fs.existsSync(publicDir)) {
  console.log('dist directory not found. Please run build first.');
  process.exit(1);
}

// Complete clean mapping of file to its optimized clean URL route
const fileToCleanUrlMapping = {
  'index.html': '/',
  'about.html': '/about',
  'contact.html': '/contact',
  'privacy-policy.html': '/privacy-policy',
  'cookie-policy.html': '/cookie-policy',
  'terms-conditions.html': '/terms-and-conditions',
  'faq.html': '/faq',
  'blog.html': '/blog',
  'tools.html': '/tools',
  'notes.html': '/notes',
  'cheat-sheets.html': '/cheat-sheets',
  'ai-professor.html': '/ai-professor-jntuk-study-assistant',
  'semester-1.html': '/jntuk-r23-semester-1',
  'semester-2.html': '/jntuk-r23-semester-2',
  'maths-1.html': '/engineering-mathematics-1-notes-jntuk-r23',
  'engineering-mathematics-unit-1.html': '/engineering-mathematics-unit-1-differential-equations',
  'engineering-mathematics-unit-2.html': '/engineering-mathematics-unit-2-higher-order-differential-equations',
  'engineering-mathematics-unit-3.html': '/engineering-mathematics-unit-3-partial-differential-equations',
  'engineering-mathematics-unit-4.html': '/engineering-mathematics-unit-4-vector-differentiation',
  'engineering-mathematics-unit-5.html': '/engineering-mathematics-unit-5-vector-integration',
  'physics-notes.html': '/engineering-physics-notes-jntuk-r23',
  'engineering-physics-unit-1.html': '/engineering-physics-unit-1-wave-optics',
  'engineering-physics-unit-2.html': '/engineering-physics-unit-2-lasers-and-fiber-optics',
  'engineering-physics-unit-3.html': '/engineering-physics-unit-3-quantum-mechanics',
  'engineering-physics-unit-4.html': '/engineering-physics-unit-4-semiconductor-physics',
  'engineering-physics-unit-5.html': '/engineering-physics-unit-5-modern-physics',
  'chemistry-topper-notes.html': '/engineering-chemistry-notes-jntuk-r23',
  'chemistry-unit-1.html': '/engineering-chemistry-unit-1-structure-and-bonding',
  'chemistry-unit-2.html': '/engineering-chemistry-unit-2-modern-engineering-materials',
  'chemistry-unit-3.html': '/engineering-chemistry-unit-3-electrochemistry',
  'chemistry-unit-4.html': '/engineering-chemistry-unit-4-polymer-chemistry',
  'chemistry-unit-5.html': '/engineering-chemistry-unit-5-water-technology',
  'c-programming-notes.html': '/c-programming-notes-jntuk-r23',
  'c-programming-unit-1.html': '/c-programming-unit-1-fundamentals',
  'c-programming-unit-2.html': '/c-programming-unit-2-control-statements',
  'c-programming-unit-3.html': '/c-programming-unit-3-functions-and-arrays',
  'c-programming-unit-4.html': '/c-programming-unit-4-pointers-and-structures',
  'c-programming-unit-5.html': '/c-programming-unit-5-files-and-dynamic-memory',
  'data-structures-basics.html': '/data-structures-notes-jntuk-r23',
  'data-structures-unit-1.html': '/data-structures-unit-1-introduction',
  'data-structures-unit-2.html': '/data-structures-unit-2-linked-lists',
  'data-structures-unit-3.html': '/data-structures-unit-3-stacks-and-queues',
  'data-structures-unit-4.html': '/data-structures-unit-4-trees',
  'data-structures-unit-5.html': '/data-structures-unit-5-graphs-and-hashing',
  'beee-notes.html': '/basic-electrical-engineering-notes',
  'basic-electrical-engineering-unit-1.html': '/basic-electrical-engineering-unit-1-electrical-fundamentals',
  'basic-electrical-engineering-unit-2.html': '/basic-electrical-engineering-unit-2-dc-circuits',
  'basic-electrical-engineering-unit-3.html': '/basic-electrical-engineering-unit-3-ac-circuits',
  'basic-electrical-engineering-unit-4.html': '/basic-electrical-engineering-unit-4-transformers',
  'basic-electrical-engineering-unit-5.html': '/basic-electrical-engineering-unit-5-electrical-machines',
  'basic-civil-mechanical-engineering.html': '/basic-civil-mechanical-engineering-notes',
  'basic-civil-and-mechanical-engineering-unit-1.html': '/basic-civil-mechanical-unit-1-construction-materials',
  'basic-civil-and-mechanical-engineering-unit-2.html': '/basic-civil-mechanical-unit-2-surveying',
  'basic-civil-and-mechanical-engineering-unit-3.html': '/basic-civil-mechanical-unit-3-building-planning',
  'basic-civil-and-mechanical-engineering-unit-4.html': '/basic-civil-mechanical-unit-4-thermodynamics',
  'basic-civil-and-mechanical-engineering-unit-5.html': '/basic-civil-mechanical-unit-5-manufacturing-processes',
  'communicative-english.html': '/communicative-english-notes',
  'communicative-english-unit-1.html': '/communicative-english-unit-1-language-skills',
  'communicative-english-unit-2.html': '/communicative-english-unit-2-reading-comprehension',
  'communicative-english-unit-3.html': '/communicative-english-unit-3-writing-skills',
  'communicative-english-unit-4.html': '/communicative-english-unit-4-professional-communication',
  'communicative-english-unit-5.html': '/communicative-english-unit-5-presentation-skills',
  'engineering-graphics-lab.html': '/engineering-graphics-notes',
  'engineering-graphics-enter-lab.html': '/engineering-graphics-lab',
  'jntuk-r23-previous-question-papers.html': '/jntuk-r23-previous-question-papers'
};

const prebuiltBlogsSlugs = [
  '/blog/jntuk-r23-syllabus-guide',
  '/blog/how-to-score-9-cgpa-in-btech',
  '/blog/engineering-mathematics-important-questions',
  '/blog/engineering-physics-important-questions',
  '/blog/engineering-chemistry-important-questions',
  '/blog/c-programming-roadmap',
  '/blog/data-structures-roadmap',
  '/blog/jntuk-exam-preparation-guide',
  '/blog/engineering-graphics-drawing-tips',
  '/blog/best-study-techniques-for-engineering-students'
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// 1. Add mapped clean page URLs
for (const [file, pathName] of Object.entries(fileToCleanUrlMapping)) {
  if (fs.existsSync(path.join(publicDir, file))) {
    const loc = `${domain}${pathName === '/' ? '' : pathName}`;
    const priority = pathName === '/' ? '1.0' : (pathName.includes('unit-') ? '0.7' : '0.9');
    sitemap += `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
  }
}

// 2. Add predefined blogs static slugs
prebuiltBlogsSlugs.forEach(slug => {
  sitemap += `  <url>
    <loc>${domain}${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

const publicFolderRef = path.join(__dirname, 'public');
if (fs.existsSync(publicFolderRef)) {
  fs.writeFileSync(path.join(publicFolderRef, 'sitemap.xml'), sitemap);
}

console.log('Successfully generated clean sitemap.xml files');
