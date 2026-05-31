import fs from 'fs';
import path from 'path';

// Load metadata or analyze existing workspace files
const rootDir = process.cwd();
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('Found HTML files:', htmlFiles.length);

const seoMappings: Record<string, string> = {
  // Existing explicitly mapped subject routes
  'physics-notes.html': '/engineering-physics',
  'chemistry-topper-notes.html': '/engineering-chemistry',
  'maths-1.html': '/engineering-mathematics',
  'engineering-mathematics-2.html': '/engineering-mathematics-2',
  'engineering-graphics-lab.html': '/engineering-graphics',
  'communicative-english.html': '/communicative-english',
  'beee-notes.html': '/basic-electrical-engineering',
  'c-programming-notes.html': '/c-programming',
  'data-structures-basics.html': '/data-structures',
  'basic-civil-mechanical-engineering.html': '/basic-civil-and-mechanical-engineering',

  // Existing unit routes
  'engineering-physics-unit-1.html': '/physics/unit-1',
  'engineering-physics-unit-2.html': '/physics/unit-2',
  'engineering-physics-unit-3.html': '/physics/unit-3',
  'engineering-physics-unit-4.html': '/physics/unit-4',
  'engineering-physics-unit-5.html': '/physics/unit-5',

  'chemistry-unit-1.html': '/chemistry/unit-1',
  'chemistry-unit-2.html': '/chemistry/unit-2',
  'chemistry-unit-3.html': '/chemistry/unit-3',
  'chemistry-unit-4.html': '/chemistry/unit-4',
  'chemistry-unit-5.html': '/chemistry/unit-5',

  'engineering-mathematics-unit-1.html': '/maths/unit-1',
  'engineering-mathematics-unit-2.html': '/maths/unit-2',
  'engineering-mathematics-unit-3.html': '/maths/unit-3',
  'engineering-mathematics-unit-4.html': '/maths/unit-4',
  'engineering-mathematics-unit-5.html': '/maths/unit-5',

  'c-programming-unit-1.html': '/c-programming/unit-1',
  'c-programming-unit-2.html': '/c-programming/unit-2',
  'c-programming-unit-3.html': '/c-programming/unit-3',
  'c-programming-unit-4.html': '/c-programming/unit-4',
  'c-programming-unit-5.html': '/c-programming/unit-5',

  'data-structures-unit-1.html': '/data-structures/unit-1',
  'data-structures-unit-2.html': '/data-structures/unit-2',
  'data-structures-unit-3.html': '/data-structures/unit-3',
  'data-structures-unit-4.html': '/data-structures/unit-4',
  'data-structures-unit-5.html': '/data-structures/unit-5',

  'basic-electrical-engineering-unit-1.html': '/beee/unit-1',
  'basic-electrical-engineering-unit-2.html': '/beee/unit-2',
  'basic-electrical-engineering-unit-3.html': '/beee/unit-3',
  'basic-electrical-engineering-unit-4.html': '/beee/unit-4',
  'basic-electrical-engineering-unit-5.html': '/beee/unit-5',

  'basic-civil-and-mechanical-engineering-unit-1.html': '/basic-civil-mechanical/unit-1',
  'basic-civil-and-mechanical-engineering-unit-2.html': '/basic-civil-mechanical/unit-2',
  'basic-civil-and-mechanical-engineering-unit-3.html': '/basic-civil-mechanical/unit-3',
  'basic-civil-and-mechanical-engineering-unit-4.html': '/basic-civil-mechanical/unit-4',
  'basic-civil-and-mechanical-engineering-unit-5.html': '/basic-civil-mechanical/unit-5',

  'communicative-english-unit-1.html': '/english/unit-1',
  'communicative-english-unit-2.html': '/english/unit-2',
  'communicative-english-unit-3.html': '/english/unit-3',
  'communicative-english-unit-4.html': '/english/unit-4',
  'communicative-english-unit-5.html': '/english/unit-5',

  'engineering-graphics-enter-lab.html': '/engineering-graphics/projections',
};

// Generate mappings for any other missing html file
for (const file of htmlFiles) {
  if (seoMappings[file]) continue;
  
  if (file === 'index.html') {
    seoMappings[file] = '/';
  } else if (file === '404.html') {
    seoMappings[file] = '/404';
  } else if (file === 'privacy-policy.html') {
    seoMappings[file] = '/privacy';
  } else if (file === 'terms-conditions.html') {
    seoMappings[file] = '/terms';
  } else {
    // Generate slug from filename
    const slug = '/' + file.replace('.html', '')
                          .replace(/-notes$/, '')
                          .replace(/-topper-notes$/, '');
    seoMappings[file] = slug;
  }
}

console.log('SEO Mappings generated:', Object.keys(seoMappings).length);

// Let's check which static files exist or are referenced
const allTargets = new Set(Object.values(seoMappings));

// Link scan
let ScannedCount = 0;
let FixedCount = 0;
let BrokenCount = 0;
const BrokenLinks: { file: string, link: string, match: string }[] = [];

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  ScannedCount++;

  // Find all <a href="..."> tags
  const aRegex = /href=["']([^"']*)["']/g;
  let match;
  while ((match = aRegex.exec(content)) !== null) {
    const rawLink = match[1];
    
    // Skip external links, anchors, tele, emails, standard JS
    if (rawLink.startsWith('http') || rawLink.startsWith('//') || rawLink.startsWith('#') || rawLink.startsWith('mailto:') || rawLink.startsWith('tel:') || rawLink.startsWith('javascript:')) {
      continue;
    }

    // Resolve what page it's looking for
    let resolved = rawLink.split('?')[0].split('#')[0];
    if (resolved === '' || resolved === '/') continue;

    // Remove leading slash for local mapping
    let cleanResolved = resolved.startsWith('/') ? resolved.slice(1) : resolved;
    
    // Check if it's an existing HTML file directly
    let exists = false;
    if (fs.existsSync(path.join(rootDir, cleanResolved))) {
      exists = true;
    } else if (fs.existsSync(path.join(rootDir, cleanResolved + '.html'))) {
      exists = true;
      cleanResolved += '.html';
    }

    // Check if there is an explicit SEO mapping
    if (seoMappings[cleanResolved]) {
      exists = true;
    } else if (htmlFiles.includes(cleanResolved)) {
      exists = true;
    }

    if (!exists) {
      BrokenCount++;
      BrokenLinks.push({ file, link: rawLink, match: match[0] });
    }
  }
}

console.log('Total files checked:', ScannedCount);
console.log('Broken links found:', BrokenCount);
console.log(JSON.stringify(BrokenLinks.slice(0, 20), null, 2));
