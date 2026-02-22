export default function (eleventyConfig) {
	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("./src/content/**/*.{svg,webp,png,jpg,jpeg,gif}");
}
