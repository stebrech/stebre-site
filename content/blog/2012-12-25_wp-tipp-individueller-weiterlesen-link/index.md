---
title: "WP Tipp: Individueller Weiterlesen-Link"
slug: "/blog/wp-tipp-individueller-weiterlesen-link"
author: "Stefan Brechbühl"
date: "2012-12-25"
updated:
description: "In diesem kleinem Beitrag möchte ich aufzeigen wie der Text des Weiterlesen-Links individuell angepasst werden kann."
categories:
tags: ["WordPress"]
featuredImage: "images/Weiterlesen-Link-Beispiel.jpeg"
---
In diesem kleinem Beitrag möchte ich aufzeigen wie der Text des Weiterlesen-Links individuell angepasst werden kann.

## Den Weiterlesen-Link setzen

Der WP Editor kennt zwei Ansichten – die visuelle und die Text Ansicht (ehemals HTML Ansicht). In der visuellen Ansicht wird folgender Button verwendet um ein Weiterlesen-Link einzufügen.

![Weiterlesen-Link Button](images/Weiterlesen-Link-Button.jpeg)

In der Text Ansicht schreibt man

`<!--more-->`

oder man nutzt den dazu vorgesehene Quicktag.

![Weiterlesen-Link Quicktag](images/Weiterlesen-Link-Quicktag.jpeg)

## Individueller "Weiterlesen"-Text

Um nun den Linktext anzupassen wechselt man in die Text-Ansicht des Editors. Nun kann hinter dem Text "more" und vor den Bindestrichen der gewünschte Text eingefügt werden. Dazu ein Beispiel:

`<!--more Möchten Sie mehr dazu erfahren-->`

![Weiterlesen-Link Beispiel](images/Weiterlesen-Link-Beispiel.jpeg)

Dieser Text wird natürlich nur bei betroffenem Artikel angewendet. Um den Linktext generell zu ändern, muss man die vorgesehene Template Datei abändern.
