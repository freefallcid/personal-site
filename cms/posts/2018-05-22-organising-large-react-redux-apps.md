---
pinned: true
title: Organising large React & Redux apps
path: /blog/organising-large-react-and-redux-apps
date: 2018-05-22T19:33:19.681Z
image: /assets/balance-macro-ocean-235990.jpg
---
Unlike frameworks like Ruby on Rails where _convention over configuration_ dictates exactly how things should be done, structuring React apps can be hard. There is no "right" way of doing things, so the decision falls squarely on the developers shoulders. Having a well organised and well structured app makes your job easier: adding new features is easier, finding bugs is easier, and bringing new team members up to speed with the app is easier. So what makes a well organised app?

## What makes a well organised app?

Don't worry, I will get into specifics about the app structure I have settled on, but first I'd like to talk about what I think makes an app organised.

#### Files grouped by feature not by file type

When I first started making apps with React & Redux I would have all of my reducers in one directory, all of my actions in another directory, and then all of my components in yet another directory. To add even something basic to the app I was having to touch several different files in several different locations. As the app grows so does the cognitive load, and you begin asking yourself questions like _where does the code that does this live?_

A well organised app should make the developers life easier. In React & Redux apps this means that to add a feature you shouldn't have to jump to different files scattered all over your app just to add a simple feature or make a basic change. Instead of having separate directories for your different file types they should be grouped by functionality.

#### Easy to understand and refactor

After I realised that grouping by file type was a bad idea I pivoted too far to the other extreme. I started grouping exclusively by feature, resulting in a heavily nested component and reducer file structure.

Pretty soon I realised that this was also a bad idea, not all state in an app is directly linked to components and the app quickly became a difficult to understand mess. Refactoring became a dangerous game, I realised that if I needed to use a slice of state or a component somewhere that I hadn't anticipated, massive rewrites were required.

There is a middle way between these two extremes. We can move the state and components that are global away from the state and components that are closely tied to the structure of the app. Not only does this make it easy to refactor, it reduces the cognitive load for everyone involved.

#### The structure should be descriptive

Finally, a well organised app should make sense after a quick glance at the file structure. In a front end app I believe that the file structure should give you clues about the routing structure of the app, the state structure of the app, and even the data you will be fetching from the backend. The more of the app you can understand without digging into the specifics of the code the better.

## A solution

It's important to understand that there is no "one size fits all" approach to architecting a React & Redux app. What works for me may not work for you. The most important thing is that you have some rules to guide you as you build up the application and that everyone on the team is on the same page about those rules.

Saying that however, here is what I have found to work well. As is standard in JavaScript apps my source code lives in the `src` directory at the root of my project. My `src` folder looks like this:

![the src directory](/assets/react-app-structure-src.png)

#### The `assets` and `config` directories

The `assets` and `config` directories are pretty straightforward.

`assets` is for assets such as images, icons, and any stylesheets your app uses, `config` is where you should put any global or environment specific configuration options.

#### The `components` directory

`components` is a folder for any global components that can be imported from anywhere in the app, such as buttons, forms or notifications. These are separate (as we will see soon) from route-specific components.

![the components directory](/assets/react-app-structure-components.png)

Components may have an associated container which connects it to any Redux state it depends on. If this is the case then the container should be stored right along side it in it's own directory.

For the sake of consistency this necessitates the need to put every component inside a folder of it's own, even if it doesn't have a container. You may be tempted to name the components `index.js` to make the imports neater - I would resist this temptation. Not only is the import then less explicit, but you end up with hundreds of files with the same name, making things confusing.

#### The `core` directory

The `core` directory is where all the core logic for the app lives. This means reducers and action creators for state that needs to be accessed throughout the entire app.

It loosely maps over the resources available in the backend API. For example, looking at the image below `comments`, `follows`, `invites` etc are all resources available in the backend of my app.

![the core directory](/assets/react-app-structure-core.png)

Each resource will have it's own `api` file, containing functions to interact with that resource via the API.

Not every folder in `core` is a backend resource though. `core` is also for any state that may need to be accessed anywhere. You can see above that the `modal` folder has no `api` file. This is because modal is not a backend resource, but a slice of state controlling which modal is currently open.

In contrast, the `invites` folder contains only an `api` file. This shows that the invites resource does not have any state associated with the Redux store.

These are good examples of a descriptive folder structure, a lot can be deduced about the app purely from the files.

#### The `scenes` directory

While the `core` directory is for state that exists outside the routing structure of the app, the `scenes` directory is for state and components directly tied to the routes.

Let's see what that looks like.

![the scenes directory](/assets/react-app-structure-scenes.png)

What I've called a "scene" is essentially a route handler. I've gone with the term _scene_ rather than _view_ because you could have multiple scenes in view at any one time.

As we can see from the image above scenes can be nested. We can tell a lot about the structure of the app simply by looking at the structure of this directory, another example of how this folder structure is very descriptive.

Taking a look at the `dashboard` scene, we can see that each scene can have its own reducer along with other Redux related files. These files are for state that is **exclusively** used in the `dashboard` scene, or any of it's child scenes. If the `auth` scene required access to this state for example, it should be moved into `core`.

A scene can also have it's own `components` folder. Again, this is for components **exclusively** used in this scene, or any of it's child scenes. While scenes should be nested to reflect the routes of your app, you should avoid nesting components within components. This leads to a lot of cognitive complexity.

#### The `services` directory

Any logic that doesn't fit anywhere else is abstracted into a `service`. For example I have a websocket service which handles websocket connections and messages. Another service I have is a utility service, which is where I put all of my utility functions.

## In practice

#### Here's an example

Have a look at my [Toodu Web](https://github.com/bhnywl/toodu-web) repository which uses these techniques.

#### Want to get started with this yourself?

I've created a fork of [create-react-app](https://github.com/facebook/create-react-app) which you can find [here](https://github.com/bhnywl/create-react-app).

This fork will scaffold out all the boilerplate you need to get started building apps like this without any hassle.

## Let me know what you think

I don't think any structure can be perfect, there are a lot of compromises that need to be made. If you have any improvements or if you like to do things differently let me know in the comments.
