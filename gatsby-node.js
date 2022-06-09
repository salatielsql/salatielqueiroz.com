const path = require("path");

exports.createPages = async ({ actions, graphql, node, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges;
  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      // The slug generated by gatsby-plugin-mdx doesn't contain a slash at the beginning
      // You can prepend it with any prefix you want
      path: `/${node.slug}`,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/posts-page-layout.tsx`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });
};
