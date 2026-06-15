// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://creativecaffeine.github.io',
	base: '/carapp-landing',
	integrations: [
		starlight({
			title: 'ぶんぶんノート',
			description: '愛車の管理をもっとスマートに。給油、整備、洗車、ドライブ記録を一括管理。',
			favicon: '/favicon.png',
			defaultLocale: 'root',
			locales: {
				root: { label: '日本語', lang: 'ja' },
			},
			components: {
				ThemeProvider: './src/components/ThemeProvider.astro',
			},
			social: [],
			disable404Route: false,
			pagefind: false,
			head: [
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				},
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
				},
				{
					tag: 'link',
					attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap' },
				},
				{
					tag: 'link',
					attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/carapp-landing/apple-touch-icon.png' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'https://creativecaffeine.github.io/carapp-landing/og-image.png' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:width', content: '1200' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:height', content: '630' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:image', content: 'https://creativecaffeine.github.io/carapp-landing/og-image.png' },
				},
				{
					tag: 'script',
					content: `document.documentElement.setAttribute('data-theme', 'light');localStorage.setItem('starlight-theme', 'light');`,
				},
				{
					tag: 'script',
					content: `(function(){try{var s=localStorage.getItem('sidebar-collapsed');var c=s==='true';document.documentElement.setAttribute('data-sidebar-collapsed',String(c));}catch(e){}})();`,
				},
				{
					tag: 'script',
					content: `document.addEventListener('DOMContentLoaded',function(){var b=document.createElement('button');b.className='sidebar-toggle';b.type='button';b.setAttribute('aria-label','サイドバーを折りたたむ');b.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41Z"/></svg>';b.addEventListener('click',function(){var h=document.documentElement;var n=h.getAttribute('data-sidebar-collapsed')!=='true';h.setAttribute('data-sidebar-collapsed',String(n));try{localStorage.setItem('sidebar-collapsed',String(n));}catch(e){}b.setAttribute('aria-label',n?'サイドバーを開く':'サイドバーを折りたたむ');});var init=document.documentElement.getAttribute('data-sidebar-collapsed')==='true';b.setAttribute('aria-label',init?'サイドバーを開く':'サイドバーを折りたたむ');document.body.appendChild(b);});`,
				},
				{
					tag: 'link',
					attrs: { rel: 'stylesheet', href: '/carapp-landing/styles/override.css' },
				},
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'はじめに',
					items: [
						{ label: 'はじめに', slug: 'guide/getting-started' },
						{ label: '機能一覧', slug: 'guide' },
					],
				},
				{
					label: '車両・記録',
					items: [
						{ label: '車両を管理する', slug: 'guide/vehicles' },
						{ label: '車両を登録する', slug: 'guide/add-vehicle' },
						{ label: '記録をつける', slug: 'guide/add-record' },
						{ label: '給油・充電を記録する', slug: 'guide/fuel' },
						{ label: 'メンテナンスを記録する', slug: 'guide/maintenance' },
						{ label: '洗車を記録する', slug: 'guide/wash' },
						{ label: '税金・保険を記録する', slug: 'guide/insurance-tax' },
						{ label: '高速料金・駐車場代', slug: 'guide/trip-expense' },
						{ label: '手続き・書類を記録する', slug: 'guide/documents' },
					],
				},
				{
					label: 'ドライブ・移動',
					items: [
						{ label: 'ドライブを記録する', slug: 'guide/drive' },
						{ label: '自動記録を設定する', slug: 'guide/auto-record' },
					],
				},
				{
					label: '入力支援',
					items: [
						{ label: 'OCRで読み取る', slug: 'guide/ocr' },
					],
				},
				{
					label: 'サマリー・通知',
					items: [
						{ label: '費用を確認する', slug: 'guide/stats' },
						{ label: 'リマインダーを設定する', slug: 'guide/reminders' },
					],
				},
				{
					label: 'その他',
					items: [
						{ label: 'プレミアムプラン', slug: 'guide/subscription' },
					],
				},
				{
					label: 'よくある質問',
					items: [
						{ label: 'FAQ', slug: 'faq/general' },
					],
				},
			],
		}),
	],
});
