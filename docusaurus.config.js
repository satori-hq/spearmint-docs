const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
	title: 'Spearmint by Satori',
	tagline: 'Easy, fast, and low cost NFT minting',
	url: 'https://spearmint-docs.satori.art',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'Satori',
	projectName: 'Spearmint',

	plugins: [
		'docusaurus-plugin-sass',
	],

	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
				},
				blog: false,
				// {
				//   showReadingTime: true,
				//   // Please change this to your repo.
				//   editUrl:
				//     'https://github.com/facebook/docusaurus/edit/main/website/blog/',
				// },
				theme: {
					customCss: require.resolve('./src/css/custom.scss'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				logo: {
					alt: 'Spearmint by Satori Logo',
					src: 'img/spearmint.svg',
					srcDark: 'img/spearmint-dark.svg'
				},
				items: [
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Docs',
					},
					{
						to: '/dashboard',
						position: 'left',
						label: 'Dashboard',
					},
					// {
					// 	href: 'https://github.com/satori-hq/spearmint-docs',
					// 	label: 'GitHub',
					// 	position: 'right',
					// },
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Docs',
								to: '/docs/intro',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'Github',
								href: 'https://github.com/satori-hq',
							},
						],
					},
					// {
					// 	title: 'More',
					// 	items: [
					// 		{
					// 			label: 'GitHub',
					// 			href: 'https://github.com/satori-hq/spearmint-docs',
					// 		},
					// 	],
					// },
				],
				copyright: `Copyright © ${new Date().getFullYear()} Satori Technologies Inc.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
});
