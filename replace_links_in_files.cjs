const fs = require('fs');
const path = require('path');

const DIRECTORY = __dirname;

// List of files / folders to ignore
const IGNORED_PATHS = [
  'node_modules',
  '.git',
  'dist',
  'replace_links_in_files.cjs', // ignore self
];

const URL_REPLACEMENTS = [
  // Previous Year Question Papers (PYQs)
  { search: /\/pyqs\.html/gi, replace: '/jntuk-r23-previous-question-papers' },
  { search: /href="\/pyqs"/gi, replace: 'href="/jntuk-r23-previous-question-papers"' },
  { search: /href='\/pyqs'/gi, replace: "href='/jntuk-r23-previous-question-papers'" },
  { search: /window\.location\.href\s*=\s*['"]\/pyqs['"]/gi, replace: 'window.location.href="/jntuk-r23-previous-question-papers"' },
  { search: /window\.location\.href\s*=\s*['"]\/pyqs\.html['"]/gi, replace: 'window.location.href="/jntuk-r23-previous-question-papers"' },

  // Physics
  { search: /\/physics-notes\.html/gi, replace: '/engineering-physics-notes-jntuk-r23' },
  { search: /href="\/physics-notes"/gi, replace: 'href="/engineering-physics-notes-jntuk-r23"' },
  { search: /href='\/physics-notes'/gi, replace: "href='/engineering-physics-notes-jntuk-r23'" },
  { search: /href="\/engineering-physics"/gi, replace: 'href="/engineering-physics-notes-jntuk-r23"' },
  { search: /href='\/engineering-physics'/gi, replace: "href='/engineering-physics-notes-jntuk-r23'" },

  // Chemistry
  { search: /\/chemistry-topper-notes\.html/gi, replace: '/engineering-chemistry-notes-jntuk-r23' },
  { search: /href="\/chemistry-topper-notes"/gi, replace: 'href="/engineering-chemistry-notes-jntuk-r23"' },
  { search: /href='\/chemistry-topper-notes'/gi, replace: "href='/engineering-chemistry-notes-jntuk-r23'" },
  { search: /href="\/engineering-chemistry"/gi, replace: 'href="/engineering-chemistry-notes-jntuk-r23"' },
  { search: /href='\/engineering-chemistry'/gi, replace: "href='/engineering-chemistry-notes-jntuk-r23'" },

  // Maths 1
  { search: /\/maths-1\.html/gi, replace: '/engineering-mathematics-1-notes-jntuk-r23' },
  { search: /href="\/maths-1"/gi, replace: 'href="/engineering-mathematics-1-notes-jntuk-r23"' },
  { search: /href='\/maths-1'/gi, replace: "href='/engineering-mathematics-1-notes-jntuk-r23'" },
  { search: /href="\/engineering-mathematics"/gi, replace: 'href="/engineering-mathematics-1-notes-jntuk-r23"' },
  { search: /href='\/engineering-mathematics'/gi, replace: "href='/engineering-mathematics-1-notes-jntuk-r23'" },

  // Maths 2
  { search: /\/engineering-mathematics-2\.html/gi, replace: '/engineering-mathematics-2-notes-jntuk-r23' },
  { search: /href="\/engineering-mathematics-2"/gi, replace: 'href="/engineering-mathematics-2-notes-jntuk-r23"' },
  { search: /href='\/engineering-mathematics-2'/gi, replace: "href='/engineering-mathematics-2-notes-jntuk-r23'" },

  // Graphics
  { search: /\/engineering-graphics-lab\.html/gi, replace: '/engineering-graphics-tutorials-autocad-jntuk-r23' },
  { search: /href="\/engineering-graphics-lab"/gi, replace: 'href="/engineering-graphics-tutorials-autocad-jntuk-r23"' },
  { search: /href='\/engineering-graphics-lab'/gi, replace: "href='/engineering-graphics-tutorials-autocad-jntuk-r23'" },
  { search: /href="\/engineering-graphics"/gi, replace: 'href="/engineering-graphics-tutorials-autocad-jntuk-r23"' },
  { search: /href='\/engineering-graphics'/gi, replace: "href='/engineering-graphics-tutorials-autocad-jntuk-r23'" },

  // Communicative English
  { search: /\/communicative-english\.html/gi, replace: '/communicative-english-verbal-notes-jntuk-r23' },
  { search: /href="\/communicative-english"/gi, replace: 'href="/communicative-english-verbal-notes-jntuk-r23"' },
  { search: /href='\/communicative-english'/gi, replace: "href='/communicative-english-verbal-notes-jntuk-r23'" },

  // BEEE
  { search: /\/beee-notes\.html/gi, replace: '/basic-electrical-engineering-beee-notes-jntuk-r23' },
  { search: /href="\/beee-notes"/gi, replace: 'href="/basic-electrical-engineering-beee-notes-jntuk-r23"' },
  { search: /href='\/beee-notes'/gi, replace: "href='/basic-electrical-engineering-beee-notes-jntuk-r23'" },
  { search: /href="\/basic-electrical-engineering"/gi, replace: 'href="/basic-electrical-engineering-beee-notes-jntuk-r23"' },
  { search: /href='\/basic-electrical-engineering'/gi, replace: "href='/basic-electrical-engineering-beee-notes-jntuk-r23'" },

  // C Programming
  { search: /\/c-programming-notes\.html/gi, replace: '/c-programming-notes-pps-jntuk-r23' },
  { search: /href="\/c-programming-notes"/gi, replace: 'href="/c-programming-notes-pps-jntuk-r23"' },
  { search: /href='\/c-programming-notes'/gi, replace: "href='/c-programming-notes-pps-jntuk-r23'" },
  { search: /href="\/c-programming"/gi, replace: 'href="/c-programming-notes-pps-jntuk-r23"' },
  { search: /href='\/c-programming'/gi, replace: "href='/c-programming-notes-pps-jntuk-r23'" },

  // Data Structures
  { search: /\/data-structures-basics\.html/gi, replace: '/data-structures-notes-jntuk-r23' },
  { search: /href="\/data-structures-basics"/gi, replace: 'href="/data-structures-notes-jntuk-r23"' },
  { search: /href='\/data-structures-basics'/gi, replace: "href='/data-structures-notes-jntuk-r23'" },
  { search: /href="\/data-structures"/gi, replace: 'href="/data-structures-notes-jntuk-r23"' },
  { search: /href='\/data-structures'/gi, replace: "href='/data-structures-notes-jntuk-r23'" },

  // BCME
  { search: /\/basic-civil-mechanical-engineering\.html/gi, replace: '/basic-civil-mechanical-engineering-bcme-notes-jntuk-r23' },
  { search: /href="\/basic-civil-mechanical-engineering"/gi, replace: 'href="/basic-civil-mechanical-engineering-bcme-notes-jntuk-r23"' },
  { search: /href='\/basic-civil-mechanical-engineering'/gi, replace: "href='/basic-civil-mechanical-engineering-bcme-notes-jntuk-r23'" },
  { search: /href="\/basic-civil-and-mechanical-engineering"/gi, replace: 'href="/basic-civil-mechanical-engineering-bcme-notes-jntuk-r23"' },
  { search: /href='\/basic-civil-and-mechanical-engineering'/gi, replace: "href='/basic-civil-mechanical-engineering-bcme-notes-jntuk-r23'" },

  // Cheat Sheets
  { search: /\/cheat-sheets\.html/gi, replace: '/engineering-cheat-sheets' },
  { search: /href="\/cheat-sheets"/gi, replace: 'href="/engineering-cheat-sheets"' },
  { search: /href='\/cheat-sheets'/gi, replace: "href='/engineering-cheat-sheets'" },
  { search: /href="\/c-programming-cheat-sheet"/gi, replace: 'href="/engineering-cheat-sheets"' },
  { search: /href='\/c-programming-cheat-sheet'/gi, replace: "href='/engineering-cheat-sheets'" },

  // Tools
  { search: /\/tools\.html/gi, replace: '/engineering-student-tools' },
  { search: /href="\/tools"/gi, replace: 'href="/engineering-student-tools"' },
  { search: /href='\/tools'/gi, replace: "href='/engineering-student-tools'" },

  // AI Professor
  { search: /\/ai-professor\.html/gi, replace: '/ai-professor-jntuk-study-assistant' },
  { search: /href="\/ai-professor"/gi, replace: 'href="/ai-professor-jntuk-study-assistant"' },
  { search: /href='\/ai-professor'/gi, replace: "href='/ai-professor-jntuk-study-assistant'" },

  // Basic HTML endpoints
  { search: /href="\/about\.html"/gi, replace: 'href="/about"' },
  { search: /href="\/contact\.html"/gi, replace: 'href="/contact"' },
  { search: /href="\/privacy-policy\.html"/gi, replace: 'href="/privacy"' },
  { search: /href="\/terms-conditions\.html"/gi, replace: 'href="/terms"' },
  { search: /href="\/dashboard\.html"/gi, replace: 'href="/dashboard"' },
  { search: /href="\/profile\.html"/gi, replace: 'href="/profile"' },
  { search: /href="\/notifications\.html"/gi, replace: 'href="/notifications"' },
  { search: /href="\/blog\.html"/gi, replace: 'href="/blog"' },
  { search: /href="\/blogs\.html"/gi, replace: 'href="/blog"' },
  { search: /href="\/bookmarks\.html"/gi, replace: 'href="/bookmarks"' },
  { search: /href="\/quiz\.html"/gi, replace: 'href="/quiz"' },
  { search: /href="\/tasks\.html"/gi, replace: 'href="/tasks"' },
  
  { search: /href='\/about\.html'/gi, replace: "href='/about'" },
  { search: /href='\/contact\.html'/gi, replace: "href='/contact'" },
  { search: /href='\/privacy-policy\.html'/gi, replace: "href='/privacy'" },
  { search: /href='\/terms-conditions\.html'/gi, replace: "href='/terms'" },
  { search: /href='\/dashboard\.html'/gi, replace: "href='/dashboard'" },
  { search: /href='\/profile\.html'/gi, replace: "href='/profile'" },
  { search: /href='\/notifications\.html'/gi, replace: "href='/notifications'" },
  { search: /href='\/blog\.html'/gi, replace: "href='/blog'" },
  { search: /href='\/blogs\.html'/gi, replace: "href='/blog'" },
  { search: /href='\/bookmarks\.html'/gi, replace: "href='/bookmarks'" },
  { search: /href='\/quiz\.html'/gi, replace: "href='/quiz'" },
  { search: /href='\/tasks\.html'/gi, replace: "href='/tasks'" }
];

// Add Unit Mappings
const UNIT_SLUGS_DATA = {
  'engineering-mathematics': [
    'matrices-and-cayley-hamilton',
    'mean-value-theorems',
    'multivariable-calculus-and-jacobians',
    'multiple-integrals-volume',
    'special-functions-beta-gamma'
  ],
  'engineering-physics': [
    'wave-optics-and-interference',
    'lasers-and-fiber-optics',
    'quantum-mechanics',
    'semiconductor-physics-and-led',
    'superconductivity-and-nanomaterials'
  ],
  'chemistry': [
    'water-technology-and-demineralization',
    'electrochemistry-and-batteries',
    'polymer-chemistry-and-plastics',
    'instrumental-methods-and-spectroscopy',
    'energy-sources-and-fuels'
  ],
  'c-programming': [
    'structures-and-unions-memory-padding',
    'pointers-and-dynamic-memory-allocation',
    'control-statements-and-loops',
    'functions-and-recursive-algorithms',
    'file-handling-and-command-line-args'
  ],
  'basic-electrical-engineering': [
    'dc-circuits-and-theorems',
    'ac-circuits-and-power-factor',
    'transformers-and-motors',
    'dc-machines-and-alternators',
    'safety-and-fuses'
  ],
  'basic-civil-and-mechanical-engineering': [
    'civil-materials-and-surveying',
    'building-components-and-stresses',
    'alloys-welding-and-casting',
    'gears-and-power-transmission',
    'thermal-engineering-and-ic-engines'
  ],
  'communicative-english': [
    'verbal-grammar-rules',
    'listening-comprehension-methods',
    'speaking-and-presentation-skills',
    'essay-and-paragraph-writing-structure',
    'professional-correspondence-emails'
  ],
  'data-structures': [
    'introduction-algorithms-and-complexities',
    'linear-linked-records',
    'stacks-and-queues-expression-parsing',
    'nonlinear-trees-and-graphs',
    'sorting-searching-and-hashing'
  ]
};

// Generate replacements for units
Object.entries(UNIT_SLUGS_DATA).forEach(([subj, slugs]) => {
  slugs.forEach((slug, idx) => {
    const unitNum = idx + 1;
    // We want to handle paths with/without .html and prefixed with or without 'engineering-'
    const cleanSubj = subj === 'chemistry' ? 'engineering-chemistry' : subj;
    
    // Target patterns
    const targetSlugs = [subj, cleanSubj];
    targetSlugs.forEach(tSubj => {
      // Suffix with .html
      const fileSearchPattern1 = new RegExp(`\\/${tSubj}-unit-${unitNum}\\.html`, 'gi');
      const targetUrl = `/${cleanSubj}-unit-${unitNum}-${slug}-jntuk-r23`;
      URL_REPLACEMENTS.push({ search: fileSearchPattern1, replace: targetUrl });

      // Clean href with exact unit layout
      const hrefPatternStr1 = `href=["']\\/${tSubj}-unit-${unitNum}["']`;
      const hrefRegex1 = new RegExp(hrefPatternStr1, 'gi');
      URL_REPLACEMENTS.push({ search: hrefRegex1, replace: `href="${targetUrl}"` });
    });
  });
});

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Run replacements
  URL_REPLACEMENTS.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[UPDATED] ${path.relative(DIRECTORY, filePath)}`);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORED_PATHS.includes(file)) {
        scanDir(fullPath);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      // Only process html, js, and ts files
      if (ext === '.html' || ext === '.js' || ext === '.ts' || ext === '.cjs') {
        // Skip current script and server.ts to avoid breaking server configuration
        if (file !== 'server.ts' && file !== 'replace_links_in_files.cjs') {
          processFile(fullPath);
        }
      }
    }
  }
}

console.log('--- STARTING GLOBAL URL REPLACEMENTS TO CANONICAL SEO ---');
scanDir(DIRECTORY);
console.log('--- REPLACEMENTS COMPLETE ---');
