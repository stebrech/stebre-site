require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `stebre.ch`,
    description: ``,
    author: `@stebre_ch`,
    siteUrl: `https://stebre.ch`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-next-seo`,
    {
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
        threshold: 0.01, // Percentage of an element's area that needs to be visible to launch animation
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: `transparent`,
              maxWidth: 890,
              showCaptions: ["title"],
              wrapperStyle: `margin-left: 0`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio`,
        path: `${__dirname}/content/portfolio`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rechtliches`,
        path: `${__dirname}/content/rechtliches`,
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `stebre.ch`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `stebre.ch`,
        short_name: `stebre.ch`,
        start_url: `/`,
        background_color: `#ecf0f1`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#0288d1`,
        display: `minimal-ui`,
        icon: `src/images/logo-stebre.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
