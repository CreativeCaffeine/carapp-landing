import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'dark'  // simulate user's OS dark mode
});

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'screenshots-detail/darkmode-lp.png', fullPage: true });
console.log('ok: LP (dark OS)');

await page.goto('http://localhost:4321/guide/getting-started/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'screenshots-detail/darkmode-docs.png', fullPage: true });
console.log('ok: docs (dark OS)');

await browser.close();
