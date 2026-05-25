const fs = require('fs');
const path = require('path');

const domain = 'https://engiprephub.in';
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

const htmlFiles = getHtmlFiles(publicDir);

const adSenseScript = `
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9357545069587539" crossorigin="anonymous"></script>
`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Add Canonical URL
    const parsePath = path.basename(file) === 'index.html' ? '' : path.basename(file).replace('.html', '');
    const canonicalUrl = `${domain}/${parsePath}`;
    
    if (!content.includes('<link rel="canonical"')) {
        content = content.replace('</title>', `</title>\n    <link rel="canonical" href="${canonicalUrl}">`);
        modified = true;
    }

    // 2. Add Open Graph Tags based on Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'EngiPrep Hub';
    
    const descMatch = content.match(/<meta name="description" content="(.*?)"/);
    const desc = descMatch ? descMatch[1] : 'The ultimate JNTUK R23 engineering prep platform.';

    if (!content.includes('<meta property="og:title"')) {
        const ogTags = `
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="EngiPrep Hub">
`;
        content = content.replace('</head>', `${ogTags}\n</head>`);
        modified = true;
    }

    // 3. AdSense only on certain paths
    const isNotes = file.includes('unit') || file.includes('notes') || file.includes('maths') || file.includes('physics') || file.includes('chemistry') || file.includes('c-programming') || file.includes('english') || file.includes('civil') || file.includes('data-structures') || file.includes('quiz') || file.includes('beee');
    const isPyqs = file.includes('pyqs') || file.includes('survival');
    const isBlog = file.includes('blog');
    const isDashboard = file.includes('dashboard') || file.includes('admin') || file.includes('auth') || file.includes('profile');

    if ((isNotes || isPyqs || isBlog) && !isDashboard) {
        if (!content.includes('pagead2.googlesyndication.com')) {
            content = content.replace('</head>', `${adSenseScript}\n</head>`);
            modified = true;
        }
    } else {
        // Remove ads from dashboard/login if any
        if (content.includes('pagead2.googlesyndication.com')) {
             content = content.replace(adSenseScript, '');
             content = content.replace(/<script async src="https:\/\/pagead2.googlesyndication.com.*?<\/script>/g, '');
             modified = true;
        }
    }

    // 4. Schema (JSON-LD) for notes pages
    if (isNotes && !content.includes('application/ld+json')) {
        const schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "${title.replace(/"/g, '\\"')}",
      "description": "${desc.replace(/"/g, '\\"')}",
      "provider": {
        "@type": "Organization",
        "name": "EngiPrep Hub",
        "sameAs": "${domain}"
      }
    }
    </script>
`;
        content = content.replace('</head>', `${schema}\n</head>`);
        modified = true;
    }

    // 5. Schema for PYQs (FAQ schema mock-up)
    if (file.includes('pyqs') && !content.includes('application/ld+json')) {
        const schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What are the most repeated questions in JNTUK R23?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The platform analyzes previous papers to provide the most high-frequency questions for Engineering Mathematics, Physics, Chemistry, and PPS."
        }
      }]
    }
    </script>
`;
        content = content.replace('</head>', `${schema}\n</head>`);
        modified = true;
    }

    // 6. Universal Academic Navigator & Active Live Tickers
    if (!content.includes('src="/src/main.js"') && content.includes('</body>')) {
        content = content.replace('</body>', '    <!-- Universal Academic Navigator & Active Live Alerts -->\n    <script type="module" src="/src/main.js"></script>\n</body>');
        modified = true;
    }


    if (modified) {
        fs.writeFileSync(file, content);
        console.log('Injected SEO into', file);
    }
});
