---
pinned: false
title: Comments for your static blog with Staticman
path: /blog/comments-for-your-static-blog-with-staticman
date: 2018-05-17T17:22:13.855Z
image: /assets/mic-mic-stand-microphone-64057.jpg
---
If you've made a blog using a static site generator like Hugo, Jekyll or Gatsby then you already know all the great things going static can do for you. Static sites are blazing fast, easy to develop, and have plenty of cheap hosting options. You've probably also encountered the biggest con: it can be difficult to add dynamic functionality.

One of the most common pieces of dynamic functionality you're going to need for a blog is comments. The typical way for developers to add a comment section to their static blog is to integrate with a 3rd party service such as [Disqus](https://disqus.com/), or a similar open source solution like [Commento](https://github.com/adtac/commento).

These work fine, but you have to include some external JavaScript and then pull in the comments from an API. Didn't we use a static site generator in the first place so that all our content can just be served as plain HTML? To use an open source solution you'd have to install it on a server which you'd then need to maintain, this sounds like a lot of work! Didn't we choose to go static to keep hosting simple?

In an ideal world our comments would be stored right in our Github repo with the rest of our static content, but how do we get them there? This is where [Staticman](https://staticman.net/) comes in. All you need to do is give Staticman access to your Github repo, create a comment form on your site, and then post the result to Staticman's API. Staticman will then either push the comment into your git repository, or create a pull request pending your approval of the comment.

Paired with a host like [Netlify](https://www.netlify.com/) this is especially powerful as you can set up auto-deploys when new commits are made. This way all you have to do is sit back and let the comments roll in!

One of the big advantages of this method is that you own all the comments, they aren't stored away in some third party's database. Even if Staticman ever disappears you still have your comments.

## How to set it up

#### Give Staticman access to you repo

Want to set this up on your site? First of all you should head over to your Github repo and grant Staticman access to your static site repository. You can do this by going to the repository **settings** page and adding the user `staticmanapp` as a collaborator.

![Adding staticmanapp as a collaborator](/assets/staticman-collaborator.png)

Next navigate to:

```
https://api.staticman.net/v2/connect/{your GitHub username}/{your repository name}
```

This will prompt Staticman to accept your invite. You should see an "OK!" message, which means Staticman now has access to your repo, OK!

#### Create the `staticman.yml` configuraion file

The next step is to create the Staticman configuration file to tell Staticman what to do when your form is submitted. Create `staticman.yml` in the root of your project. Take a look at the docs to see the [available config options](https://staticman.net/docs/configuration) and also have a look at the [sample config file](https://github.com/eduardoboucas/staticman/blob/master/staticman.sample.yml) to learn how to set this up. If it helps, here is [the config file for my site](https://github.com/bhnywl/personal-site/blob/master/staticman.yml), which I've configured to create comments as markdown files in my `cms/comments` directory.

#### Hook up your comment form and call the API

Now you just need to create your new comment form and send the comment to the API. You're going to want to post the fields you specified in your config file to the following url:

```
https://api.staticman.net/v2/entry/{GITHUB USERNAME}/{GITHUB REPOSITORY}/{BRANCH}/{PROPERTY}
```

In the url above the `PROPERTY` field is the name of the resource you named in your config file, so for me it is `comments`. You should make a `POST` request to this url, and your fields should be in the request body under a `fields` key, the request should look something like this:

```js
request.post(yourStaticmanUrl, {
  options: {},
  fields: {
    name: "name",
    path: "path",
    email: "email",
    message: "message"
  }
});
```

The options fields is for any additional options you want to send - check the documentation. If you'd rather not use ajax you can just use a simple form that will look something like this:

```html
<form method="POST" action="{yourStaticmanUrl}">
  <input name="options[redirect]" type="hidden" value="https://my-site.com">
  <input name="fields[path]" type="hidden" value="{path}">
  <input name="fields[name]" type="text" />
  <input name="fields[email]" type="email" />
  <textarea name="fields[message]"></textarea>

  <button type="submit">Post comment!</button>
</form>
```

The `options[redirect]` field is an optional field, Staticman will redirect your users to the value here after the form is submitted.

#### And that's it!

Now when the form is submitted Staticman will automatically push new comments to your repository. If you set the `moderation` option to `true` in your config then it will instead create pull requests which you can then approve and merge, or close and delete.

## Why not try it out?

I've got Staticman running for my comments below, so why not try it out and tell me what you think?

I'd also like to say a big thank you to [Eduardo Bouças](https://github.com/eduardoboucas) for making such a great tool!
