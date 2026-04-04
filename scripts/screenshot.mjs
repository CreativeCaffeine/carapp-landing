// LP screenshot tool — captures at multiple viewport sizes
// Usage: node scripts/screenshot.mjs [url] [output-dir]
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const url = process.argv[2] || 'http://localhost:4321/';
const outDir = process.argv[3] || 'screenshots';

const viewports = [
  { name: 'desktop-2560', width: 2560, height: 1440 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-360', width: 360, height: 780 },
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, colorScheme: 'light' });
  await page.goto(url, { waitUntil: 'networkidle' });
  const path = join(outDir, `${vp.name}.png`);
  await page.screenshot({ path, fullPage: true });
  console.log(`✓ ${vp.name} (${vp.width}x${vp.height}) → ${path}`);
  await page.close();
}

await browser.close();
console.log(`\nDone. ${viewports.length} screenshots saved to ${outDir}/`);
