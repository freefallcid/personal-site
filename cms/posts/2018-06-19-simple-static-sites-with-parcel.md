---
pinned: false
title: Simple static sites with Parcel
path: /blog/simple-static-sites-with-parcel
date: 2018-06-19T19:25:57.984Z
image: /assets/chuttersnap-485281-unsplash.jpg
---
Sometimes you just need to create a quick and simple single page static site without any bells and whistles. Maybe it's a landing page for a new product, a simple brochure site, or a single page portfolio.

Your first instinct as a web developer is probably going to be to create an `index.html` file and a `styles.css` file then start hacking away. This is the correct approach, you don't want to include a big framework for something as simple as a single static page, but you're quickly going to start missing some of the build tooling that you've gotten so used to.

You're going to want to split that massive CSS file up into smaller files before you go insane, and you might want to use a preprocessor like Sass or Stylus. The same goes for your HTML file, if your page is long you'll want to split some of your html into partials before it gets too unwieldy and difficult to find what you need.

You might reach for something like Gulp, Grunt, Browserify or Webpack to transform you Sass and bundle your files up for production. These tools are great but they require a lot of configuration, and in the case of a simple site you could actually spend longer setting up your build tools than building your actual website, what a waste of time!

This is where [Parcel](https://github.com/parcel-bundler/parcel) comes in. Parcel is a fast, zero config web bundler. Because it's zero config it's really quick to get set up, and while it might not be perfect for a large complex project, it's perfect for a simple static site.

## Here's how to get started with Parcel

First we're going to create a directory for our project. Open your terminal then create a folder and change into this directory.

```sh
$ mkdir my-project
$ cd my-project
```

Now we're going to use npm to initialise our project. We need npm to use Parcel.

```sh
$ npm init
```

You'll be presented with a number of options, just work your way through those to initialise the project, this will create a `package.json` in your project directory. The next step is to install Parcel.

```sh
$ npm install parcel-bundler --dev
```

Now that we have Parcel installed we can make the actual files for our website. First lets create an `index.html` file at the root of our project.

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
  <head>
    <title>My Project</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

We'll also want to create a folder to put our styles in, I'm going to use Sass to demonstrate how Parcel can build your styles using a CSS preprocessor. Create a new directory at the root of your project called `styles`, and then create 2 files inside: `index.scss` and `reset.scss`.

```scss
// styles/reset.scss

html {
  box-sizing: border-box;
  font-size: 16px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
```

```scss
// styles/index.scss

@import "./reset.scss";

h1 {
  color: pink;
}
```

Here we have a simple css reset and and index file for our styles. The index file imports the reset and then sets the `h1` color to pink. Add the following line to the head of your `index.html` file to use this stylesheet.

```html
<link href='./styles/index.scss' rel='stylesheet'>
```

Here we can see some of the magic of Parcel, we can simply link to a Sass file and Parcel will handle the rest: concatenating, minifying, and converting the Sass to good old CSS.

To see this working we are going to need to add a script to our `package.json` file, in the `scripts` section of your file you should already see a `test` script. Underneath this script add a `start` script:

```
"start": "parcel index.html"
```

This command will tell parcel to bundle our project with `index.html` as the entry point. To test it you just to to run this command in your terminal:

```sh
$ npm run start
```

Parcel will automatically detect that you are using sass and install `node-sass` for you. Open your browser and go to the URL Parcel says your project is running at, it's usually `localhost:1234`. You should see the text "Hello, World!", and it should be pink - this means everything is working. Awesome!

## Adding HTML partials

This is now a pretty good basis for you to start building your webpage using Sass and Parcel, and we've done no configuration! There is one more thing however that you might like to do - split up you HTML file into partials. Unfortunately doing this will require a small amount of config.

Parcel uses a package called `posthtml` to transform HTML files, and we can take advantage of this to use partials. First you'll need to install a package called `posthtml-include`:

```sh
$ npm install posthtml-include --dev
```

Now create a file called `.posthtmlrc.js` in the root of your project. This is a file that `posthtml` will look in for configuration options, we are going to tell `posthtml` to look in a directory called `partials` for our HTML partials.

```js
// .posthtmlrc.js

module.exports = {
  plugins: [
    require("posthtml-include")({
      root: "./partials"
    })
  ]
};
```

Create this `partials` directory and add a simple partial called `my-partial.html`.

```html
<!-- partials/my-partial.html -->

<h1>My partial!</h1>
```

We can now include this partial in our `index.html` using the following syntax:

```html
<include src="my-partial.html"></include>
```

Go back to your browser and you should see that your partial has now been included! If it hasn't worked try restarting Parcel.

You now have a great starting point for building your simple webpage, with excellent build tooling and minimal configuration. Easy peasy, right? If you like the look of Parcel it's not only great for static pages but also for bundling more complicated JS apps.

Let me know what you think, how do you like to make simple static sites and how do you avoid unnecessary build tooling configuration in your projects?
