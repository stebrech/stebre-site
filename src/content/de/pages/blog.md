---
layout: layouts/posts.njk
templateClass: postlist
title: Blogbeiträge
pagination:
  data: collections.stebrech_blog
  size: 9
  alias: posts
  reverse: true
permalink: /blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}/
tags:
  - stebrech_pages
---
