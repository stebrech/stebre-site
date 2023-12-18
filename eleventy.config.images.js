const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItEleventyImg = require("markdown-it-eleventy-img");

let defaultImageWidths = [400, 880, 1200, "auto"];
let defaultImageSizes = "(min-width: 70rem) 70rem, 100vw";
let defaultImageFormats = ["webp", "svg", "gif", "auto"];

module.exports = (eleventyConfig) => {
	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, sizes) {
		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		// Warning: Avif can be resource-intensive so take care!
		let metadata = await eleventyImage(src, {
			widths: widths || defaultImageWidths,
			formats: defaultImageFormats,
			urlPath: "/assets/img/",
			outputDir: path.join(eleventyConfig.dir.output, "/assets/img/"),
			svgShortCiruit: "size",
			sharpOptions: {
				animated: true,
				limitInputPixels: false,
			},
		});

		// TODO loading=eager and fetchpriority=high
		let imageAttributes = {
			alt,
			sizes: sizes || defaultImageSizes,
			loading: "lazy",
			decoding: "async",
		};
		return eleventyImage.generateHTML(metadata, imageAttributes);
	});

	eleventyConfig.setLibrary(
		"md",
		markdownIt({ html: true, breaks: true }).use(markdownItEleventyImg, {
			imgOptions: {
				widths: defaultImageWidths,
				formats: defaultImageFormats,
				urlPath: "/assets/img/",
				outputDir: path.join(eleventyConfig.dir.output, "/assets/img/"),
				sharpOptions: {
					animated: true,
					limitInputPixels: false,
				},
			},
			globalAttributes: {
				class: "markdown-img",
				decoding: "async",
				sizes: defaultImageSizes,
			},
		}),
	);
};
