module.exports = {
	globDirectory: 'meccanicapp/',
	globPatterns: [
		'**/*.{html,css,json,js,txt,png,jpg,gif,webp}'
	],
	swDest: 'meccanicapp/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};