---
title: Blog Posts
layout: layouts/posts.njk
templateClass: postlist
pagination:
  data: collections.stebrech_en_blog
  size: 12
  alias: posts
  reverse: true
permalink: /en/blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}/
---
