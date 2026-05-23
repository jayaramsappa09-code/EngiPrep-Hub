const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const footerLinks = [
    { name: 'About Us', href: '/about.html' },
    { name: 'Contact Us', href: '/contact.html' },
    { name: 'Privacy Policy', href: '/privacy-policy.html' },
    { name: 'Terms of Service', href: '/terms-conditions.html' },
    { name: 'Cookie Policy', href: '/cookie-policy.html' },
    { name: 'Disclaimer', href: '/disclaimer.html' }
];

const linksHtml = footerLinks.map(link => 
    `                <a href="${link.href}" class="hover:text-amber-500 transition-colors">${link.name}</a>`
).join('\n');

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const footerRegex = /<div class="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">[\s\S]*?<\/div>/;
    const match = content.match(footerRegex);
    
    if (match) {
        const updatedFooter = `<div class="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">\n${linksHtml}\n            </div>`;
        content = content.replace(match[0], updatedFooter);
        fs.writeFileSync(file, content);
        console.log("Updated footer in " + file);
    }
}
