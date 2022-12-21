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
    - [Arrow Functions](#arrow-functions)
      - [Arrow Syntax](#arrow-syntax)
      - [Where Arrow Functions Shine](#where-arrow-functions-shine)
    - [`Function` Constructor](#function-constructor)
      - [`Function` Constructor Syntax](#function-constructor-syntax)
  - [Parameters](#parameters)
    - [Default Values](#default-values)
  - [Calling Functions](#calling-functions)
  - [Hoisting](#hoisting)
  - [Local Variables](#local-variables)
  - [Outer Variables](#outer-variables)
  - [Returning a Value](#returning-a-value)

<br>

-----

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

***Defining*** a function doesn't execute it. Defining it gives it a name and specifies what it should do.

See [Defining Functions](#defining-functions) for more information.

***Calling*** a function is what executes it with the given parameters.

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
// We can store the result of a function call in a variable
const three = sum(1, 2); // three = 3

console.log(three); // 3
console.log( sum(1, 1) ); // 2
console.log( sum(2, 3) ); // 5, we can call sum() as many times as we want!
```

See [Calling Functions](#calling-functions) for more information.

<br>

-----

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
- Curly braces that enclose the function body which hold the function's statements (or tasks the function caries out).

### Function Expressions

Another way to create functions is using a function expression:
```javascript
const sum = function(a, b) {
  return a + b;
}
```

Function expressions and function declarations look very similar.
The main difference is that in function expressions, the function name is optional.

The example above uses an anonymous function or a function without a name.
Function expressions can use either named or anonymous functions.

When debugging JavaScript, however, named functions make identification easier in the browser's developer tools.

```javascript
// Better for debugging purposes
const sum = function add(a, b) {
  return a + b;
}
```

Naming a function expression enables it to call itself:
```javascript
const countDown = function count(num) {
  console.log(`[Count]: ${num}`);
  
  let newNum = num - 1;
  if (newNum > 0) {
    count(newNum);
  }
}

countDown(5);
// [Count]: 5
// [Count]: 4
// [Count]: 3
// [Count]: 2
// [Count]: 1
```

### Arrow Functions

***Arrow functions***, more accurately called ***arrow function expressions***, 
are a more-compact, limited, and lightweight alternative to function expressions.

```javascript
// A function expression
const multiply1 = function(a, b) {
  return a * b;
}

// Do the same thing with an arrow function
const multiply2 = (a , b) => a * b;

console.log(multiply1(2, 24)); // 48
console.log(multiply2(2, 24)); // 48, the same result!
```

**Some** of these (intentional) limitations include:
- Arrows have no `this` binding (no `arguments` or `super` either.)
- Cannot be used as a `constructor` — using the `new` keyword throws a `TypeError`.
- They cannot use the `yield` keyword to be used as a generator function.
- Arrow functions have no `prototype` property &mdash; and consequently can't access inherited `Function` properties or methods.

#### Arrow Syntax

```javascript
param => expression

(param) => expression

(param1, paramN) => expression

param => {
  statements
}

(param1, paramN) => {
  statements
}
```

The only time the parenthesis in an arrow function may be omitted is if it has a *single simple* parameter.
As soon as you have multiple parameters or need to use default, rest, destructured, or no parameters, parenthesis are required.

The curly braces (and the `return` keyword) may be omitted only if the function directly returns an expression.
This is called an arrow function with a ***concise body***.

If the arrow function has a block body, or multiple statements, the curly braces are required.
An arrow function with curly braces (which creates a block scope) requires an explicit `return` statement to specify what is returned.

```javascript
const sum1 = (a, b) => a + b;

const sum2 = (a, b) => {
  return a + b;
}
```

When an arrow function is parsed and the token after the arrow (`=>`) is not a left-side curly brace (`{`) it gets parsed as a concise body.
This can cause unexpected behavior when trying to return an object literal in a concise body.

```javascript
const createObject = () => { a: 2 };

console.log(createObject()); // undefined
```
{: .code--wrong }

If you need an arrow function that has a concise body to return an object literal, it needs to be wrapped in parenthesis:

```javascript
const createObject = () => ({ a: 2 });

console.log(createObject()); // {a: 2}
```

#### Where Arrow Functions Shine

Arrow functions are ideal in certain situations, like supplying a function as an argument.
For example, arrow functions are often used in conjunction with `EventTarget.prototype.addEventListener()`.

```javascript
// More concise eventListeners
window.addEventListener('load', () => {
  // ...
});

// Single line setTimeout()
setTimeout(() => console.log('Hello World!'), 1e3);

// More concise promise chaining
myPromise
  .then(a => {
    // ...
  })
  .then(b => {
    // ...
  })
```

### `Function` Constructor

***The `Function` constructor should not be used in production code** as it suffers from poor performance and security.*

<div class="callout callout-danger">
  <h4>Don't use the <code>Function</code> constructor</h4>
  The <code>Function</code> constructor is mentioned for completeness.
</div>

Using the `Function` constructor with user input is especially dangerous as it opens up the possibility of you website or app running malicious code through injection.

When a **function expression** or **function declaration** is used to create a function it gets parsed normally with the rest of the JavaScript code. With a `Function` constructor, however, it gets parsed when it is created. Consequently, a `Function` constructor does not receive the same optimizations and is inherently slower.

#### `Function` Constructor Syntax

```javascript
new Function(functionBody);
new Function(arg0, functionBody);
new Function(arg0, arg1, functionBody);
new Function(arg0, arg1, /* … ,*/ argN, functionBody);
```

<!-- omit from toc -->
##### `Function` Constructor Parameters

<!-- omit from toc -->
##### `argN` <span class="typography__optional">optional</span>
{: .typography__param-name }

***Argument names*** may optionally be supplied. They must be a string that corresponds to a valid JavaScript parameter.
This may include default, rest, or destructured parameters. Multiple argument names should be  separated by comas.
{: .typography__param-desc }

Any whitespace, comments, or comas used inside the argument names are perfectly valid.
For example: `"a, b"` `"a", "b = 42", "[c, d] /* arr of numbers */"`.
{: .typography__param-desc }

<!-- omit from toc -->
##### `functionBody`
{: .typography__param-name }

A string containing the JavaScript statements comprising the function definition.
{: .typography__param-desc }

The `new` keyword is optional.

```javascript
const sum = new Function('a', 'b', 'return a + b');

console.log(sum(4, 4)) // 8
```
{: .code--wrong }

<br>

-----

## Parameters

Functions may optionally have ***parameters*** that allow us to pass arbitrary data to the function.

A ***parameter*** is a named variable passed into a function.

*Parameters* are used to import ***arguments*** into a function.

The difference between *parameters* and *arguments*:
- *parameters* are listed in a functions definition.
- *arguments* are the actual values passed to the function when its called.
- *arguments* are passed to a function, the values of which are assigned to its *parameters*.

### Default Values

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

In modern JavaScript a default parameter can be defined inside a function declaration's parenthesis using&nbsp;`=` (the assignment operator):

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

<br>

-----

## Calling Functions

As mentioned earlier, defining a function does not execute it.

Calling the function is what executes it, and allows us to specify arguments.

To call a function it must be *in scope*. The ***scope*** of a function is the function in which it was declared (or the entire script if declared at the top level.)

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

<br>

-----

## Hoisting

An important difference between **function declarations** and **function expressions** is that the former may be ***hoisted*** while the latter may not be.

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

This works because the JavaScript interpreter *hoists* our function definition to the top of our scope.

A similar function expression will cause an error:
```javascript
logMessage('Hello there!'); // ERROR! Uncaught ReferenceError: logMessage is not defined

const logMessage = function(msg) {
  console.log(msg);
}
```
{: .code--wrong}

<br>

-----

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

<br>

-----

## Outer Variables

A function may access outer variables if a local variable of the same name does not exist.

```javascript
const pi = 3.14159;

// A simple function that returns the circumference of a circle where r = radius
function calculateCircumference(r) {
  return 2 * r * pi; // pi is taken from the const pi defined above
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

<br>

-----

## Returning a Value

A function may return a value back into the calling code.
This is accomplished using a `return` statement inside the function declaration:

```javascript
function multiply(a, b) {
  return a * b;
}

const result = multiply(2, 2);

console.log(result); // 4
```

The `return` keyword also stops execution of a function. This also means that any code after `return [expression];`{: .typography--nowrap } is unreachable
and won't be executed.

```javascript
function someFunc() {
  /* ... */
  return;
  // Unreachable code! This line is ignored completely!
  console.log('This console log will never be executed!');
}
```

`return` may be used without a value &mdash; in which case it returns `undefined`.
It can be used to interrupt execution of a function early-on which prevents executing unnecessary code.

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

<br>

-----
