const path = require("path");
const _ = require("lodash");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent);
    let postType = parent.sourceInstanceName;
    createNodeField({
      node,
      name: "postType",
      value: postType,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const tagTemplate = path.resolve("src/templates/tags.js");
  const categoryTemplate = path.resolve("src/templates/categories.js");

  const result = await graphql(`
    {
      tagsGroup: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
      categoriesGroup: allMarkdownRemark {
        group(field: { frontmatter: { categories: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Make tag pages
  result.data.tagsGroup.group.forEach((tag) => {
    createPage({
      path: `/tag/${_.kebabCase(tag.fieldValue)}`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  // Make categories pages
  result.data.categoriesGroup.group.forEach((category) => {
    createPage({
      path: `/category/${_.kebabCase(category.fieldValue)}`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
    });
  });
};
