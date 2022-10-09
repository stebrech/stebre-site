---
title: "Originalgrösse der Bilder beim Upload verkleinern – WordPress Plugin Tipp!"
slug: "/blog/orginalgroesse-der-bilder-beim-upload-verkleinern"
author: "Stefan Brechbühl"
date: "2012-11-25"
updated:
description: "Ich möchte euch ein praktisches WordPress Plugin empfehlen, welches auf eure hochgeladene Bilder Einfluss nimmt. Das Plugin hört auf den Namen Resize images before upload und verkleinert das hochgeladene Originalbild auf die definierte Maximalgrösse."
categories:
tags: ["Performance", "WordPress"]
featuredImage: "images/Resize-image-before-upload.jpg"
---
Ich möchte euch ein praktisches WordPress Plugin empfehlen, welches auf eure hochgeladene Bilder Einfluss nimmt. Das Plugin hört auf den Namen [Resize images before upload](http://wordpress.org/plugins/resize-images-before-upload/) und verkleinert das hochgeladene Originalbild auf die definierte Maximalgrösse.

## Die Bildgrössen in den Mediathek Einstellungen

Wenn man im WordPress Backend ein Bild hochlädt, werden automatisch drei Kopien in verschiedenen Bildgrössen erstellt. Die kleinste Version ist das Miniaturbild, welches bei Bedarf automatisch zugeschnitten wird. Desweiteren wird noch eine Bildkopie in mittlerer und maximaler Bildgrösse erzeugt. Die verschiedenen Bildgrössen könnt ihr natürlich in den Einstellungen selbst definieren.

![Screenshot der Mediathek Einstellungen – Bereich Bildgrösse](images/Resize-images-before-upload-Mediathek-Einstellungen-750x236.jpeg "Screenshot der Mediathek Einstellungen – Bereich Bildgrösse")

Tipp: Ihr könnt einzelne Bildgrössen ausschliessen indem ihr jeweils 0 einsetzt. Wird beispielsweise eine Bildgrösse nie verwendet, kann dadurch Platz gespart werden.

Ist das hochgeladene Originalbild grösser als die Maximalgrösse werden insgesamt vier Versionen des Bildes auf dem Server abgelegt. Hat das Originalbild die selben oder kleinere Masse wie die definierte Maximalgrösse, entfällt logischerweise die Generierung der Bildkopie in Maximalgrösse.

## Problematik bei unbearbeiteten Bildern

Wurde das Originalbild vorgänging nicht bearbeitet und kommt beispielsweise direkt von der Kamera, kann dieses eine immense Grösse aufweisen. Dies benötigt natürlich viel Platz auf dem Server.

Ein weiteres Problem besteht, wenn das verwendete Bilder mit einem Link zum Originalbild verwendet wird. Dann reisen sich nämlich die Besucher mit geringer Bandbreite und kleinem Display die Haare aus – respektive sie verlassen eure Seite.

## Das Plugin…

… [Resize images before upload](http://wordpress.org/plugins/resize-images-before-upload/) kann denjenigen helfen, welche kein Bildbearbeitungssoftware zur Hand haben oder nicht nutzen möchten. Es schaltet sich direkt beim Upload Prozess ein. Bevor ein Bild auf den Server geladen wird, wird es auf die bereits erwähnte maximale Bildgrösse verkleinert. Somit werden maximal drei Grössenvarianten auf dem Server abgelegt.

Beim Medien Uploader erscheint nun ein Kontrollkästchen, welches die Plugin Funktion ausführt oder eben nicht.

![Aktivierung oder Deaktivierung der Plugin Funktion im Medien Uploader](images/Resize-images-before-uploading-aktivierung-750x26.jpeg "Aktivierung oder Deaktivierung der Plugin Funktion im Medien Uploader")

## Fazit

Solche Automatisierungshilfen können natürlich manuelle Bildbearbeitung nicht ersetzen. Die Auswahl des bestmöglichen Bildausschnitts und anderen Bildbearbeitungen werden mit dieser Lösung nicht beachtet. Die Entscheidung liegt zwischen Zeitersparnis und optimalem Ergebnis. Ich könnte mir vorstellen, dass vielen die ersparte Zeit wichtiger erscheint.
