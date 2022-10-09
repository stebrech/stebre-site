import * as React from "react"
import { graphql, Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"
import PostLink from "../components/postLink"
import Seo from "../components/seo"
import * as style from "../styles/markdown.module.css"

const BlogPage = ({ data }) => {
  const Posts = data.blog.edges.map(edge => (
    <PostLink key={edge.node.id} post={edge.node} />
  ))
  const Tags = data.tags.group.map(tag => (
    <li key={tag.fieldValue}>
      <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
        {tag.fieldValue} ({tag.totalCount})
      </Link>
    </li>
  ))
  return (
    <Layout>
      <Seo
        title="Alle Blogbeiträge von SteBre.ch"
        description="Alle Blogbeiträge von SteBre.ch"
      />
      <header>
        <div className="containerL">
          <h1 className={style.title}>Alle Blogbeiträge</h1>
          <h2 className={style.subtitle}>Nach einem Schlagwort filtern</h2>
          <ul className={style.tagList}>{Tags}</ul>
        </div>
      </header>
      <div className="containerL">
        <ul className="grid">{Posts}</ul>
      </div>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    blog: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fields: { postType: { eq: "blog" } }
        frontmatter: { date: { ne: "" } }
      }
    ) {
      edges {
        node {
          id
          fields {
            postType
          }
          frontmatter {
            date(formatString: "DD. MMMM YYYY", locale: "de")
            description
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData
              }
            }
            updated(formatString: "DD. MMMM YYYY", locale: "de")
          }
        }
      }
    }
    tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
