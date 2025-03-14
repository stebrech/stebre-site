---
title: notion2eleventy
date: 2024-01-29
updated: 2024-05-10
featuredImage: /assets/img/20230917_11ty-mit-notion-verbinden.png
description: "`notion2eleventy` ist ein Plugin für den *Static Site Generator* [Eleventy (kurz: 11ty)](https://11ty.dev). Es lädt Inhalte von Notion in dein 11ty-Verzeichnis. Mit einem statusbasierten Workflow wird dafür gesorgt, dass nur die Inhalte heruntergeladen werden, die sich verändert haben. Das Plugin ist als Node Modul auf [npmjs.com](https://www.npmjs.com/package/@stebrech/notion2eleventy) verfügbar."
tags:
  - 11ty
  - markdown
  - notion
featured: true
weblink: https://github.com/stebrech/notion2eleventy
status: done
---
## `notion2eleventy` Features

- Lädt Notion-Inhalte inkl. Assets in dein Eleventy Verzeichnis.
- Die URL der Assets wird beim Herunterladen mit dem konfigurierbaren, lokalen Pfad ausgetauscht
- Statusbasierter Workflow:
    - Es werden nur die Beiträge mit Assets berücksichtigt, die in einem definierten Status sind.
    - Zum Abschluss wird der Status aktualisiert.
- Die Notion Metadaten können in der Konfigurationsdatei eingestellt werden. So werden sie im Frontmatter (in camelCase) hinzugefügt und können in den Templates genutzt werden.
- Die Anzahl verwendeter Notion-Datenbanken ist nicht limitiert, was es erlaubt verschiedene Beitragstypen zu definieren.
- Ein in Notion angewendetes Coverbild wird heruntergeladen und dem Frontmatter hinzugefügt.

## Abhängige Node Pakete

Die abhängigen Module für `notion2eleventy` sind:

- `@notionhq/client` ermöglicht es die Schnittstelle von Notion zu nutzen
- `notion-to-md` wandelt die Notion-Inhalte in Markdown um
- `axios` wird für das Herunterladen der Assets genutzt
- `dotenv` ermöglicht die Verwendung von *Environment*-Variablen um Keys und Umgebungsspezifisches sicher zu nutzen.
- `fs` ist ein Standardmodul von Node.js und erlaubt die Interaktion mit dem Filesystem 

## Plugin installieren

`notion2eleventy` wird mit dem Node Paketmanager `npm` oder `yarn` installiert werden.  

```sh
npm i @stebrech/notion2eleventy
```

oder 

```sh
yarn add @stebrech/notion2eleventy
```

## Konfiguration

Mit der Veröffentlichung auf [npmjs.com](https://www.npmjs.com/package/@stebrech/notion2eleventy) habe ich die projektspezifische Konfiguration in eine separates File ausgelagert. Dieses JavaScript-File muss wie folgt aufgebaut sein und kann einen frei wählbaren Namen tragen:

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

In der Config wird die Funktion `createMarkdownFiles` des Plugins aufgerufen. Werden mehrere Beitragstypen (z.B. Blogbeiträge, Seiten, etc.) benötigt, kann dies mit mehreren Notion Datenbanken gelöst werden. Somit wird die Objektvariable (im Muster `postType1` genannt) dupliziert, angepasst und die Funktion ein zweites Mal aufgerufen.

Es gibt einige Pflicht-Metadatenfelder, die in Notion angelegt werden müssen, wie der 

- Status (Typ Select oder Status);
- Titel (Typ Titel). 

Weitere Metadatenfelder sind optional und können beliebig hinzugefügt und genutzt werden. Diese werden dann in den Frontmatter der Markdowndateien (in camelCase) geschrieben.

Mit `11ty` kann die URL mit `permalink` im Frontmatter definiert werden. Es gibt aber auch andere Wege wie einer ordnerspezifischen `json` ([*Directory Data Files*](https://www.11ty.dev/docs/data-template-dir/)), weshalb diese Option optional genutzt werden kann.

Wohin die Markdown und Assets Dateien gespeichert werden, muss für jeden Beitragstyp (Notion Datenbank) festgelegt werden. Den Pfad der Links in den Markdown Dateien wird ebenfalls festgelegt.

## Environment-Variablen

`notion2eleventy` nutzt das Node Paket `dotenv`. Damit werden *Environment*-Variablen in einer `.env`-Datei gespeichert und API-Keys nicht direkt in den Code geschrieben.

> [!warning] Achtung: Teile deine Keys nicht in öffentlichen Repositories
> Füge `.env` deiner `.gitignore`-Datei hinzu damit die Keys nicht unbewusst veröffentlicht werden.

Füge eine `.env`-Datei mit folgenden Variablen dem Root-Ordner hinzu:

```
NOTION_KEY=
CHECKSTATUS=
CHECKSTATUS2=
UPDATESTATUS=
NOTION_DB_BLOG=
```

Die ersten vier Variablen sind zwingend:

1. Füge den API-Key, den du unter [www.notion.so/my-integrations](https://www.notion.so/my-integrations) erstellt hast, hinzu.
2. Dies ist der Name des Status, der berücksichtigt werden soll. Beiträge, die in diesem Status sind werden heruntergeladen.
3. Vielleicht benötigst du einen zweiten Status, der berücksichtigt werden soll. Wenn nicht, nutze einfach den gleichen Variablenwert wie `CHECKSTATUS`.
4. Status, der nach der Bearbeitung zugewiesen wird.

Es können so viele Beitragstypen (Notion Datenbanken) genutzt werden, wie benötigt. Um die Datenbank-ID vertraulich zu behalten, kann eine *Environment*-Variable, dafür genutzt werden. Die Bezeichnung ist frei wählbar und muss dann in der Konfigurationsdatei (siehe Zeile 2) hinzugefügt werden.

## `package.json` aktualisieren

Nun sind die Vorbereitungen gemacht und die Skripte in der `package.json`-Datei müssen angepasst werden. Mit `node PFAD_ZU_DEINER_CONFIGDATEI`wird es ausgeführt:

```json
"scripts": {
  "start": "node notion2eleventy.js && npx @11ty/eleventy --serve",
  "build": "node notion2eleventy.js && npx @11ty/eleventy",
}
```

## Feedback und Verbesserungsvorschläge

Wenn du einen Bug findest oder einen Verbesserungsvorschlag hast, eröffne bitte ein *Issue* oder gleich ein *Pull Request* im [Github-Repository](https://github.com/stebrech/notion2eleventy). 
