const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginFilters = require("./eleventy.config.filters.js");
const pluginImages = require("./eleventy.config.images.js");
const pluginMarkdown = require("./eleventy.config.markdown.js");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	eleventyConfig.addPassthroughCopy({
		"./src/assets/img/svg": "/assets/img",
		"./src/assets/img/gif": "/assets/img",
		"./src/assets/img/*_0.jpg": "/assets/img/og",
		"./src/assets/movies": "/assets/movies",
		"./src/assets/fonts": "/assets/fonts",
		"./src/assets/pdf": "/assets/pdf",
		"./src/assets/styles": "/assets/styles",
		"./src/assets/js": "/assets/js",
		"./node_modules/animate.css/animate.min.css": "/assets/styles/animate.min.css",
		"./src/assets/favicons": "/",
		"./src/assets/robots.txt": "/robtos.txt",
		"./src/sw.js": "/sw.js",
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
	eleventyConfig.addWatchTarget("src/assets");

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(syntaxHighlight);

	// Add plugins
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginMarkdown);

	// CSS minifier
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	// Custom collections
	eleventyConfig.addCollection("featuredProjects", (collection) => {
		return collection.getFilteredByTag("projects").filter((item) => item.data.featured);
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		templateFormats: ["md", "njk", "html", "liquid"],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		dir: {
			input: "src", // default: "."
			includes: "assets/layouts", // default: "_includes"
			data: "_data", // default: "_data"
			output: "public", // default: "_site
		},
	};
};
