const fs = require('fs');
const path = require('path');

const protectedFiles = [
    'all-subjects.html',
    'ai-professor.html',
    'beee-exam-prep.html',
    'blog.html',
    'blog-post.html',
    'bookmarks.html',
    'c-programming-notes.html',
    'cheat-sheets.html',
    'chemistry-topper-notes.html',
    'dashboard.html',
    'data-structures-basics.html',
    'exam-survival.html',
    'm1-eigen-values.html',
    'maths-1.html',
    'note-viewer.html',
    'notes.html',
    'physics-notes.html',
    'engineering-physics-unit-1.html',
    'engineering-physics-unit-2.html',
    'engineering-physics-unit-3.html',
    'engineering-physics-unit-4.html',
    'engineering-physics-unit-5.html',
    'jntuk-r23-previous-question-papers.html',
    'quiz.html',
    'semester-1.html',
    'semester-2.html',
    'subject.html',
    'tools.html',
    'unit-1-c-fundamentals.html',
    'videos.html',
    'notifications.html',
    'profile.html'
];

const injectionString = `\n    <!-- Gatekeeper for Authentication -->\n    <script>document.documentElement.style.display = 'none';</script>\n    <script type="module" src="/src/gatekeeper.js"></script>\n`;

protectedFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('src="/src/gatekeeper.js"')) {
        console.log(`Gatekeeper already present in ${file}`);
        return;
    }

    // Inject before </head>
    content = content.replace('</head>', injectionString + '</head>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected gatekeeper into ${file}`);
});
