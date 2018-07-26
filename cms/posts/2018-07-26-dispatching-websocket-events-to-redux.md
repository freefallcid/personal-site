---
pinned: false
title: Dispatching WebSocket events to Redux
path: /blog/dispatching-websocket-events-to-redux
date: 2018-07-26T12:01:02.808Z
image: /assets/aeroplane-aircraft-airplane-929606.jpg
---
If some part of your app receives WebSocket messages and you are using Redux to manage your state, you're going to need a modular and reusable way to dispatch those WebSocket messages to your Redux store.

For example, perhaps you are creating an instant messaging app. You could be receiving WebSocket events when a new message is received, when a message is edited, or when a new user joins the chat. In this example your Redux state would contain an array containing all the online users as well as a list of all the messages.

The first solution you are going to come up with to solve how to dispatch these events will probably look something like this:

```js
websocket.addEventListener("message", message => {
  const data = JSON.parse(message.data);
  switch (data.event) {
    case "NewMessage":
      store.dispatch({ type: NEW_MESSAGE, data });
      break;
    case "MessageEdited":
      store.dispatch({ type: MESSAGE_EDITED, data });
      break;
    case "UserJoined":
      store.dispatch({ type: USER_JOINED, data });
      break;
    case "UserLeft":
      store.dispatch({ type: USER_LEFT, data });
      break;
  }
});
```

This works well when we only have a few WebSocket events, but as we know, the first solution we come up with is rarely the best. Imagine a situation where you now have hundreds of different WebSocket events, do we really want to add a switch case for every single one in this single function? Also, we know that our Redux reducers should be pure functions. If we need some of these events to have side effects or call any different functions then very quickly this code is going to get messy and difficult to maintain.

## What's the solution?

The solution to this problem that I've come up with is something I've called _Listeners_. First, we're going to need a simple utility class:

```js
class WebSocketListener {
  constructor() {
    this.listeners = {};
  }

  add(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  trigger(event, data) {
    if (this.listeners[event]) {
      const callbacks = this.listeners[event].slice(0);
      for (let i = 0; i < callbacks.length; i++) {
        if (typeof callbacks[i] === "function") {
          callbacks[i](data);
        }
      }
    }
  }
}
```

`WebSocketListener` is a simple class with two methods. The `add()` method adds an event listener, taking an event name and a callback. The `trigger()` method takes an event name and some data, then triggers all the callbacks that were added for that event with the passed in data.

It's a simple class, but allows us to massively simplify our WebSocket `onmessage` function:

```js
websocket.addEventListener("message", message => {
  const data = JSON.parse(message.data);
  webSocketListener.trigger(data.event, data);
});
```

All we need to do now is add the listeners themselves. I like to do this is a seperate file for each reducer.

```js
// messageListeners.js

webSocketListener.add("NewMessage", data => {
  store.dispatch({ type: NEW_MESSAGE, data });
});

webSocketListener.add("MessageEdited", data => {
  store.dispatch({ type: MESSAGE_EDITED, data });
});
```

```js
// userListeners.js

webSocketListener.add("UserJoined", data => {
  store.dispatch({ type: USER_JOINED, data });
});

webSocketListener.add("UserLeft", data => {
  store.dispatch({ type: USER_LEFT, data });
});
```

You can see how much more modular this has made our code, and how easy it would be to add any extra side-effects in each `add` callback without overcomplicating things.

If you like this way of doing things, I've created a library called [Eventfully](https://github.com/bhnywl/eventfully) which does everything the `WebSocketListener` class does and more. It should help you get up and running creating WebSocket listeners, as well as giving you the ability to remove listeners and events without having to write any of that extra stuff yourself 🙂

Thanks for reading - if you have any different ways of handling WebSocket events in Redux that you think are great then let us all know in the comments!
