import { EleventyI18nPlugin, EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

import pluginCollections from "./src/_config/collections.js";
import pluginFilters from "./src/_config/filters.js";
import pluginImages from "./src/_config/images.js";
import pluginMarkdown from "./src/_config/markdown.js";
import pluginPassthroughCopy from "./src/_config/passthroughCopy.js";
import pluginStatus from "./src/_config/status.js";
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
	eleventyConfig.addPlugin(pluginStatus);
	eleventyConfig.addPlugin(pluginWatchTarget);

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
