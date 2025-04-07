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
## Sync Bookmarks from Obsidian only if they are ready.
for file in $LOCALPATH_OBSIDIAN/8_Ressourcen/Bookmarks/*.md; do
	if [[ -f "$file" ]]; then
		status=$(grep -m 1 '^status:' "$file" | awk '{print $2}')
		if [[ "$status" == "done" || "$status" == "translate" ]]; then
			rsync -auv "$file" $LOCALPATH_11TY/src/content/de/bookmarks/
		fi
	fi
done
## Update the Obsidian Vault
rsync -auv \
	$LOCALPATH_11TY/src/content/de/bookmarks/ \
	$LOCALPATH_OBSIDIAN/8_Ressourcen/Bookmarks/
