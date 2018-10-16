---
pinned: true
title: 'Beginner Node.js tutorial #1'
path: /blog/beginner-node-js-tutorial-part-1
date: 2018-10-12T11:52:55.004Z
image: /assets/simon-abrams-286276-unsplash.jpg
---
Node.js and it's friends Express & MongoDB are some of the hottest web development tools at the moment, and you'd be doing your career a big favour by learning them. This tutorial is designed for someone who is familiar with front-end JavaScript but brand new to Node. We're going to walk step-by-step through creating a JSON API, using some common libraries that you will encounter in the Node ecosystem along the way.

This is the first part in a series of blog posts that will take you from a Node novice to building your own JSON API built with Express and backed by a MongoDB database. In part one we will familiarise ourselves with Node and create a simple HTTP server to serve JSON.

### Installing Node

If you already have Node installed then skip to the next section.

If you don't already have Node installed on your system you're going to want to get this done first! If you are running macOS or Linux I recommend doing this using _nvm_, which stands for Node Version Manager. This will make it easy to manage and install different versions of Node in the future.

#### Installing nvm on macOS with Homebrew

If you are on macOS and use Homebrew to install your packages you can install nvm using `brew` with the following terminal command:

```
$ brew install nvm
```

After that is installed you can run the following command to add a line to your `.bash_profile` which will start nvm whenever you open a new terminal window:

```
$ echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.bash_profile
```

#### Installing nvm on Linux or macOS without Homebrew

Run the following command from your terminal to install nvm:

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

#### Verifying the nvm installation & installing Node

To verify nvm was installed correctly run:

```
$ command -v nvm
```

this should return `nvm` which means nvm was installed successfully 🎉

You can now install the latest stable version of Node by running:

```
$ nvm install stable
```

Once that has completed verify that node is installed correctly by running:

```
$ node -v
```

If everything has worked it should output the Node version you have installed, and you are all set up and ready to start using Node.js 🎉

(If you want to learn more about how you can use nvm to manage your Node versions then read [the nvm documentation](https://github.com/creationix/nvm))

### Getting started: Node basics

Simply put Node.js is an open source server environment that allows JavaScript to be run on a server, rather than in the browser. Now that you have Node installed you can run the command `node` from your terminal to enter the Node command line. This is just like the browser developer tools console but for Node rather than the browser. Have a play around in the command line, try running some simple JS like `1 + 3` or `console.log('Hello, world)` and see what happens.

You should be able to see that Node.js is just like the normal JavaScript that you are used to in the browser - with a couple of differences. In the browser you are probably used to accessing objects and methods from the global `window` object. In Node `window`, and therefore `document` and other browser & DOM only objects, do not exist. Try accessing `window` or `document` in your Node command line and you'll see that they are not defined. The Node.js equivalent to the browser `window` is called `global`. Type `global` into your Node command line and you'll see some of the different properties that are defined in Node's global namespace.

You can press `control + c` twice to exit Node.

### Running Node scripts

Node wouldn't be very useful if we could only run it through the console, so lets create a JavaScript file and write a simple Node script. Navigate to where you like save your code projects, create a new folder, and inside of that folder create a file called `index.js`. I like to save my projects in my `Code` directory so for me I run the following commands to get this file structure set up:

```
$ cd ~/Code
$ mkdir node-tutorial
$ cd node-tutorial
$ touch index.js
```

open up your `node-tutorial` project in your favourite code editor and add the following simple script to `index.js`:

```js
const animals = [
    { name: 'cat',   sound: 'meow'   },
    { name: 'dog',   sound: 'bark'   },
    { name: 'mouse', sound: 'squeak' }
];

animals.forEach(animal => {
    console.log(`The ${ animal.name } goes ${ animal.sound }`);
});
```

This is obviously some very simple JS, but will do for the purpose of demonstrating how to execute a Node script. From your terminal (making sure you are in the project directory), run the following command:

```
$ node index.js
```

This will execute our Node script and you should see the following printed to your terminal:

```
The cat goes meow
The dog goes bark
The mouse goes squeak
```

Have a play around with the script, get a feel for the Node environment and try writing your own.

### Creating our first simple JSON API

Now that we know the basics of Node it's time to create our first simple JSON API. We're simply going to return the JSON `{ "success": true }` from a server endpoint. To do this we are going to need to use a package called `http`. The `http` package is included in Node so there's nothing we need to install. Delete the content of your `index.js` script and replace it with this:

```js
const http = require('http');

console.log(http);
```

This script imports the `http` package, assigns it to the `http` variable, then logs the result. Notice the `require(...)` syntax - this is how you import packages in Node. Run the script from your terminal with `node index.js` and you'll see that it logs a large object with many properties and methods that we can now access from our `http` variable. The only one we need for this example however is the `createServer` method.

Rewrite your script as below:

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

##### Understanding the new script

Let's quickly go over this new script so that you understand what it does.

To start, we've imported the `http` package just like before. Next, we've used the `createServer` method to create a new server. This method takes a function as an argument, and returns a HTTP server, which we've stored in the `server` variable.

The function passed to `createServer` has two arguments, `req` and `res`. This is something you will see a lot in Node - these variable names are short for 'request' and 'response'. `req` has properties and methods relating to the request (ie. data sent to the API), and `res` has methods for dealing with the response (ie. what to send back to the user).

We have not needed to access the request in the example, but we have written to the head of the response with a status of `200` and a `Content-Type` of `application/json` - indicating that we are going to return JSON. And then we have ended the response, sending a JSON string back.

We've then called `server.listen` and passed in a port of `3000`, which will start this server running at `localhost:3000` once we run the script.

To dive deeper into how this works, take a look at the [`http` documentation](https://nodejs.org/api/http.html).

##### Running the server

As before, we can run the script with `node index.js`. After running the script you should notice that, unlike before, the script doesn't immediately exit. This is because `server.listen` is an ongoing process, it will listen for all requests to `localhost:3000` and run our request listener function for each request. This script won't end until we either exit it, or it crashes.

With the script running navigate to `http://localhost:3000`. If all is working, you should see our JSON string rendered by the browser 🎉

### Onwards and upwards

In this first article of the series you've learnt the basics of Node and built a very simple JSON API using the `http` package. In practice, it's unlikely you would ever build an entire API like this - you will probably use a HTTP framework like Express. It's good to learn the basics though, and understand that Express is just using `http` under the hood.

In the next part of the series we will start looking at Express. We'll look at installing Express and will get our new Express API to respond to different endpoint URLs with different url parameters.

#### ~~Part 2 coming soon~~

~~If you want to get notified when the next article is out [follow me on Twitter](https://twitter.com/bhnywl), I post all of my new blog posts there. Let me know if you've enjoyed this post and are waiting for the next one either on Twitter or in the comments below.~~

[Part 2 is out now!](https://bhnywl.com/blog/beginner-node-js-tutorial-part-2)

Thanks for reading!
