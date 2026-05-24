import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto('https://claude.ai/share/700a7623-58d7-41e5-a3d8-69eb8d5897b0', { waitUntil: 'networkidle2', timeout: 30000 });
        
        await page.waitForSelector('.font-claude-message', { timeout: 10000 }).catch(() => {});
        const text = await page.evaluate(() => document.body.innerText);
        console.log(text);
        
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
