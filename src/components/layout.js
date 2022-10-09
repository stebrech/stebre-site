/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "normalize.css"
import "the-new-css-reset/css/reset.css"
import "../styles/general.css"
import * as style from "../styles/layout.module.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>{children}</main>
      <footer className={style.footer}>
        <nav>
          <Link to="/impressum">Impressum</Link> &middot;{" "}
          <Link to="/datenschutz">Datenschutz</Link>
        </nav>
        <div>© {new Date().getFullYear()} Stefan Brechbühl</div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
