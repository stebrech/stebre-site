import { EleventyI18nPlugin, EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginNavigation from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

import pluginCollections from "./_config/collections.js";
import pluginFilters from "./_config/filters.js";
import pluginImages from "./_config/images.js";
import pluginMarkdown from "./_config/markdown.js";
import pluginPassthroughCopy from "./_config/passthroughCopy.js";
import pluginWatchTarget from "./_config/watchTarget.js";

export default function (eleventyConfig) {
	// Official plugins
	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		locales: ["de", "en"],
		defaultLanguage: "de",
	});
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(syntaxHighlight);

	// Configs
	eleventyConfig.addPlugin(pluginCollections);
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginMarkdown);
	eleventyConfig.addPlugin(pluginPassthroughCopy);
	eleventyConfig.addPlugin(pluginWatchTarget);

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
}
