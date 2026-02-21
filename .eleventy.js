import { EleventyI18nPlugin, EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

import pluginCollections from "./src/_config/collections.js";
import pluginFilters from "./src/_config/filters.js";
import pluginImages from "./src/_config/images.js";
import pluginMarkdown from "./src/_config/markdown.js";
import pluginPassthroughCopy from "./src/_config/passthroughCopy.js";
import pluginWatchTarget from "./src/_config/watchTarget.js";

export default function (eleventyConfig) {
	// Official plugins
	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		locales: ["de", "en"],
		defaultLanguage: "de",
	});
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(syntaxHighlight);

	// Configs
	eleventyConfig.addPlugin(pluginCollections);
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginMarkdown);
	eleventyConfig.addPlugin(pluginPassthroughCopy);
	eleventyConfig.addPlugin(pluginWatchTarget);


	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Bundle <style> content and adds a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "css",
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
	});

	// Bundle <script> content and adds a {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "js",
		// Add all <script> content to the `js` bundle (use <script eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "script",
	});

	return {
		// Control which files Eleventy will process
		templateFormats: ["md", "njk", "html", "liquid"],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		dir: {
			input: "src",
			includes: "_templates",
			data: "_data",
			output: "_site",
		},
	};
}
