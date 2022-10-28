import * as React from "react";
import { graphql, Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../components/layout";
import PostLink from "../components/postLink";
import * as style from "../styles/markdown.module.css";

const BlogPage = ({ data }) => {
  const { portfolio, categories, site } = data;
  const PageTitle = "Portfolio";
  const PageDescription = "Portfolio von stebre.ch";
  const Posts = portfolio.edges.map((edge) => <PostLink key={edge.node.id} post={edge.node} />);
  const Category = categories.group.map((category) => (
    <li key={category.fieldValue}>
      <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
        {category.fieldValue} ({category.totalCount})
      </Link>
    </li>
  ));

  return (
    <Layout>
      <GatsbySeo
        title={PageTitle}
        titleTemplate={"%s | " + site.siteMetadata.title}
        description={PageDescription}
        openGraph={{
          url: site.siteMetadata.siteUrl + "/portfolio",
          title: PageTitle + " | " + site.siteMetadata.title,
          description: PageDescription,
          images: [
            {
              url: site.siteMetadata.siteUrl + "/static/logo-stebre.png",
              width: 400,
              height: 400,
              alt: PageTitle + " | " + site.siteMetadata.title,
            },
          ],
          site_name: site.siteMetadata.title,
        }}
        twitter={{
          handle: "@stebre_ch",
          site: "@stebre_ch",
          cardType: "summary_large_image",
        }}
      />
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
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    portfolio: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { postType: { eq: "portfolio" } }, frontmatter: { date: { ne: "" } } }
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
    site: site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`;
