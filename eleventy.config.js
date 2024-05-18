const { EleventyI18nPlugin, EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginFilters = require("./eleventy.config.filters.js");
const pluginImages = require("./eleventy.config.images.js");
const pluginMarkdown = require("./eleventy.config.markdown.js");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./assets/img/copy": "/assets/img",
		"./assets/movies": "/assets/movies",
		"./assets/fonts": "/assets/fonts",
		"./assets/pdf": "/assets/pdf",
		"./assets/styles": "/assets/styles",
		"./assets/js": "/assets/js",
		"./node_modules/animate.css/animate.min.css": "/assets/styles/animate.min.css",
		"./node_modules/body-scroll-lock-upgrade/lib": "/assets/js/body-scroll-lock-upgrade",
		"./assets/favicons": "/",
		"./assets/robots.txt": "/robtos.txt",
		"./sw.js": "/sw.js",
		"./_copy": "/",
		"./_redirects": "/_redirects",
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
	eleventyConfig.addWatchTarget("./assets");

	// Official plugins
	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		locales: ["de", "en"],
		defaultLanguage: "de",
	});
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

	// Custom Collections
	eleventyConfig.addCollection("featuredProjectsDe", (collection) => {
		return collection.getFilteredByTag("projects_de").filter((item) => item.data.featured);
	});
	eleventyConfig.addCollection("featuredProjectsEn", (collection) => {
		return collection.getFilteredByTag("projects_en").filter((item) => item.data.featured);
	});
	eleventyConfig.addCollection("feed", (collection) => {
		return collection.getFilteredByGlob(["de/arbeiten/*.md", "de/blog/*.md", "de/bookmarks/*.md"]);
	});
	eleventyConfig.addCollection("feed_en", (collection) => {
		return collection.getFilteredByGlob(["en/arbeiten/*.md", "en/blog/*.md", "en/bookmarks/*.md"]);
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
			input: ".",
			includes: "_templates",
			data: "_data",
			output: "_site",
		},
	};
};
