---
layout: layouts/posts.njk
templateClass: postlist
title: Side projects
pagination:
  data: collections.stebrech_en_projects
  size: 12
  alias: posts
  reverse: true
permalink: /en/projects/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}/
---
Here I give an insight into some projects that I have realized independently. Those contain design work as well as web development.
