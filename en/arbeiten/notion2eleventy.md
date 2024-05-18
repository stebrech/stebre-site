---
title: notion2eleventy
date: 2024-01-29T00:00:00.000Z
updated: 2024-05-10
featuredImage: assets/img/20230917_11ty-mit-notion-verbinden.png
description: "`notion2eleventy` is a plugin for the *Static Site Generator* [Eleventy (short: 11ty)](https://11ty.dev). It loads content from Notion into your 11ty directory. A status-based workflow ensures that only content that has changed is downloaded. The plugin is available as a Node module at [npmjs.com](https://www.npmjs.com/package/@stebrech/notion2eleventy)."
tags:
  - 11ty
  - markdown
  - notion
featured: true
weblink: https://github.com/stebrech/notion2eleventy
aliases: []
status: done
---
## `notion2eleventy` Features

- Loads Notion content including assets into your Eleventy directory.
- The URL of the assets is exchanged with the configurable, local path when downloading
- Status-based workflow:
    - Only posts with assets that are in a defined status are taken into account.
    - The status is updated at the end.
- The Notion metadata can be set in the configuration file. They are added in the frontmatter (in camelCase) and can be used in the templates.
- The number of Notion databases used is not limited, which makes it possible to define different post types.
- A cover image applied in Notion is downloaded and added to the frontmatter.

## Dependent Node packages

The dependent modules for `notion2eleventy` are:

- `@notionhq/client` allows to use the interface of Notion
- `notion-to-md` converts the Notion content into Markdown
- `axios` is used to download the assets
- `dotenv` allows the use of *environment* variables to safely use keys and environment specifics.
- `fs` is a standard module of Node.js and allows interaction with the file system

## Install plugin

`notion2eleventy` will be installed with the Node package manager `npm` or `yarn`.  

```sh
npm i @stebrech/notion2eleventy
```

or

```sh
yarn add @stebrech/notion2eleventy
```

## Configuration

With the publication on [npmjs.com](https://www.npmjs.com/package/@stebrech/notion2eleventy) I have moved the project-specific configuration to a separate file. This JavaScript file must be structured as follows and can have a freely selectable name:

```js
const createMarkdownFiles = require("@stebrech/notion2eleventy");
const dbIdPosts = process.env.NOTION_DB_BLOG;
const postType1 = {
	dbId: dbIdPosts, // id of the database. You can find it in the URL of the database or in the share link.
	postType: "posts",
// REQUIRED Notion database properties
	requiredMetadata: {
		status: "Status",
		statusFieldType: "status", // "select" or "status"
		title: "Name", // must be type: title
	},
	// Optional Notion database properties. You can add as many properties for each type as you need.
	optionalMetadata: {
		// --------------------------------
		// Optional fields for specific use
		// --------------------------------
		layout: "Layout", // CHANGED to optional in v0.1.0; must be type: select
		date: "Date", // CHANGED in v0.1.0; if you want to sort your posts using this, your Notion property needs to be called Date; must be type: date
		// -----------------------
		// Optional fields by type
		// -----------------------
		textFields: ["Description"],
		multiSelectFields: ["Tags"],
		selectFields: [],
		dateFields: [],
		checkboxFields: [],
		urlFields: [],
		numberFields: [], // ADDED in v0.1.0
		personFields: [], // ADDED in v0.1.0
		relationFields: [], // ADDED in v0.1.0; ATTENTION: requiredMetadata.title, optionalMetadata.date, downloadPaths.mdAddDatePrefix and permalink.slug must be configured the same in the database of the related post.
		formulaStringFields: [], // ADDED in v0.1.1; Formula fields which results to a string
		formulaNumberFields: [], // ADDED in v0.1.1; Formula fields which results to a number
	},
	permalink: {
		addPermalink: true, // ADDED in v0.1.0
		includesPostType: true,
		includesYear: false, // REQUIRES optionalMetada.date
		includesMonth: false, // REQUIRES optionalMetada.date; Makes only sense if permalinkHasYear is true
		includesDay: false, // ADDED in v0.1.0; REQUIRES optionalMetada.date; Makes only sense if permalinkHasYear and permalinkHasMonth is true
		slug: "", // MOVED to permalink in v0.1.0. Must be type text; Use a custom slug set in Notion. If empty the slug will be created from the title. A trailing slash will be added automatically. addPermalink must be true.
		publishPermalink: false, // if true, Notion requires a field called "Permalink" of type "URL" in the database
	},
	downloadPaths: {
		// Needs trailing slash
		md: "src/posts/",
		mdAddDatePrefix: true, // ADDED in v0.1.0; REQUIRES optionalMetada.date
		img: "src/assets/img/",
		imgAddDatePrefix: true, // ADDED in v0.1.0; REQUIRES optionalMetada.date
		movie: "src/assets/movie/",
		movieAddDatePrefix: true, // ADDED in v0.1.0; REQUIRES optionalMetada.date
		pdf: "src/assets/pdf/",
		pdfAddDatePrefix: true // ADDED in v0.1.0; REQUIRES optionalMetada.date
	},
	markdownPaths: {
		// URL path used in the markdown files
		img: "/assets/img/",
		movie: "/assets/movie/",
		pdf: "/assets/pdf/",
	},
};

async function notion2eleventy() {
	await createMarkdownFiles(postType1);
}

notion2eleventy()
```

The `createMarkdownFiles` function of the plugin is called in the config. If several post types (e.g. blog posts, pages, etc.) are required, this can be solved with several Notion databases. This means that the object variable (called `postType1` in the sample) is duplicated, adapted and the function is called a second time.

There are some mandatory metadata fields that must be created in Notion, such as the

- status (type select or status);
- title (type title).

Other metadata fields are optional and can be added and used as required. These are then written to the frontmatter of the markdown files (in camelCase).

With `11ty` the URL can be defined with `permalink` in the frontmatter. However, there are also other ways such as [*Directory Data Files*](https://www.11ty.dev/docs/data-template-dir/), which is why this option can be used optionally.

Where the Markdown and assets files are saved must be defined for each post type (Notion database). The path of the links in the Markdown files is also defined.

## Environment variables

`notion2eleventy` uses the Node package `dotenv`. This means that *environment* variables are stored in an `.env` file and API keys are not written directly into the code.

> [!warning] Attention: Do not share your keys in public repositories
> Add `.env` to your `.gitignore` file so that the keys are not published unknowingly.

Add an `.env` file with the following variables to the root folder:

```
NOTION_KEY=
CHECKSTATUS=
CHECKSTATUS2=
UPDATESTATUS=
NOTION_DB_BLOG=
```

The first four variables are mandatory:

1. add the API key that you created at [www.notion.so/my-integrations](https://www.notion.so/my-integrations).
2. this is the name of the status to be considered. Posts that are in this status will be downloaded.
3. you may need a second status to be taken into account. If not, just use the same variable value as `CHECKSTATUS`.
4. status that will be assigned after editing.

You can use as many post types (Notion databases) as you need. To keep the database ID confidential, an *environment* variable can be used for this purpose. The name is freely selectable and must then be added in the configuration file (see line 2).

## Update `package.json

Now the preparations have been made and the scripts in the `package.json` file must be adapted. It is executed with `node PATH_TO_YOUR_CONFIGFILE`:

```json
"scripts": {
  "start": "node notion2eleventy.js && npx @11ty/eleventy --serve",
  "build": "node notion2eleventy.js && npx @11ty/eleventy",
}
```

## Feedback and suggestions for improvement

If you find a bug or have a suggestion for improvement, please open an *issue* or a *pull request* in the [Github repository](https://github.com/stebrech/notion2eleventy).
