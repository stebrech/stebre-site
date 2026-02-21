---
title: Lesezeichen mit der Pocket API nach 11ty importieren
date: 2024-03-06
updated: 2025-04-07
featuredImage: 20240308_lesezeichen-mit-der-pocket-api-nach-11ty-importieren.jpg
description: Pocket bietet eine API, mit der die gespeicherten Lesezeichen verwendet und angepasst werden können. Diese mache ich mir zu nutzen und speichere die Daten in einem Lesezeichenbeitrag auf [stebre.ch](https://stebre.ch/bookmarks). Es werden Lesezeichen mit einem spezifischen Tag berücksichtigt. Nach der Verarbeitung wird der auf Pocket gespeicherte Link archiviert.
tags:
  - 11ty
  - automatisierung
  - webentwicklung
status: done
---

> [!INFO] Umzug
> Dieser Beitrag ist am 7.4.2025 von der Rubrik in Blog umgezogen.

Ich habe schon einige Varianten ausprobiert um lehrreiche und hilfreiche Weblinks als Favoriten zu speichern oder fürs später Lesen zu merken. Hängen geblieben bin ich bei [Pocket](https://getpocket.com), welches vor ein paar Jahren von [Mozilla](https://www.mozilla.org/de/) übernommen wurde und am Leben blieb. 

In meiner Pocket hat sich vieles, wertvolles angesammelt – zum grossen Teil ungelesen. Das muss sich ändern… Diese Schätze möchte ich gerne weiterempfehlen. Das Teilen auf Social Media ist gut und recht aber kurzlebig. Was bietet sich besser an als die persönliche Website. 

Auf meiner Website möchte ich nur (aus meiner Sicht) relevante Inhalte veröffentlichen. Daher ist dies ein guter Anlass all die gespeicherten Links durchzugehen und mir für später Gespeichertes endlich vorzunehmen.

Zu jedem wertvollen Link einen Blogartikel zu schreiben, fehlt mir die Zeit. Daher ist die Rubrik [Lesezeichen](/bookmarks) auf meiner Website entstanden. Da schreibe ich zumindest einen kurzen persönlichen Beschreibungstext dazu. Der Rest möchte ich soweit möglich automatisieren.

## Metadaten in Pocket

Wird in Pocket ein Link gespeichert, lässt sich dieser mit Schlagwörtern versehen, archivieren und favorisieren. Zusätzlich werden auch Metadaten aus einer Seite extrahiert und gespeichert. Dabei ist die kurze Beschreibung, ein Bild oder auch die geschätzte Lesedauer interessant.

## Eine App einrichten

Um die Pocket API zu nutzen, muss für den Verwendungszweck eine «Applikation» im [Developer-Bereich](https://getpocket.com/developer/) erstellt werden. Darin werden die Berechtigungen definiert. Also kann ein Lesezeichen nur gelesen oder auch via API bearbeitet werden.

In meinem Fall habe ich eine Applikation mit sämtlichen Rechten erstellt. Für das Einrichten der Authentifizierung, bin ich nach Startschwierigkeiten auf den Blogartikel [Getting Started With the Pocket Developer API](https://www.jamesfmackenzie.com/getting-started-with-the-pocket-developer-api/) von James Mackenzie gestossen, der mir weitergeholfen hat.

## Node.js Script in 11ty

Nachdem erfolgreichen Einrichten der Authentifizierung und Testen mit Postman habe ich ein Node.js Script erstellt, welches den Import aus Pocket in meine 11ty Site übernimmt. 

Das Script hat folgende Funktionen:

- Alle nicht archivierten Lesezeichen mit dem Schlagwort *bookmarks* werden importiert. Es werden alle Metadaten importiert.
- Aufgrund des teils unbefriedigenden Beschreibungstextes und fehlenden Bilds wird der Link zusätzlich mit `puppeteer` aufgerufen,
	- die *Description* im Head der Website geholt,
	- ein Screenshot der Site gemacht.
- Je Lesezeichen wird ein neues Markdown-File angelegt und mit den Metadaten befüllt.
- Die heruntergeladenen Lesezeichen werden zum Schluss in Pocket archiviert und bei späteren Scriptaufrufe ignoriert.

### Import

Der Import wird mit einer `GET`-Abfrage ausgeführt. Die dafür benötigte URL enthält Parameter zur Authentifizierung und der Bestimmung welche Lesezeichen importiert werden sollen.

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

Die Authentifizierung wird mit den Parametern `consumer_key` und `access_token` erreicht. 

Weitere Parameter sind:

- `state=unread` alle nicht archivierte Lesezeichen werden berücksichtigt
- `tag=bookmarks` alle Lesezeichen, die mit dem Schlagwort *bookmarks* versehen sind, werden berücksichtigt
- `detailType` es werden alle Metadaten abgefragt

### Beschreibungstexte

Nebst dem Pocket-Beschreibungstexts möchte ich auch die *Description* aus dem Head der entsprechenden Website beziehen. Diese war bisher meist besser als der Beschreibungstext von Pocket. 

Die Funktion, die ich dafür nutze, sieht wie folgt aus:

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

Mithilfe von `puppeteer` wird programmgesteuert ein Chrome-Browser mit der definierten URL aufgerufen. Dann werden die `description` und die `og:description` je in eine Variable geschrieben. Die Hoffnung ist, dass eine dieser Metadaten gepflegt wurde, ansonsten kann die Funktion keinen Wert übermitteln.

Die Website-*Description* schreibe ich als zitierten Inhalt in meinen Lesezeichen-Beitrag. Für den manuellen Vergleich werden jedoch die Beschreibungstexte von Pocket wie auch der Website in den Frontmatter der Markdown-Datei geschrieben.

### Screenshot

Kann kein Bild von Pocket heruntergeladen werden, wird folgende Funktion aufgerufen:

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

Auch hier wird wieder `puppeteer` genutzt. Nachdem Öffnen der URL wird ein Bildschirmauflösung von 1600 x 800 px eingestellt. Und dann – cheese 📸 – wird ein Foto gemacht.

## Abschluss

Wenn alle Daten so zusammengestellt sind wie ich sie brauche, schreibe ich ein neues Markdown-File in den entsprechenden Ordner:

```js
fs.writeFileSync(path.resolve(__dirname, `../bookmarks/${mdPath}`), data, "utf-8");
```

Danach wird der Link in Pocket aktualisiert indem er archiviert wird:

```js
const modifyPocketDataUrl = `https://getpocket.com/v3/send?consumer_key=${consumerKey}&access_token=${accessToken}&actions=[{"action":"archive","item_id":"${frontmatterData.id}"}]`;
await axios.get(modifyPocketDataUrl, pocketDataOptions);
```

Falls dich alle Details interessieren, kannst du das komplette Script auf [Github](https://github.com/stebrech/stebre-site/blob/main/_scripts/fetchPocketSaves.js) anschauen.

Foto von [Kelsy Gagnebin](https://unsplash.com/de/@kelsymichael?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) auf [Unsplash](https://unsplash.com/de/fotos/ein-stapel-bucher-mit-bunten-bandern-darauf-gdeIn8lsTzs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
