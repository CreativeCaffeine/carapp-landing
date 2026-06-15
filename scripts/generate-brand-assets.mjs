// ブランド画像の一括生成: favicon / apple-touch-icon / OGP画像
// 使い方: node scripts/generate-brand-assets.mjs <アプリアイコンPNGのパス>
// アイコン差し替え時に再実行するだけで public/ 配下を再生成できる。
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const iconSrc = process.argv[2];
if (!iconSrc) {
  console.error('usage: node scripts/generate-brand-assets.mjs <app_icon.png>');
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (p) => path.join(root, 'public', p);

await sharp(iconSrc).resize(64, 64).png().toFile(pub('favicon.png'));
await sharp(iconSrc).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));
console.log('favicon.png / apple-touch-icon.png generated');

// OGP 1200x630: 青グラデ背景 + アイコン + アプリ名 + キャッチコピー
const W = 1200, H = 630;
const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5A7BFA"/>
      <stop offset="1" stop-color="#3B73F6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.8">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="430" y="300" font-family="Yu Gothic UI, Noto Sans JP, Meiryo, sans-serif" font-weight="800" font-size="92" fill="#ffffff">ぶんぶんノート</text>
  <text x="434" y="385" font-family="Yu Gothic UI, Noto Sans JP, Meiryo, sans-serif" font-weight="600" font-size="38" fill="#E8F0FF">愛車の記録、ぜんぶこれ一冊。</text>
  <text x="434" y="448" font-family="Yu Gothic UI, Noto Sans JP, Meiryo, sans-serif" font-weight="500" font-size="28" fill="#C9D8FF">給油・整備・洗車・ドライブ記録を一括管理</text>
</svg>`);

const icon = await sharp(iconSrc).resize(320, 320).png().toBuffer();
await sharp(bg)
  .composite([{ input: icon, left: 80, top: 155 }])
  .png({ compressionLevel: 9 })
  .toFile(pub('og-image.png'));
console.log('og-image.png generated');
