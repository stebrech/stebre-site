const { DateTime } = require("luxon");

module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { locale: "utc" })
			.setLocale("de")
			.toFormat("dd. MMMM yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	eleventyConfig.addFilter("sortByTitle", (values) => {
		return values.slice().sort((a, b) => a.data.title.localeCompare(b.data.title));
	});

	eleventyConfig.addFilter("sortByMenuOrder", (values) => {
		return values.slice().sort((a, b) => a.data.order - b.data.order);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", (collection) => {
		let tagSet = new Set();
		for (let item of collection) {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTags", (collection, excludedTags) => {
		return collection.filter((item) => {
			const postTags = item.data.tags || [];
			return !excludedTags.some((tag) => postTags.includes(tag));
		});
	});

	eleventyConfig.addFilter("excludeTagsFromTagList", (tags) => {
		return (tags || []).filter(
			(tag) => ["all", "posts", "projects", "pages", "bookmarks"].indexOf(tag) === -1,
		);
	});

	eleventyConfig.addFilter("sortTagList", (tags) => {
		return (tags || []).sort((a, b) => a.localeCompare(b));
	});

	eleventyConfig.addFilter("limit", function (arr, limit) {
		return arr.slice(0, limit);
	});
};
