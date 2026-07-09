const fs = require('fs');
const path = require('path');

const functionalPages = [
    'auth.html',
    'dashboard.html',
    'profile.html',
    'reset-password.html',
    'notifications.html',
    'tasks.html',
    'bookmarks.html',
    'admin.html',
    'offline.html'
];

functionalPages.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('<meta name="robots"')) {
            content = content.replace('</head>', '    <meta name="robots" content="noindex, nofollow">\n</head>');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Added noindex to ${file}`);
        }
    }
});
