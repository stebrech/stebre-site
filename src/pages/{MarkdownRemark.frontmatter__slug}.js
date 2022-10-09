import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as style from "../styles/markdown.module.css"
import { Tag as TagIcon } from "@styled-icons/evil"
import { Link as LinkIcon } from "@styled-icons/evil"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark
  const image = getImage(frontmatter.featuredImage)
  const _ = require("lodash")
  return (
    <Layout>
      <Seo title={frontmatter.title} description={excerpt} />
      <article>
        <div className="headerShadow">
          <header className={style.headerPost}>
            {frontmatter.featuredImage ? (
              <div className="containerM">
                <h1 className={style.title}>{frontmatter.title}</h1>
                <div className={style.featuredImage}>
                  <GatsbyImage image={image} />
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
            <div
              className={style.content}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <footer className={style.metadata}>
              {frontmatter.date && <p>Publiziert am: {frontmatter.date}</p>}
              {frontmatter.updated && (
                <p>Aktualisiert am: {frontmatter.updated}</p>
              )}
              {frontmatter.author && <p>Autor: {frontmatter.author}</p>}
              {frontmatter.weblink && (
                <p className={style.weblink}>
                  <LinkIcon className={style.linkIcon} />
                  <a href={frontmatter.weblink}>Weblink</a>
                </p>
              )}
              {frontmatter.tags && (
                <div>
                  <h2>Stichworte:</h2>
                  <ul className={style.tags}>
                    {frontmatter.tags.map(tag => {
                      return (
                        <li key={frontmatter.tags}>
                          <Link to={"/tag/" + _.lowerCase(tag)}>
                            <TagIcon
                              aria-hidden="true"
                              className={style.tagIcon}
                            />
                            {tag}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </footer>
          </div>
        </div>
      </article>
    </Layout>
  )
}
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt
      frontmatter {
        author
        date(formatString: "DD. MMMM YYYY", locale: "de")
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.777)
          }
        }
        slug
        tags
        title
        updated(formatString: "DD. MMMM YYYY", locale: "de")
        weblink
      }
    }
  }
`
