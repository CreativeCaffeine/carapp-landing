import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const footer = page.locator('.lp-footer').first();
await footer.screenshot({ path: 'screenshots-detail/footer.png' });
console.log('ok: footer');

await browser.close();
