---
pinned: true
title: Styling React components
path: /blog/styling-react-components
date: 2018-06-27T19:25:57.984Z
image: /assets/rhondak-native-florida-folk-artist-83553-unsplash.jpg
---

How to style React components is a controversial subject. There has been debate about whether styles should be defined in JavaScript using one of the new _CSS in JS_ solutions, or if a more traditional method of styling using external stylesheets is the best approach.

Let's look at the different ways of styling React components and discuss their respective pros and cons. By the end of the article you should have a good idea of all the different techniques available to you, and be more informed to choose which one is right for your project.

# Vanilla CSS

The tried and tested way of styling your web app is to use external CSS stylesheets. When you're working in React, styling using plain CSS will look something like this:

```js
import React from "react";

import "./box.css";

const Box = () => (
  <div className="box">
    <p className="box-text">Hello, World</p>
  </div>
);

export default Box;
```

The styles are imported from a separate CSS file `box.css`:

```css
.box {
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  padding: 20px;
}

.box-text {
  font-size: 15px;
  text-align: center;
}
```

Your build process will gather all of your imported CSS files and create a separate stylesheet, which will be linked to from your HTML file (projects like [`create-react-app`](https://github.com/facebook/create-react-app) will handle this for you).

### The Good

Because you're just using Vanilla CSS you have access to all the great features in css that you are used to:

- Media queries

- Keyframe animations

- Pseudo-elements (eg. `:before`, `:after`)

- Pseudo-selectors (eg. `:hover`, `:nth-child`)

You're using plain CSS, one of the fundamental building blocks of the web. This means you don't have to add any dependencies to your project. You also don't have to worry about CSS becoming obsolete in the near future, unlike with some of the other styling solutions.

If you like, you can also use your favourite CSS preprocessor like Sass or Stylus; giving you access to powerful mixins, variables and everything else that these include. You will have to add a build step for this, however.

### The Bad

First of all you need to make sure that your JavaScript build process is set up to handle CSS imports. Luckily, if you are using `create-react-app`, this is handled out of the box.

Another downside to plain CSS when compared with other solutions is that you can't use JavaScript to directly style a component based on some variable or prop. With Vanilla CSS you have to take a quite meandering approach to this and and apply different classes to the component in response to conditions. For example:

```js
const Button = props => {
  const classNames = ["button"];
  if (props.large) classNames.push("button-large");
  if (props.rounded) classNames.push("button-rounded");
  if (props.color) classNames.push(`button-${props.color}`);

  return <button className={classNames.join(" ")} />;
};
```

In this example I have had to add many conditions to change the components `className` attribute according to the props that are passed in. We will come back to this example later to show how this is easier with some other React styling solutions.

The most important problem however, is that CSS was not designed to be used in a component-based architecture. CSS was designed to style documents and webpages, in these environments CSS' global namespace and cascade are powerful tools. However, in a component-based app the global namespace is a hindrance. It gets in the way.

In non-trivial React applications using CSS you are bound to run into some kind of class-name collision or see unexpected behaviour because some global styles have leaked where you didn't expect them to. Naming conventions like [BEM](http://getbem.com/introduction/) can help to alleviate this problem within your project, but you have no guarantee that 3rd party code won't interfere with your styles.

A better solution would have styles which can be scoped directly to a component. Not only would this solve the global namespace issue, but it would allow better _separation of concerns_, as we could neatly bundle up all the code a component needs without having to worry about how it will affect all our **other** components.

# Inline styles

The next way you can style your React components is by using _inline styles_. In React you can add styles directly to a component via the `style` prop using the JavaScript **camelCased** version of a CSS property:

```js
import React from "react";

const boxStyle = {
  border: "1px solid #f7f7f7",
  borderRadius: "5px",
  padding: "20px"
};

const boxTextStyle = {
  fontSize: "15px",
  textAlign: "center"
};

const Box = () => (
  <div style={boxStyle}>
    <p style={boxTextStyle}>Hello, World</p>
  </div>
);

export default Box;
```

### The Good

The good thing about this method is that you don't need any extra dependencies or build steps, you're just using React. It's quick to get started, and great for very small projects or proof of concept examples. Your styles are declared locally so you don't need to worry about global CSS collisions or be mindful of the cascade. Everything is neatly scoped to the component.

Because we are just using JavaScript we can make use of functions to add logic to our styles. We can take the example of the button with lots of classes that we looked at in the previous section on Vanilla CSS, and rewrite it using inline styles:

```js
const styles = props => ({
  fontSize: props.large ? "20px" : "14px",
  borderRadius: props.rounded ? "10px" : "0",
  background: props.color
});

const Button = props => {
  return <button style={styles(props)} />;
};
```

You can see how this is much more declarative, instead of applying certain styles to the component in a round-about way using classes, the needed properties can be applied to the component directly.

### The Bad

In practice, for any projects that aren't just hobby projects, I would never recommend using inline styles. This is because we lose so many of the best things you get in CSS by taking a JS only approach:

- We can't do media queries. Web apps need to be responsive in 2018 and with inline styles you'd need to add a lot of complicated and confusing custom window resizing logic to get it to work.

- We lose CSS keyframe animations. This is the most performant way to do many different kinds of animation on the web.

- You can't add pseudo-elements (eg. `:before`, `:after`), you'd have to add these into your JSX.

- You can't add Pseudo-selectors (eg. `:hover`, `:nth-child`), you're going to have to add `mouseover` and `mouseleave` events to emulate `:hover` behaviour.

Missing out on any one of these is a deal-breaker for a lot of apps. You would also lose anything that you have transforming your CSS in a build step, for example vendor auto-prefixing. Subjectively, I also find writing CSS and JavaScript objects very clunky and unenjoyable.

# CSS Modules

The next method we're going to look at is [CSS Modules](https://github.com/css-modules/css-modules). CSS Modules are like an evolution of Vanilla CSS where all the class and animation names are scoped locally. This means you avoid all of the problems that arise from the global namespace of CSS.

```js
import React from "react";
import styles from "./box.css";

const Box = () => (
  <div className={styles.box}>
    <p className={styles.boxText}>Hello, World</p>
  </div>
);

export default Box;
```

You import a `box.css` CSS file just like in the Vanilla CSS method, but this time it's a named import which will have normal JavaScript properties with your class-names as the keys. The corresponding CSS file here would just look like normal CSS:

```css
.box {
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  padding: 20px;
}

.boxText {
  font-size: 15px;
  text-align: center;
}
```

### The Good

CSS modules will alter the class names in the resulting css files to be unique, which will effectively scope your styles, making them more appropriate for a component-based web app. By using CSS Modules you completely negate the main downside of using Vanilla CSS (the global namespace), while keeping all of the benefits. You still have access to everything in CSS, and you can still use a CSS preprocessor if you like (it will still require a build step).

Your codebase will still be made up of plain CSS files, so even though you have to add a build step and slightly change the way you import and apply your styles, the footprint left on your app is small. This means that if you ever need to pivot away from CSS Modules in the future, the transition should be quite painless.

### The Bad

CSS modules solve the global nature of CSS by scoping classes, but other than that it has the same problems as plain CSS stylesheets.

- You need to set up your build step to handle CSS modules (and Sass/Stylus if you're using it)
- Just like in CSS you don't have access to any JavaScript for complicated logic.

# Styled Components

[Styled Components](https://github.com/styled-components/styled-components) is a **CSS in JS** library for React that lets you add local component-scoped styles in JS, but unlike with inlined styles, styled components compiles the JavaScript into real CSS. The library uses the [template tag literal](https://www.styled-components.com/docs/advanced#tagged-template-literals) syntax to apply style to your components. It looks like this:

```js
import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  padding: 20px;
`;

const BoxText = styled.p`
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  padding: 20px;
`;

const Box = () => (
  <BoxWrapper>
    <BoxText>Hello, World</BoxText>
  </BoxWrapper>
);

export default Box;
```

### The Good

Because the JavaScript is turned into actual CSS you can still do everything in styled components that you can in CSS. This includes media queries, pseudo-selectors, animations etc. Rather than using the clunky camel-case properties that we saw with inline styles, with styled components you can just write normal CSS. It's easy to pick up if you already know CSS.

Because we are using a CSS in JS solution we also have full access to the JavaScript language to alter and apply different styles based on props. A component's props are actually passed into calls to `styled`, which is very powerful:

```js
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${props.color};
  font-size: ${props.large ? "18px" : "14px"};
  border-radius: ${props.rounded ? "10px" : "0"};
`;

export default props => <Button {...props} />;
```

Unlike with Vanilla CSS your styles are tightly scoped to the component that you create when you declare them, solving the global namespace problem.

If you like the look of Styled Components it's worth mentioning here that there are alternative CSS in JS options. Check out [Glamorous](https://github.com/paypal/glamorous) as well and see which you prefer.

### The Bad

Bringing Styled Components into your project does add an extra dependency. The CSS in JS world is pretty turbulent at the moment. It's possible that in a year there will be a better library and by using styled components you have given yourself technical debt.

It's also another thing you'll have to get new hires up to speed with when they join the team. As well as this, it's worth considering the debate I alluded to at the start of the article, why might using CSS in JS not be a good idea?

# Is CSS in JS a good idea?

After reading the summaries I've given above you're probably leaning towards using either Styled Components or CSS modules to style your React apps. Inline styles just aren't powerful enough for most apps, and if you want to go the JS route, Styled Components are a better option. Conversely if you want to go the classic CSS way, CSS Modules offer you something that Vanilla CSS can't - scoped selectors.

As I touched on at the start of the article the use of CSS in JS is quite a controversial subject at the moment, and the choice of Styled Components or CSS Modules really brings this debate down to it's essence. It's out of the scope of this article to discuss but if you want to know the argument against styling with JavaScript try this article: [Stop using CSS in JavaScript for web development](https://medium.com/@gajus/stop-using-css-in-javascript-for-web-development-fa32fb873dcc) (**click-bait alert**). Just remember there are 2 sides to every story, and we've only touched on some of the benefits of using Styled Components in this post.

# The Verdict

The aim of this article was to give a brief overview of the key different ways we can style React components. As such, I haven't dug deep into the details of each method and encourage you to do more research if any of these have interested you!

From now on in my own projects I am going to be using styled components, I just feel it offers more flexibility and encourages the componentization of my code in a way which keeps my codebase as neat and tidy as possible.

Let me know what you think about styling React components in the comments. Did I overlook anything? Do you have anything to add? Let us know! 😊
