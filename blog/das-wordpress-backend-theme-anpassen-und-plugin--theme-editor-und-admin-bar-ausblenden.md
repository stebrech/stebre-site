---
title: Das WordPress Backend Theme anpassen und Plugin-, Theme-Editor und Admin Bar ausblenden
date: 2012-04-06
featuredImage: assets/img/20120406_das-wordpress-backend-theme-anpassen-und-plugin--theme-editor-und-admin-bar-ausblenden.jpg
description: Es bestehen Möglichkeiten das WordPress Backend an persönliche Bedürfnisse anzupassen. Abstimmungen an das Corporate Design wird wohl einer, der bedeutendsten Gründe dafür sein. Nebst Änderungen am Aussehen, möchte ich auch auf das Ausblenden von Plugin-, Theme-Editor und der Admin Bar eingehen.
tags:
  - wordpress
  - posts
---
## Die Oberfläche des Backends ändern

Ein sehr umfangreiches Plugin kommt aus der Schmiede von [bueltge.de und nennt sich Adminimize](http://bueltge.de/wordpress-admin-theme-adminimize/674/). Um ehrlich zu sein, habe ich das Plugin bisher nicht ausgiebig getestet. Es bietet tonnenweise Einstellungsmöglichkeiten, welche getrennt an den verschiedenen Benutzergruppen angewendet werden können. Mir persönlich passt die Backend Oberfläche grundsätzlich so wie sie ist, weshalb ich mich nach einem schlankeren Lösungsweg umsah.

### Zusätzliche CSS-Datei mithilfe eines Plugins laden

Pascal Bajorat zeigt in seinem Blogartikel [WordPress Backend individualisieren mit eigener CSS-Datei – mittels WordPress Plugin](http://www.webdesign-podcast.de/2011/11/07/wordpress-backend-individualisieren-mit-eigener-css-datei-mittels-wordpress-plugin/) was der Titel verspricht. Es soll also eine zusätzliche CSS-Datei zur (Um)gestaltung des Backends hinzugefügt werden. Ungeeignet ist die direkte Bearbeitung der orignialen CSS-Dateien, da bei zukünftigen Updates die Dateien überschrieben werden können. Um die gewünschten IDs und Klassen herauszufinden, eignet sich [die Browsererweiterung Firebug](http://getfirebug.com/) oder browserinterne Entwicklertools.

### functions.php anstatt eines Plugins

Wer die zusätzliche CSS-Datei lieber mithilfe von einigen Zeilen in der **functions.php** umsetzen möchte, der kann das natürlich. Obwohl der benötigte Code auch vom oben aufgeführten Lösungsweg entnommen werden kann, hier noch eine Variante von [wp-snippets.com](http://wp-snippets.com/custom-admin-css/) in leicht abgeänderter Form.

```php
<?php
/* Load additional stylesheet for your WP Backend */
function customAdmin() {
	$url = home_url('/wp-content/themes/my-theme/styles/wp-admin.css');
	echo '<link rel="stylesheet" type="text/css" href="' . $url . '" />';
}
add_action('admin_head', 'customAdmin');
?>
```

**Den Pfad in der vierten Zeile müsst ihr natürlich noch abändern.**

### Praxisbeispiel eines Stylesheets

Um die Änderungen, welche im Artikelbild ersichtlich sind, aufzuzeigen, folgt im Anschluss mein geladenes CSS Stylesheet. Ich habe mir das Logo im Kopfbereich zwischen Icon und Titel eingefügt. Ebenfalls habe ich Schriftanpassungen am h2 Titel im Kopfbereich und den h3 Titeln im Dashbord Bereich vorgenommen.

```css
@import url(http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:700);

div#wpbody-content div.wrap h2 {
	background:url(assets/2012-04-06/logo-admin.png) no-repeat 45px 4px;
	color:#767676;
	font-family:'Yanone Kaffeesatz', sans-serif;
	font-size:3em;
	letter-spacing:1px;
	margin:15px 0;
	padding-left:255px;
}

h3.hndle {
	color:#767676;
	font-family:'Yanone Kaffeesatz', sans-serif;
	font-size:1.8em;
	letter-spacing:1px;
}
```

## Den Plugin und Theme Editor ausblenden

Ich persönlich halte nicht viel davon den Code von Plugins oder Themes direkt im Backend zu bearbeiten. Mit einem lokal installierten Editor lassen sich die Dateien einerseits besser ändern und andererseits zeigt sich die Wiederherstellung von Fehleingaben einfacher. Insbesondere wenn noch andere Administratoren mitwirken, stellt ihr euch vielleicht die Frage ob dies Editoren wirklich benötigt werden.

Um die Editoren für alle Benutzer auszublenden, müsst ihr lediglich folgende Zeile (Quelle [codex.wordpress.org](http://codex.wordpress.org/Editing_wp-config.php#Disable_the_Plugin_and_Theme_Editor)) in die **config.php** einfügen:

```php
/* Disable the Plugin and Theme Editor */
define('DISALLOW_FILE_EDIT',true);
```

## Admin Bar ausblenden

In der Version 3.1 von WordPress wurde die Admin Bar eingeführt. Diese dient als Bearbeitungswerkzeug im Frontend. Wenn ihr die Admin Bar nicht benötigt und sie euch stört, könnt ihr sie mit einer Zeile Code in der **functions.php** ausblenden. Der folgende Code stammt von [wp-snippets.com](http://wp-snippets.com/disable-wp-3-1-admin-bar/).

```php
<?php
/* Disable the Admin Bar */
show_admin_bar(false);
?>
```

