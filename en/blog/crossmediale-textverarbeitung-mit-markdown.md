---
title: Cross-media text processing with Markdown
date: 2018-04-16T00:00:00.000Z
featuredImage: assets/img/20180416_crossmediale-textverarbeitung-mit-markdown.jpg
description: A major challenge in media-neutral data production is the lack of awareness of structured content. If content is (initially) created in text processing programs such as Microsoft Word, attempts are made to make it appealing. In most cases, however, a clean structure falls by the wayside.
tags:
  - accessibility
  - content-first
  - indesign
  - markdown
status: needs-review
---
Formatting can be applied quickly and easily with Word and similar software. When printed out on the office printer, nobody may realize that the formatting applied may not have been the best:

- purely visually designed headings
- incorrect lists
- table layouts
- multiple spaces and blank lines
- etc.

The strict use of style sheets is less attractive than “hasty formatting”. But it is precisely with the help of paragraph styles that a certain degree of semantics and structure can be created.

The use of Markdown alleviates this problem by not having any styles available at all when entering the texts. A clearer separation of roles can be made between author and designer.

## Flexible design

In order to write media-neutral texts, authors should concentrate on the essentials – the content and its structure. The separation of content and design makes it possible to design the output more flexibly. Clearly structured content can be used more easily for different media and not just one.

## Accessibility

Structuring content not only serves cross-media processing, it also lays an essential foundation for accessible digital media. An existing and correct structure is required to transfer content to another format and assign semantic tags.

## What is Markdown?

As an alternative starting point to Word and the like, I envision Markdown as a possible, good basis for “cross-media publishing”.

Markdown is a markup language based on plain text. It was developed to make it easy to create HTML code. Markdown does not use HTML tags, but defined special characters. These special characters stand for structural markup and can in turn be easily converted to HTML.

Markdown can also be converted into other formats, see [“Conversion with Pandoc”](#conversion-with-pandoc). Markdown is available in different versions, e.g. Github Flavored Markdown, MultiMarkdown and more.

## The Markdown workflow

Two points first:

1. this approach certainly cannot keep up with large multichannel publishing solutions.
2. unfortunately, I have not yet been able to gain any experience with multichannel publishing solutions such as [Typefi](https://www.typefi.com/). Therefore, I cannot make any 1-to-1 comparisons here.

In my opinion is Markdown a small but fine alternative to such services. I see the following advantages:

1. through Markdown there is inevitably a separation of content and design.
2. the solution works locally and is inexpensive or even free.
3. Markdown is based on plain text. This means that the source document always remains readable, freely available and independent of proprietary software.
4. if authors are convinced by Markdown and are willing to learn this (not so difficult) syntax, they become more aware of the structuring of content. This improved starting position can save tedious editing work. This could possibly also reduce costs incurred by third parties.
5. With many web CMSs, it is not difficult to use Markdown content directly:
	- In [WordPress](https://wordpress.org/), plugins, such as WP-Markdown, Jetpack, etc., can be installed to use Markdown content directly.
	- My favorite editor [iA Writer](https://ia.net/writer) is designed to use Markdown markup and connects directly to [WordPress.com](https://wordpress.com/) or [WordPress](https://wordpress.org/) with [Jetpack](https://jetpack.com/).
	- If Markdown cannot be used in your CMS, Markdown must first be converted to HTML, see the following sections.

![iA Writer in action. gif animation](assets/img/20180416_crossmediale-textverarbeitung-mit-markdown_1.gif)

_iA Writer - a simple Markdown editor_

## Conversion with Pandoc

If the Markdown file created cannot be used directly, it needs to be converted to another format. One option is to use the open source converter [Pandoc](https://pandoc.org/index.html).

This converter works in the command line. If you are not used to this – don’t throw up your hands right away. It's not that complicated. With a few commands you already have everything you need.

After the installation you need to know how to navigate to a desired directory, see [“Step 3: Changing directories”](https://pandoc.org/getting-started.html#step-3-changing-directories).

The conversion command could then look something like this:

`pandoc test.md -s -o test.icml`.

This command means the following:

- `pandoc` is the basic command
- `test.md` specifies the source document
- `s` is the “Standalone” option and means that a standalone file is created
- `o test.icml` stands for the output of an InCopy file with the file name “test”.

In most cases, `Pandoc` recognizes the format to be formatted based on the file extension of the output file and the options

- `f markdown` = convert from Markdown
- `t icml` = convert to InCopy file

are not absolutely necessary.

Not rocket science, is it?

### Pandoc/InCopy conversion

This InCopy file can be placed in an InDesign. Paragraph formats were automatically created during the conversion. These can now be used for styling.

InCopy content can be checked out and edited again. As the InCopy conversion creates an XML structure, this can no longer be converted back into Markdown in a meaningful way. Content changes that are made subsequently should therefore be

- made in the Markdown file, converted again and replaced in InDesign. If the paragraph formats are not renamed, the styles are retained.
- made in the checked out InCopy content in InDesign
	- the corrections are only made in InDesign in future if the Markdown file does not necessarily have to remain up-to-date
	- or the corrections are made in both places

### Further conversion options

With the InCopy conversion explained above, I can prepare content for InDesign and thus create an accessible PDF.

However, there are many other conversion options with Pandoc. Here is a small selection:

- XHTML/HTML5
- Word docx / OpenDocument
- RTF
- EPUB
- PDF
- LaTeX

## The most important Markdown markups

### Headings

`# H1` A hashtag separated by a space results in a first-order heading.

`## H2` Two hashtags separated by a space results in a second-order heading.

etc. up to and including H6

### Lists

```markdown
* List item
* list item
* list item
```

results in an undefined list. A `-` can also be used instead of `*`.

```markdown
1. list item
2. list item
3. list item
```

results in a defined, numbered list.

### Hyperlinks

```markdown
[Link text](URL)
```

inserts a hyperlink. The link text is written in square brackets and the URL in brackets.

### Image/graphic

```markdown
![Alt-Text](Image URL)
```

inserts an image. The syntax is the same as for the hyperlink, simply preceded by an exclamation mark. The alt text is written in square brackets. The path where the image is located comes in brackets.

### Inline markup

- *`*italics*`* Text between an asterisk symbol is displayed in _italics_. The `_` character can also be used instead of the character.
- **`**Bold**`** Text between two asterisk symbols is displayed **bold**. The `_` character can also be used instead of the character.

### Further documentation

- You can find more about Markdown syntax on the page of [John Gruber (Daring Fireball)](https://daringfireball.net/projects/markdown/syntax), the inventor of Markdown.
- Github Flavored](https://guides.github.com/features/mastering-markdown/) is an extension of Markdown.
- More about Pandoc's Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown)

## Markdown script for InDesign

Also worth mentioning is the script [markdownId](http://www.jongware.com/markdownid.html), which allows Markdown texts to be imported directly into InDesign. However, the possibilities are less than described above.

## Conclusion

In my opinion, this Markdown workflow is suitable if authors (can) work locally and not directly in a web interface. It is certainly not an easy task to convince authors of this type of writing, as it is no longer quite as [WYSIWYG](https://de.wikipedia.org/wiki/WYSIWYG) as they may be used to.

I would be very interested to hear the opinions of experienced multichannel publishers who have already gained experience with other solutions and products. It would be very interesting to compare their advantages with the above-mentioned advantages of the Markdown workflow.

Of course, I am always happy to receive your feedback.

