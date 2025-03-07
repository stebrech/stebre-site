---
title: PAC 2 auf dem Mac nutzen
date: 2017-05-12
updated: 2023-08-18
featuredImage: /assets/img/20170512_pac-2-auf-dem-mac-nutzen.jpg
description: PAC ist einzigartiges Prüftool um PDFs auf deren Barrierefreiheit / Zugänglichkeit zu testen. In [[blog/barrierefreie-pdfs--eine-uebersicht-zur-herausforderung|Barrierefreie PDFs – Eine Übersicht zur Herausforderung]] habe ich kurz über das Tool berichtet. Man kann damit Prüfpunkte des [Matterhorn Protokolls](https://pdfa.org/resource/the-matterhorn-protocol/) kontrollieren. Zudem enthält es den _Screenreader_ Modus, welcher die Tags der einzelnen Inhalte farblich darstellt.
tags:
  - barrierefreiheit
  - pdf
status: done-without-translation
---
PAC ist einzigartiges Prüftool um PDFs auf deren Barrierefreiheit / Zugänglichkeit zu testen. In [[blog/barrierefreie-pdfs--eine-uebersicht-zur-herausforderung|Barrierefreie PDFs – Eine Übersicht zur Herausforderung]] habe ich kurz über das Tool berichtet. Man kann damit Prüfpunkte des [Matterhorn Protokolls](https://pdfa.org/resource/the-matterhorn-protocol/) kontrollieren. Zudem enthält es den _Screenreader_ Modus, welcher die Tags der einzelnen Inhalte farblich darstellt.

Leider ist dieses Prüftool zur Zeit nur für das Windows Betriebssystem verfügbar.

> [!info] Update 18.08.2023
Der PDF Accessibility Checker gibt es mittlerweile auch als Webapplikation und nennt sich [axesCheck](https://www.axes4.com/de/software-services/axescheck).

## Bisherige, offizielle Lösung für Mac-Benutzer

Ein Artikel im Access-for-all-Blog aus dem Jahr 2011 zeigt wie PAC auf Windows ausgeführt werden kann. Damals war PAC noch in der Version 1 verfügbar. Die Anleitung empfiehlt das Apple-Dienstprogramm [X11 (heute: XQuartz)](https://www.xquartz.org/) und das [Mono Framework](http://www.mono-project.com/) per Konsole (Terminal) zu installieren. Da ich mit dieser Lösung nicht zum Ziel kam, gehe ich davon aus, dass sie nicht für PAC in der 2ten Version geeignet ist.

## Virtuelle Maschine und 2. Partition

Es gäbe die Möglichkeit eine virtuelle Maschine mit Windows einzurichten. Software wie zum Beispiel [VirtualBox](https://www.virtualbox.org/) ermöglichen es, dass ich einen virtuellen Windowsrechner innerhalb meines macOS starten kann.

Eine andere Möglichkeit wäre es der Festplatte einen Platz zuzuweisen (Partition) auf welchem dann Windows installiert werden kann. Dies kann mithilfe der vorinstallierten App [Boot Camp](https://support.apple.com/de-ch/boot-camp) umgesetzt werden. Dazu muss ich jedoch jedes mal den Rechner neustarten um das System zu wechseln.

Da ich bei beiden dieser Lösungen einen Windows Lizenzschlüssel benötige und mir das Vorgehen viel zu umständlich und zu langsam ist, habe ich nach einer weiteren Lösung gesucht und folgende gefunden:

## Lösungsweg mit CrossOver

Mithilfe von [CrossOver for Mac](https://www.codeweavers.com/products/crossover-mac) (und dem Supportteam) habe ich eine schnelle Lösung mit grafischer Benutzeroberfläche gefunden. Sie ist nicht kostenlos, fühlt sich aber fast so an wie das Öffnen einer App, die direkt für den Mac programmiert wurde.

CrossOver ist eine Applikation von CodeWeavers und kostet $59.95 USD ($39.95 USD ohne Support). Sie kann 14 Tage kostenlos getestet werden.

Nach der Installation von CrossOver wird folgende Oberfläche angezeigt:

![CrossOver Startoberfläche](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_1.jpg)

Damit du PAC 2 mithilfe von CrossOver ausführen kannst, benötigst du eine sogenannte Flasche in der das _Microsoft .NET-Framework 4_ installiert ist. Dies kannst du in einem Schluck erledigen. ;-)

Klicke auf den grossen Button _Installieren einer Windowsanwendung_, suche nach _Microsoft .NET Framework 4.0_ und klicke auf _Fortfahren_.

![CrossOver: Nach Microsoft .Net Framework 4 suchen](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_2.jpg)

Der Schritt _Wählen der Installationsroutine_ wird nicht benötigt und wird automatisch übersprungen.

Nun kann direkt eine neue Flasche erstellt werden. Ich habe dazu eine _neue Windows 7 Flasche_ gewählt und ihr den Namen _PAC2_ gegeben.

![CrossOver: Auswahl einer neuen Flasche und den Namen eingeben](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_3.jpg)

Jetzt kann die Installation gestartet werden indem du unten rechts _Installieren_ klickst.

![CrossOver: Installation starten](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_4.jpg)

Das _Microsoft .NET Framework 4.0_ ist abhängig vom _Microsoft .NET Framework 2.0_. Daher wird dieses automatisch zuerst installiert.

<div class="imagesContainer">

![CrossOver: .NET Framework 2 installieren](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_5.jpg)

![CrossOver: .NET Framework 2 wird installiert](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_6.jpg)

![CrossOver: .NET Framework 2 Installation abgeschlossen](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_7.jpg)

</div>

Darauf folgt gleich die Installation des _Microsoft .NET Framework 4_. Nach der Installation wird nach einem Neustart gefragt, welche mit _Restart Now_ bestätigt werden kann.

<div class="imagesContainer">

![CrossOver: Microsoft .NET Framework 4 installieren](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_8.jpg)

![CrossOver: Microsoft .NET Framework 4 wurde installiert](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_9.jpg)

![CrossOver: Neustart nach Installation von Microsoft .NET Framework 4](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_10.jpg)

</div>

That’s it! Du hast alles, was du innerhalb der Flasche benötigst, installiert

![CrossOver: Ende der beiden Installationen](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_11.jpg)

Nun kannst du, mithilfe von _Befehl ausführen_ PAC 2 öffnen.

![CrossOver: Befehl ausführen](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_12.jpg)

Klicke dazu einfach auf _Befehl – Durchsuchen_ und navigiere zu der der .exe Datei innerhalb des PAC 2 Programmordners. Auf [Access-for-all](http://www.access-for-all.ch/ch/pdf-werkstatt/pdf-accessibility-checker-pac.html) kannst du PAC 2 herunterladen, falls du dies noch nicht gemacht hast.

![CrossOver: Fenster für Befehl ausführen](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_13.jpg)

Falls du PAC 2 schnell zur Hand haben möchtest, kannst du den Button _Befehl als Starter speichern_ klicken. Dabei wird das Programm-Symbol innerhalb von CrossOver angezeigt.

Die App kann auch im Dock abgelegt werden – schneller geht es wahrscheinlich nicht.

![PAC 2 mit CrossOver auf Mac](/assets/img/20170512_pac-2-auf-dem-mac-nutzen_14.jpg)

Ich hoffe, dass du nun PAC 2 auf deinem Mac benutzen kannst und dich nun um das Testen deiner PDF Dokumente kümmern kannst.

