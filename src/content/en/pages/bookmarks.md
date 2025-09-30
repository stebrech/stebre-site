---js
const title = "Bookmarks";
const layout = "layouts/bookmarks.njk";
const collection = "bookmarks_en";
const postType = "bookmarks";
const tags = ["pages_en"];
const pagination = {
  data: "bookmarks.bookmarks",
  size: 10,
  alias: "bookmarks",
  before: (data) => data.sort((a, b) => new Date(b.date) - new Date(a.date))
}
const permalink = "/en/bookmarks/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}/"
---
