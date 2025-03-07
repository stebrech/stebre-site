---
title: Lesezeichen
layout: layouts/bookmarks.njk
collection: bookmarks_de
tags: 
  - pages_de
pagination:
  data: collections.bookmarks_de
  size: 999
  alias: bookmarks
  reverse: true
permalink: /bookmarks/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}/
status: done
---
