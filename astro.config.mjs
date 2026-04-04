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
					label: '使い方ガイド',
					items: [
						{ label: 'はじめに', slug: 'guide/getting-started' },
						{ label: '車両を登録する', slug: 'guide/add-vehicle' },
						{ label: '記録をつける', slug: 'guide/add-record' },
						{ label: 'OCRで読み取る', slug: 'guide/ocr' },
						{ label: 'ドライブを記録する', slug: 'guide/drive' },
						{ label: '費用を確認する', slug: 'guide/stats' },
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
