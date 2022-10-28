import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../components/layout";

import * as style from "../styles/markdown.module.css";
import { Tag as TagIcon } from "@styled-icons/evil";
import { Link as LinkIcon } from "@styled-icons/evil";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark, site } = data;
  const { frontmatter, html } = markdownRemark;
  const _ = require("lodash");
  const PostImage = frontmatter.featuredImage
    ? site.siteMetadata.siteUrl + frontmatter.featuredImage.childImageSharp.fixed.src
    : "";
  return (
    <Layout>
      <GatsbySeo
        title={frontmatter.title}
        titleTemplate={"%s | " + site.siteMetadata.title}
        description={frontmatter.description}
        openGraph={{
          url: site.siteMetadata.siteUrl + frontmatter.slug,
          title: frontmatter.title,
          description: frontmatter.description,
          images: [
            {
              url: PostImage,
              width: 800,
              height: 450,
              alt: frontmatter.title,
            },
            {
              url: site.siteMetadata.siteUrl + "/logo-stebre.png",
              width: 400,
              height: 400,
              alt: site.siteMetadata.title,
            },
          ],
          site_name: site.siteMetadata.title,
          article: {
            publishedTime: frontmatter.date,
            modifiedTime: frontmatter.updated,
            authors: frontmatter.author,
            tags: frontmatter.tags,
          },
        }}
        twitter={{
          handle: "@stebre_ch",
          site: "@stebre_ch",
          cardType: "summary_large_image",
        }}
      />
      <article>
        <div className="headerShadow">
          <header className={style.headerPost}>
            {frontmatter.featuredImage ? (
              <div className="containerM">
                <h1 className={style.title}>{frontmatter.title}</h1>
                <div className={style.featuredImage}>
                  <GatsbyImage
                    image={frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="containerL">
                <h1 className={style.title}>{frontmatter.title}</h1>
              </div>
            )}
          </header>
        </div>
        <div className="containerL">
          <div className={style.contentContainer}>
            <div className={style.content} dangerouslySetInnerHTML={{ __html: html }} />
            <footer className={style.metadata}>
              {frontmatter.date && <p>Publiziert am: {frontmatter.date}</p>}
              {frontmatter.updated && <p>Aktualisiert am: {frontmatter.updated}</p>}
              {frontmatter.author && <p>Autor: {frontmatter.author}</p>}
              {frontmatter.weblink && (
                <p className={style.weblink}>
                  <LinkIcon className={style.linkIcon} />
                  <a href={frontmatter.weblink}>Weblink</a>
                </p>
              )}
              {frontmatter.categories && (
                <div>
                  <h2>Kategorien:</h2>
                  <ul className={style.tags}>
                    {frontmatter.categories.map((category) => {
                      return (
                        <li key={frontmatter.categories}>
                          <Link to={"/category/" + _.lowerCase(category)}>
                            <TagIcon aria-hidden="true" className={style.tagIcon} />
                            {category}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {frontmatter.tags && (
                <div>
                  <h2>Stichworte:</h2>
                  <ul className={style.tags}>
                    {frontmatter.tags.map((tag) => {
                      return (
                        <li key={frontmatter.tags}>
                          <Link to={"/tag/" + _.lowerCase(tag)}>
                            <TagIcon aria-hidden="true" className={style.tagIcon} />
                            {tag}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </footer>
          </div>
        </div>
      </article>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        author
        categories
        date(formatString: "DD. MMMM YYYY", locale: "de")
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.777)
            fixed(width: 800, height: 450) {
              src
            }
          }
        }
        slug
        tags
        title
        updated(formatString: "DD. MMMM YYYY", locale: "de")
        weblink
      }
    }
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`;
