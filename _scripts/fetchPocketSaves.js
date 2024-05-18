require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const puppeteer = require("puppeteer");

const consumerKey = process.env.POCKET_CONSUMER_KEY;
const accessToken = process.env.POCKET_ACCESS_TOKEN;

const getPocketDataUrl = `https://getpocket.com/v3/get?consumer_key=${consumerKey}&access_token=${accessToken}&state=unread&tag=bookmarks&detailType=complete`;

const pocketDataOptions = {
	headers: {
		"Content-Type": "application/json; charset=UTF-8",
		"X-Accept": "application/json",
	},
};

const pocketDataRequest = async () => {
	try {
		const fetch = await axios.get(getPocketDataUrl, pocketDataOptions);
		const data = await fetch.data;
		const dataArray = Object.values(data.list);

		for (let i = 0; i < dataArray.length; i++) {
			let authors = [];
			if (dataArray[i].authors) {
				const authorsArr = Object.values(dataArray[i].authors);
				authors = authorsArr.map((author) => author.name);
			}

			// Get the domain name without http protocol
			const domain = dataArray[i].resolved_url.match(
				/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim,
			);
			const domainName = domain[0].replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");

			const tagsArr = Object.values(dataArray[i].tags);
			const tags = tagsArr.map((item) => `"${item.tag}"`);
			const frontmatterData = {
				id: dataArray[i].item_id,
				title: dataArray[i].resolved_title,
				date: convertEpochToDate(dataArray[i].time_added),
				tags: `[ ${tags.filter((tag) => tag !== "bookmarks").join(", ")} ]`,
				excerpt: dataArray[i].excerpt,
				bookmarkLang: dataArray[i].lang,
				slug: slugify(dataArray[i].resolved_title, { remove: /[*+~.–—()'"!?:;@]/g, lower: true }),
				weblink: dataArray[i]?.resolved_url,
				domainName: domainName,
				imgUrl: dataArray[i]?.top_image_url,
				timeToRead: dataArray[i]?.time_to_read,
				authors: authors.join(", "),
				description: "TODO: Add a description of the article here.",
				newsletter: false,
			};

			const dateWithoutHyphens = frontmatterData.date.replace(/-/g, "");
			const filename = `${dateWithoutHyphens}_${frontmatterData.slug}`;
			const screenshotPath = `assets/img/${dateWithoutHyphens}_${frontmatterData.slug}_screenshot.png`;
			const imgPath = `assets/img/${dateWithoutHyphens}_${frontmatterData.slug}.png`;
			const mdPath = `${dateWithoutHyphens}_${frontmatterData.slug}.md`;

			let data = "---\n";
			data += `title: >\n  ${frontmatterData.title}\n`;
			data += `date: ${frontmatterData.date}\n`;
			data += `tags: ${frontmatterData.tags}\n`;
			data += `slug: ${frontmatterData.slug}\n`;
			data += `weblink: ${frontmatterData.weblink}\n`;
			data += `domainName: ${frontmatterData.domainName}\n`;
			if (frontmatterData.lang) {
				data += `bookmarkLang: ${frontmatterData.lang}\n`;
			}

			// Get the meta description of the website
			const metaDescription = await getMetaDescription(frontmatterData.weblink, filename);
			data += `metaDescription: >\n  ${metaDescription}\n`;

			// Get the excerpt Pocket provides
			if (frontmatterData.excerpt) {
				data += `pocketDescription: >\n  ${frontmatterData.excerpt}\n`;
			}

			data += `description: >\n  ${frontmatterData.description}\n`;

			// Use image url from Pocket. Get a screenshot of the website if there's no image
			if (frontmatterData.imgUrl) {
				// first check if the image url is reachable
				try {
					await axios.get(frontmatterData.imgUrl);
					await downloadPocketImage(frontmatterData.imgUrl, imgPath, filename);
					data += `featuredImage: ${imgPath}\n`;
				} catch (error) {
					await getScreenshot(frontmatterData.weblink, screenshotPath, filename);
					data += `featuredImage: ${screenshotPath}\n`;
				}
			} else {
				await getScreenshot(frontmatterData.weblink, screenshotPath, filename);
				data += `featuredImage: ${screenshotPath}\n`;
			}

			// Get the time to read the article if available
			if (frontmatterData.timeToRead) {
				data += `timeToRead: ${frontmatterData.timeToRead}\n`;
			}
			data += "---\n";
			// Start of the content
			data += "<blockquote";
			if (frontmatterData.lang) {
				data += ` lang="${frontmatterData.lang}"`;
			}
			data += ">";
			if (metaDescription) {
				data += `${metaDescription}\n`;
			} else {
				data += `${frontmatterData.excerpt}\n`;
			}

			data += "<footer>— ";
			if (frontmatterData.authors) {
				data += `${frontmatterData.authors}, `;
			}
			data += `<a href="${frontmatterData.weblink}">${frontmatterData.domainName}</a></footer></blockquote>\n\n`;
			data += frontmatterData.description;
			// End of the content

			// Create a new markdown file with the frontmatter data
			fs.writeFileSync(path.resolve(__dirname, `../bookmarks/${mdPath}`), data, "utf-8");
			console.log(`${filename} | Markdown file has been created`);

			// Archive the bookmark on Pocket
			const modifyPocketDataUrl = `https://getpocket.com/v3/send?consumer_key=${consumerKey}&access_token=${accessToken}&actions=[{"action":"archive","item_id":"${frontmatterData.id}"}]`;
			await axios.get(modifyPocketDataUrl, pocketDataOptions);
			console.log(`${frontmatterData.slug} has been archived on Pocket`);
		}
	} catch (error) {
		console.error(error);
	}
};

pocketDataRequest();

function convertEpochToDate(epoch) {
	const date = new Date(epoch * 1000);
	const utfDate = date.toISOString().slice(0, 10);
	return utfDate;
}

async function getScreenshot(url, filepath, filename) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	try {
		await page.goto(url);
		await page.setViewport({ width: 1600, height: 800 });
		await page.screenshot({ path: filepath });
		await browser.close();
		console.log(`${filename} | Screenshot has been saved`);
	} catch (error) {
		await browser.close();
		console.error(`${filename} | Error getting screenshot:`, error);
	}
}

async function downloadPocketImage(url, filepath, filename) {
	try {
		const response = await axios.get(url, { responseType: "arraybuffer" });
		fs.writeFile(filepath, response.data, (err) => {
			if (!err) {
				console.log(`${filename} | Image downloaded successfully`);
			}
		});
	} catch (error) {
		console.error(`${filename} | Error downloading image:`, error);
	}
}

async function getMetaDescription(url, filename) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	try {
		await page.goto(url);
		const metaDescription = await page.evaluate(() => {
			const description = document.querySelector('meta[name="description"]');
			const ogDescription = document.querySelector('meta[property="og:description"]');
			if (description) {
				return description.content;
			} else if (ogDescription) {
				return ogDescription.content;
			} else {
				return null;
			}
		});
		await browser.close();
		console.log(`${filename} | Meta description has been fetched`);
		return metaDescription;
	} catch (error) {
		await browser.close();
		console.error(`${filename} | Error getting meta description:`, error);
		return null;
	}
}
