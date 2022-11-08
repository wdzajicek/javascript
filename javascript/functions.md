---
layout: default
title: Functions
baseurl: ../../
---

# Functions

-----

## Contents

- [Functions](#functions)
  - [Contents](#contents)
  - [The Basics](#the-basics)
  - [Defining Functions](#defining-functions)
    - [Function Declarations](#function-declarations)
    - [Function Expressions](#function-expressions)
  - [Parameters](#parameters)
    - [Default values](#default-values)
  - [Calling Functions](#calling-functions)
  - [Hoisting](#hoisting)
  - [Local Variables](#local-variables)
  - [Outer Variables](#outer-variables)
  - [Returning a value](#returning-a-value)


## The Basics

Functions are a fundamental building-block of JavaScript.
{: .lead}

A function is a group of statements that perform a task or calculate a value.
They allow us to organize our code into logical groupings and make it reuseable.

```javascript
function name(param0, param1, /* … ,*/ paramN) {
  /* function body */
  statements
}
```

*Defining* a function doesn't *execute* it. Defining it gives it a name and specifies what the function should do.

See [Defining Functions](#defining-functions) for more information.

*Calling* a function is what executes it with the given parameters.

```javascript
function sum(a, b) {
  return a + b;
}
// This code does nothing by itself
// we need to call our function for it to work!
```

To call a function use the function name followed by parentheses which enclose a comma separated list of parameters to pass to the function.

```javascript
function sum(a, b) {
  return a + b;
}

console.log( sum(2, 2) ); // 4 is returned and then printed to the console!
// We can store the result in a variable
const three = sum(1, 2); // three = 3

console.log(three); // 3
console.log( sum(1, 1) ); // 2
console.log( sum(2, 3) ); // 5, we can call sum() as many times as we want!
```

See [Calling Functions](#calling-functions) for more information.

## Defining Functions

### Function Declarations

Functions may be created using a ***function declaration*** (also called a ***function definition***.)

```javascript
function name(param1, param2, /* … ,*/ paramN) {
  statements
}
```

A function declaration consists of the following:
- The `function` keyword followed by the name of the function.
- An (optional) comma separated list of parameters enclosed in parentheses.
- Curly braces that enclose the function body which is holds the function statements (or tasks the function caries out).

### Function Expressions

Another way to create functions is using a function expression:
```javascript
const sum = function(a, b) {
  return a + b;
}
```

The example above uses an anonymous function or a function without a name.
Function expressions can use either named or anonymous functions.

When debugging JavaScript, named functions make identification easier in the browser's developer tools.

```javascript
// Better for debugging purposes
const sum = function add(a, b) {
  return a + b;
}
```

## Parameters

Functions may optionally have ***parameters*** that allow us to pass arbitrary data to the function.

A ***parameter*** is a named variable passed into a function.

Parameters are used to import ***arguments*** into a function.

The difference between *parameters* and *arguments*:
- *parameters* are listed in a functions definition.
- *arguments* are the actual values passed to the function when its called.
- *arguments* are passed to a function, the values of which are assigned to its *parameters*.

### Default values

Calling a function that was defined with two parameters 
using only one argument is perfectly valid JavaScript:
```javascript
function helloUser(greeting, user) {
  console.log(`${greeting}, ${user}!`);
}

helloUser('Hello', 'Bob'); // Hello, Bob!
helloUser('Hi'); // Hi, undefined!
```

The above function can be made more flexible if we create a default value to assign to `user`, in case the second argument it missing.

Historically, this was accomplished by checking *if a parameters value is undefined* or using a logical or (`||`) operator:

```javascript
// if user is undefined set it to Guest
function helloUser(greeting, user) {
  if ( user === undefined ) {
    user = 'Guest';
  }

  console.log(`${greeting}, ${user}!`);
}

// this accomplishes the same thing
function helloUser(greeting, user) {
  user = user || 'Guest';

  console.log(`${greeting}, ${user}!`);
}
```

In modern JavaScript a default parameter can be defined inside a function declaration parenthesis using `=`:

```javascript
function helloUser(greeting, user = 'Guest') {
  console.log(`${greeting}, ${user}!`);
}

helloUser('Hello'); // Hello, Guest!
```

A default parameter may be a function too:

```javascript
function getDefaultUser() {
  /* ... */
  return defaultUser; // Whatever we return becomes user's value
}

function helloUser(greeting, user = getDefaultUser()) {
  /* ... */
}
```

## Calling Functions

As mentioned earlier, defining a function does not execute it.

Calling the function is what executes it, and allows us to specify arguments.

To call a function it must be *in scope*. The *scope* of a function is the function in which it was declared (or the entire script if declared at the top level.)

```javascript
function someFunction() {
  function internalFunction() {
    console.log('Internal function was called');
  }

  internalFunction();
}

someFunction(); // Internal function was called
internalFunction(); // ERROR! Uncaught ReferenceError: internalFunction is not defined
```

In the example above, `internalFunction()` throws an error because it is out of scope.
Since `internalFunction()` was defined inside `someFunction()`, its scope is limited to the function body of `someFunction()`.

## Hoisting

An important difference between *function declarations* and *function expressions* is that the former may be ***hoisted*** while the latter may not be.

**What is function hoisting?**

Normally we would define a function before calling it:
```javascript
// Function is defined
function logMessage(msg) {
  console.log(msg);
}

// And then called
logMessage('Hello there!'); // Hello there! is printed to browser console
```

However, with the *function declaration* above we may call it before it is defined without throwing errors:
```javascript
logMessage('Hello there!');

function logMessage(msg) {
  console.log(msg);
}
```

This works because the JavaScript interpreter hoists our *function definition* to the top of our scope.

A similar function expression will cause an error:
```javascript
logMessage('Hello there!'); // ERROR! Uncaught ReferenceError: logMessage is not defined

const logMessage = function(msg) {
  console.log(msg);
}
```
{: .code--wrong}

## Local Variables

A variable defined inside a function is only available from within that function and not outside.

```javascript
function wrapText(text, wrapper) {
  let newText = wrapper + text + wrapper;

  return newText;
}

const text = 'Hello!';
const quotedText = wrapText(text, '"');

console.log(quotedText); // "Hello!"
console.log(newText); // ERROR! ReferenceError: newText is not defined
```

## Outer Variables

A function may access outer variables if a local variable of the same name does not exist.

```javascript
const pi = 3.14159;

// A simple function that returns the circumference of a circle where r = radius
function calculateCircumference(r) {
  return 2 * r * pi;
}

const c = calculateCircumference(0.5);
console.log(c); // 3.14159
```

As you can see the variable `pi` is defined outside the `calculateCircumference()` function deceleration.

If `calculateCircumference()` defined a local variable named `pi` it would use the local variable instead:
```javascript
const pi = 3.14159;

function calculateCircumference(r) {
  const pi = 3.1415926535; // this pi variable is used!

  return 2 * r * pi;
}

const c = calculateCircumference(0.5);
console.log(c); // 3.1415926535, used local pi variable - notice the precision!
```

## Returning a value

A function may return a value back into the calling code.
This is accomplished using a `return` statement inside the function declaration:

```javascript
function multiply(a, b) {
  return a * b;
}

const result = multiply(2, 2);

console.log(result); // 4
```

`return` also stops execution of a function. This also means that any code after `return [expression];` is unreachable
and won't be executed.

```javascript
function someFunc() {
  /* ... */
  return;
  // Unreachable code! This line is ignored completely!
  console.log('This console log will never be executed!');
}
```

`return` may be used without returning a value &mdash; in which case ot returns `undefined`.
It an be used to interrupt execution of a function early-on which can help with performance.

```javascript
function someFunction(a, b, c) {
  // if c is undefined don't go any further!
  if (c === undefined) {
    return;
  }

  // Main part of someFunction
  /* ... */
}
```

