export default function (eleventyConfig) {
	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
	eleventyConfig.addWatchTarget("./_templates");
	eleventyConfig.addWatchTarget("./assets");
	eleventyConfig.addWatchTarget("./de");
	eleventyConfig.addWatchTarget("./en");
}
