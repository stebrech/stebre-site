import path from "path";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",
		formats: ["webp", "auto"],
		outputDir: path.join(eleventyConfig.dir.output, "/assets/img/"),
		urlPath: "/assets/img/",
		widths: [500, 1090, "auto"],
		filenameFormat: function (id, src, width, format, options) {
			// id: hash of the original image
			// src: original image path
			// width: current width in px
			// format: current file format
			// options: set of options passed to the Image call
			const filename = path.basename(src, path.extname(src));
			return `${filename}_${width}.${format}`;
		},

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			sizes: "(min-width: 75rem) 60rem, 100vw",
			loading: "lazy",
			decoding: "async",
		},
	});
}
