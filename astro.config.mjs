// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'carapp',
			description: 'Flutter製カーメンテナンス管理アプリ',
			defaultLocale: 'root',
			locales: {
				root: { label: '日本語', lang: 'ja' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/hijackeboy/carapp' }],
			sidebar: [
				{
					label: 'はじめに',
					items: [
						{ label: '概要', slug: 'guides/overview' },
						{ label: '機能一覧', slug: 'guides/features' },
						{ label: 'セットアップ', slug: 'guides/setup' },
					],
				},
				{
					label: '技術ドキュメント',
					items: [
						{ label: 'テックスタック', slug: 'reference/tech-stack' },
						{ label: 'アーキテクチャ', slug: 'reference/architecture' },
						{ label: 'データベース', slug: 'reference/database' },
					],
				},
			],
		}),
	],
});
