---
title: Eigenes Logo auf der WordPress Login-Seite
date: 2012-11-28
featuredImage: src/assets/img/20121128_eigenes-logo-auf-der-wordpress-login-seite_0.jpg
description: Für die Einen unnötige Spielerei, für die Anderen das i-Pünktchen um WordPress zu personalisieren. Ich spreche davon das eigene Logo anstatt dem WordPress Logo auf der Login-Seite anzeigen zu lassen.
tags:
  - WordPress
  - posts
---
Für die Einen unnötige Spielerei, für die Anderen das i-Pünktchen um WordPress zu personalisieren. Ich spreche davon das eigene Logo anstatt dem WordPress Logo auf der Login-Seite anzeigen zu lassen.

## Vorbereitung

Damit das folgende Snippet funktioniert, müsst Ihr das Logo an entsprechenden Ort auf dem Server ablegen. Speichert dazu euer Logo in den **uploads Ordner** welcher sich im **wp-content** Ordner befindet. Danach müsst ihr noch die Datei in **login.png** umbenennen.

Falls ihr das Logo mit dem Media Uploader im WordPress Backend hochlädt, müsst ihr den Pfad im Snippet je nachdem anpassen. Die Datei-URL findet ihr in der Mediathek nach dem Klicken auf das entsprechende Bild.

## Anpassen der functions.php

Jetzt müsst nur noch das Snippet in euer Theme einfügen. Öffnet die functions.php Datei und fügt folgendes ein:

```php
function custom_login_logo() {  echo '<style type="text/css">    h1 a {      background-image:url('.get_site_url().'/wp-content/uploads/login.png) !important;      background-size: 100% auto !important;      margin-left: 8px !important;      width: 312px !important;    }  </style>';}add_action('login_head', 'custom_login_logo');
```

## Toolbox Modul

Anstatt das Snippet in die functions.php hinzufügen, kann auch ein neues Toolbox Modul angelegt werden. Toolbox ist ein Plugin von Sergej Müller, welche das Ausführen und Verwalten von Funktionen ermöglicht. So wird die functions.php nicht vollgestopft und ihr müsst die Funktionen beim Theme-Wechsel nicht erneut hinzufügen. Interessierte können mein Toolbox Modul [hier herunterladen](https://gist.github.com/stebrech/4176105).

