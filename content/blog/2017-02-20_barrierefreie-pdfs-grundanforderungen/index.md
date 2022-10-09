---
title: "Barrierefreie PDFs – Grundanforderungen"
slug: "/blog/barrierefreie-pdfs-grundanforderungen"
author: "Stefan Brechbühl"
date: "2017-02-20"
updated:
description: "Im zweiten Teil dieser Artikelreihe möchte ich die Grundanforderungen eines zugänglichen PDF-Dokuments etwas beleuchten. Der Beitrag soll aufzeigen was gemacht oder beachtet werden muss."
categories:
tags: ["Barrierefreiheit", "PDF"]
featuredImage: "images/pdfA11y-750x375.jpg"
---
Im zweiten Teil dieser Artikelreihe möchte ich die Grundanforderungen eines zugänglichen PDF-Dokuments etwas beleuchten. Der Beitrag soll aufzeigen was gemacht oder beachtet werden muss.

Wer den ersten Teil «[Barrierefreie PDFs – Eine Übersicht zur Herausforderung](https://www.pixelstrol.ch/barrierefreie-pdfs-eine-uebersicht-zur-herausforderung/)» noch nicht gelesen hat, findet dort allgemeine Informationen zu möglichen Barrieren, Assistiven Technologien (AT), Prüfungsmöglichkeiten und mehr.

Es wird auch auf das [Matterhorn Protokoll](https://www.pdfa.org/publication/matterhorn-protokoll-1-02-deutsche-uebersetzung/?lang=de) eingegangen. Das Matterhorn Protokoll enthält sämtliche Prüfpunkte (respektive Fehlerbedingungen) um ein barrierefreies Dokument nach dem PDF/UA-Standard herzustellen.

Was unterscheidet nun ein bildschirmoptimiertes und zugängliches PDF von einem druckoptimierten PDF?

## Text = Text ≠ Bild

Sämtliche Texte eines Dokumentes müssen als echten Text und nicht in Form eines Bildes vorhanden sein. Diese Anforderung klingt selbstverständlich, kommt aber häufig vor, wenn Texte eingescannt werden. Das gescannte Dokument wurde dabei als Bild und nicht mit den OCR-Einstellungen hergestellt.

## PDF Tags

Das Verwenden von Tags ist die Grundlage um zugängliche Dokumenten zu erstellen. Sie sind semantische Markierungen im Inhalt und bilden die logische Dokumentstruktur. Ausserdem sind sie Voraussetzung für den Zugriff durch AT und seit Adobe Acrobat 5 verfügbar.

Tags werden im Idealfall durch die Autorensoftware während des PDF-Exports vergeben. Für eine der wichtigsten Tags, den Überschriften, funktioniert dies in der Regel gut. Damit beispielsweise Microsoft Word oder Adobe InDesign «weiss» welcher Tag angewendet werden muss, werden Formatvorlagen benötigt. Diese müssen konsequent angewendet werden.

Die folgenden Tag-Beschreibungen stammen von dem Handbuch «[Erstellen von barrierefreien PDF-Dokumenten mit Adobe Acrobat](https://www.google.ch/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwixxZK3spLSAhWEjiwKHeenA4MQFggiMAA&url=https%3A%2F%2Fwww.adobe.com%2Fde%2Faccessibility%2Fproducts%2Facrobat%2Fpdfs%2FBRO_HowTo_PDFs_Barrierefrei_DE_2005_09_abReader7.pdf&usg=AFQjCNEYKH-6c_HN15ETgZEX-Gq7yBgPHQ&sig2=z8QEaKS2IgvC99csjyvjRw)»

### Container

Behälterelemente bilden die höchste Ebene von Elementen und erlauben die hierarchische Gruppierung von weiteren Elementen auf Blockebene

| Tag | Übersetzung | Beschreibung |
| --- | --- | --- |
| `<Document>` | Dokument | Stammelement des Tag-Baums eines Dokuments |
| `<Part>` | Teil | grobe Einteilung eines Dokuments; kann kleinere Inhaltseinheiten wie Kapitel- oder Abschnittselemente enthalten |
| `<Div>` | Kapitel (engl. division) | generisches Element auf Blockebene oder eine Gruppe solcher Elemente |
| `<Art>` | Artikel | inhaltlich in sich abgeschlossener Textkörper |
| `<Sect>` | Abschnitt (engl. section) | allgemeines Behälterelement, vergleichbar mit „Division“ (DIV Class=“Sect”) in HTML; in der Regel ein Teil- oder Artikelelement |

### Überschriften und Absätze

| Tag | Übersetzung | Beschreibung |
| --- | --- | --- |
| `<P>` | Absatz (engl. Paragraph) | Gewöhnlicher Absatz |
| `<H1>` bis `<H6>` | Überschriften (engl. Heading) | Überschriften mit Hierarchiestufe 1 bis 6. |
| `<H>` | Überschrift | Überschrift muss einer übergeordneten Einteilung untergeordnet sein.   _Da es mithilfe der hierarchischen Überschriften-Formatvorlagen in der Regel einfacher ist eine Dokumentstruktur aufzubauen, empfehle ich diesen Tag nicht zu verwenden._ |

### Beschriftungs- und Listenelemente

Beschriftungs- und Listenelemente sind Elemente auf Blockebene, die zur Strukturierung von Listen dienen.

| Tag | Übersetzung | Beschreibung |
| --- | --- | --- |
| `<L>` | Liste | Folge von Einträgen ähnlicher Bedeutung oder Relevanz; die unmittelbar untergeordneten Elemente müssen Listeneinträge sein |
| `<LI>` | Listeneintrag (engl. list item) | einzelnes Element einer Liste; ihm kann ein Beschriftungselement (optional) und muss ein Listenkörperelement (obligatorisch) untergeordnet sein |
| `<LBL>` | Beschriftung (engl. label) | Aufzählungszeichen, ein Name oder eine Nummer, die einen Eintrag kennzeichnet und von anderen Einträgen in derselben Liste unterscheidet |
| `<LBody>` | Listenkörper (engl. list body) | eigentlicher Inhalt eines einzelnen Listeneintrags |

### Sondertextelemente

Sondertextelemente identifizieren Text, der keinen generischen Absatz () bildet.

| Tag | Übersetzung | Beschreibung |
| --- | --- | --- |
| `<BlockQuote>` | Blockzitat | Absatz, der von einem anderen Verfasser stammt als der umgebende Haupttext |
| `<Caption>` | Bildunterschrift | kurzer Text, der eine Tabelle oder Abbildung beschreibt. |
| `<Index>` | Index | Folge von Einträgen, die aus einem Stichwort und Referenzelementen bestehen, die auf das Vorkommen des Stichworts im Hauptkörper des Dokuments verweisen |
| `<TOC>` | Inhaltsverzeichnis (engl. table of contents) | Element, das eine strukturierte Liste von Einträgen enthält; besitzt eine eigene Hierarchie |
| `<TOCI>` | Inhaltsverzeichniseintrag (engl. table of contents item) | Eintrag in einer Liste, die einem Inhaltsverzeichniselement zugeordnet ist |

### Tabellenelemente

Tabellenelemente sind besondere Elemente zur Strukturierung von Tabellen.

| Tag | Übersetzung | Beschreibung |
| --- | --- | --- |
| `<Table>` | Tabelle | zweidimensionale Anordnung von Daten- und Textzellen, die sich aus untergeordneten Tabellenzeilenelementen zusammensetzt und ein Bildunterschriftselement als erstes oder letztes untergeordnetes Element enthalten kann |
| `<TR>` | Tabellenzeile (engl. table row) | Zeile mit Überschriften oder Daten in einer Tabelle; kann Tabellenüberschrifts- und Tabellendatenzellenelemente enthalten |
| `<TD>` | Tabellendatenzelle | Tabellenzelle, die Daten enthält, die nicht als Überschrift fungieren |
| `<TH>` | Tabellenüberschriftszelle (engl. table header) | Tabellenzelle, die Überschriftstext oder -daten enthält, die eine oder mehrere Zeilen oder Spalten der Tabelle beschreiben |

### Elemente auf Zeilenebene

Elemente auf Zeilenebene kennzeichnen Textteile, die ein bestimmtes Format oder Verhalten aufweisen. Sie unterscheiden sich von den Elementen auf Blockebene und können in diesen enthalten sein sowie selbst Elemente auf Blockebene enthalten. Es gibt die folgenden Standardelemente auf Zeilenebene.

| Tag | Übersetzung | Beschreibung |
| --- | --- | --- |
| `<BibEntry>` | Quellenverzeichniseintrag  (engl. bibliography entry) | Quellenangabe für ein Zitat |
| `<Quote>` | Zitat | Textsegment, das von einem anderen Verfasser stammt als der umgebende Text; unterscheidet sich vom Blockzitat, bei dem es sich um einen ganzen Absatz oder mehrere Absätze und nicht um einen Teil eines Satzes handelt |
| `<Span>` | Span | beliebiges Textsegment; kennzeichnet in der Regel Text, dem bestimmte Formateigenschaften zugeordnet sind |

### Sonderelemente auf Zeilenebene

Ähnlich wie Elemente auf Zeilenebene beschreiben Sonderelemente auf Zeilenebene Textsegmente, die ein bestimmtes Format oder Verhalten aufweisen:

| Tag | Übersetzung | Beschreibung |
| --- | --- | --- |
| `<Code>` | Code | Computerprogrammtext, der in das Dokument eingebettet ist |
| `<Figure>` | Abbildung | Grafik oder grafische Darstellung, die mit dem Text zusammenhängt |
| `<Form>` | Formular | PDF-Formular, das ausgefüllt werden kann |
| `<Formula>` | Formel | mathematische Funktion |
| `<Link>` | Verknüpfung | Hypertext-Verknüpfung, die in das Dokument eingebettet und einer Anmerkung zugeordnet ist, die zu einer anderen Stelle in demselben Dokument oder in einem anderen Dokument oder zu einer Website führt |
| `<Note>` | Anmerkung | Zusatztext oder Dokumentation, z.B. eine Fuß- oder Endnote, auf die im Haupttext verwiesen wird |
| `<Reference>` | Verweis | Verweis auf Text oder Daten an anderer Stelle im Dokument |

### Artefakt

Inhalte können auch als Artefakt gekennzeichnet werden. Dies ist kein PDF-Tag sondern teilt der AT mit, dass das Element inhaltlich nicht relevant ist.

## Lesereihenfolge

Die korrekte Lesereihenfolge ist elementar um Inhalte verstehen zu können. Die visuelle Gestaltung lässt uns Sehenden die Inhalte einordnen und zeigt uns den Weg durch ein Dokument. Wer jedoch AT benötigt, ist auf eine korrekte Reihenfolge der oben erwähnten Tags angewiesen.

Bei der Verwendung eines Textverarbeitungsprogramms, wie Microsoft Word, ist das selten ein Problem da der Textfluss vorgegeben ist. Insbesondere bei DTP-Software, wie Adobe InDesign, wird jedoch mehr Einfluss durch die Verantwortlichen benötigt.

### Umfliessen Reihenfolge

Adobe Acrobat kennt noch eine eigene, zusätzliche Reihenfolge. Diese Reihenfolge muss nicht immer zwingend mit der Reihenfolge der Tags übereinstimmen. Dies kann sehr verwirrend sein, wenn man sich dessen nicht bewusst ist.

Der Grund für die Reihenfolge-Schaltfläche in Acrobat ist der Umfliessen-Ansichtsmodus. Dieser, durchaus sinnvolle, Ansichtsmodus kann beispielsweise mit dem Lesemodus des Safari Browsers verglichen werden. Im Umfliessen-Modus, wird das Layout komplett ignoriert und nur die Inhalte gezeigt. Der Text fliesst über die ganze Fensterbreite. So können sehschwache Menschen den Text stark vergrössern ohne horizontal scrollen zu müssen.

Leider übernimmt Acrobat für diesen Modus, nicht wie andere AT, die Tag-Reihenfolge. Insbesondere aus DTP-Software, wie InDesign, stimmt die Reihenfolge im Umfliessen-Modus nicht. Der hohe, manuelle Aufwand diese Reihenfolge anzupassen ist meistens nicht verhältnismässig. Ich gehe davon aus, dass dieser Modus nicht viel benutzt wird und betroffene eher eine Bildschirmlupe-Software verwenden.

![Acrobat Screenshot des Tagbaums und der Reihenfolge](images/pdf-tags-reihenfolge-800x400.jpg)

Um die Anforderung Lesereihenfolge zusammenzufassen: **Es ist wichtig zu überprüfen, dass die Tag-Reihenfolge der korrekten Lesereihenfolge entspricht.**

## Alternativtexte

Bilder und Grafiken benötigen einen unsichtbaren Text, welcher beschreibt was zu sehen ist. Diesen Text nennt man Alternativtext. Dieser Text wird von AT verwendet und kann blinden Menschen vorgelesen werden. Diese Alternativtexte müssen allen Bildern vergeben werden, welche inhaltlich relevant sind.

Dekorative Bilder wie z.B. Hintergrundbilder oder dekorative Rahmen benötigen keine Alternativtexte. Solche Bilder werden als Artefakt gekennzeichnet.

Bilder können auch mit einem sichtbaren Beschreibungstext ergänzt werden. Solche Beschreibungen werden mit dem Tag `<Caption>` ausgezeichnet.

### Unterschied zwischen Alternativtexte und Bildbeschreibungen

Alternativtexte und sichtbare Bildbeschreibungstexte können identisch sein, müssen/sollten dies aber nicht in jedem Fall.

Alternativtexte enthalten kurz und knapp was man auf der Abbildung sehen kann. Namen von Personen oder Dingen werden nur verwendet wenn davon ausgegangen werden kann, dass diese bekannt sind, z.B. der Eiffelturm oder Name einer Person die im Haupttext beschrieben wird.

Bildbeschreibungen hingegen können weiter gehen als das was optisch erkennbar ist, z.B. den Fotografen- oder Künstlername, Aufnahmeort, usw.

## Navigationsmittel

### Hyperlinks

Das offensichtlichste Navigationsmittel sind Hyperlinks innerhalb des Dokuments (Textanker) oder Links, welche auf externe Orte verweisen.

Nun gibt es zwei Varianten Hyperlinks auf Text anzuwenden. Einerseits wird ein Link auf einen aussagekräftigen Textteil angewendet, was für die Verwendung auf einem Bildschirm sinnvoller ist. Ein PDF-Dokument wird aber insbesondere wegen der besseren Druckbarkeit erstellt. Lesende des gedruckten PDF fehlt damit leider die Information wie die Adresse lautet.

Deshalb wird in PDFs vielfach die zweite Variante, nämlich das Verlinken der Webadresse, angewendet. Hiermit sollte wenn möglich eine kurze oder gekürzte URL als lesbaren Text verwendet werden.

| Linktext ohne aussagekräftigen Text | Linktext mit aussagekräftigen Text | Hyperlink als Linktext |
| --- | --- | --- |
| siehe [hier](https://www.pdfa.org/publication/matterhorn-protokoll-1-02-deutsche-uebersetzung/?lang=de) | [Matterhorn Protokoll](https://www.pdfa.org/publication/matterhorn-protokoll-1-02-deutsche-uebersetzung/?lang=de) | [https://www.pdfa.org/publication/matterhorn-protokoll-1-02-deutsche-uebersetzung/?lang=de](https://www.pdfa.org/publication/matterhorn-protokoll-1-02-deutsche-uebersetzung/?lang=de) |
| Sollte nie angewendet werden | Sehr gut für die Bildschirmanzeige. Wird ein PDF gedruckt fehlt dem Lesenden die Hyperlink-Adresse. | Geeignet innerhalb eines PDFs. Lange Hyperlinks werden idealerweise als Kurzlink verwendet. |

Auch die Formatierung der Hyperlinks sollte man beachten. Ein Link muss sich von anderem Text unterscheiden. Die typische Kennzeichnung ist der Unterstrich. Das Aussehen darf nicht mit anderen Formatierungen verwechselt werden. Haben Links beispielsweise einen Unterstrich, darf dieser nicht auch für Überschriften angewendet werden. Auch zu beachten ist das Thema Farbfehlsichtigkeit, falls Links nur durch Farbe kenntlich gemacht werden.

### Lesezeichen

Ein weiteres Navigationsmittel sind die Lesezeichen in PDFs. Diese werden meist für einzelne Kapitel angewendet. Die Lesezeichen helfen schnell innerhalb eines PDFs zu navigieren und sind vor allem in grossen Dokumenten hilfreich. Lesezeichen sind eine allgemeine Verbesserung der Benutzerfreundlichkeit. Sie nützen also allen.

### Überschriften

Korrekt strukturierte Überschriften sind das wichtigste Navigationsmittel für Menschen, die auf einen Screenreader angewiesen sind. Auch uneingeschränkte Menschen ordnen Inhalte unbewusst und mithilfe von verschieden aussehenden Überschriften ein.

Wichtig ist, dass Dokumente schon zu Beginn bewusst mit unterschiedlichen Überschriften erstellt werden. Die möglichen Hierarchiestufen sind, wie bei HTML auch, Ebene 1 bis 6.

Um diese Hierarchiestufen bereits im Quelldokument zu steuern, werden (Absatz-)Formatvorlagen benötigt. Nur mithilfe von Formatvorlagen kann, während der Konvertierung, die Hierarchie in die Tags `<h1>` bis `<h6>` übertragen werden.

Microsoft Word stellt jedem Dokument Standard-Formatvorlagen zur Verfügung. Die Formatvorlagen _Überschrift 1_ bis _Überschrift 6_ hat die korrekte Gliederungsebene bereits hinterlegt. Diese kann in den Absatzeinstellungen der Formatvorlagen definiert werden.

In Adobe InDesign kann das Export-Tag innerhalb der Einstellungen der Absatzformatvorlage definiert werden.

Als korrekt strukturiert gilt auch, dass keine Stufen nach unten übersprungen werden dürfen. Nach der Ebene 1 darf beispielsweise nicht die Ebene 3 folgen. Jedoch kann, wenn dies die Inhaltsstruktur so vorsieht, nach einer Ebene 3 wieder eine Ebene 1 folgen.

### Verzeichnisse

Weitere Navigationsmittel sind Verzeichnisse, wie einem Inhaltsverzeichnis oder Stichwortverzeichnis. Diese sollten intern verlinkt sein um schneller zu einer gewünschten Stelle zu gelangen (siehe Hyperlinks).

## Spracheinstellungen

Die Spracheinstellung, welche wir in unserer Autorensoftware definieren können, dient nicht nur der Rechtschreibeprüfung und der Silbentrennung. Sie ist auch dafür da, dass ein Screenreader die korrekte Sprache verwendet und somit verständlich ist.

Die Sprache wird immer für das entsprechende Dokument definiert. Einige Autorenprogramme können die Sprache während der PDF-Konvertierung auf das Dokument übertragen. Hier lohnt sich aber immer ein Kontrollblick in die Dokumenteinstellungen des PDFs.

Zusätzlich können weitere Sprachen für einzelne Inhalte bestimmt werden. Auch dies kann bereits im Quelldokument, mithilfe von Formatvorlagen bestimmt werden.

## Sicherheitseinstellungen

Damit geschützte Dokumente nicht von AT ausgeschlossen werden, gilt es eine Kleinigkeit in den Einstellungen zu beachten. In den Dokumenteigenschaften (→ Sicherheit) kann ein Dokument mit einem Kennwort geschützt werden. Hierzu muss die Option «Textzugriff für Bildschirmlesehilfen für Sehbehinderte aktivieren» aktiviert sein.

## Zum Schluss

Ich hoffe, dass ich einen groben Eindruck hinter die Kulissen eines barrierefreien PDFs ermöglichen konnte. Dieser Artikel deckt keineswegs alle Optimierungen ab, sondern soll die wichtigsten Grundanforderungen zusammenfassen. Ich denke, dass ich auf einzelne Problembehebungen noch im Detail eingehen werde.
