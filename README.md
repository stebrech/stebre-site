# SteBre Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/fb778df2-05a4-440d-9c05-78fdc66db601/deploy-status)](https://app.netlify.com/sites/stebre/deploys)

Git repository of the website [stebre.ch](https://stebre.ch).

The site uses the awesome SSG [Eleventy (short 11ty)](https://www.11ty.dev/).

## Content from Notion

As a headless cms it uses Notion.

While building it first fetches the content via Notions’s API and the the node package [`@notionhq/client`](https://www.npmjs.com/package/@notionhq/client). The content will be converted to `md` with the help of the lovely node package [`notion-to-md`](https://www.npmjs.com/package/notion-to-md).

My personal configuration for `notion-to-md` is in the `fetchContent.js` and  

- fetches only posts in a specific status,
- creates a frontmatter with the metadata added in Notion,
- downloads associated images and other files,
- clean ups the generated markdown,
- and finally changes the status on Notion.

## License

The code I used, including `fetchContent.js`, is licensed under the MIT license.

The content, including its assets, is licensed under the Creative Commons Attribution 4.0 International license.
