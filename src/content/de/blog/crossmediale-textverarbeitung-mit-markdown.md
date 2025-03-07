---
title: Crossmediale Textverarbeitung mit Markdown
date: 2018-04-16
featuredImage: /assets/img/20180416_crossmediale-textverarbeitung-mit-markdown.jpg
description: Eine grosse Herausforderung bei der medienneutralen Datenherstellung ist das fehlende Bewusstsein für strukturierte Inhalte. Werden Inhalte (zuerst) in Textverarbeitungsprogrammen wie Microsoft Word erstellt, wird versucht diese ansprechend zu gestalten. Meist bleibt eine saubere Struktur dabei aber auf der Strecke.
tags:
  - barrierefreiheit
  - content-first
  - indesign
  - markdown
status: done
---
Mit Word und ähnlicher Software können Formatierungen schnell und einfach angewendet werden. Beim Ausdruck auf dem Bürodrucker mag noch niemand merken, dass die angewendeten Formatierungen vielleicht nicht die besten waren:

- rein visuell gestaltete Überschriften
- falsche Listen
- Tabellenlayouts
- mehrere Leerzeichen und Blindzeilen
- usw.

Die strikte Verwendung von Formatvorlagen ist weniger attraktiv als das «Hauruck-Formatieren». Aber genau mithilfe der Absatzformaten kann ein gewisses Mass an Semantik und Struktur hergestellt werden.

Mit der Verwendung von Markdown wird dieses Problem entschärft indem beim Erfassen der Texte gar keine Styles zur Verfügung stehen. Es kann eine klarere Rollentrennung von Autor/in und Designer/in gemacht werden.

## Flexibles Design

Um medienneutrale Texte zu schreiben, sollten sich Autorinnen/Autoren auf das Wesentliche – dem Inhalt und dessen Struktur – konzentrieren. Die Trennung von Inhalt und Design ermöglichen es die Ausgabe flexibler zu gestalten. Sauber strukturierte Inhalte können einfacher für verschiedene und nicht nur einem Medium verwendet werden.

## Barrierefreiheit

Das Strukturieren von Inhalten dient nicht nur der crossmedialen Verarbeitung, es legt auch einen wesentlichen Grundstein für barrierefreie, digitale Medien. Um Inhalte in ein anderes Format zu übertragen und dabei semantische Tags zu vergeben, ist eine bestehende und korrekte Struktur nötig.

## Was ist Markdown?

Als alternative Ausgangslage zu Word und ähnlichem, stelle ich mir Markdown als mögliche, gute Grundlage für «Crossmedia Publishing» vor.

Markdown ist eine Auszeichnungssprache, welche auf reinem Text basiert. Sie wurde entwickelt um einfach HTML-Code herstellen zu können. Mit Markdown werden nicht HTML-Tags, sondern definierte Sonderzeichen verwendet. Diese Sonderzeichen stehen für strukturelle Auszeichnungen und lassen sich wiederum einfach in HTML konvertieren.

Markdown lässt sich aber auch in andere Formate konvertieren, siehe [«Konvertierung mit Pandoc»](about:blank#konvertierung-mit-pandoc). Markdown gibt es in verschiedenen Ausführungen, z.B. Github Flavored Markdown, MultiMarkdown und noch mehr.

## Der Markdown-Workflow

Zwei Punkte vorneweg:

1. Dieses Vorgehen kann sicher nicht mit grossen Multichannel-Publishing-Lösungen mithalten.
2. Ich konnte leider noch keine Erfahrungen mit solchen Multichannel-Publishing-Lösungen, wie beispielsweise [Typefi](https://www.typefi.com/), sammeln. Daher kann ich hier keine 1zu1-Vergleiche machen.

Ich bin der Meinung, dass Markdown eine kleine aber feine Alternative zu solchen Diensten ist. Dabei sehe ich folgende Vorteile:

1. Durch Markdown findet unweigerlich eine Trennung von Inhalt und Design statt.
2. Die Lösung funktioniert lokal und ist günstig oder gar kostenlos.
3. Markdown basiert auf reinem Text. So bleibt das Quelldokument immer lesbar, frei verfügbar und unabhängig von proprietärer Software.
4. Wenn sich Autorinnen/Autoren von Markdown überzeugen lassen und bereit sind diese (nicht so schwere) Syntax zu erlernen, nehmen sie das Strukturieren der Inhalte bewusster wahr. Durch diese verbesserte Ausgangslage kann mühsame Aufbereitungsarbeit eingespart werden. Damit könnte eventuell auch Kosten durch Dritte reduziert werden.
5. Mit vielen Web-CMS ist es nicht schwer Markdown-Inhalte direkt zu verwenden:
	- In [WordPress](https://wordpress.org/) können Plugins, wie z.B. WP-Markdown, Jetpack, etc., installiert werden um die Markdown-Inhalte direkt zu verwenden.
	- Mein Lieblingseditor [iA Writer](https://ia.net/writer) ist für die Verwendung von Markdown-Auszeichnungen vorgesehen und lässt sich direkt mit [WordPress.com](https://wordpress.com/) oder [WordPress](https://wordpress.org/) mit [Jetpack](https://jetpack.com/) verbinden.
	- Falls Markdown in deinem CMS nicht verwendet werden kann, müsste Markdown zuerst in HTML umgewandelt werden, siehe folgende Abschnitte.

![iA Writer in Aktion. Gif-Animation.](/assets/img/20180416_crossmediale-textverarbeitung-mit-markdown_1.gif)

_iA Writer – ein simpler Markdown Editor_

## Konvertierung mit Pandoc

Falls die erstellte Markdown-Datei nicht direkt verwendet werden kann, wird eine Konvertierung in ein anderes Format benötigt. Eine Möglichkeit ist die Verwendung des Open Source Konverters [Pandoc](https://pandoc.org/index.html).

Dieser Konverter funktioniert in der Kommandozeile. Falls du diese nicht gewohnt bist – nicht gleich die Hände verwerfen. Es ist nicht so kompliziert. Mit ein paar Kommandos hat man nämlich schon alles was man braucht.

Nach der Installation muss man wissen wie man in ein gewünschtes Verzeichnis navigiert, siehe [«Step 3: Changing directories»](https://pandoc.org/getting-started.html#step-3-changing-directories).

Der Konvertierungsbefehl könnte dann in etwa so aussehen:

`pandoc test.md -s -o test.icml`

Dieser Befehl bedeutet folgendes:

- `pandoc` ist der Grundbefehl
- `test.md` gibt das Quelldokument an
- `s` ist die Option «Standalone» und bedeutet, dass eine eigenständige Datei hergestellt wird
- `o test.icml` steht für den Output einer InCopy-Datei mit dem Dateinamen «test».

Meistens erkennt `Pandoc` aufgrund der Dateiendung der Ausgabedatei in welches Format formatiert werden soll und die Optionen

- `f markdown` = konvertiere von Markdown
- `t icml` = konvertiere in InCopy-Datei

werden nicht zwingend benötigt.

Keine Hexerei, oder?

### Pandoc/InCopy-Konvertierung

Diese InCopy Datei kann in einem InDesign platziert werden. Bei der Konvertierung wurden automatisch Absatzformate erstellt. Diese können nun für das Styling benutzt werden.

InCopy Inhalte können ausgecheckt werden und wiederum bearbeitet werden. Da durch die InCopy Konvertierung ein XML-Gerüst gebaut wird, lässt sich dies nicht mehr sinnvoll in Markdown zurückwandeln. Inhaltliche Änderungen die nachträglich gemacht werden, sollten deshalb

- in der Markdown-Datei gemacht, diese erneut konvertiert und in InDesign ersetzt werden. Wenn die Absatzformate nicht unbenannt werden, bleiben die Styles erhalten.
- die InCopy Inhalte in InDesign auscheckt, bearbeitet
	- und die Korrekturen künftig nur in InDesign vorgenommen werden, falls die Markdown-Datei nicht zwingend aktuell bleiben muss.
	- oder die Korrekturen an beiden Orten gemacht werden.

### Weitere Konvertierungsmöglichkeiten

Mit oben oben erklärter InCopy Konvertierung kann ich also Inhalte für InDesign vorbereiten und damit ein barrierefreies PDF herstellen.

Es gibt aber noch viele weitere Konvertierungsmöglichkeiten mit Pandoc. Hier eine kleine Auswahl:

- XHTML/HTML5
- Word docx / OpenDocument
- RTF
- EPUB
- PDF
- LaTeX

## Die wichtigsten Markdown Auszeichnungen

### Überschriften

`# H1` Ein Hashtag getrennt mit einem Leerzeichen ergibt eine Überschrift erster Ordnung.

`## H2` Zwei Hashtag getrennt mit einem Leerzeichen ergibt eine Überschrift zweiter Ordnung.

usw. bis und mit H6

### Listen

```markdown
* Listenpunkt
* Listenpunkt
* Listenpunkt
```

ergibt eine undefinierten Liste. Anstatt `*` kann auch ein `-` verwendet werden.

```markdown
1. Listenpunkt
2. Listenpunkt
3. Listenpunkt
```

ergibt eine definierte, nummerierte Liste.

### Hyperlinks

```markdown
[Linktext](URL)
```

fügt einen Hyperlink ein. Der Linktext wird in eckigen Klammern und die URL in Klammern geschrieben.

### Bild/Grafik

```markdown
![Alt-Text](Bild URL)
```

fügt ein Bild ein. Die Syntax ist gleich wie beim Hyperlink, einfach mit einem Ausrufezeichen voraus. Der Alt-Text wird in eckigen Klammern geschrieben. Der Pfad, wo sich das Bild, kommt in Klammern.

### Inline Auszeichnungen

- *`*Kursiv*`* Text zwischen je einem Sternchen-Symbol wird _kursiv_ dargestellt. Anstatt dem Zeichen kann auch das `_`Zeichen verwendet werden.
- **`**Bold**`** Text zwischen je zwei Sternchen-Symbolen wird **fett** dargestellt. Anstatt dem Zeichen kann auch das `_`Zeichen verwendet werden.

### Weiterführende Dokumentationen

- Mehr zur Markdown-Syntax findet ihr auf der Seite von [John Gruber (Daring Fireball)](https://daringfireball.net/projects/markdown/syntax), dem Erfinder von Markdown.
- [Github Flavored](https://guides.github.com/features/mastering-markdown/) ist eine Erweiterung von Markdown.
- [Mehr zu Pandoc‘s Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown)

## Markdown Skript für InDesign

Noch erwähnenswert ist das Script [markdownId](http://www.jongware.com/markdownid.html), welches erlaubt Markdown-Texte in InDesign direkt zu importieren. Die Möglichkeiten sind aber geringer als oben beschriebener Ablauf.

## Fazit

Meiner Meinung nach eignet sich dieser Markdown-Workflow wenn Autorinnen/Autoren lokal und nicht direkt in einem Webinterface arbeiten (können). Es ist sicher keine einfache Aufgabe Autorinnen/Autoren von dieser Art des Schreibens zu überzeugen, da es nicht mehr ganz so [WYSIWYG](https://de.wikipedia.org/wiki/WYSIWYG) ist wie sie es vielleicht gewohnt sind.

Mich würde brennend die Meinung von gestandenen Multichannel-Publishern interessieren, die schon Erfahrungen mit anderen Lösungen und Produkten gesammelt haben. Es wäre sehr interessant deren Vorteile mit oben genannten Vorteile des Markdown-Workflows gegenüberzustellen.

Selbstverständlich freue ich mich aber generell über euer Feedback.

