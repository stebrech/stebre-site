export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./src/public/": "/",
		"./weihnachtsbuch2023/": "/weihnachtsbuch2023"
	});
}
