---
pinned: false
title: 'Beginner Node.js tutorial #2'
path: /blog/beginner-node-js-tutorial-part-2
date: 2018-10-16T08:14:28.774Z
image: /assets/steve-halama-698056-unsplash.jpg
---
# Beginner Node.js tutorial #2

This is part 2 in a series of blog posts designed to teach Node novices how to build a JSON API. In part 1 we set up our environment and learned some Node basics, including setting up a simple HTTP server.

[Click here to go back and read part 1 if you haven't already](https://www.bhnywl.com/blog/beginner-node-js-tutorial-part-1).

In this part of the tutorial, we will start to look at [Express](https://github.com/expressjs/express), an HTTP framework for Node. Express is going to make building our API much easier than if we were to only use the barebones `http` package that we were introduced to in the last section. Express will help us to set up routing while maintaining great performance, as well as giving us access to an abundance of useful HTTP helpers.

If you followed along with the last tutorial then you should now have a project with a single `index.js` file containing the following code:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    success: true
  }));
});

server.listen(3000);

console.log('Listening at http://localhost:3000');
```

We are going to convert this code over to using Express. First, however, we need to install Express. Because unlike the `http` package, Express is not included with Node.

## Installing Express

If you have ever done any JavaScript programming on the front-end you may already be familiar with **npm**. *npm* stands for 'Node Package Manager', and it is what we use to manage and install the dependencies in our JavaScript projects. Luckily for us, *npm* was automatically installed when we installed Node. To initialise *npm* in our project open your terminal and run the following command (making sure you're in the project directory):

```
$ npm init
```

This will run the `init` script, which will ask you a few questions about your project. The defaults are fine, but you can fill in the information it asks for if you like - give your project a name, a description, and enter your name as the author. Once the script is complete you will have a new file in your project: `package.json`.

Most Node projects will have a `package.json` file. Ours is pretty bare at the moment because we haven't installed any dependencies. Let's fix that by installing Express. Run the following command in your terminal to install Express:

```
$ npm install express --save
```

*npm* will now install express. The `--save` flag instructs *npm* to save Express as a dependency to our `package.json` file. If you now look in this file you should see that Express has been added under `dependencies` 🎉

After installing a package you will also have a `node_modules` folder in your project. This is where all of the code for your installed packages live - you don't have to worry about it, and shouldn't change any of the code in here.

### Using Express!

Now that Express is installed we can convert the code in our `index.js` file to use the new package:

```js
const http = require("http");
const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.json({ success: true });
});

const server = http.createServer(app);

server.listen(3000);

console.log('Listening at http://localhost:3000');
```

Lets talk about exactly what's going on in this code. First of all, let's take a look at what hasn't changed. We are still importing `http`, we are still calling `http.createServer`, and we are still using `server.listen` to listen for requests on port 3000. That much is exactly the same before.

So what's changed? Well, instead of passing a request handler function into `http.createServer` like we did before, we are passing in an Express app. The app is created by calling `express()` and storing the result in a variable which we have called `app`. An Express app has a number of methods that can be used to define *routes* for the app. These methods are `get`, `post`, `put`, `patch` and `delete`, which correspond to the [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) of the same names.

We've only defined a single `get` route on our app. The first argument `get` takes is the path for the route, which in our example is `/` (the root of the app). The second argument is a request handler for the route, Express uses the same `req`/`res` convention for it's request handlers as `http`.

The `req` and `res` objects in Express expose different methods and properties than those in `http`, Express adds a lot to make things easier for us. Before we had to use `res.writeHead` to set the response status and content type, and then `res.end` and `JSON.stringify` to return a JSON string, but Express handles all of this for us in the handy `res.json` method. All you need to pass into `res.json` is a JavaScript object which Express will use to respond in JSON with the appropriate HTTP status for us - pretty neat!

Let's spin up our new Express app! Just like before you can run `node index.js` to run the script. Navigating to `http://localhost:3000` should return our JSON. Good job, you're running Express! 😊

### Adding more routes

Now that we've got Express set up it's easy to add more routes to our API. Underneath our existing route, add the following new route:

```js
app.get('/data', (req, res) => {
  res.json({ data: 'Here is your data!' });
});
```

This route is just like the one we've already set up - we're still listening for `get` requests, but this time at the `/data` endpoint. Stop your Node server by pressing `control + c` in your terminal, and then restart it again with `node index.js`. You should be able to head to `https://localhost:3000/data` to see your new API endpoint in action. It really is this easy to add new routes in Express, but it's annoying that we have to restart the server just to see our changes take effect...

### Restarting our server every time we make a change is a pain!

It's not a great developer experience having to restart the server by hand every time we want our changes to take effect. Luckily for us, there's a great package called `nodemon` that we can use to solve this. Let's install it:

```
$ npm install nodemon --save-dev
```

This time we have installed using the `--save-dev` flag. This will save `nodemon` to the `devDependencies` section of our `package.json` rather than `dependencies`. We have done this because we are only going to be using `nodemon` while developing to help us restart our server when changes are made. It's good practice to separate dependencies which are dev-only from those that will be part of the production app.

Once `nodemon` has installed we have to make a small addition to our `package.json` to be able to use it. Open up your `package.json` in your text editor - you should see a section called `scripts`. *npm* scripts provide a neat way for us to declare console commands that we are going to regularly use in the project, for things like starting the server or running tests. 

By default, there should already be a script here, a 'test' script which will print out that no tests have been specified and exit with an error. This test isn't very useful to us at the moment, so let's replace it with a 'start' script to start our server:

```json
"scripts": {
    "start": "nodemon index.js"
},
```

Instead of `node index.js` like we've been using up until now, we are now defining a start script which uses `nodemon`. You can run this *npm* script from your terminal with the following command:

```
$ npm run start
```

This command  should start the server like before, but now Nodemon will wait for changes to be saved and automatically restart itself every time you save your project 🎉 Try changing some of the JSON data that you are sending down as a response and then refreshing your browser to test this out.

### Filtering data with URL params

So far we've done a pretty good job of getting data from our API, but we've just been sending back strings of hardcoded data, let's explore some more advanced techniques for responding to requests. Update your `index.js` file by adding the data and route below:

```js
const data = [
  { name: 'cow', pattern: 'patches' },
  { name: 'cheetah', pattern: 'spots' },
  { name: 'leopard', pattern: 'spots' },
  { name: 'zebra', pattern: 'stripes' }
];

app.get('/animals', (req, res) => {
  res.json({ animals: data });
});
```

We have added a single route at `/animals` which returns an array of various animals and their patterns. Save these changes and then navigate to `http://localhost:3000/animals`. You should see the JSON array of animals is returned to the browser (try installing [this browser extension](https://chrome.google.com/webstore/detail/json-viewer-awesome/iemadiahhbebdklepanmkjenfdebfpfe) if you want the JSON to look pretty).

This is a good start, but what if we only want to see animals that have spots? We need a way of sending data *to* the API, and then we need to filter the data and only return what was requested. One way we can do this is by using by using URL query strings, let's set up our API to make a request to the URL `http://localhost:3000/animals?pattern=spots` do exactly this.

How do we access the URL query string in Express? It's really easy! You may remember from part 1 of this tutorial that the `req` argument that gets passed to request listeners has properties and methods relating to the *request*, and the `res` argument has properties and methods for dealing with what to send as the *response*. Well, the URL query string is part of the request, and we access it with `req.query`.

```js
app.get('/animals', (req, res) => {
  if (req.query.pattern) {
    const filteredData = data.filter(animal => {
      return animal.pattern === req.query.pattern
    });
    
    return res.json({ animals: filteredData });
  } else {
    res.json({ animals: data });
  }
});
```

In the revised request handler above we've started by first checking if the `pattern` query parameter exists. If it doesn't we return all of the data just like before. However, if the query parameter is present, we filter the data to only include animals that match the provided pattern.

If you haven't seen `filter` before, take a look at [the docs on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

Now, you should be able to navigate to `http://localhost:3000/animals?pattern=spots` and only see animals with spots returned 🎉

Try also changing the pattern parameter in the query string to other values and see what's returned. As a solo exercise, try setting up the endpoint so that you can also filter by the animals name.

### Next steps

You are starting to build up some functional and fundamental building blocks for building Node APIs with Express. I'd recommend taking a moment to solidify what you've learned so far by playing with your API and seeing what you can get it to do by passing in different query params and returning altered data.

### Part 3 coming soon

In the next part of this tutorial, we will add to our `get` request knowledge by implementing some `post` requests. These will allow us to post data to our API to create new records. Also, it's not much use saving new records if you have nowhere to persist them, so in part 4 we will learn how to connect to a MongoDB database to persist our data.

If you want to be updated when the next part of this series is released [follow me on Twitter](https://twitter.com/bhnywl), where I post all of my new blog posts. If you have any questions I'd love to help you, so get in touch either on Twitter or in the comments.

See you next time!

[Part 3 is out now!](https://bhnywl.com/blog/beginner-node-js-tutorial-part-3)
