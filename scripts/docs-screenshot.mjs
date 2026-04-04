import { chromium } from 'playwright';

const pages = [
  ['guide-getting-started', '/guide/getting-started/'],
  ['guide-add-record', '/guide/add-record/'],
  ['guide-ocr', '/guide/ocr/'],
  ['guide-drive', '/guide/drive/'],
  ['faq', '/faq/general/'],
];

const browser = await chromium.launch();

for (const [name, path] of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
  await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `screenshots-detail/docs-${name}.png`, fullPage: true });
  console.log(`ok: ${name}`);
  await page.close();
}

await browser.close();
