#!/usr/bin/env bash

LOCALPATH_OBSIDIAN=$(grep "LOCALPATH_OBSIDIAN" .env | cut -d '=' -f2)
OBSIDIAN_BOOKMARKS_BASE=$(grep "OBSIDIAN_BOOKMARKS_BASE" .env | cut -d '=' -f2)
OBSIDIAN_BOOKMARKS_VIEW=$(grep "OBSIDIAN_BOOKMARKS_VIEW" .env | cut -d '=' -f2)
LOCALPATH_11TY=$(grep "LOCALPATH_11TY" .env | cut -d '=' -f2)

# Sync assets
rsync -auv \
	$LOCALPATH_OBSIDIAN/assets/ \
	$LOCALPATH_11TY/src/content/assets/
rsync -auv \
	$LOCALPATH_11TY/src/content/assets/ \
	$LOCALPATH_OBSIDIAN/assets/

# Blog
rsync -auv \
	--include="*.md" \
	$LOCALPATH_OBSIDIAN/de/blog/ \
	$LOCALPATH_11TY/src/content/de/blog/
rsync -auv \
	--include="*.md" \
	$LOCALPATH_11TY/src/content/de/blog/ \
	$LOCALPATH_OBSIDIAN/de/blog/

# Projects
rsync -auv \
	--include="*.md" \
	$LOCALPATH_OBSIDIAN/stebre-website/de/projects/ \
	$LOCALPATH_11TY/src/content/de/projects/
rsync -auv \
	--include="*.md" \
	$LOCALPATH_11TY/src/content/de/projects/ \
	$LOCALPATH_OBSIDIAN/stebre-website/de/projects/

# Bookmarks
obsidian base:query file="$OBSIDIAN_BOOKMARKS_BASE" view="$OBSIDIAN_BOOKMARKS_VIEW" > src/_data/bookmarks.tmp

jq '
def trim: sub("^\\s+"; "") | sub("\\s+$"; "");

map(
  with_entries(
    if (.key | startswith("tags")) and (.value | type == "string")
    then .value |= (split(",") | map(trim) | map(select(length > 0)))
    else . end
  )
)
' src/_data/bookmarks.tmp > src/_data/bookmarks.json

rm src/_data/bookmarks.tmp
