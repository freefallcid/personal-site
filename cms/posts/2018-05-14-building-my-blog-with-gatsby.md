---
path: /blog/building-my-blog-with-gatsby
date: 2018-05-14T17:14:48.000Z
title: Building my blog with Gatsby
image: /assets/apple-device-blur-blurry-273222.jpg
pinned: false
---

I've just finished building my new blog with [Gatsby JS](https://gatsbyjs.org). After hearing a lot about Gatsby and Netlify CMS on various podcasts and blogs I decided to fully embrace the so called [JAMstack](https://jamstack.org/) and use Gatsby to make my new website fully static.

## What is Gatsby?

For those of you that don't know about Gatsby, it's a React powered static site generator. This means that all of the markup is rendered by React & Gatsby into simple static HTML and JS files during a build step. This static markup can then be served straight to the browser, at which point React can take back control. It's like server-side rendering without having to run a server, and means your users can get all the benefits of a static site while still getting the modern experience they now expect.

Oh, and did I mention it's fast? Gatsby makes a lot of optimisations to the output files which will really speed up your webpage. For example, inlining your critical css and chunking your JS bundles. Another plus is Gatsby's plugin system, I've taken advantage of a number of plugins to really optimise image loading, and I also swapped React for Preact to shave around 30kb from my initial bundle size. I think the results speak for themselves, spend a few moments clicking around the pages on my website and you'll quickly realise how fast a Gatsby powered site can be.

## Why static sites?

Static sites really appeal to the web purist in me. Shouldn't serving up static HTML pages be how all simple sites work? This is what the web was made to do. The more functionality we can abstract into build processes and tooling, the less work our browsers and servers will need to do. I've played with [Jekyll](https://jekyllrb.com/) in the past but never really had that _"aha!"_ moment that I instantly got when I started using Gatsby. I think that's really down to the fantastic developer experience that Gatsby offers.

## The developer experience

For starters Gatsby uses React as it's rendering engine, which means that anyone familiar with React is going to instantly be productive. React Router is used under the hood but all the intricacies of that are abstracted away. You want to add an "About" page? Simply create a file under the pages directory called `about.js`, export a React component and then navigate to "/about" in your browser.

You don't have to worry about any webpack configurations or build steps as it's all packaged up for you. All you need to do is run `gatsby develop` to start a dev server or `gatsby build` to build your production files.

To my suprise my favourite thing about Gatsby is something that I was unfamiliar with before I started digging in, **GraphQL**. GraphQL is used as the data layer in Gatsby and it really is great to work with, you can request exactly the data you need and put the queries right in the same file as the components that use them. In my website I'm only querying my markdown files, but Gatsby has plugins for any number of data sources.

Take a look at my blog post component as an example of Gatsby's GraphQL querying in action:

```javascript
export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <div className="container">
      <BlogPostHead post={post} />
      <article className="article">
        <header className="article__header">
          <h1 className="article__title">{post.frontmatter.title}</h1>
          <p className="article__date">{post.frontmatter.date}</p>
        </header>
        <Img className="article__image" sizes={post.image.sizes} />
        <main
          className="article__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </div>
  );
};

export const postQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 180)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      image: childImageSharp {
        sizes {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;
```

All the data this component is going to receive is defined right there in the GraphQL query, which makes the component self-documenting. We can see that this component will have access to a post with `excerpt`, `html`, `frontmatter` and `image` fields. This is a big plus if you are not going to be the only person working on a project. Gatsby then magically passes the result of the GraphQL query to the `data` prop of you component for you to use, and from there on it's easy.

Gatsby also ships with a great tool called **GraphiQL**. If you navigate to `localhost:8000/___graphql` while developing you'll have access to a little app which lets you run test queries and see what data is available to you. This means no more console-logging you props to see what you're working with.

It's lots of small things like this that really add up to Gatsby being a delight to work with.

### So what are the downsides?

Gatsby has been great to work with but it's important to understand it's limitations. Static site generators are great for small blogs or portfolios, but if there's a chance your site might ever be more than that then there is a risk that you might outgrow Gatsby.

Also, because Gatsby requires you to make updates by pushing to a repository it might not be an ideal solution for a client who isn't technically inclined. Solutions like Netlify CMS help to ease this problem but I don't believe they solve it.

### In the end

I'm very happy I took the time to take a look at Gatsby. My website is responsive, snappy, and easy for me to maintain. Hosting for static sites is often cheap or free and with Netlify CMS I have a great way to manage my content without having to boot up my text editor. I often get people asking me to make them a simple blog and from now on Gatsby is definetly going to be a contender when I have to decide what to make it with.

Hopefully reading about my experience with Gatsby has interested you enough to try it out for yourself!
