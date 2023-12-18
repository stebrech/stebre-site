---
title: "Fotos komprimieren mithilfe von JPEGmini"
date: 2011-10-14
featuredImage: "src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_0.jpg"
description: "Die israelische Firma ICVT, welche sich dem Thema Medien Kompression widmet, entwickelte JPEGmini. JPEGmini reduziert ein JPEG Bild bis zu 80%, angeblich ohne sichtbaren Qualitätsverlust."
tags: [Bildoptimierung,Web-Applikation]
---
Seit sich die digitale Fotografie in unser Leben integrierte, brauchen wir uns nicht mehr um die Fotoentwicklung und deren Kosten zu kümmern. Wir knipsen also drauf los und suchen uns die schönsten Bilder aus. Nun speichern wir die Daten auf eigenen Festplatten oder externen Servern ab oder teilen sie in sozialen Netzen. Nach etlichen Fotos folgen die ersten Probleme wie eine logische Namensgebung und Sortierung, aber eben auch die platzraubende Datenmenge.

Auch im modernen Webdesign werden vermehrt Bilder eingesetzt, welche wir vorgängig komprimieren. Trotz der Verbreitung von immer flotteren Internetleitungen, ist man auf optimierte Bilder angewiesen. Der Nutzer wartet selten mehrere Sekunden, bis eine Seite geladen wird. Zudem wird auch das mobile surfen immer beliebter, womit wir auch für schlankere Daten dankbar sind.

Das Bedürfnis die Datenmenge von Fotos zu verkleinern wird uns wahrscheinlich noch lange begleiten.

## JPEG und JPEGmini

Das Bildformat JPEG oder JPG mit den verschiedenen Möglichkeiten der Komprimierung und dem was dahinter steckt, ist eine Wissenschaft für sich. Was uns eigentlich interessiert ist das Ergebnis, nämlich ein optimiertes Bild, möglichst ohne Qualitätsverlust aber trotzdem so „leicht“ wie möglich.

Die israelische Firma ICVT, welche sich dem Thema Medien Kompression widmet, entwickelte JPEGmini. JPEGmini reduziert ein JPEG Bild bis zu 80%, angeblich ohne sichtbaren Qualitätsverlust. Bei der Verwendung von Rohdaten konnte ich tatsächlich keinen Qualitätsverlust erkennen. Wie es sich mit bereits “behandelten” Bildern verhält, zeigt der nachfolgende Vergleichstest.

Der Webdienst [jpegmini.com](https://www.jpegmini.com/) steht kostenlos zur Verfügung. Ohne Anmeldung könnt ihr einzelne Bilder hochladen um den Dienst zu testen. Wenn ihr euch kostenlos ein Konto anlegt, ist es möglich mehrere Bilder auf einmal zu komprimieren. Ist der Komprimierungsvorgang beendet, erhaltet ihr eine Benachrichtigungsmail.

## Vergleichstest

Als Ausgangslage verwendete ich ein Foto, welches ich als JPEG mit maximaler Qualitätsstufe und der Format-Option Baseline speicherte. Eine Verkleinerung des Originalbildes hat somit schon stattgefunden, da jede Speicherung ins JPEG-Format eine Komprimierung bedeutet.

Werden Kamera-Rohdaten direkt mit JPEGmini bearbeitet, ist der Komprimierungsfaktor natürlich bei Weitem höher. Die Bildgrösse und der Bildausschnitt wurden somit jedoch noch nicht beachtet und bearbeitet.

### Normale JPEG-Speicherung (Option Baseline)

Das Bild liegt in der Bildgrösse 300px auf 472px vor. Das Ausgangslagebild, welches im JPEG-Format mit höchster Qualitätsstufe gespeichert wurde, ist **159KB** schwer. Die mit JPEGmini bearbeitete Version beträgt noch **59KB**. Könnt ihr auch den minimen Schärfeverlust sehen?

![Normales JPEG - hohe Auflösung](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_1.jpg)

_Normales JPEG - hohe Auflösung_

![Normales JPEG - hohe Auflösung - JPEGmini](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_2.jpg)

_Normales JPEG - hohe Auflösung - JPEGmini_

Im zweiten Beispiel nahm ich wieder das Ausgangslagebild und speicherte es erneut als JPEG ab. Diesmal verwendete ich eine mittlere Qualitätsstufe. Die Dateigrösse beträgt noch **47KB** und nach JPEGmini noch **40KB**. Ein minimer Qualitätsverlust gegenüber des Ausgangsbildes ist feststellbar. Der Unterschied zu der mit JPEGmini bearbeiteten Version ist nun grösser. Die scharfen Kanten wirken verpixelter in der mit JPEGmini bearbeiteten Version.

![Normales JPEG - mittlere Auflösung](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_3.jpg)

_Normales JPEG - mittlere Auflösung_

![Normales JPEG - mittlere Auflösung - JPEGmini](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_4.jpg)

_Normales JPEG - mittlere Auflösung - JPEGmini_

Vermutlich für alle Zwecke unbrauchbar wird das Bild mit niedrigster Qualitätsstufe. Diese Datei ist noch **30KB** schwer. Mithilfe von JPEGmini wird die Datei nicht mehr verkleinert, die Qualität aber noch einmal minim verschlechtert.

![Normales JPEG - niedrige Auflösung](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_5.jpg)

_Normales JPEG - niedrige Auflösung_

![Normales JPEG - niedrige Auflösung - JPEGmini](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_6.jpg)

_Normales JPEG - niedrige Auflösung - JPEGmini_

### JPEG-Speicherung mit der Photoshop Funktion “Für Web und Geräte speichern”

Nun zeige ich euch noch die Unterschiede zur normalen JPEG Speicherung und der in Photoshop integrierten Funktion “Für Web und Geräte speichern”. Ich nehme auch hier das Ausgangslagebild und speichere es mithilfe von “Für Web und Geräte speichern” im JPEG-Format mit der vordefinierten Einstellung sehr hohe Qualität. Die Dateigrösse beträgt noch **60KB**. Nachdem ich auch dieses Bild mit JPEGmini bearbeitete, beträgt die Dateigrösse noch **42KB** mit kaum sichtbaren Qualitätsverlust.

![JPEG für Web - sehr hohe Auflösung](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_7.jpg)

_JPEG für Web - sehr hohe Auflösung_

![JPEG für Web - sehr hohe Auflösung - JPEGmini](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_8.jpg)

_JPEG für Web - sehr hohe Auflösung - JPEGmini_

Beim nächsten Beispiel wendete ich wieder die Funktion “Für Web und Geräte speichern” an und benutzte die vordefinierte Einstellung mittlere Qualität. Das Bild ist noch **18KB** und nach JPEGmini noch **16KB** schwer. Mithilfe von JPEGmini werden nur 2KB gespart, die Qualität verschlechtert sich jedoch deutlich.

![JPEG für Web - mittlere Auflösung](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_9.jpg)

_JPEG für Web - mittlere Auflösung_

![JPEG für Web - mittlere Auflösung - JPEGmini](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_10.jpg)

_JPEG für Web - mittlere Auflösung - JPEGmini_

Und zu guter Letzt noch ein Beispiel mit der Funktion “Für Web und Geräte speichern” und der vordefinierten Einstellung niedrige Qualität. Hier erhalten wir eine **12KB** leichte Bilddatei. Auch mit dieser niedrigsten Qualitätstufe ändert sich bei der Benutzung von JPEGmini nichts an der Dateigrösse.

![JPEG für Web - niedrige Auflösung](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_11.jpg)

_JPEG für Web - niedrige Auflösung_

![JPEG für Web - niedrige Auflösung - JPEGmini](src/assets/img/20111014_fotos-komprimieren-mithilfe-von-jpegmini_12.jpg)

_JPEG für Web - niedrige Auflösung - JPEGmini_

Welche Einstellungen das optimale Ergebnis zwischen Qualität und Dateigrösse erreichen, kann von Bild zu Bild unterscheiden. Natürlich spielt auch der genaue Verwendungszweck eine grosse Rolle.

Dieser Vergleichstest soll euch lediglich einen Überblick der möglichen Auswirkungen mithilfe der verschiedenen Optionen verschaffen.

