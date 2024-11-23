---
title: Bookmarks
layout: layouts/bookmarks.njk
collection: bookmarks_en
tags: ["pages_en"]
pagination:
  data: collections.bookmarks_en
  size: 999
  alias: bookmarks
  reverse: true
permalink: /en/bookmarks/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}/
status: done
---
