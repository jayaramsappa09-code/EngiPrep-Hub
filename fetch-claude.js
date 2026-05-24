const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
        });
        const page = await browser.newPage();
        await page.goto('https://claude.ai/share/700a7623-58d7-41e5-a3d8-69eb8d5897b0', { waitUntil: 'networkidle2', timeout: 60000 });
        
        const text = await page.evaluate(() => document.body.innerText);
        console.log(text);
        
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
