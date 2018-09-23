module.exports = {
  siteMetadata: {
    title: `bhnywl`,
    description: `I am Ben Honeywill, a front-end web developer from Bournemouth, UK. This is my website.`,
    siteUrl: `https://www.bhnywl.com`
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-preact`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/assets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/cms/posts`,
        name: "blog"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/cms/projects`,
        name: "projects"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/cms/comments`,
        name: "comments"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: "assets"
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              backgroundColor: `transparent`
            }
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: "^"
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`rubik\:400,700`]
      }
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  enclosure: { url: site.siteMetadata.siteUrl + edge.node.image.resolutions.src },
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/cms/posts/" } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      html
                      excerpt
                      frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        path
                        title
                      }
                      image: childImageSharp {
                        resolutions {
                          src
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/feed.xml'
          },
        ],
      },
    }
  ]
};
