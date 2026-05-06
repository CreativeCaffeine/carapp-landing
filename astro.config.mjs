// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://creativecaffeine.github.io',
	base: '/carapp-landing',
	integrations: [
		starlight({
			title: 'くるまのカルテ',
			description: 'あなたの車のすべてを、ひとつのアプリで。',
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
					tag: 'script',
					content: `document.documentElement.setAttribute('data-theme', 'light');localStorage.setItem('starlight-theme', 'light');`,
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
