import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import * as style from "../styles/postLink.module.css";

const PostLink = ({ post }) => (
  <li data-sal="slide-up" data-sal-delay="100" className={style.card}>
    <div className={style.container}>
      <h3 className={style.title}>
        <Link className={style.link} to={"/" + post.fields.postType + "/" + post.frontmatter.slug}>
          {post.frontmatter.title}
        </Link>
      </h3>
      <p className={style.date}>vom {post.frontmatter.date}</p>
      <p className={style.excerpt}>{post.frontmatter.description}</p>
    </div>
    <div className={style.featuredImage}>
      <GatsbyImage image={getImage(post.frontmatter.featuredImage)} alt="" />
    </div>
  </li>
);

export default PostLink;
