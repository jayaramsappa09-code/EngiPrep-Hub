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

const htmlFiles = getHtmlFiles(publicDir);
const subjectLinks = [
    { title: "PYQs Predictor", href: "/pyqs.html" },
    { title: "Exam Survival Sheets", href: "/exam-survival.html" },
    { title: "Mathematics Notes", href: "/maths-1.html" },
    { title: "Physics Unit 2", href: "/engineering-physics-unit-2" },
    { title: "Chemistry Topper Notes", href: "/chemistry-topper-notes.html" },
    { title: "PPS Checklists", href: "/unit-1-c-fundamentals.html" }
];

htmlFiles.forEach(file => {
    // Only target note/unit pages for internal linking
    if ((file.includes('unit') || file.includes('notes') || file.includes('maths') || file.includes('physics') || file.includes('chemistry') || file.includes('c-programming') || file.includes('english') || file.includes('civil') || file.includes('data-structures') || file.includes('quiz') || file.includes('beee')) && !file.includes('index')) {
        let content = fs.readFileSync(file, 'utf8');

        if (!content.includes('related-links-section')) {
            // Pick 3 random links to inject
            const shuffled = subjectLinks.sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 3);
            
            const relatedSectionHtml = `
            <!-- Internal Links Section for SEO -->
            <section class="related-links-section mt-12 py-8 border-t border-slate-200 dark:border-slate-800">
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Related Study Material</h3>
                <div class="flex flex-wrap gap-4">
                    ${selected.map(link => `<a href="${link.href}" class="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium">${link.title}</a>`).join('')}
                </div>
            </section>
            `;

            // Insert before closing main, or just before footer
            if (content.includes('</main>')) {
                content = content.replace(/(<\/main>)/, relatedSectionHtml + '\n$1');
                fs.writeFileSync(file, content);
                console.log('Injected related links into', file);
            }
        }
    }
});
