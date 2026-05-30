const fs = require('fs');
const path = require('path');

const publicDir = '.';

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist') && !fullPath.includes('.git')) {
                results = results.concat(getHtmlFiles(fullPath));
            }
        } else if (fullPath.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const fileToCleanUrlMapping = {
  'index.html': '/',
  'about.html': '/about',
  'contact.html': '/contact',
  'privacy-policy.html': '/privacy-policy',
  'cookie-policy.html': '/cookie-policy',
  'terms-conditions.html': '/terms-and-conditions',
  'faq.html': '/faq',
  'blog.html': '/blog',
  'blogs.html': '/blog',
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

const legacyPathReplacements = [
  { from: '/engineering-physics', to: '/engineering-physics-notes-jntuk-r23' },
  { from: '/engineering-chemistry', to: '/engineering-chemistry-notes-jntuk-r23' },
  { from: '/engineering-mathematics', to: '/engineering-mathematics-1-notes-jntuk-r23' },
  { from: '/engineering-graphics', to: '/engineering-graphics-notes' },
  { from: '/communicative-english', to: '/communicative-english-notes' },
  { from: '/basic-electrical-engineering', to: '/basic-electrical-engineering-notes' },
  { from: '/c-programming', to: '/c-programming-notes-jntuk-r23' },
  { from: '/data-structures', to: '/data-structures-notes-jntuk-r23' },
  { from: '/basic-civil-and-mechanical-engineering', to: '/basic-civil-mechanical-engineering-notes' },
  { from: '/privacy', to: '/privacy-policy' },
  { from: '/terms', to: '/terms-and-conditions' },
  { from: '/ai-professor', to: '/ai-professor-jntuk-study-assistant' },
  { from: '/pyqs', to: '/jntuk-r23-previous-question-papers' }
];

const htmlFiles = getHtmlFiles(publicDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. First, replace all old clean path prefixes that might be legacy
    legacyPathReplacements.forEach(rep => {
        // Find href="/engineering-physics" or href="/engineering-physics/" or href="/engineering-physics#section"
        // and replace with the designated clean URL, avoiding double replacements
        const regexExact = new RegExp(`href=["']` + rep.from + `/?(["'#])`, 'g');
        content = content.replace(regexExact, `href="${rep.to}$1`);
    });

    // 2. Next, replace exact matches with raw file names in href attributes
    for (const [rawFile, cleanUrl] of Object.entries(fileToCleanUrlMapping)) {
        // Regex handles href="maths-1.html", href="/maths-1.html", href="./maths-1.html", and handles hashes e.g. maths-1.html#section
        const regex = new RegExp(`href=["'](?:\\.\\/|\\/)?` + rawFile.replace('.', '\\.') + `(?:\\/)?(#.*?)?["']`, 'g');
        content = content.replace(regex, (match, anchor) => {
            const dest = cleanUrl + (anchor || '');
            return `href="${dest}"`;
        });
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Cleaned up links in: ${file}`);
    }
});

console.log('Static link sanitation completed successfully.');
