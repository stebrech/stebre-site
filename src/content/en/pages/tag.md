---
layout: layouts/tags.njk
pagination:
  data: collections.tagsEN
  size: 1
  alias: tag
  reverse: true
  addAllPagesToCollections: true
permalink: /en/tags/{{ tag.name | slug }}/
eleventyComputed:
  title: "{{ tag.name }}"
---
