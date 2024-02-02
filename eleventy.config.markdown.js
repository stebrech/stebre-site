const markdownItWikilinks = require("markdown-it-wikilinks");
const slugify = require("slugify");
const mdItObsidianCallouts = require("markdown-it-obsidian-callouts");

module.exports = function (eleventyConfig) {
	const wikilinksOptions = {
		generatePagePathFromLabel: (label) => slugify(label, { lower: true }),
		baseURL: "/",
		makeAllLinksAbsolute: true,
		uriSuffix: "",
	};

	eleventyConfig.amendLibrary("md", (mdLib) =>
		mdLib.use(markdownItWikilinks(wikilinksOptions), mdLib.use(mdItObsidianCallouts)),
	);
};
