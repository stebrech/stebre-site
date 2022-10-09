import * as React from "react"
import { graphql, Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"
import PostLink from "../components/postLink"
import Seo from "../components/seo"
import * as style from "../styles/markdown.module.css"

const BlogPage = ({ data }) => {
  const Posts = data.portfolio.edges.map(edge => (
    <PostLink key={edge.node.id} post={edge.node} />
  ))
  const Category = data.categories.group.map(category => (
    <li key={category.fieldValue}>
      <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
        {category.fieldValue} ({category.totalCount})
      </Link>
    </li>
  ))

  return (
    <Layout>
      <Seo title="Portfolio von SteBre" description="Portfolio von SteBre" />
      <header>
        <div className="containerL">
          <h1 className={style.title}>SteBre’s Portfolio</h1>
          <h2 className={style.subtitle}>Nach einer Kategorie filtern</h2>
          <ul className={style.tagList}>{Category}</ul>
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
    portfolio: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fields: { postType: { eq: "portfolio" } }
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
    categories: allMarkdownRemark {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
