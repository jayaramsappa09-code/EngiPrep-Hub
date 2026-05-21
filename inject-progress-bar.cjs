const fs = require('fs');

const progressBarHtml = `
    <!-- Reading Progress Bar -->
    <div id="reading-progress-container" class="fixed top-0 left-0 w-full h-1 bg-transparent z-[100]">
        <div id="reading-progress-bar" class="h-full bg-blue-600 transition-all duration-150 w-0"></div>
    </div>
`;

const progressScript = `
    <script>
        document.addEventListener('scroll', function() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            const bar = document.getElementById('reading-progress-bar');
            if (bar) bar.style.width = scrolled + '%';
        });
    </script>
`;

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = dir + '/' + file;
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist')) traverse(fullPath);
        } else if (fullPath.endsWith('.html') && (fullPath.includes('unit') || fullPath.includes('notes'))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            if (!content.includes('id="reading-progress-container"')) {
                content = content.replace(/(<body[^>]*>)/, '$1\\n' + progressBarHtml);
                modified = true;
            }

            if (!content.includes('id="reading-progress-bar"') && content.includes('</body>')) {
                content = content.replace('</body>', progressScript + '\\n</body>');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Injected progress bar into', fullPath);
            }
        }
    });
}
traverse('.');
