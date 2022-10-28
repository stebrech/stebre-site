import * as React from "react";
import { graphql, Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../components/layout";
import PostLink from "../components/postLink";
import * as style from "../styles/markdown.module.css";

const BlogPage = ({ data }) => {
  const { blog, tags, site } = data;
  const PageTitle = "Alle Blogbeiträge";
  const PageDescription = "Alle Blogbeiträge auf stebre.ch";
  const Posts = blog.edges.map((edge) => <PostLink key={edge.node.id} post={edge.node} />);
  const Tags = tags.group.map((tag) => (
    <li key={tag.fieldValue}>
      <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
        {tag.fieldValue} ({tag.totalCount})
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
          url: site.siteMetadata.siteUrl + "/blog",
          title: PageTitle + " | " + site.siteMetadata.title,
          description: PageDescription,
          images: [
            {
              url: site.siteMetadata.siteUrl + "/logo-stebre.png",
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
          <h1 className={style.title}>Alle Blogbeiträge</h1>
          <h2 className={style.subtitle}>Nach einem Schlagwort filtern</h2>
          <ul className={style.tagList}>{Tags}</ul>
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
    blog: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { postType: { eq: "blog" } }, frontmatter: { date: { ne: "" } } }
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
    site: site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`;
