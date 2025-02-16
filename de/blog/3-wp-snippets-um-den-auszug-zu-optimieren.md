---
title: 3 WP-Snippets um den Auszug zu optimieren
date: 2014-02-24
description: Der Auszug (Excerpt) ist eine kurze unformatierte Zusammenfassung eines Beitrags in WordPress. Falls ihr kein eigener Auszug hinzufügt, nimmt sich WordPress einfach die ersten Wörter des Beitrags.
tags:
  - wordpress
status: done-without-translation
---
Wo der Auszug auf deiner Website verwendet wird, ist abhängig vom installierten Theme. Der wichtigste Verwendungszweck ist die Ausgabe des Auszugs als Suchresultat. Er kann aber auch für die Homepage oder die Archivseiten benutzt werden.

Mit diesem Artikel möchte ich euch drei Snippets aufzeigen mit denen ihr eure Auszüge anpassen könnt. Die Snippets können in die Datei functions.php, welche sich im Themeordner befindet, kopiert werden.

## Die Anzahl Wörter des Auszugs ändern

Wird der Auszug durch WordPress automatisch generiert, wird die Anzahl der Wörter auf 55 beschränkt. Mithilfe der folgenden Zeilen lässt sich dieses Limit ändern.

```php
<?php
function custom_excerpt_length( $length ) {
	return 20;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
?>
```

[https://gist.github.com/stebrech/9119695](https://gist.github.com/stebrech/9119695)

## Den Weiterlesen-Link immer anzeigen

Bei einem Beitrag welcher aus weniger Wörter als die maximale Wörteranzahl besteht, wird der Weiterlesen-Link nicht angezeigt. Da der Auszug nur aus umformatierten Text ohne Kommentarformular besteht, möchte man vielleicht bei solch kleinen Beiträgen trotzdem den Weiterlesen-Link anzeigen.

Das folgende Schnipsel zeigt den Weiterlesen-Link immer an:

```php
<?php
function excerpt_read_more_link($output) {
	global $post;
	return $output . '<a href="'. get_permalink($post->ID) . '">Read All ...</a>';
}
add_filter('the_excerpt', 'excerpt_read_more_link');
?>
```

[https://gist.github.com/stebrech/9119525](https://gist.github.com/stebrech/9119525)

## Die Zeichen […] (Eckklammern mit drei Punkten) ersetzen

Normalerweise endet der Auszug, wenn er automatisch generiert wurde, mit Eckklammern und drei Punkten. Das soll andeuten, dass der Beitrag noch nicht zu Ende ist. Wer diese Zeichen durch lediglich drei Punkte oder sonst eine Zeichenfolge ersetzen möchte, kann folgendes Schnipsel verwenden.

```php
<?php
function new_excerpt_more( $more ) {
	return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');
?>
```

[https://gist.github.com/stebrech/9169866](https://gist.github.com/stebrech/9169866)
