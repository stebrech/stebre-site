---
layout: layouts/tags.njk
pagination:
  data: collections.tagsDE
  size: 1
  alias: tag
  reverse: true
  addAllPagesToCollections: true
permalink: /tags/{{ tag.name | slug }}/
eleventyComputed:
  title: "{{ tag.name }}"
---
