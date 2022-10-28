import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../components/layout";
import PostLink from "../components/postLink";

import * as style from "../styles/markdown.module.css";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { allMarkdownRemark, site } = data;
  const { edges, totalCount } = allMarkdownRemark;
  const PageTitle = "Beiträge mit dem Tag " + tag;
  const PageDescription =
    "Alle Beiträge auf stebre.ch, die mit dem Schlagwort " + tag + " versehen sind.";
  const PageUrl = site.siteMetadata.siteUrl + "/" + tag;
  const tagHeader = () => {
    if (totalCount > 1) {
      return (
        <>
          {totalCount} Beiträge, die mit dem Stichwort{" "}
          <span className={style.tagInTitle}>{tag}</span> getaggt sind
        </>
      );
    } else {
      return (
        <>
          {totalCount} Beitrag, welcher mit dem Stichwort{" "}
          <span className={style.tagInTitle}>{tag}</span> getaggt ist
        </>
      );
    }
  };

  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <GatsbySeo
        title={PageTitle}
        titleTemplate={"%s | " + site.siteMetadata.title}
        description={PageDescription}
        openGraph={{
          url: PageUrl,
          title: PageTitle,
          description: PageDescription,
          images: [
            {
              url: site.siteMetadata.siteUrl + "/static/logo-stebre.png",
              width: 400,
              height: 400,
              alt: site.siteMetadata.title,
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
  );
};

export default Tags;

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
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`;
