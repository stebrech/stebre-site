---
title: Importing bookmarks to 11ty with the Pocket API
date: 2024-03-06T00:00:00.000Z
featuredImage: assets/img/20240308_lesezeichen-mit-der-pocket-api-nach-11ty-importieren.jpg
description: Pocket offers an API with which the saved bookmarks can be used and customized. I make use of this and save the data in a bookmark post on [stebre.ch](https://stebre.ch/en/bookmarks). Bookmarks with a specific tag are taken into account. After processing, the link saved on Pocket is archived.
tags:
  - 11ty
  - automation
  - webdev
aliases: 
featured: true
status: done
---
I've tried several ways to save instructive and helpful web links as favorites or to remember them for later reading. I got stuck with [Pocket](https://getpocket.com), which was taken over by [Mozilla](https://www.mozilla.org/de/) a few years ago and stayed alive.

A lot of valuable stuff has accumulated in my Pocket – most of it unread. That has to change... I would like to recommend these treasures to others. Sharing on social media is all well and good, but short-lived. What could be better than a personal website?

I only want to publish relevant content (from my point of view) on my website. So this is a good opportunity to go through all the links I've saved and to finally resolve of what I've saved for later.

I don't have the time to write a blog article for every valuable link. That's why I created the [[/en/bookmarks|bookmarks]] section on my website. There I write at least a short personal description text. The rest I would like to automate as far as possible.

## Metadata in Pocket

If a link is saved in Pocket, it can be tagged with keywords, archived and favorited. In addition, metadata is also extracted from a page and saved. The short description, an image or the estimated reading time are of interest here.

## Set up an app

To use the Pocket API, an “application” must be created for the intended use in the [Developer area](https://getpocket.com/developer/). This defines the authorizations. This means that a bookmark can either  be read only or edited via the API.

In my case, I have created an application with all rights. To set up the authentication, after initial difficulties I came across the blog article [Getting Started With the Pocket Developer API](https://www.jamesfmackenzie.com/getting-started-with-the-pocket-developer-api/) by James Mackenzie, which helped me further.

## Node.js script in 11ty

After successfully setting up authentication and testing with Postman, I created a Node.js script to import from Pocket into my 11ty site.

The script has the following functions:

- All unarchived bookmarks with the keyword *bookmarks* are imported. All metadata is imported.
- Due to the partly unsatisfactory description text and missing image, the link is additionally opened with `puppeteer`,
	- the *description* in the head of the website is retrieved and
	- a screenshot of the site is taken.
- A new Markdown file is created for each bookmark and filled with the metadata.
- The downloaded bookmarks are finally archived in Pocket and ignored for subsequent script calls.

### Import

The import is executed with a `GET` query. The URL required for this contains parameters for authentication and determining which bookmarks are to be imported.

```js
const getPocketDataUrl = `https://getpocket.com/v3/get?consumer_key=${consumerKey}&access_token=${accessToken}&state=unread&tag=bookmarks&detailType=complete`;

const pocketDataOptions = {
	headers: {
		"Content-Type": "application/json; charset=UTF-8",
		"X-Accept": "application/json",
	},
};

const fetch = await axios.get(getPocketDataUrl, pocketDataOptions);
```

Authentication is achieved with the parameters `consumer_key` and `access_token`.

Further parameters are:

- `state=unread` all unarchived bookmarks are taken into account
- `tag=bookmarks` all bookmarks tagged with the keyword *bookmarks* are taken into account
- `detailType` all metadata is queried

### Description texts

In addition to the pocket description text, I would also like to retrieve the description from the head of the corresponding website. So far, this has usually been better than the Pocket description text.

The function I use for this looks like this:

```js
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
```

With the help of `puppeteer`, a Chrome browser with the defined URL is called programmatically. Then the `description` and the `og:description` are each written to a variable. The hope is that one of these metadata has been maintained, otherwise the function cannot transmit a value.

I write the website description as quoted content in my bookmark post. For the manual comparison, however, the description texts of Pocket as well as the website are written in the frontmatter of the Markdown file.

### Screenshot

If no image can be downloaded from Pocket, the following function is called:

```js
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
```

Again, `puppeteer` is used here. After opening the URL, a screen resolution of 1600 x 800 px is set. And then – cheese 📸 – a photo is taken.

## Conclusion

When all the data has been compiled as I need it, I write a new Markdown file in the corresponding folder:

```js
fs.writeFileSync(path.resolve(__dirname, `../bookmarks/${mdPath}`), data, "utf-8");
```

The link is then updated in Pocket by archiving it:

```js
const modifyPocketDataUrl = `https://getpocket.com/v3/send?consumer_key=${consumerKey}&access_token=${accessToken}&actions=[{"action": "archive", "item_id":"${frontmatterData.id}"}]`;
await axios.get(modifyPocketDataUrl, pocketDataOptions);
```

If you are interested in all the details, you can view the complete script on [Github](https://github.com/stebrech/stebre-site/blob/main/_scripts/fetchPocketSaves.js).

Photo by [Kelsy Gagnebin](https://unsplash.com/de/@kelsymichael?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/de/fotos/ein-stapel-bucher-mit-bunten-bandern-darauf-gdeIn8lsTzs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
