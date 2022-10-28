import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../components/layout";
import PostLink from "../components/postLink";

import * as style from "../styles/markdown.module.css";

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const Title = "Arbeiten mit der Kategorie " + category;
  const Description =
    "Alle Arbeiten im Portfolio von SteBre, die mit der Kategorie " + category + " markiert sind.";
  const Site = data.site.siteMetadata.title;
  const PageUrl = data.site.siteMetadata.siteUrl + "/" + category;
  // const LogoUrl = data.file.publicURL;
  const categoryHeader = () => {
    if (totalCount > 1) {
      return (
        <>
          {totalCount} Arbeiten, die mit der Kateogorie{" "}
          <span className={style.categoryInTitle}>{category}</span> markiert sind
        </>
      );
    } else {
      return (
        <>
          {totalCount} Arbeit, die mit der Kategorie{" "}
          <span className={style.categoryInTitle}>{category}</span> markiert ist
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
        title={Title}
        titleTemplate="%s | stebre.ch"
        description={Description}
        openGraph={{
          url: PageUrl,
          title: Title,
          description: Description,
          // images: [
          //   {
          //     url: LogoUrl,
          //     width: 400,
          //     height: 400,
          //     alt: Site,
          //   },
          // ],
          site_name: Site,
        }}
        twitter={{
          handle: "@stebre_ch",
          site: "@stebre_ch",
          cardType: "summary_large_image",
        }}
      />
      <header>
        <div className="containerL">
          <h1 className={style.title}>{categoryHeader()}</h1>
        </div>
      </header>
      <div className="containerL">
        <ul className="grid">{Posts}</ul>
        <Link to="/portfolio" className="linkButton">
          Komplettes Portfolio anschauen
        </Link>
      </div>
    </Layout>
  );
};

export default Categories;

export const pageQuery = graphql`
  query ($category: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
    file(id: { eq: "dc42c5c1-870f-5f98-b3a6-751a98b54ad9" }) {
      publicURL
    }
  }
`;
