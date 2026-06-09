const fs = require('fs');

function hideMobileClutter(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // We can just add 'hidden md:block' to specific sections.
    const targets = [
        "Trending Queries",
        "Academic Hub",
        "Recent Journeys",
        "Recovery Board",
        "Global Destinations",
        "Your JNTUK Survival Toolkit"
    ];

    // Simple approach: When we find one of these texts in an h2, h3, or span, we try to add `hidden md:block` 
    // to the closest parent section or div if we use a regex or DOM parser. But since it's raw HTML, 
    // it's easier to just find the containing `<section>` or string replacement.

    // Let's hide specific sections directly.
    content = content.replace(/<section class="py-24 px-6 bg-slate-50 dark:bg-slate-900 overflow-hidden relative border-y border-slate-200 dark:border-slate-800 text-center md:text-left">/g, 
        '<section class="hidden md:block py-24 px-6 bg-slate-50 dark:bg-slate-900 overflow-hidden relative border-y border-slate-200 dark:border-slate-800 text-center md:text-left">');
        
    // Wait, the "Complete Your Engineering Toolkit" is what corresponds to "Academic Hub" or similar in index? Let's check what exactly is named "Trending Queries", etc.

    fs.writeFileSync(file, content, 'utf8');
}

hideMobileClutter('index.html');
hideMobileClutter('dashboard.html');
hideMobileClutter('notes.html');
