const markdownItWikilinks = require("markdown-it-wikilinks");

module.exports = function (eleventyConfig) {
	const wikilinksOptions = {
		generatePageNameFromLabel: (label) => slugify(label, { lower: true }),
		baseURL: "/",
		makeAllLinksAbsolute: true,
		uriSuffix: "",
	};

	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItWikilinks(wikilinksOptions)));
};
