---
pinned: false
title: 'Beginner Node.js tutorial #4'
path: /blog/beginner-node-js-tutorial-4
date: 2018-10-31T23:36:55+00:00
image: >-
  /assets/blake-connally-373084-unsplash-6ee796da0704cbaa5e01c636954daa25-d14e0.jpg
---
Welcome to the final part of this beginner Node.js tutorial - good job getting this far!

- In [part 1](https://bhnywl.com/blog/beginner-node-js-tutorial-1) we got set up with Node and learnt how to run simple Node scripts.
- In [part 2](https://bhnywl.com/blog/beginner-node-js-tutorial-2) we learnt how to use Express to get and filter data from our API.
- In [part 3](https://bhnywl.com/blog/beginner-node-js-tutorial-3) we started to create `post` endpoints, and learned about Express middleware.

The last piece of the puzzle is persisting our data in a database. In this tutorial we are going to use a combination of [MongoDB](https://www.mongodb.com/), [Mongoose](https://github.com/Automattic/mongoose) and [mlab](https://mlab.com/) to achieve this. Let's get started!

### Signing up for mlab

How to install and set up a Mongo database is out of the scope of this tutorial, so we are going to use a great free service called [mlab](https://mlab.com/) to handle all of this for us. Head over to their website and create an account.

Once you've signed up you should create a new database there, choose a "Sandbox" database as this is their free option, and is perfect for hobby and learning projects like ours. Once that has been created add a user to the database, give the user whatever username and password you like - just make sure you remember them! This is the username and password we will use to access the database from our Node API.

Once that is done we are all set up with mlab, our database is ready to go!

### Where were we?

Before we go any further let's recap where we got to at the end of the last tutorial. This is our complete `index.js` file in it's current form:

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

We have 2 endpoints: a `get` to `/animals` which fetches all of our animals, and a `post` to `/animals` for adding a new animal. currently the animals are stored in the `data` array. The aim of this tutorial is to get rid of the `data` array and instead store the animals in our new database.

### Installing Mongoose

In order to interact with the Mongo database we have created we are going to use an npm package called `mongoose`. From your project directory run the following command in your terminal.

```
$ npm install mongoose --save
```

We should know by now what this command will do, it installs the `mongoose` package from npm and adds it to our dependencies in `package.json`.

### Connecting to the database from our app

Mongoose makes it easy to connect to our database, but first, we need our database URI, which we can get from mlab. In you mlab dashboard for the database you created earlier you should be able to see a MongoDB URI, it will look something like this:

```
mongodb://<dbuser>:<dbpassword>@ds145923.mlab.com:45923/node-tut
```

This is mine, so yours will be different. In order to connect using this URI we have to pass it to mongoose, making sure to swap `<dbuser>` and `<dbpassword>` with the username and password of the mlab database user we created earlier.

Now, this next part is **very important** : we need to keep our database password secret or else anyone can access our database. This means we can't just paste this URI into `index.js`, because if we ever put this code up on GitHub anyone could access all of our data, this would be _very bad_. To avoid this situation we are going to create a new file `secrets.js`:

```js
module.exports = {
  database_uri: 'mongodb://myUserName:MyPassword@ds145923.mlab.com:45923/node-tut'
}
```

We haven't really talked about it yet, but in Node you can organise your code into separate files and "export" any functions or objects that you need to use elsewhere in you app.

We are also going to create a `.gitignore` file to keep our secrets from getting onto GitHub:

```
# .gitgnore

secrets.js
```

With this sorted we can now add the following code to the top of our `index.js` to set up our database connection:

```js
const mongoose = require('mongoose');
const secrets = require('./secrets');

mongoose.connect(secrets.database_uri);
```

### Creating a database schema for our animals

The next step is to create an animal schema and model. When using Mongoose we can define schemas which let mongoose know what kind of data we want to store in the database, and we can use these schemas to create models. Our Animal model is what we will use to pull animals out of the database and to save new animals into the database. This is what creating a schema and model looks like in Mongoose:

```js
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  name: String,
  pattern: String
});

const Animal = mongoose.model('Animal', AnimalSchema);
```

Add the above code to your `index.js` file before you create your Express app but after you connect to your database. This code defines a simple animal schema. Animals only have 2 fields, a name and a pattern. Both are strings.

We then pass our schema to `mongoose.model`, which creates our `Animal` model. Let's see how we can use this new model in our API endpoints!

### Using the model to get the animals

Our current `get` endpoint looks like this:

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

Let's make this endpoint use our new `Animal` model and pull in animals from the database rather than from the `data` array:

```js
app.get('/animals', (req, res) => {
  if (req.query.pattern) {
    Animal.find({ pattern: req.query.pattern }, (err, data) => {
      res.json({ animals: data });
    });
  } else {
    Animal.find({}, (err, data) => {
      res.json({ animals: data });
    });
  }
});
```

As you can see, the method on our animal model that we want to use to find animals is `Animal.find`. This method takes 2 arguments: an object to filter results by (passing in an empty object will return all animals), and a callback function that will be called once the data has been fetched or if it errors.

The callback function also accepts 2 arguments, an error (if one exists), and the data that was found in the database (if there was no error). In our example above we haven't handled the error, let's fix that:

```js
Animal.find({}, (err, data) => {
  if (err) {
    return res.json({ error: 'There was an error getting the animals' });
  }
  res.json({ animals: data });
});
```

We can handle errors like shown above, we check if the error exists, and if it does, we return some different JSON.

Start up your server with `npm start` and go to `http://localhost:3000/animals` in your browser. If you've done everything correctly so far then you should be returned an empty array. We haven't got any animals saved to our database yet! Let's fix that by hooking up our `post` request to the database.

### Saving new animals to the database

Our current `post` endpoint looks like this:

```js
app.post('/animals', (req, res, next) => {
  const newAnimal ={
    name: req.body.name,
    pattern: req.body.pattern
  }
  data.push(newAnimal);
  res.json(newAnimal);
});
```

Instead of pushing animals into the data array let's set up this endpoint to save our new animals to the database:

```js
app.post('/animals', (req, res, next) => {
  const newAnimal = new Animal({
    pattern: req.body.pattern,
    name: req.body.name
  });
  newAnimal.save((err, animal) => {
    if (err) {
      return res.json({ error: 'There was an error saving the animal' });
    }
    res.json(animal);
  });
});
```

This time instead of creating a plain JavaScript object to represent our new animal, we create a new instance of our animal model by calling `new Animal`. We then call the `newAnimal.save` method. The `save` method accepts a callback which takes 2 arguments. Again, the first argument is the error, and the second argument is the the animal if it was successfully saved.

That's it for our `post` request! All that's left to do now is delete that old `data` array - we don't need it anymore.

### Trying out our new endpoints

Remember how we sent `post` requests to our server with Postman in the last article? With your server running open Postman and send the same `post` request as before to your API:

[![a screenshot of the postman UI](https://www.bhnywl.com/static/node-postman-post-animal-1569134d759f0962ef1744288b127abb-55803.png)](https://www.bhnywl.com/static/node-postman-post-animal-1569134d759f0962ef1744288b127abb-f84cb.png)

If the request is successful you should be returned some JSON representing the animal we just created:

```json
{
    "_id": "5bd9a34dfa8bba4b8e72c41a",
    "pattern": "spots",
    "name": "leopard",
    "__v": 0
}
```

Mongo will automatically add on some fields like an `_id` to all of our records for us. These IDs are particularly useful when you want to find a specific record amongst many. This is something I may touch on in a future tutorial series.

Now that we have created an animal go back to your browser and visit `http://localhost:3000/animals`, you should see your newly created animal in the returned JSON. Awesome! You are now saving and getting all your data from your Mongo database 🎉

### The final `index.js` file

```js
const http = require("http");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const secrets = require('./secrets');

mongoose.connect(secrets.database_uri);

const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  name: String,
  pattern: String
});

const Animal = mongoose.model('Animal', AnimalSchema);

const app = express();

app.use(bodyParser.json());

app.get('/animals', (req, res) => {
  if (req.query.pattern) {
    Animal.find({ pattern: req.query.pattern }, (err, data) => {
      if (err) {
        return res.json({ error: "There was an error finding the animals" })
      }
      res.json({ animals: data });
    });
  } else {
    Animal.find({}, (err, data) => {
      if (err) {
        return res.json({ error: "There was an error finding the animals" })
      }
      res.json({ animals: data });
    });
  }
});

app.post('/animals', (req, res, next) => {
  const newAnimal = new Animal({
    pattern: req.body.pattern,
    name: req.body.name
  });
  newAnimal.save((err, animal) => {
    if (err) {
      return res.json({ error: "There was an error saving the animal" })
    }
    res.json(animal);
  });
});

const server = http.createServer(app);

server.listen(3000);

console.log('Listening at http://localhost:3000');
```

### Next steps

This is the final part of this beginner Node.js series. You hopefully now have the knowledge you need to be able to research some more advanced Node topics by yourself, without being held back by not understanding the basics.

If you would be interested in reading an intermediate Node series written by me, let me know. As always, if you have an questions or problems that you need help with regarding this series, feel free to reach out - you can find me on Twitter and can keep up with all the latest posts from my blog by [following me](https://twitter.com/bhnywl).

Until next time!
