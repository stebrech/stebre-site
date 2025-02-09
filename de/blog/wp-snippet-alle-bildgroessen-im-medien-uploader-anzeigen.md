---
title: "WP Snippet: Alle Bildgrössen im Medien Uploader anzeigen"
date: 2014-02-07
featuredImage: ../../assets/img/20140207_wp-snippet-alle-bildgroessen-im-medien-uploader-anzeigen.jpg
description: Der WordPress Medien Uploader generiert beim Hochladen von Bildern automatisch mehrere Bildkopien in den definierten Bildgrössen. Die Standardgrössen _Miniaturbild, mittlere Bildgrösse und maximale Bildgrösse_ lassen sich in den Einstellungen festlegen.
tags:
  - wordpress
status: needs-translation
---
Wird im Editor mithilfe von _Medien hinzufügen_ ein Bild hinzugefügt, lässt sich unter _Dateianhang Anzeigeneinstellung_ eine der Bildgrössen mittels Dropdown-Feld bestimmen. Hier werden aber nur die Standardbildgrössen angezeigt.

Durch Themes, Plugins oder durch Hinzufügen von `<?php add_image_size( $name, $width, $height, $crop ); ?>` in die functions.php werden zusätzliche Bilddimensionen definiert. Mithilfe des folgenden Codeschnipsels werden sämtlich vorhandene Bildgrössen in erwähntem Dropdown-Feld angezeigt.

[https://gist.github.com/stebrech/9075245](https://gist.github.com/stebrech/9075245)

## Quellen

- [http://wp-snippets.com/show-custom-image-sizes-in-admin-media-uploader/](http://wp-snippets.com/show-custom-image-sizes-in-admin-media-uploader/)
- [http://www.studiograsshopper.ch/code-snippets/wordpress-list-all-image-sizes-in-media-uploader/](http://www.studiograsshopper.ch/code-snippets/wordpress-list-all-image-sizes-in-media-uploader/)

## Verwendung

Ein Snippet kann in die Datei _functions.php, welche sich im_ Themeordner befindet, kopiert werden. [Eine alternative und bessere Lösung zeige ich in diesem Artikel.](https://www.pixelstrol.ch/wordpress-snippets-sinnvoll-integrieren/)

