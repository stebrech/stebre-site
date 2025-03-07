export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./assets/img/copy": "/assets/img",
		"./assets/movies": "/assets/movies",
		"./assets/fonts": "/assets/fonts",
		"./assets/styles": "/assets/styles",
		"./assets/js": "/assets/js",
		"./node_modules/animate.css/animate.min.css": "/assets/styles/animate.min.css",
		"./node_modules/body-scroll-lock-upgrade/lib": "/assets/js/body-scroll-lock-upgrade",
		"./assets/favicons": "/",
		"./assets/robots.txt": "/robtos.txt",
		"./_copy": "/",
		"./_redirects": "/_redirects",
	});
}
