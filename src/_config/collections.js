export default function (eleventyConfig) {
	// Custom Collections
	eleventyConfig.addCollection("featuredProjectsDe", (collection) => {
		return collection.getFilteredByTag("projects_de").filter((item) => item.data.featured);
	});
	eleventyConfig.addCollection("featuredProjectsEn", (collection) => {
		return collection.getFilteredByTag("projects_en").filter((item) => item.data.featured);
	});
	eleventyConfig.addCollection("feed", (collection) => {
		return collection.getFilteredByGlob(["de/projects/*.md", "de/blog/*.md", "de/bookmarks/*.md"]);
	});
	eleventyConfig.addCollection("feed_en", (collection) => {
		return collection.getFilteredByGlob(["en/projects/*.md", "en/blog/*.md", "en/bookmarks/*.md"]);
	});
}
