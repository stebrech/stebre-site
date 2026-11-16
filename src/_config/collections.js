export default function (eleventyConfig) {
	// Featured German projects
	eleventyConfig.addCollection("featuredProjectsDE", (collection) => {
		return collection.getFilteredByTag("stebrech_projects").filter((item) => item.data.featured);
	});

	// Featured English projects
	eleventyConfig.addCollection("featuredProjectsEN", (collection) => {
		return collection.getFilteredByTag("stebrech_en_projects").filter((item) => item.data.featured);
	});

	// Feed collection for German content
	eleventyConfig.addCollection("feedDE", (collection) => {
		return collection
		.getAll()
		.filter(function (item) {
			const tagsArr = item.data.tags
			return tagsArr !== undefined && !tagsArr.includes("stebrech_pages") && item.data.lang === "de";
		})
		.sort((a, b) => a.data.date - b.data.date);
	});

	// Feed collection for English content
	eleventyConfig.addCollection("feedEN", (collection) => {
		return collection
		.getAll()
		.filter(function (item) {
			const tagsArr = item.data.tags
			return tagsArr !== undefined && !tagsArr.includes("stebrech_en_pages") && item.data.lang === "en";
		})
		.sort((a, b) => a.data.date - b.data.date);
	});

	// Tags collection for German content
	// Inspired by https://cri.dev/posts/2024-09-21-how-to-exclude-tags-collection-filter-eleventy/
	const excluded = ["all"];

	eleventyConfig.addCollection("tagsDE", collections => {
		const tags = collections
			.getAll()
			.reduce((tags, item) => tags.concat(item.data.tags_de), [])
			.filter(tag => !!tag )
			.sort()
		return Array.from(new Set(tags)).map(name => ({
			name,
			count: collections.getAll().filter((item) => item.data.tags_de?.includes(name)).length,
			posts: collections.getAll()
				.filter(item => item.data.tags_de?.includes(name) )
				.sort((a, b) => b.data.date - a.data.date)
				.map(post => ({
					url: post.url,
					data: {
						title: post.data.title,
						date: post.data.date,
						updated: post.data.updated,
						featuredImage: post.data.featuredImage,
						og_img_url: post.data.og_img_url,
						description: post.data.description,
						tags_de: post.data.tags_de
					},
					}))

			}));
		});

	// Tags collection for English content
	// Inspired by https://cri.dev/posts/2024-09-21-how-to-exclude-tags-collection-filter-eleventy/
	eleventyConfig.addCollection("tagsEN", collections => {
		const tags = collections
			.getAll()
			.reduce((tags, item) => tags.concat(item.data.tags_en), [])
			.filter(tag => !!tag )
			.sort()
		return Array.from(new Set(tags)).map(name => ({
			name,
			count: collections.getAll().filter((item) => item.data.tags_en?.includes(name)).length,
			posts: collections.getAll()
			.filter((item) => item.data.tags_en?.includes(name))
			.sort((a, b) => b.data.date - a.data.date)
			.map(post => ({
				url: post.url,
				data: {
					title: post.data.title,
					date: post.data.date,
					updated: post.data.updated,
					featuredImage: post.data.featuredImage,
					og_img_url: post.data.og_img_url,
					description_en: post.data.description_en,
					tags_en: post.data.tags_en
				}
			})),
		}))
	})

	// TEST collection
	/* Uncomment for debuging
	eleventyConfig.addCollection("test", function (collectionsApi) {
		return collectionsApi
		.getAll()
		.sort((a, b) => a.data.tags - b.data.tags);
	});
	*/

}
