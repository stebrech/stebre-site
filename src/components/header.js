import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import * as style from "../styles/header.module.css"

const Header = ({ siteTitle }) => (
  <header className={style.header}>
    <nav className={style.mainnav}>
      <ul>
        <li>
          <Link to="/">{siteTitle}</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
