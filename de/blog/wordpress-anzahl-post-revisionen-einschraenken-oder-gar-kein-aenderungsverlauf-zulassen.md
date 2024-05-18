---
title: "WordPress: Anzahl Post Revisionen einschränken oder gar kein Änderungsverlauf zulassen"
date: 2012-07-01
featuredImage: assets/img/20120701_wordpress-anzahl-post-revisionen-einschraenken-oder-gar-kein-aenderungsverlauf-zulassen.jpg
description: Wordpress speichert per Standard den Verlauf der Änderungen eines Artikels. Diese findet man im unteren Teil des Artikel Bearbeitungsmodus mit dem Titel Revisionen. Sofern diese nicht angezeigt werden, können Sie mithilfe der Optionen im Kopfbereich sichtbar gemacht werden.
tags:
  - wordpress
status: needs-translation
---
Die Liste dieser Revisionen kann, je nachdem wie lange an einem Artikel “geschraubt” wird, ziemlich lange werden. Sämtliche Revisionen werden dabei in der Datenbank gespeichert.

Obwohl ich dieses Feature sehr schätze und auch bereits mehrmals benötigte, halte ich es für sinnvoll die Anzahl gespeicherten Änderungen zu maximieren. Dies kann mit einer einzigen Zeile in der config.php erledigt werden. Die config.php befindet sich im root-Verzeichnis (Hauptordner) der WordPress Installation.

Die sinnvolle Anzahl Speicherungen muss natürlich jeder für sich herausfinden. Die folgende Zeile beschränkt die Anzahl Revisionen auf fünf:

`define('WP\_POST\_REVISIONS', 5);`

Wer gar keine Revisionen zulassen möchte, kann folgende Zeile in die config.php kopieren:

`define('WP\_POST\_REVISIONS', false );`

