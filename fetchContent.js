require("dotenv").config();
const fs = require("fs");
const download = require("download");
const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");

const notion = new Client({ auth: process.env.NOTION_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });
const dbIdPosts = process.env.NOTION_DB_POSTS;
const dbIdPortfolio = process.env.NOTION_DB_PORTFOLIO;
const dbIdPages = process.env.NOTION_DB_PAGES;

createMarkdownFiles(dbIdPosts, "post", "blog");
createMarkdownFiles(dbIdPortfolio, "project", "portfolio");
createMarkdownFiles(dbIdPages, "page", "pages");

// Get all posts with status defined as environment variable
async function filteredRequest(dbPostType) {
	try {
		const response = await notion.databases.query({
			database_id: dbPostType,
			filter: {
				or: [
					{
						property: "Status",
						select: { equals: process.env.CHECKSTATUS },
					},
					{
						property: "Status",
						select: { equals: process.env.CHECKSTATUS2 },
					},
				],
			},
		});
		return response.results;
	} catch (error) {
		console.error("Error in the filteredRequest function:", error.message);
	}
}

// Create an array for each post type
async function createArray(dbId) {
	try {
		const filteredData = await filteredRequest(dbId);
		const results = filteredData.map((result) => ({
			id: result.id,
			title: result.properties["Name"]?.title?.map((text) => text.plain_text).join(""),
			tags: result.properties["Tags"]?.multi_select.map((tag) => tag.name),
			featuredImage: result.cover?.file?.url || result.cover?.external?.url,
			date: result.properties["Datum"]?.date?.start.split("T")[0],
			updated: result.properties["Aktualisiert"]?.date?.start.split("T")[0],
			description: result.properties["Beschreibung"]?.rich_text
				.map((text) => text.plain_text)
				.join(""),
			permalink: result.properties["URL"]?.url,
			featured: result.properties["Startseite"]?.checkbox,
			weblink: result.properties["Weblink"]?.url,
			content: undefined,
		}));
		return results;
	} catch (error) {
		// Handle errors here
		console.error("Error in the getArray function:", error.message);
	}
}

// Functions to replace special characters
function matchUmlauts(match) {
	switch (match) {
		case "ä":
			return "ae";
		case "ö":
			return "oe";
		case "ü":
			return "ue";
	}
}

function matchAccents(match) {
	switch (match) {
		case "ç":
			return "c";
		case "é" || "è" || "ê" || "ë":
			return "e";
		case "à" || "â":
			return "a";
		case "ù" || "û":
			return "u";
		case "î" || "ï":
			return "i";
		case "ô":
			return "o";
	}
}

// Get content from Notion
const getContent = async (id) => {
	try {
		const mdblocks = await n2m.pageToMarkdown(id);
		return n2m.toMarkdownString(mdblocks);
	} catch (error) {
		// Handle errors here
		console.error("Error in the getContent function:", error.message);
	}
};

// Create content
async function createMarkdownFiles(dbId, postType, postTypes) {
	try {
		const arr = await createArray(dbId);
		for (i = 0; i < arr.length; i++) {
			arr[i].content = await getContent(arr[i].id);
			let titleSlug = arr[i].title
				.toLowerCase()
				.replace(/[\s/]/gi, "-")
				.replace(/[äöü]/gi, matchUmlauts)
				.replace(/[çéèêëàâùûîïô]/gi, matchAccents)
				.replace(/[^a-z0-9-]/gi, "");

			let filename = "";
			if (arr[i].date) {
				filename = arr[i].date.replace(/[-]/gi, "") + "_" + titleSlug + ".md";
			} else {
				filename = titleSlug + ".md";
			}

			let file = "src/" + postTypes + "/" + filename;

			let urlPath = "";
			if (postType === "post") {
				urlPath =
					postTypes +
					"/" +
					arr[i].date.match(/\d{4}/g) +
					"/" +
					arr[i].date.match(/(?<=-)\d{2}(?=-)/g) +
					"/" +
					titleSlug +
					"/";
			} else if (postType === "project") {
				urlPath = postTypes + "/" + titleSlug + "/";
			} else {
				urlPath = titleSlug + "/";
			}

			// Add frontmatter
			let frontmatter = "---\n";
			frontmatter += 'title: "' + arr[i].title + '"\n';
			frontmatter += 'layout: "' + postType + '.njk"\n';
			if (arr[i].date) {
				frontmatter += "date: " + arr[i].date + "\n";
			}
			if (arr[i].updated) {
				frontmatter += "updated: " + arr[i].updated + "\n";
			}
			if (arr[i].featuredImage) {
				frontmatter += 'featuredImage: "' + arr[i].featuredImage + '"\n';
			}
			if (arr[i].description) {
				frontmatter += 'description: "' + arr[i].description + '"\n';
			}
			if (arr[i].tags) {
				frontmatter += "tags: [" + arr[i].tags + "]\n";
			}
			if (arr[i].featured !== undefined) {
				frontmatter += "featured: " + arr[i].featured + "\n";
			}
			if (arr[i].weblink) {
				frontmatter += 'weblink: "' + arr[i].weblink + '"\n';
			}
			frontmatter += 'permalink: "' + urlPath + '"\n';
			frontmatter += "---\n";

			let mdContent = frontmatter + arr[i].content.parent;
			// Add content and remove double line breaks and line breaks between images
			mdContent = mdContent.replace(/\n{3,}/g, "\n\n");
			// Add a div container around images
			mdContent = mdContent.replace(
				/!\[.*?\]\(.*?\)(?:\n\s*!?\[.*?\]\(.*?\))+/g,
				`<div class="imagesContainer">\n\n$&\n\n</div>`
			);

			// Download images from Notion and replace URL in markdown file
			let images = mdContent.match(
				/(?<=featuredImage:\s\").*(?=\")|(?<=\!\[.*\]\()https?:\/\/.*(?<!\))/g
			);
			if (images) {
				for (j = 0; j < images.length; j++) {
					let imgUrl = images[j];
					let imgFiletype = imgUrl.match(/(?<=\.)[a-z]+(?=\?)/g);
					let imgRenamed = "";
					if (arr[i].date) {
						imgRenamed =
							arr[i].date.replace(/[-]/gi, "") + "_" + titleSlug + "_" + j + "." + imgFiletype;
					} else {
						imgRenamed = titleSlug + "_" + j + "." + imgFiletype;
					}
					let imgPath = "src/assets/img/" + imgRenamed;
					download(imgUrl, "src/assets/img/", { filename: imgRenamed });
					mdContent = mdContent.replace(imgUrl, imgPath);
				}
			}

			// Download pdfs from Notion and replace URL in markdown file
			let pdfs = mdContent.match(
				/(?<=\[.*\]\()https?:\/\/.*secure.notion-static.com.*\.pdf.*(?<!\))/g
			);
			if (pdfs) {
				for (j = 0; j < pdfs.length; j++) {
					let pdfUrl = pdfs[j];
					let pdfFilename = pdfUrl.match(/(?<=\/)[^\/]+(?=\?)/g);
					pdfFilename = pdfFilename.toString();
					let pdfOutput = "src/assets/pdf/";
					let pdfPath = "/assets/pdf/";
					pdfPath = pdfPath.concat(pdfFilename);
					await download(pdfUrl, pdfOutput, { filename: pdfFilename });
					mdContent = mdContent.replace(pdfUrl, pdfPath);
				}
			}

			// Download movies from Notion and replace URL in markdown file
			let movies = mdContent.match(/(?<=\[.*\]\()https?:\/\/.*(\.mov|\.mp4).*(?<!\))/g);
			if (movies) {
				for (j = 0; j < movies.length; j++) {
					let movieUrl = movies[j];
					let movieFilename = movieUrl.match(/(?<=\/)[^\/]+(?=\?)/g);
					movieFilename = movieFilename.toString();
					let movieOutput = "src/assets/movies/";
					let moviePath = "/assets/movies/";
					moviePath = moviePath.concat(movieFilename);
					await download(movieUrl, movieOutput, { filename: movieFilename });
					mdContent = mdContent.replace(movieUrl, moviePath);
				}
			}

			// Write markdown files
			fs.writeFile(file, mdContent, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log(filename + " has been written successfully");
				}
			});

			// Update status defined as environment variable
			notion.pages.update({
				page_id: arr[i].id,
				properties: {
					Status: {
						select: {
							name: process.env.UPDATESTATUS,
						},
					},
					URL: {
						url: urlPath,
					},
				},
			});
		}
		// If no new posts are found, log this
		if (arr.length === 0) {
			console.log("No updates in " + postTypes);
		}
	} catch (error) {
		// Handle errors here
		console.error("Error in the createMarkdownFiles function:", error.message);
	}
}
