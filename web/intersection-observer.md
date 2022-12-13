---
layout: default
title: Intersection Observer API
baseurl: ../../
---

# Intersection Observer API

-----

## Contents

- [Intersection Observer API](#intersection-observer-api)
  - [Contents](#contents)
  - [The Basics](#the-basics)

## The Basics

Sometimes you need to know when an element has been scrolled into 
the viewport &mdash; to lazy load an image once it has been scrolled to.

Some examples include:
- loading images or videos as the user scrolls down the page
- loading more content as the user scrolls (infinite scrolling app or website)
- firing adds once the user reaches a certain spot in the page

Historically, JavaScript didn't have a good way to handle these types of situations.

In the past you would watch for scroll events on the document and check if 
an element has entered the viewport using `element.getBoundingClientRect()`:

```javascript
const imageList = document.querySelectorAll('img[data-src]'); // The thing we will watch for

function checkVisibility(element) { // Returns true if the image is in view or false if it's not
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener('scroll', () => { // This is were the problem lies
  imageList.forEach(img => {
    if ( checkVisibility(image) ) {
    // Do something when the images is in view
    /* ... */
    }
  })
});
```
{: .code--wrong}

The problem with this, however, is the serious hit on performance it can cause.

Adding a scroll event listener to the document (`document.addEventListener('scroll', /* ... */)`) 
is generally a bad idea; your script has to watch the document 
for scrolls indefinitely since we don't know what the user will do. 
And if you are watching for multiple elements you can easily bog 
down the main thread your Javascript is running on making the whole 
browser slow.

Unless you plan to do something immediately — the first time the user
scrolls, and then destroy the event listener right away — you should 
avoid this method for implementing any kind of lazy loading.

The Intersection Observer API was created to solve these problems.

