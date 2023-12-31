---
title: "WordPress: Widgets nur auf bestimmten Seiten anzeigen"
date: 2012-07-10
featuredImage: src/assets/img/20120710_wordpress-widgets-nur-auf-bestimmten-seiten-anzeigen_0.jpg
description: "Folgendes Szenario: Ihr betreibt mithilfe von WordPress ein Blog. Zusätzlich bietet ihr noch Inhalte auf einigen Pages oder Custom Post Types an. Ihr möchtet in der Sidebar des Blogs einige spezifische Widgets wie zum Beispiel eine Kategorie- oder Tagliste anzeigen. Diese Widgets sollen aber nur im Blog und nicht auf den anderen Pages angezeigt werden."
tags:
  - WordPress
  - posts
---
Folgendes Szenario: Ihr betreibt mithilfe von WordPress ein Blog. Zusätzlich bietet ihr noch Inhalte auf einigen [Pages](http://codex.wordpress.org/Post_Types#Page) oder [Custom Post Types](http://codex.wordpress.org/Post_Types#Custom_Types) an. Ihr möchtet in der Sidebar des Blogs einige spezifische Widgets wie zum Beispiel eine Kategorie- oder Tagliste anzeigen. Diese Widgets sollen aber nur im Blog und nicht auf den anderen Pages angezeigt werden. Bei diesem Praxisbeispiel beinhaltet das Page Template dieselbe Sidebar wie das Blog.

Um dies umsetzen zu können verwende ich das Plugin [Widget Logic](http://wordpress.org/plugins/widget-logic/). Nach erfolgter Installation erscheint in den Widgets-Einstellungen ein neues Feld mit dem Titel Widget logic. Bleibt das Feld leer wird das Widget wie bis anhin auf allen Seiten angezeigt. Fügt ihr nun ein für euch zutreffendes [Conditional Tag](http://codex.wordpress.org/Conditional_Tags) ein, wird die Anzeige eingeschränkt.

## Anwendungsbeispiele des Entwicklers

`is_home()` Das Widget wird nur auf der Blog Startseite angezeigt.

`!is_page('about')` Das Widget wird überall, aber nicht auf der About Page angezeigt.

`!is_user_logged_in()` Das Widget wird nur für nicht angemeldete Besucher angezeigt.

`is_category(array(5,9,10,11))` Wird auf den Kategorieseiten mit den ID’s 5, 9, 10 und 11 angezeigt.

`is_single() && in_category('baked-goods')` Wird nur auf einzelnen Artikelseiten mit der Kategorie Baked Goods angezeigt.

`current_user_can('level_10')` Dieses Widget können nur Administratoren sehen.

`strpos($_SERVER['HTTP_REFERER'], "google.com")!=false` Wird angezeigt wenn der Besucher mithilfe von Google auf eure Seite kommt.

## Conditional Tags für geschildertes Szenario

Wie oben beschrieben möchte ich ein Widget auf allen Blogseiten anzeigen. `is_home()` zeigt mir das Widget auf der Blog Startseite an, jedoch nicht auf den Artikel- oder Archivseiten. Möglich für dieses Szenario wären folgende Conditional Tags:

`!is_page()` Das Widget wird überall, aber nicht auf Pages angezeigt.

`is_home() || is_archive() || is_single()` Diese Conditional Tags bezwecken, dass das betroffene Widget auf der Blog Startseite, Archivseiten oder auf Artikelseiten angezeigt werden.

Ihr seht der Fantasie sind keine Grenzen gesetzt. Bevor ich Widget Logic einsetzte, habe ich das Plugin [Display Widgets](http://wordpress.org/plugins/display-widgets/) benutzt. Dies hatte jedoch in Kombination eines anderen Plugins nicht mehr zuverlässig funktioniert.

