#!/usr/bin/env bash

LOCALPATH_OBSIDIAN=$(grep "LOCALPATH_OBSIDIAN" .env | cut -d '=' -f2)
LOCALPATH_11TY=$(grep "LOCALPATH_11TY" .env | cut -d '=' -f2)

# Sync assets
rsync -auv \
	--exclude="copy/" \
	$LOCALPATH_OBSIDIAN/6_Output/stebre.ch/assets/img/ \
	$LOCALPATH_11TY/src/assets/img/
rsync -auv \
	--exclude="copy/" \
	$LOCALPATH_11TY/src/assets/img/ \
	$LOCALPATH_OBSIDIAN/6_Output/stebre.ch/assets/img/

# Blog
rsync -auv \
	$LOCALPATH_OBSIDIAN/6_Output/stebre.ch/content/de/blog/ \
	$LOCALPATH_11TY/src/content/de/blog/
rsync -auv \
	$LOCALPATH_11TY/src/content/de/blog/ \
	$LOCALPATH_OBSIDIAN/6_Output/stebre.ch/content/de/blog/

# Projects
rsync -auv \
	$LOCALPATH_OBSIDIAN/6_Output/stebre.ch/content/de/projects/ \
	$LOCALPATH_11TY/src/content/de/projects/
rsync -auv \
	$LOCALPATH_11TY/src/content/de/projects/ \
	$LOCALPATH_OBSIDIAN/6_Output/stebre.ch/content/de/projects/

# Bookmarks
csvformat -D ';' $LOCALPATH_11TY/src/_data/bookmarks.csv | tail +2 | column -t -n bookmarks -s ";" -J -N name,title,url,date,languages,tags,tags_en,domain,author,meta_description,description,description_en,og_img_url > $LOCALPATH_11TY/src/_data/bookmarks.json
