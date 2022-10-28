import * as React from "react";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../components/layout";
import PostLink from "../components/postLink";
import * as style from "../styles/index.module.css";

import { Linkedin as LinkedInIcon } from "@styled-icons/fa-brands";
import { Twitter as TwitterIcon } from "@styled-icons/fa-brands";

const IndexPage = ({ data }) => {
  const { site, portfolio, blog } = data;
  const Portfolio = portfolio.edges.map((edge) => <PostLink key={edge.node.id} post={edge.node} />);
  const BlogPosts = blog.edges.map((edge) => <PostLink key={edge.node.id} post={edge.node} />);
  const Erfahrung = new Date().getFullYear() - 2000;

  return (
    <Layout>
      <GatsbySeo
        title={site.siteMetadata.title}
        openGraph={{
          url: "https://stebre.ch",
          title: site.siteMetadata.title,
          images: [
            {
              url: site.siteMetadata.siteUrl + "/stebre-ogImage.png",
              width: 1200,
              height: 630,
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
      <div className="headerShadow">
        <section className={style.hero}>
          <div data-sal="slide-up" data-sal-delay="100" className={style.heroContainer}>
            <div className={style.intro}>
              <h1>Was und wer ist SteBre?</h1>
              <p>
                Hey, mein Name ist <strong>Ste</strong>fan <strong>Bre</strong>
                chbühl. SteBre ist meine persönliche Website. Hier zeige ich{" "}
                <Link to="/portfolio">meine Nebenprojekte</Link> und{" "}
                <Link to="/blog">schreibe über Publishing und technische Themen</Link>.
              </p>
              <p>
                Mich fasziniert das Publizieren in digitale Kanäle und Print, weshalb ich mich
                Publishing-Enthusiast nenne. Vor {Erfahrung} Jahre startete ich meine Lehre als
                Polygraf und schloss diese 2004 ab. Seither bilde ich mich autodidaktisch für das
                Gestalten und Entwickeln von Websites weiter.
              </p>
              <p>
                Im Sommer 2022 schloss ich erfolgreich die höhere Fachschule Medienwirtschaft und
                Medienmanagement (
                <a href="https://sfgb-b.ch/bildungsangebote/hoehere-fachschule-hf/hf-medienwirtschaft-und-medienmanagement">
                  HF TSM
                </a>
                ) in der Schule für Gestaltung in Bern ab.
              </p>
              <p>
                Seit Anfang 2022 arbeite ich als System Engineer Applications in der{" "}
                <a href="https://a-f.ch/">a&f systems ag</a>.
              </p>
              <p>
                <ul className={style.socialList}>
                  <li>
                    <a href="https://www.linkedin.com/in/stefan-brechbuehl/">
                      <LinkedInIcon
                        aria-hidden="false"
                        alt="LinkedIn Profil"
                        className={style.socialIcon}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/pixelstrolch/">
                      <TwitterIcon
                        aria-hidden="false"
                        alt="Twitter Profil"
                        className={style.socialIcon}
                      />
                    </a>
                  </li>
                </ul>
              </p>
            </div>
            <div data-sal="slide-down" data-sal-delay="500" className={style.profilePic}>
              <StaticImage
                src="../images/20151127_154311_Stefan.jpg"
                width={400}
                alt="Foto von mir."
                style={{ marginBottom: `var(--size-m)` }}
              />
            </div>
          </div>
        </section>
      </div>
      <section>
        <div className="containerL">
          <h2 className={style.sectionTitle}>Arbeiten aus dem Portfolio</h2>
          <ul className="grid">{Portfolio}</ul>
          <Link to="/portfolio" className="linkButton">
            Komplettes Portfolio anschauen
          </Link>
        </div>
      </section>
      <section>
        <div className="containerL">
          <h2 className={style.sectionTitle}>Letzte Blogartikel</h2>
          <ul className="grid">{BlogPosts}</ul>
          <Link to="/blog" className="linkButton">
            Alle Blogartikel
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    blog: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { postType: { eq: "blog" } }, frontmatter: { date: { ne: "" } } }
      limit: 3
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
            featuredImage {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.777)
              }
            }
            slug
            title
            updated(formatString: "DD. MMMM YYYY", locale: "de")
          }
        }
      }
    }
    portfolio: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { postType: { eq: "portfolio" } }, frontmatter: { featured: { eq: true } } }
      limit: 3
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
            featuredImage {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.777)
              }
            }
            featured
            slug
            title
            updated(formatString: "DD. MMMM YYYY", locale: "de")
          }
        }
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
