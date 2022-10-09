import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostLink from "../components/postLink"

import * as style from "../styles/markdown.module.css"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = () => {
    if (totalCount > 1) {
      return (
        <>
          {totalCount} Beiträge, die mit dem Stichwort{" "}
          <span className={style.tagInTitle}>{tag}</span> getaggt sind
        </>
      )
    } else {
      return (
        <>
          {totalCount} Beitrag, welcher mit dem Stichwort{" "}
          <span className={style.tagInTitle}>{tag}</span> getaggt ist
        </>
      )
    }
  }

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <Seo
        title={"Beiträge mit dem Tag " + tag}
        description={
          "Alle Beiträge im Blog von SteBre.ch, die mit dem Schlagwort " +
          tag +
          " versehen sind."
        }
      />
      <header>
        <div className="containerL">
          <h1 className={style.title}>{tagHeader()}</h1>
        </div>
      </header>
      <div className="containerL">
        <ul className="grid">{Posts}</ul>
        <Link to="/blog" className="linkButton">
          Alle Blogartikel
        </Link>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date(formatString: "DD. MMMM YYYY", locale: "de")
            description
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.777)
              }
            }
            updated(formatString: "DD. MMMM YYYY", locale: "de")
          }
        }
      }
    }
  }
`
