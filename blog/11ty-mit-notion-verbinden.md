---
title: 11ty mit Notion verbinden
date: 2023-09-17
updated: 2024-02-02
featuredImage: assets/img/20230917_11ty-mit-notion-verbinden_0.png
description: Für stebre.ch und bisher zwei weiteren Websites habe ich mir etwas neues ausgedacht. Da verwende ich neu den lieb gewonnen Static Site Generator 11ty in Kombination von Notion, einem vielseitigen Content Tool in der Cloud.
tags:
  - 11ty
  - Markdown
  - posts
---

Für ~~[stebre.ch](http://stebre.ch/)~~ und bisher zwei weiteren Websites habe ich mir etwas neues ausgedacht. Da verwende ich neu den lieb gewonnen Static Site Generator [11ty](https://www.11ty.dev/) in Kombination von [Notion](https://www.notion.so/), einem vielseitigen Content Tool in der Cloud.

> [!info] Update 2.2.2024
> Für stebre.ch nutze ich mittlerweile [Obsidian](https://obsidian.md/) zur Erstellung und Verwaltung der Inhalte. Da ich die Notion-Schnittstelle weiterhin für création eliane, [[../arbeiten/familienverein-wahlen|Familienverein Wahlen]] und hoffentlich auch bald für weitere spannende Projekte nutze, pflege ich diese weiter. Mit [[arbeiten/notion2eleventy|notion2eleventy]] habe ich ein besser konfigurierbares 11ty Plugin gebaut.

## Was ist 11ty?

[11ty](https://www.11ty.dev/) (auch Eleventy genannt) ist eines von vielen Static Site Generators (kurz: SSG), betrieben mit [Node.js](https://nodejs.org/de). Ein SSG ist verantwortlich für die eigentliche Ausgabe (Frontend) einer Website/Webapp und ist bewusst von der Inhaltsadministration (Backend) getrennt. 

Mit 11ty lässt sich mit nur sehr wenig Code bereits Resultate erzielen, ist also minimalistisch aber konfigurativ stark erweiterbar. Es kommt von Grund auf mit wenig Node.js Abhängigkeiten (Dependencies) aus und gehört zu den Schnellsten wenn es darum geht die Website zu generieren (Build Time). Die vielen möglichen Templatesprachen sind ebenfalls ein grosser Vorteil. Ich nutze eine Kombination aus Markdown und Nunjucks.

Folgendes YouTube-Video von [11ty Rocks!](https://11ty.rocks/) demonstriert ein Drei-Minuten-Setup mit 11ty: [Build an 11ty Site in 3 Minutes](https://www.youtube.com/watch?v=BKdQEXqfFA0)

## Was ist Notion?

[Notion](https://www.notion.so/) ist in der Cloud zuhause und lässt dich Inhalte in einem Blockeditor (ähnlich wie der Gutenberg Editor von WordPress) schreiben. Die Inhalte können auf einfache Weise in Datenbanken strukturiert werden. Mit dem Hinzufügen von Metadaten und den unterschiedlichen Darstellungsformen lässt sich das Content-Tool sehr vielseitig nutzen. Und mit Notion’s API kann man es eben auch als Headless CMS nutzen.

## Wie ich die beiden zusammengebracht habe

Wie schon erwähnt, bietet Notion eine Schnittstelle an um die Inhalte anderweitig zu nutzen. Dazu kann unter [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) eine eigene Einbindung angelegt werden. Es wird ein API-Key erzeugt und die Berechtigungen festgelegt.

![Anleitung wie eine Einbindung erstellt wird. Gif-Animation.](assets/img/20230917_11ty-mit-notion-verbinden_1.gif)

_Bildquelle:_ [_notion.so_](https://developers.notion.com/docs/create-a-notion-integration)

In Notion kann nun einer Datenbank, beispielsweise Blog, die Einbindung hinzugefügt werden.

![Anleitung wie eine Einbindung zugewiesen wird. Gif-Animation.](assets/img/20230917_11ty-mit-notion-verbinden_2.gif)

_Bildquelle:_ [_notion.so_](https://developers.notion.com/docs/create-a-notion-integration)

Damit ist der Teil in Notion bereits erledigt. Weiter gehts mit dem aufwändigeren Teil im 11ty-Projekt.

### Benötigte Node.js Pakete

Um die Notion API zu nutzen wird das Node Paket [`notionhq/client`](https://www.npmjs.com/package/@notionhq/client) benötigt.

Ich wollte die Inhalte innerhalb des 11ty Repositories haben und als Markdown Files herunterladen. Somit habe ich für meine Inhalte auch gleich ein Backup. Um dies zu erreichen braucht es ein weiteres Node Paket: [`notion-to-md`](https://www.npmjs.com/package/notion-to-md).

### fetchContent.js

> [!info] Update 2.2.2024
> Der im folgenden aufgezeigten Code ist zum Teil überholt. Mit [[arbeiten/notion2eleventy|notion2eleventy]] und habe ich ihn ein Node Paket überführt.

Die Konfiguration wie die Markdown-Files heruntergeladen und befüllt werden sollen, habe ich in einer neuen JavaScript-Datei (`fetchContent.js`) vorgenommen. 

Mit der ersten Funktion wird eine der Datenbanken abgefragt und mit dem Metadatenfeld «Status» gefiltert. Ich möchte also nicht jedes Mal alles herunterladen, sondern nur was sich in einem (respektive in einem optionalen zweiten) Status befindet. So bleibt die dafür benötigte Zeit überschaubar.

```javascript
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
```

In der zweiten Funktion wird ein Array erstellt, welches je Treffer ein Objekt mit den benötigten Metadaten enthält. Da es viele gleiche Metadatentypen in den verschiedenen Datenbanken gibt, sind alle Metadaten vorhanden und innerhalb einer Funktion abgedeckt. 

```javascript
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
```

Mit zwei Hilfsfunktionen werden mögliche Umlaute und Akzente umgewandelt.

```javascript
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
```

Nun kommt `notion-to-md` ins Spiel. Der Inhalt wird innerhalb des erzeugten Arrays in der zuvor noch undefinierten Objekt-Eigenschaft `content` befüllt. Dies findet in einer for-Schleife statt, da das Array aus mehreren Objekten bestehen kann. 

```javascript
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
…
```

Innerhalb der for-Schleife gehts weiter mit Variablen, die für das Speichern und die Benennung der Markdown-Files, sowie für den URL-Pfad benötigt werden.

```javascript
…
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
…
```

Danach wird der Frontmatter, also die Metadaten am Anfang des Markdown-Files, zusammengestellt und in der Variable `mdContent` mit dem Inhalt in der Variable `content` vereint. Zudem werden überflüssige Leerzeilen bereinigt und aufeinanderfolgende Bilder in einem Div-Container gruppiert. Dieser Container mit der Klasse `imagesContainer` kann genutzt werden um die Bilder in einer Galerie darzustellen.

```javascript
…
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
…
```

Auch Assets wie Bilder, PDFs und Filme möchte ich im 11ty Repository gesichert haben. Die Assets sind sowieso nur mit einer kurzzeitig öffentlichen URL aus der AWS Cloud erreichbar.

Die Bilder sind aufgrund der Markdown-Syntax (`![alt](url)`) leicht von den anderen Assetstypen (PDFs und Filme) zu unterscheiden. Schwieriger ist jedoch die Unterscheidung ob das Asset in Notion hochgeladen wurde oder es an einem anderen Ort liegt, beispielsweise ein PDF, welches ich verlinke. Dies habe ich jetzt mal so gelöst, dass die URL `amazonaws` enthalten muss. 

```javascript
…
			// Download images from Notion and replace URL in markdown file
			let images = mdContent.match(
				/(?<=featuredImage:\s\")https?:\/\/.*(amazonaws).*(?=\")|(?<=\!\[.*\]\()https?:\/\/.*(amazonaws).*(?<!\))/g
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
			let pdfs = mdContent.match(/(?<=\[.*\]\()https?:\/\/.*(amazonaws).*(\.pdf).*(?<!\))/g);
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
			let movies = mdContent.match(
				/(?<=\[.*\]\()https?:\/\/.*(amazonaws).*(\.mov|\.mp4).*(?<!\))/g
			);
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
…
```

Zum Schluss wird das Markdown-File geschrieben und der Status in Notion umgestellt.

```javascript
…
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
```

~~Im Github-Repository [stebrech/stebre-site](https://github.com/stebrech/stebre-site) ist die komplette `fetchContent.js` zugänglich. Ich freue mich wenn du einen Verbesserungsvorschlag oder Bug dort meldest.~~

Für die Umsetzung hat mir unter anderem der Blogpost [From Notion to Eleventy](https://iamschulz.com/from-notion-to-eleventy/) von Daniel Schulz geholfen und auch ChatGPT musste ich hin und wieder um Rat fragen ;-)

