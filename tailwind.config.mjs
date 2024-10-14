/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			fontFamily: {
				open: ['Open Sans', 'serif']
      },
		},
		colors: {
			'burnt-orange': "#d27f34",
			'burnt-red': '#c1513a',
			'cream': "#f9f6d7"
		}
	},
	plugins: [
		require('flowbite/plugin')
	]
}
