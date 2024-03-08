---
title: Alte Shortcodes deaktivieren
date: 2016-04-21
featuredImage: assets/img/20160421_alte-shortcodes-deaktivieren_0.jpg
description: Shortcodes wurden in der WordPress Version 2.5 eingeführt. Einen Shortcode erkennt man an den eckigen Klammern […]. Solche Shortcodes können auf sehr einfache Weise in den Beitragseditor eingegeben werden, welche eine hinterlegte Funktion auslösen.
tags:
  - wordpress
  - posts
---
Die Standard-Shortcodes, welche WordPress von Haus aus mitbringt, sind:

- [audio](https://codex.wordpress.org/Audio_Shortcode)
- [caption](https://codex.wordpress.org/Caption_Shortcode)
- [embed](https://codex.wordpress.org/Embed_Shortcode)
- [gallery](https://codex.wordpress.org/Gallery_Shortcode)
- [playlist](https://codex.wordpress.org/Playlist_Shortcode)
- [video](https://codex.wordpress.org/Video_Shortcode)

Weitere beliebte Einsatzgebiete sind zum Beispiel

- Layoutraster
- Buttons und Links
- Inhaltscontainer wie Accordion und Tabs
- Platzieren von Werbung
- Zusätzliche, spezielle Inhalte
- usw.

## Shortcodes in Themes

Obwohl das Theme Review Team Shortcodes als [Plugin Territory](https://make.wordpress.org/themes/handbook/review/required/explanations-and-examples/#plugin-territory) deklariert, werden ausserhalb des offiziellen [Theme-Verzeichnis](https://wordpress.org/themes/) haufenweise Themes mit Shortcodes angeboten.

Ein passender Artikel dazu ist: [«Mehr ist nicht mehr – Das Feature-Wettrüsten auf Themeforest»](https://www.claudioschwarz.com/2013/mehr-ist-nicht-mehr-das-feature-wettruesten-auf-themeforest/) von Claudio Schwarz.

Als ich [AlbinoMouse](https://wordpress.org/themes/albinomouse/) im Jahr 2011 das erste Mal veröffentlicht habe, waren da auch noch Shortcodes drin. Diese Regel war damals noch kein Thema oder ging beim Review unter. Als dies jedoch bei einem späteren Review bemängelt wurde, musste ich die Nutzer im Backend informieren, dass die eventuell benutzten Shortcodes nicht mehr gültig sein werden.

**Wenn ein Shortcode nämlich nicht mehr gültig ist, bleibt er als normaler Text im Beitrag liegen – was ziemlich unschön ist.**

Obwohl ich mich damals über diese Regel geärgert hatte, verstehe und begrüsse ich sie heute. Ein Wechsel des Themes sollte so einfach wie möglich sein, was mit enthaltenen Shortcodes definitiv nicht der Fall ist. Hier ein paar Gründe, welche für einen Theme-Wechsel sprechen können:

- Das Design passt nicht mehr. Eine Redesign wird gewünscht.
- Ein Theme wird vom Entwickler nicht mehr aktiv gewartet.
- Der Support ist nicht vorhanden oder nicht mehr befriedigend.

## Veraltete Shortcodes ausblenden

Nun kann man aber infolge eines nicht mehr benötigten Themes oder Plugins in die Situation kommen, dass aufgrund eines Wechsels, Shortcodes nicht mehr gültig sind. Wie bereits erwähnt, wird ein inaktiver Shortcode als gewöhnlichen Text ausgegeben.

Eine Möglichkeit wäre alle Beiträge nach veralteten Shortcodes zu durchsuchen und zu löschen. Je nach Anzahl der Beiträge kann dies eine mehr oder weniger langwierige Sache werden.

Falls der veraltete Shortcode bekannt ist, kann dieser mithilfe von

`add_shortcode( 'alter_shortcode', '__return_false' );`

ausgeblendet werden. Dies kleiner Codeschnipsel packt man am besten in die `functions.php` eines Child-Themes.

Eine weitere Möglichkeit ist die Installation des Plugins [Remove Orphan Shortcodes](https://wordpress.org/plugins/remove-orphan-shortcodes/). Dieses Plugin sucht inaktive Shortcodes und blendet diese aus den Inhalten aus.

![WP Plugin Remove Orphan Shortcodes](assets/img/20160421_alte-shortcodes-deaktivieren_1.jpg)

## Welche Shortcodes habe ich an Board?

Manchmal kann es interessant sein, zu erfahren welche Shortcodes vorhanden und möglich sind. Um nicht sämtliche Codedateien durchleuchten zu müssen, kann man sich das Plugin [Shortcode Reference](https://wordpress.org/plugins/shortcode-reference/) zur Hilfe nehmen. Dieses Plugin fügt im Beitragseditor eine Metabox hinzu. Diese beinhaltet eine Liste sämtlicher möglicher Shortcodes und zeigt wo sie herkommen.

