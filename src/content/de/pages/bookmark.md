---js
const layout = "layouts/post.njk";
const postType = "bookmarks";
const tags = ["bookmarks_de"];
const pagination = {
  data: "bookmarks.bookmarks",
  size: 1,
  alias: "bookmarks",
  addAllPagesToCollections: true 
};
const eleventyComputed = {
  title: data => data.bookmarks.title,
  bm_lang: data => data.bookmarks.bm_lang,
  description: data => data.bookmarks.bm_desc_de,
  weblink: data => data.bookmarks.weblink,
  domain: data => data.bookmarks.domain,
  featuredImage: data => data.bookmarks.bm_img_url,
  permalink: data => `bookmarks/${data.bookmarks.name}/`,
  date: data => new Date(data.bookmarks.date),
  tags: data => {
    const tags = data.bookmarks.bm_tags_de ? data.bookmarks.bm_tags_de.split(',').map(tag => tag.trim()) : [];
    tags.push("bookmarks_de");
    return tags;
  }
}
---
<blockquote>
  {{ bookmarks.description }}
  {% if bookmarks.domain %}<br><cite>— {{ bookmarks.domain }}</cite>{% endif %}
</blockquote>