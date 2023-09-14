const markdownIt = require("markdown-it");
const markdownItEleventyImg = require("markdown-it-eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
	eleventyConfig.setLibrary(
		"md",
		markdownIt({ html: true, breaks: true }).use(markdownItEleventyImg, {
			imgOptions: {
				widths: [300, 600, 1008, "auto"],
				urlPath: "/assets/img/",
				outputDir: path.join(eleventyConfig.dir.output, "/assets/img/"),
				formats: ["webp", "jpeg"],
			},
			globalAttributes: {
				class: "markdown-img",
				decoding: "async",
				// If you use multiple widths,
				// don't forget to add a `sizes` attribute.
				sizes: "100vw",
			},
		})
	);
};
