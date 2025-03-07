import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import removeMd from "remove-markdown";
import CleanCSS from "clean-css";

export default function (eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { locale: "utc" }).setLocale("de").toFormat("dd.MM.yyyy");
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

	eleventyConfig.addFilter("localizedTag", (collection, pageLang) => {
		return collection.filter((item) => {
			const postLang = item.data.lang;
			if (postLang == pageLang) {
				return item;
			}
		});
	});

	eleventyConfig.addFilter("excludeTagsFromTagList", (tags) => {
		return (tags || []).filter(
			(tag) =>
				[
					"all",
					"blog_de",
					"blog_en",
					"projects_de",
					"projects_en",
					"pages_de",
					"pages_en",
					"bookmarks_de",
					"bookmarks_en",
				].indexOf(tag) === -1,
		);
	});

	eleventyConfig.addFilter("sortTagList", (tags) => {
		return (tags || []).sort((a, b) => a.localeCompare(b));
	});

	eleventyConfig.addFilter("limit", function (arr, limit) {
		return arr.slice(0, limit);
	});

	const md = new markdownIt({
		html: true,
	});

	eleventyConfig.addFilter("markdown", (content) => {
		return md.render(content);
	});

	eleventyConfig.addFilter("removeMarkdown", (content) => {
		return removeMd(content);
	});

	eleventyConfig.addFilter("featuredImageOgLink", (image) => {
		return image.replace(/\.[^/.]+$/, "") + "_500.webp";
	});

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});
}
