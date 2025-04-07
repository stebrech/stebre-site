export default function (eleventyConfig) {
	// Custom Collections
	eleventyConfig.addCollection("featuredProjectsDe", (collection) => {
		return collection.getFilteredByTag("projects_de").filter((item) => item.data.featured);
	});
	eleventyConfig.addCollection("featuredProjectsEn", (collection) => {
		return collection.getFilteredByTag("projects_en").filter((item) => item.data.featured);
	});
	eleventyConfig.addCollection("feed", (collection) => {
		return collection.getFilteredByGlob([
			"src/content/de/projects/*.md",
			"src/content/de/blog/*.md",
			"src/content/de/bookmarks/*.md",
		]);
	});
	eleventyConfig.addCollection("feed_en", (collection) => {
		return collection.getFilteredByGlob([
			"src/content/en/projects/*.md",
			"src/content/en/blog/*.md",
			"src/content/en/bookmarks/*.md",
		]);
	});
}
