---
pinned: false
title: 'Beginner Node.js tutorial #3'
path: /blog/beginner-node-js-tutorial-3
date: 2018-10-16T08:14:28.774Z
image: /assets/clement-h-544786-unsplash.jpg
---
# Beginner Node.js tutorial #3

Welcome to the third, penultimate installment of this beginner Node.js tutorial.

* [If you want to start from the beginning click here for part 1](https://www.bhnywl.com/blog/beginner-node-js-tutorial-part-1)
* [If you missed part 2, you'll find it here](https://www.bhnywl.com/blog/beginner-node-js-tutorial-part-1)

In the last article, we got up and running with Express, a Node.js HTTP framework. We built a simple API and started making `get` requests to retrieve data, we also learned how query string parameters can be used to filter the data. This article is going to focus on making `post` requests, this means that instead of getting data out of the API, we are going to be saving new data which we can then retrieve at a later time. Let's get started!

### What we have so far

We finished the end of the last tutorial with an `index.js` file that looked like this:

```js
const http = require("http");
const express = require("express");

const app = express();

const data = [
  { name: 'cow', pattern: 'patches' },
  { name: 'cheetah', pattern: 'spots' },
  { name: 'zebra', pattern: 'stripes' }
];

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

const server = http.createServer(app);

server.listen(3000);

console.log('Listening at http://localhost:3000');
```

If the code above seems confusing to you, take another look at [part 2](https://www.bhnywl.com/blog/beginner-node-js-tutorial-part-1) to refresh your memory.

Before we get started building our `post` endpoint, you should start your node server by running the usual command:

```
$ npm run start
```

### Getting set up to test Post endpoints

We are eventually going to set up a `post` endpoint for adding new animals to the array, but to get started let's implement a quick & easy `post` endpoint so that you can see what they look like and how we can run them. Add the following below your existing Express request handler:

```js
app.post('/animals', (req, res) => {
    res.json({ success: 'Successful post request' });
});
```

Here we have created a very simple `post` endpoint at `/animals`. As you can see, setting up a post endpoint is exactly the same as setting up a `get` endpoint! That's the good news, the bad news is that actually hitting this endpoint to test that it works is a bit more tricky.

Testing our `get` requests was easy because browsers make a `get` request when you navigate to a URL, so all we had to do to test those was open the endpoint URL in our web browser. If you open `http://localhost:3000/animals` in your browser now, you will still see the animals being returned from our old endpoint, as that is the route that we've set up to handle `get` requests... So how can we run our `post` request code?

Usually, `post` requests will be made by programs. For example, a web application may make a post request to `/comments` when a user creates a new comment in an online forum. To test `post` endpoints without having to write the requests out by hand, I like to use a tool called *Postman*.

Head over to [the Postman website](https://www.getpostman.com/apps/), signup for a free account, and download the Postman app for your operating system. Once the app is installed you'll want to create a new 'request'. Take a look at the screenshot below to see how this can be achieved:

![a screenshot of the postman UI](/assets/node-postman-post-success.png)

Set up a `post` request to `http://localhost:3000/amimals` as demonstrated above, then click **send**. If all has gone well then you should be returned our JSON string in the response body 🎉

```json
{
    "success": "Successful post request"
}
```

If you need help using Postman, check out the [documentation](https://learning.getpostman.com).

### Express Middleware

Before we continue there is still one more concept that you need to understand in Express: *middleware*. The term sounds scary but it's really very simple. Middlewares in Express are just functions that our request and response objects are run through before reaching our endpoints. By doing this, we can add additional information to these objects, which we can then make use of in our request handlers.

Let's look at a simple example:

```js
app.use((req, res, next) => {
    req.myProperty = 'Say hello from middleware!';
    next();
});

app.post('/animals', (req, res) => {
    res.json({ success: req.myProperty });
});
```

Take a look at the code example above. The method we use to add middleware is `app.use`, which takes one argument: a middleware function that looks very similar to the request handler functions that we have been adding up to now. One thing that you will notice, is the additional third argument - `next`. In Express all middleware are run in the order that they are declared, and when `next` is called, the next function in the chain begins its work. The next function in the chain could be another middleware or a request handler that matches the request URL path.

In our middleware function, we have added a new property, `myProperty`, on to the `req` object. We've then called the `next` function, which causes Express to move on to the next function in the chain - in our case, this is our `post` request handler. In this request handler, we can then access the property on the `req` - it is, in fact, the same `req`, passed along by each function in the chain!

Re-run the `post` request to the `/animals` endpoint from Postman now, and you will see that the following JSON is  returned: 

```json
{
    "success": "Say hello from middleware!"
}
```

Good job! That's middleware in action 🎉

You might be wondering how this is useful. Well, one of the most common use cases for Express middleware is adding the currently logged in user to the `req` object, so that you can access that user object in any subsequent request handlers - pretty handy. For now, however, we need it so that we can parse data from the request body, and create a new animal from that data! I'll show you what I mean.

### Creating a new animal

Now that we know how to test our `post` endpoints and we understand middleware, we can finally implement the functionality for saving new animals.

We can send data to our API in the body of our requests. Say we want to create a `leopard`, we could `post` the following request body to our `/animals` endpoint:

```json
{
    "name": "leopard",
    "pattern": "spots"
}
```

Our problem is that there's no way for us to access this JSON data from the request in Express! We will have to add some middleware that will attach the body data to our `req` object. Luckily, there is a package we can install that will do this for us:

```
$ npm install body-parser --save
```

Once the `body-parser` package is installed ammend the top of your `index.js` like so:

```js
const http = require("http");
const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
```

We've imported the newly installed `body-parser` package, which contains a number of middleware functions for us to make use of. The one we want is `bodyParser.json()` - passing this in as a middleware to `app.use` will parse our request JSON, and attach the data to `req.body`. If you're interested, you can find the `body-parser` documentation [here](https://github.com/expressjs/body-parser#readme).

Lets see how this is going to look in practice - here is our entire `index.js` with our completed `post` handler:

```js
const http = require("http");
const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

const data = [
  { name: 'cow', pattern: 'patches' },
  { name: 'cheetah', pattern: 'spots' },
  { name: 'zebra', pattern: 'stripes' }
];

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

app.post('/animals', (req, res, next) => {
  const newAnimal ={
    name: req.body.name,
    pattern: req.body.pattern
  }
  data.push(newAnimal);
  res.json(newAnimal);
});

const server = http.createServer(app);

server.listen(3000);

console.log('Listening at http://localhost:3000');
```

Now that we have access to `req.body` in our `post` handler we can use this data to create a new animal and `push` it into our data array, we then return that new animal as JSON for the response.

Let's jump into Postman and add a leopard to our animals array! Set up your request like in the screenshot below and then hit send to fire the request.

![a screenshot of the postman UI](/assets/node-postman-post-animal.png)

This time, as well as setting the type of request to "post" and the url to `http://localhost:3000/animals`, we've also added some JSON into the request body. If everything is set up correctly you should receive your `leopard` object back from the API after pressing "Send". To check that the animal was added to your array correctly hop over to your browser and navigate to `http://localhost:3000/animals` again. If you can see the animal you added in the JSON returned then you've done it, good job! 🎉🎉🎉

Take a few moments to play around with Postman and the code, add a few more animals and make sure you understand why everything works (and as always, if you have any questions reach out to me either in the comments or [on Twitter](https://twitter.com/bhnywl)).

### The problem with our solution

Have you spotted the problem yet? Restart your server and you'll see that all those animals you've added have disappeared... This is because we've been storing them in the memory of the application, and as soon as the app restarts, all of that memory is cleared away!

This is no good, we want our animals to persist forever, and for that, we are going to need a database.

### Part 4 coming soon!

In the next part, we will learn how to connect our API to a MongoDB database so that we can persist our data. We'll also introduce a popular library called `mongoose`, which is going to help us interact with our database.

Let me know if you're enjoying the series, and get in touch if you need any help - see you next time!


