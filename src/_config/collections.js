export default function (eleventyConfig) {
	// Custom Collections
	eleventyConfig.addCollection("featuredProjectsDe", (collection) => {
		return collection.getFilteredByTag("projects_de").filter((item) => item.data.featured);
	});
	eleventyConfig.addCollection("featuredProjectsEn", (collection) => {
		return collection.getFilteredByTag("projects_en").filter((item) => item.data.featured);
	});
	eleventyConfig.addCollection("feed", (collection) => {
		const projects = collection.getFilteredByTag("projects_de");
		const blog = collection.getFilteredByTag("blog_de");
		const bookmarks = collection.getFilteredByTag("bookmarks_de");
		return [...projects, ...blog, ...bookmarks];
	});
	eleventyConfig.addCollection("feed_en", (collection) => {
		const projects = collection.getFilteredByTag("projects_en");
		const blog = collection.getFilteredByTag("blog_en");
		const bookmarks = collection.getFilteredByTag("bookmarks_en");
		return [...projects, ...blog, ...bookmarks];
	});
}
