const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = (eleventyConfig) => {
	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, sizes) {
		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		// Warning: Avif can be resource-intensive so take care!
		let formats = ["webp", "auto"];
		let metadata = await eleventyImage(src, {
			widths: widths || [400, 800, 1035, "auto"],
			formats,
			urlPath: "/assets/img/",
			outputDir: path.join(eleventyConfig.dir.output, "/assets/img/"),
		});

		// TODO loading=eager and fetchpriority=high
		let imageAttributes = {
			alt,
			sizes: sizes || "(min-width: 70rem) 70rem, 100vw",
			loading: "lazy",
			decoding: "async",
		};
		return eleventyImage.generateHTML(metadata, imageAttributes);
	});
};
