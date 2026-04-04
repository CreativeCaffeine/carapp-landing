import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const selectors = [
  ['hero', '.lp-hero'],
  ['ocr', '.lp-block.lp-block--white'],
  ['drive', '.lp-block--dark'],
  ['stats', '.lp-block--gray'],
  ['cta', '.lp-block--accent'],
];

for (const [name, sel] of selectors) {
  try {
    const el = page.locator(sel).first();
    await el.screenshot({ path: `screenshots-detail/sec-${name}.png` });
    console.log(`ok: ${name}`);
  } catch (e) {
    console.log(`skip: ${name} - ${e.message.slice(0, 60)}`);
  }
}

await browser.close();
