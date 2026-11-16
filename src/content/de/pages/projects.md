---
layout: layouts/posts.njk
templateClass: postlist
title: Arbeiten
pagination:
  data: collections.stebrech_projects
  size: 9
  alias: posts
  reverse: true
permalink: /projects/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}/
tags:
  - stebrech_pages
---
Hier gebe ich einen Einblick in einige Projekte, die ich selbstständig umgesetzt habe. Es handelt sich um gestalterische Arbeiten sowie Webentwicklungen.
