---
title: "URL Weiterleitungen aus dem WordPress Backend steuern"
date: 2012-03-11
featuredImage: "src/assets/img/20120311_url-weiterleitungen-aus-dem-wordpress-backend-steuern_0.jpg"
description: "Gerade wenn man sich um eine grössere Anzahl URL-Weiterleitungen kümmern muss, ist Übersicht gefragt. Bei meinem Umzug zu WordPress musste ich mich um viele dieser Umleitungen kümmern. So habe ich nach einem Plugin gesucht und bin auf Redirection gestossen."
tags: [WordPress]
---
Gerade wenn man sich um eine grössere Anzahl URL-Weiterleitungen kümmern muss, ist Übersicht gefragt. [Bei meinem Umzug zu WordPress](https://www.pixelstrol.ch/pixelstrol-ch-ist-von-joomla-zu-wordpress-umgezogen/) musste ich mich um viele dieser Umleitungen kümmern. So habe ich nach einem Plugin gesucht und bin auf [Redirection](http://wordpress.org/plugins/redirection/) gestossen.

## Übersicht behalten

Der grosse Vorteil des Plugins ist die Verwaltung der Links im Backend. Das Verwalten von unübersichtlichen Einträgen in der .htaccess Datei sind somit nicht mehr nötig. Redirection speichert die erstellten Umleitungen in der WordPress-Datenbank ab.

## URL-Umleitungen hinzufügen

Einmal installiert, findet ihr die Einstellungen des Plugins im Menü Werkzeuge. Anfangs musste ich unter _Module - Apache - Ort_ noch die Serveradresse zur .htaccess Datei einfügen, bevor ich loslegen konnte. Danach könnt ihr bereits mit den ersten Umleitungen loslegen. Dazu nutzt ihr ganz einfach die Textfelder mit dem Titel: _Eine neue Umleitung hinzufügen_. Um das ganze noch ein wenig ordentlicher zu gestalten könnt ihr weitere Gruppen hinzufügen.

## Log-Datei

Auch sehr hilfreich ist die Umleitungs-Log. In den Optionen kann ausgewählt werden ob 404- und/oder Umleitungsaufrufe aufgezeichnet werden. Für meine Bedürfnisse macht es zur Zeit Sinn, nur die 404-Fehler Aufrufe aufzeichnen zu lassen. Entdeckt man einen neuen 404-Aufruf, kann direkt aus der Log eine Umleitung erstellt werden.

[Zur Plugin Seite](http://wordpress.org/extend/plugins/redirection/)

