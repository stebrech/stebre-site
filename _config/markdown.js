import markdownItWikilinks from "markdown-it-wikilinks";
import slugify from "slugify";
import mdItObsidianCallouts from "markdown-it-obsidian-callouts";
import implicitFigures from "markdown-it-image-figures";

export default function (eleventyConfig) {
	const wikilinksOptions = {
		generatePagePathFromLabel: (label) => slugify(label, { lower: true }),
		baseURL: "/",
		makeAllLinksAbsolute: true,
		uriSuffix: "",
	};

	eleventyConfig.amendLibrary("md", (mdLib) =>
		mdLib.use(
			markdownItWikilinks(wikilinksOptions),
			mdLib.use(mdItObsidianCallouts),
			mdLib.use(implicitFigures, { figcaption: true }),
		),
	);
}
