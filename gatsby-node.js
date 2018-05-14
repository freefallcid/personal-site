const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

function paramaterize(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/, "")
    .replace(/\s/g, "-");
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const postTemplate = path.resolve("src/templates/postTemplate.js");

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              fileAbsolutePath
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges.filter(({ node }) =>
      node.fileAbsolutePath.includes("/cms/posts")
    );

    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {}
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, getNodes, boundActionCreators }) => {
  const { createNodeField, createParentChildLink } = boundActionCreators;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug
    });

    if (typeof node.frontmatter.image === "string") {
      const pathToFile = path
        .join(__dirname, "static", node.frontmatter.image)
        .split(path.sep)
        .join("/");

      const fileNode = getNodes().find(n => n.absolutePath === pathToFile);

      if (fileNode != null) {
        const imageSharpNodeId = fileNode.children.find(n =>
          n.endsWith(">> ImageSharp")
        );
        const imageSharpNode = getNodes().find(n => n.id === imageSharpNodeId);

        createParentChildLink({ parent: node, child: imageSharpNode });
      }
    }
  }
};
