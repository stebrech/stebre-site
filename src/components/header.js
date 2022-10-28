import * as React from "react";
import { Link } from "gatsby";
import * as style from "../styles/header.module.css";
import logo from "../images/logo-stebre.svg";

const Header = () => (
  <header className={style.header}>
    <nav className={style.mainnav}>
      <ul>
        <li className={style.logo}>
          <Link to="/">
            <img src={logo} alt="Startseite SteBre" />
          </Link>
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
);

export default Header;
