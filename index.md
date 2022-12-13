---
layout: default
title: Home
baseurl: ''
---


# JavaScript

> **JavaScript (JS)** is a lightweight, interpreted, or ***just-in-time 
> compiled*** programming language with ***first-class functions***. 
> 
> JavaScript is a 
> ***prototype-based***, multi-paradigm, ***single-threaded***, dynamic 
> language &hellip;
> {: .mb-0}
> &mdash; <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
> {: .text-end}
{: .blockquote .blockquote--border .mx-5 .px-4}


What does this mean?
{: .lead}

- **just-in-time (JIT) compiled**, also known as run-time compilation, means that the code is compiled just prior to  execution.
- **first-class functions** means that a language is capable of using functions like any other variable; they can be assigned, passed, returned, even placed inside an array or object.
- **prototype-based** programing languages are those where *behavior reuse* (or inheritance) is achieved through the reuse of existing objects &mdash; objects which serve as prototypes.
- **single-threaded** means that JavaScrip runs on the browsers' main thread. This also means that performance matters.

JavaScript by itself doesn't do anything; it must be run with a JavaScript engine.
V8 is the most common JavaScript engine and is developed by Google.

JavaScript also needs a place to be executed, which usually includes certain global variables and methods (for logging and other common tasks.) This is known as a ***runtime environment.*** Internet browsers use a JavaScript engine (most commonly V8) to compile and execute JavaScript. Browsers have a global `window` variable with properties like `console`, `alert`, `location`, and many more.

The browser used to be the only JavaScript runtime environment &mdash; until the Node was created.

<br>

## Node.js

***Node.js*** is an open-source, cross-platform JavaScript runtime environment built on the V8 JavaScript Engine.
It executes JavaScript outside a web browser.



> If you know JavaScript then you know Node.js
> {: .display-4}
> 
> &mdash; Me
> {: .text-end }
{: .blockquote .blockquote--border .mx-5 .px-4}

Yes, Node.js is just JavaScript with some extra features for working with servers. Instead of browser methods, Node has methods for working with a server's file storage, network, databases and more.
If you already know javascript then Node.js should be a piece of cake.

<br>

## JavaScript vs. Web APIs

JavaScript wouldn't do a web developer any good if they couldn't interact with a webpage somehow.
Purely JavaScript code is not capable of interacting with a webpage; there are no browser methods built into it.

**This is where Web APIs come in.**

A common mistake of newcomers to JavaScript is to confuse the JavaScript language itself with Web APIs; **they are not the same thing**:
```javascript
document.getElementById('myId').innerHTML = `<h1>Hello!</h1>`;
```

- `document`, `getElementById()`, and `innerHTML` are not part of the JavaScript Language!
- `getElementById()` is a method of the `Document` interface which is a Web API and `inerHTML` is a property of the `Element` class.

