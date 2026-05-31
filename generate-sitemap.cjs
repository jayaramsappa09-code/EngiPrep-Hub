const fs = require('fs');
const path = require('path');

const domain = 'https://engiprephub.in';
const publicDir = path.join(__dirname, 'dist');

if (!fs.existsSync(publicDir)) {
  console.log('dist directory not found. Please run build first.');
  process.exit(1);
}

const masterMappings = {
  "index.html": [
    "/"
  ],
  "about.html": [
    "/about"
  ],
  "contact.html": [
    "/contact"
  ],
  "privacy-policy.html": [
    "/privacy",
    "/privacy-policy"
  ],
  "terms-conditions.html": [
    "/terms",
    "/terms-conditions"
  ],
  "disclaimer.html": [
    "/disclaimer"
  ],
  "cookie-policy.html": [
    "/cookie-policy"
  ],
  "faq.html": [
    "/faq"
  ],
  "contribute.html": [
    "/contribute"
  ],
  "admin.html": [
    "/admin"
  ],
  "reset-password.html": [
    "/reset-password"
  ],
  "auth.html": [
    "/auth"
  ],
  "dashboard.html": [
    "/dashboard"
  ],
  "profile.html": [
    "/profile"
  ],
  "notifications.html": [
    "/notifications"
  ],
  "tasks.html": [
    "/tasks"
  ],
  "bookmarks.html": [
    "/bookmarks"
  ],
  "ai-professor.html": [
    "/ai-professor"
  ],
  "quiz.html": [
    "/quiz"
  ],
  "tools.html": [
    "/tools"
  ],
  "videos.html": [
    "/videos"
  ],
  "m1-eigen-values.html": [
    "/tools/m1-eigen-values",
    "/m1-eigen-values"
  ],
  "cheat-sheets.html": [
    "/cheat-sheets",
    "/c-programming-cheat-sheet"
  ],
  "exam-survival.html": [
    "/exam-survival"
  ],
  "beee-exam-prep.html": [
    "/beee-exam-prep",
    "/semester-1/beee-important-questions"
  ],
  "note-viewer.html": [
    "/note-viewer"
  ],
  "all-subjects.html": [
    "/all-subjects"
  ],
  "semester-1.html": [
    "/semester-1"
  ],
  "semester-2.html": [
    "/semester-2"
  ],
  "subject.html": [
    "/subject"
  ],
  "notes.html": [
    "/notes"
  ],
  "pyqs.html": [
    "/pyqs",
    "/engineering-physics-pyqs"
  ],
  "blogs.html": [
    "/blogs"
  ],
  "blog.html": [
    "/blog"
  ],
  "blog-post.html": [
    "/blog-post"
  ],
  "physics-notes.html": [
    "/engineering-physics"
  ],
  "chemistry-topper-notes.html": [
    "/engineering-chemistry"
  ],
  "maths-1.html": [
    "/engineering-mathematics"
  ],
  "engineering-mathematics-1.html": [
    "/engineering-mathematics-1"
  ],
  "engineering-mathematics-2.html": [
    "/engineering-mathematics-2"
  ],
  "engineering-graphics-lab.html": [
    "/engineering-graphics"
  ],
  "communicative-english.html": [
    "/communicative-english"
  ],
  "beee-notes.html": [
    "/basic-electrical-engineering",
    "/beee-notes"
  ],
  "c-programming-notes.html": [
    "/c-programming"
  ],
  "data-structures-basics.html": [
    "/data-structures"
  ],
  "basic-civil-mechanical-engineering.html": [
    "/basic-civil-and-mechanical-engineering"
  ],
  "engineering-mathematics-unit-1.html": [
    "/maths/unit-1"
  ],
  "engineering-mathematics-unit-2.html": [
    "/maths/unit-2"
  ],
  "engineering-mathematics-unit-3.html": [
    "/maths/unit-3"
  ],
  "engineering-mathematics-unit-4.html": [
    "/maths/unit-4"
  ],
  "engineering-mathematics-unit-5.html": [
    "/maths/unit-5"
  ],
  "engineering-physics-unit-1.html": [
    "/physics/unit-1",
    "/physics/wave-optics"
  ],
  "engineering-physics-unit-2.html": [
    "/physics/unit-2",
    "/physics/lasers"
  ],
  "engineering-physics-unit-3.html": [
    "/physics/unit-3"
  ],
  "engineering-physics-unit-4.html": [
    "/physics/unit-4"
  ],
  "engineering-physics-unit-5.html": [
    "/physics/unit-5"
  ],
  "chemistry-unit-1.html": [
    "/chemistry/unit-1",
    "/chemistry/water-demineralization"
  ],
  "chemistry-unit-2.html": [
    "/chemistry/unit-2",
    "/chemistry/electrochemistry"
  ],
  "chemistry-unit-3.html": [
    "/chemistry/unit-3"
  ],
  "chemistry-unit-4.html": [
    "/chemistry/unit-4"
  ],
  "chemistry-unit-5.html": [
    "/chemistry/unit-5"
  ],
  "c-programming-unit-1.html": [
    "/c-programming/unit-1",
    "/c-programming/structures-unions"
  ],
  "c-programming-unit-2.html": [
    "/c-programming/unit-2",
    "/c-programming/pointers"
  ],
  "c-programming-unit-3.html": [
    "/c-programming/unit-3"
  ],
  "c-programming-unit-4.html": [
    "/c-programming/unit-4"
  ],
  "c-programming-unit-5.html": [
    "/c-programming/unit-5"
  ],
  "unit-1-c-fundamentals.html": [
    "/c-programming/unit-1-fundamentals",
    "/c-programming/unit-1-c-fundamentals"
  ],
  "data-structures-unit-1.html": [
    "/data-structures/unit-1"
  ],
  "data-structures-unit-2.html": [
    "/data-structures/unit-2"
  ],
  "data-structures-unit-3.html": [
    "/data-structures/unit-3"
  ],
  "data-structures-unit-4.html": [
    "/data-structures/unit-4"
  ],
  "data-structures-unit-5.html": [
    "/data-structures/unit-5"
  ],
  "basic-electrical-engineering-unit-1.html": [
    "/beee/unit-1",
    "/beee/superposition"
  ],
  "basic-electrical-engineering-unit-2.html": [
    "/beee/unit-2",
    "/beee/power-factor"
  ],
  "basic-electrical-engineering-unit-3.html": [
    "/beee/unit-3"
  ],
  "basic-electrical-engineering-unit-4.html": [
    "/beee/unit-4"
  ],
  "basic-electrical-engineering-unit-5.html": [
    "/beee/unit-5"
  ],
  "communicative-english-unit-1.html": [
    "/english/unit-1"
  ],
  "communicative-english-unit-2.html": [
    "/english/unit-2"
  ],
  "communicative-english-unit-3.html": [
    "/english/unit-3"
  ],
  "communicative-english-unit-4.html": [
    "/english/unit-4"
  ],
  "communicative-english-unit-5.html": [
    "/english/unit-5"
  ],
  "basic-civil-and-mechanical-engineering-unit-1.html": [
    "/basic-civil-mechanical/unit-1"
  ],
  "basic-civil-and-mechanical-engineering-unit-2.html": [
    "/basic-civil-mechanical/unit-2"
  ],
  "basic-civil-and-mechanical-engineering-unit-3.html": [
    "/basic-civil-mechanical/unit-3"
  ],
  "basic-civil-and-mechanical-engineering-unit-4.html": [
    "/basic-civil-mechanical/unit-4"
  ],
  "basic-civil-and-mechanical-engineering-unit-5.html": [
    "/basic-civil-mechanical/unit-5"
  ],
  "engineering-graphics-enter-lab.html": [
    "/engineering-graphics/projections"
  ],
  "404.html": [
    "/404"
  ]
};

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

Object.entries(masterMappings).forEach(([file, paths]) => {
  const primaryPath = paths[0];
  const priority = file === 'index.html' ? '1.0' : '0.8';
  
  // Format slug for url
  const normalizedPath = primaryPath === '/' ? '' : primaryPath;
  
  sitemap += `  <url>
    <loc>${domain}${normalizedPath}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Successfully completed custom clean sitemap generation in dist/ directory!');
