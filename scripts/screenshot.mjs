// LP screenshot tool — captures at multiple viewport sizes
// Usage: node scripts/screenshot.mjs [url] [output-dir]
// Guide + dist example:
// node scripts/screenshot.mjs http://local.test/guide/getting-started/ screenshots-guide --mobile-menu --dist-root dist
import { chromium } from 'playwright';
import { existsSync, mkdirSync, readFileSync, statSync } from 'fs';
import { extname, join, resolve } from 'path';

const url = process.argv[2] || 'http://localhost:4321/';
const outDir = process.argv[3] || 'screenshots';
const captureMobileMenu = process.argv.includes('--mobile-menu');
const distRootFlagIndex = process.argv.indexOf('--dist-root');
const distRoot =
	distRootFlagIndex >= 0 && process.argv[distRootFlagIndex + 1]
		? resolve(process.argv[distRootFlagIndex + 1])
		: null;

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

const getContentType = (pathname) => {
	switch (extname(pathname).toLowerCase()) {
		case '.html':
			return 'text/html; charset=utf-8';
		case '.css':
			return 'text/css; charset=utf-8';
		case '.js':
			return 'application/javascript; charset=utf-8';
		case '.svg':
			return 'image/svg+xml';
		case '.png':
			return 'image/png';
		case '.jpg':
		case '.jpeg':
			return 'image/jpeg';
		case '.webp':
			return 'image/webp';
		case '.json':
			return 'application/json; charset=utf-8';
		default:
			return 'application/octet-stream';
	}
};

const toDistPath = (pathname) => {
	const cleanPath = decodeURIComponent(pathname.split('?')[0]);
	const trimmedPath = cleanPath.replace(/^\/+/, '').replace(/^carapp-landing\/?/, '');
	let filePath = join(distRoot, trimmedPath);

	if (cleanPath.endsWith('/')) {
		filePath = join(filePath, 'index.html');
	} else if (!extname(filePath) && existsSync(filePath) && statSync(filePath).isDirectory()) {
		filePath = join(filePath, 'index.html');
	}

	return filePath;
};

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, colorScheme: 'light' });

  if (distRoot) {
    await page.route('**/*', async (route) => {
      const requestUrl = new URL(route.request().url());
      const filePath = toDistPath(requestUrl.pathname);

      if (!existsSync(filePath)) {
        await route.fulfill({ status: 404, body: `Not found: ${requestUrl.pathname}` });
        return;
      }

      await route.fulfill({
        status: 200,
        body: readFileSync(filePath),
        contentType: getContentType(filePath),
      });
    });
  }

  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Force light theme
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
  });
  await page.waitForTimeout(100);
  
  const path = join(outDir, `${vp.name}.png`);
  await page.screenshot({ path, fullPage: true });
  console.log(`✓ ${vp.name} (${vp.width}x${vp.height}) → ${path}`);
  
  // Capture mobile menu open state for mobile viewports
  if (captureMobileMenu && vp.width < 800) {
    const menuBtn = await page.$('starlight-menu-button button');
    if (menuBtn) {
      await menuBtn.click();
      await page.waitForTimeout(300);
      const menuPath = join(outDir, `${vp.name}-menu.png`);
      await page.screenshot({ path: menuPath, fullPage: true });
      console.log(`✓ ${vp.name}-menu (${vp.width}x${vp.height}) → ${menuPath}`);
    }
  }
  
  await page.close();
}

await browser.close();
console.log(`\nDone. Screenshots saved to ${outDir}/`);
