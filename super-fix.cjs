const fs = require('fs');
const path = require('path');

const publicDir = '.';
const domain = 'https://engiprephub.in';

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist') && !fullPath.includes('.git') && !fullPath.includes('api') && !fullPath.includes('app') && !fullPath.includes('src')) {
                results = results.concat(getHtmlFiles(fullPath));
            }
        } else if (fullPath.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(publicDir);

let seenTitles = new Set();

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // 1. Broken Links Fixes
    content = content.replace(/href="\/terms\//g, 'href="/terms-conditions.html');
    content = content.replace(/href="\/privacy\//g, 'href="/privacy-policy.html');
    content = content.replace(/href="\/terms"/g, 'href="/terms-conditions.html"');
    content = content.replace(/href="\/privacy"/g, 'href="/privacy-policy.html"');

    // 2. Image Optimization (Issue 7)
    // Replace Unsplash logic
    content = content.replace(/<img(.*?)src="(.*?unsplash.*?[^"]*)"(.*?)>/g, (match, prefix, url, suffix) => {
        if (!url.includes('fm=webp')) {
            url += url.includes('?') ? '&fm=webp' : '?fm=webp';
        }
        let merged = `<img${prefix}src="${url}"${suffix}>`;
        if (!merged.includes('loading=')) {
            merged = merged.replace('<img ', '<img loading="lazy" decoding="async" ');
        }
        if (!merged.includes('srcset=')) {
            let widthMatch = url.match(/w=(\d+)/);
            if (widthMatch) {
               merged = merged.replace('<img ', `<img srcset="${url} ${widthMatch[1]}w, ${url.replace('w='+widthMatch[1], 'w='+(parseInt(widthMatch[1])/2))} ${parseInt(widthMatch[1])/2}w" sizes="(max-width: 768px) 100vw, 50vw" `);
            }
        }
        return merged;
    });

    // Lazy load for all images
    content = content.replace(/<img(?!.*loading=)[^>]*>/g, match => {
        if (match.includes('eager')) return match;
        return match.replace('<img', '<img loading="lazy" decoding="async"');
    });

    // Replace ANY .png or .jpg hardcoded
    content = content.replace(/\.png"/g, '.webp"').replace(/\.jpg"/g, '.webp"').replace(/\.jpeg"/g, '.webp"');

    // 3. SEO Meta Tags (Title [50-60], Description [140-155], Og, Twitter)
    
    // Extract base subject name from filename
    let baseName = path.basename(file, '.html')
        .replace(/-/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
        
    if (baseName === 'Index') baseName = "Home";

    let titleMatch = content.match(/<title>(.*?)<\/title>/);
    let rawTitle = titleMatch ? titleMatch[1] : `${baseName} | Engi Prep Hub`;
    
    // Make it 50-60 characters
    // Example target: "Engineering Mathematics Notes | Engi Prep Hub"
    let newTitle = `${baseName} | Engi Prep Hub`.trim();
    if (newTitle.length < 50) {
       newTitle = `${baseName} JNTUK Notes | Engi Prep Hub`;
    }
    if (newTitle.length < 50) {
       newTitle = `Premium ${baseName} JNTUK R23 Notes | Engi Prep Hub`;
    }
    if (newTitle.length > 60) {
       newTitle = newTitle.substring(0, 56) + '...';
    }

    // Ensure uniqueness
    let counter = 1;
    let finalTitle = newTitle;
    while (seenTitles.has(finalTitle)) {
        let suffix = ` - P${counter}`;
        finalTitle = newTitle.substring(0, 60 - suffix.length) + suffix;
        counter++;
    }
    seenTitles.add(finalTitle);

    let descMatch = content.match(/<meta name="description" content="(.*?)"/);
    let rawDesc = descMatch ? descMatch[1] : '';
    
    // Make it 140-155 characters
    let newDesc = `Access ${baseName} JNTUK R23 notes, PYQs, formulas, calculators, and Engineering Graphics tutorials on Engi Prep Hub's premium student portal.`;
    if (newDesc.length < 140) {
       newDesc += " Start your exam prep today with our comprehensive study materials and interactive utilities.";
    }
    if (newDesc.length > 155) {
       newDesc = newDesc.substring(0, 151) + '...';
    }

    // Replace Title
    if (titleMatch) {
       content = content.replace(titleMatch[0], `<title>${finalTitle}</title>`);
    } else {
       content = content.replace('</head>', `    <title>${finalTitle}</title>\n</head>`);
    }

    // Replace Description
    if (descMatch) {
        // Also remove older ones to avoid dupes sometimes
        content = content.replace(/<meta name="description" content=".*?"(\s*\/)?>/g, '');
    }
    
    content = content.replace('</title>', `</title>\n    <meta name="description" content="${newDesc}">`);

    // Ensure Canonical, OG, Twitter
    const canonicalUrl = `${domain}/${path.basename(file) === 'index.html' ? '' : path.basename(file).replace('.html', '')}`;
    
    // Cleanup old tags if possible to not clutter
    content = content.replace(/<link rel="canonical".*?>/g, '');
    content = content.replace(/<meta property="og:.*?".*?>/g, '');
    content = content.replace(/<meta name="twitter:.*?".*?>/g, '');

    const advancedTags = `
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:title" content="${finalTitle}">
    <meta property="og:description" content="${newDesc}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Engi Prep Hub">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${finalTitle}">
    <meta name="twitter:description" content="${newDesc}">
`;
    content = content.replace('</title>', `</title>\n${advancedTags}`);

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
    }
});

console.log("Super SEO Fix Complete.");
