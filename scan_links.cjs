const fs = require('fs');
const path = require('path');

function scanAllLinks() {
    const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
    const reports = {};
    const existingPages = new Set(files);

    // Common non-file relative paths that are handled by our server or valid external
    const ignoredPaths = new Set([
        '/',
        '',
        '#',
        'javascript:void(0)',
        'javascript:void(0);'
    ]);

    files.forEach(file => {
        const filePath = path.join(__dirname, file);
        const html = fs.readFileSync(filePath, 'utf8');
        
        // Find all href="..."
        const hrefRegex = /href="([^"]+)"/g;
        const srcRegex = /src="([^"]+)"/g;
        let match;
        const brokenLinks = [];
        const externalLinks = [];
        const anchors = [];

        while ((match = hrefRegex.exec(html)) !== null) {
            let link = match[1].trim();
            // strip query params or hashes
            let cleanLink = link.split('?')[0].split('#')[0];

            if (link.startsWith('#')) {
                anchors.push(link);
                continue;
            }

            if (ignoredPaths.has(cleanLink) || link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('//')) {
                if (link.startsWith('http') || link.startsWith('//')) {
                    externalLinks.push(link);
                }
                continue;
            }

            // check if file starts with /
            if (cleanLink.startsWith('/')) {
                cleanLink = cleanLink.substring(1);
            }

            // If it is just a subject.html or similar, check existence
            // Check if file exists direct as cleanLink, or cleanLink + '.html'
            let exists = existingPages.has(cleanLink) || existingPages.has(cleanLink + '.html');
            if (!exists) {
                brokenLinks.push({ original: link, resolved: cleanLink });
            }
        }

        if (brokenLinks.length > 0) {
            reports[file] = brokenLinks;
        }
    });

    console.log(JSON.stringify(reports, null, 2));
}

scanAllLinks();
