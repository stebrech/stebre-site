export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./src/assets/img/copy": "/assets/img",
		"./src/assets/movies": "/assets/movies",
		"./src/assets/fonts": "/assets/fonts",
		"./src/assets/styles": "/assets/styles",
		"./src/assets/js": "/assets/js",
		"./node_modules/animate.css/animate.min.css": "/assets/styles/animate.min.css",
		"./node_modules/body-scroll-lock-upgrade/lib": "/assets/js/body-scroll-lock-upgrade",
		"./src/assets/favicons": "/",
		"./src/assets/robots.txt": "/robtos.txt",
		"./_copy": "/",
		"./_redirects": "/_redirects",
	});
}
