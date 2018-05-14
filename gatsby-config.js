module.exports = {
  siteMetadata: {
    title: `Ben Honeywill`,
    siteUrl: `https://www.bhnywl.com`,
    description: `Ben Honeywill is a front-end web developer from Bournemouth, UK.`
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-"
            }
          }
        ]
      }
    },
    `gatsby-plugin-sass`
  ]
};
