---
layout: default
title: Objects
baseurl: ../../
---

# Objects

-----

## Contents

- [Objects](#objects)
  - [Contents](#contents)
  - [The Basics](#the-basics)
  - [Property Names](#property-names)
  - [Creating Objects](#creating-objects)
    - [Object Literals](#object-literals)
    - [The `Object()` Constructor](#the-object-constructor)
  - [Accessing Properties](#accessing-properties)
    - [Dot Notation](#dot-notation)
    - [Bracket Notation](#bracket-notation)
  - [Deleting Properties](#deleting-properties)
  - [Computed properties](#computed-properties)
  - [Object Methods](#object-methods)
    - [Object Method Shorthand](#object-method-shorthand)
  - [`this` in Property Methods](#this-in-property-methods)
  - [Property Value Shorthand](#property-value-shorthand)
  - [Symbols as Object Keys](#symbols-as-object-keys)
  - [The `in` Operator](#the-in-operator)
  - [The `for..in` Loop](#the-forin-loop)
    - [Enumerable Properties](#enumerable-properties)
    - [Inherited Properties](#inherited-properties)
  - [Object Property Ordering](#object-property-ordering)
  - [Constructor Functions](#constructor-functions)
  - [`Object.assign()`](#objectassign)
    - [Shallow vs. Deep Cloning](#shallow-vs-deep-cloning)
      - [`structuredClone()` method](#structuredclone-method)

## The Basics

The object is a foundational part of the JavaScript language. In fact, it can be said that almost everything is an object in JS. Understanding them is essential to having a good understanding of the language.

How is everything an object? Consider the ordinary `array` data-type in JavaScript. It is a special object meant for holding a list of values &mdash; values that are accessed by an index.

We can demonstrate that an array is an object using javascript itself.

An array has properties just like any other object in JavaScript! For example, all arrays have a `length` property:

```javascript
let arr = [1, 2, 3];

console.log(arr.length);
```

Objects can be created using curly-braces (`{...}`) and **may** have a list of properties. An object may also be empty, with no properties at all.

```javascript
let obj = {
  key: 'value',
  anotherKey: true
};
```

A ***property*** *may* be a `"key": value` pair. A `key`, which must be a string (or a symbol), is also called a ***property name***. The `value` can be a string, number, boolean, array, another object, or even a function.

When a property references a function in an object initializer it is called a ***property method***.

```javascript
let obj = {
  property: function(parameters) {/* ... */}
}
```

There exists a method definition shorthand where the `function` keyword can be omitted:
```javascript
let obj;
// the full syntax:
obj = {
  property: function(parameters) {/* ... */}
};
// the equivalent shorthand:
obj = {
  property(parameters) {/* ... */}
};
```

## Property Names

A property name must be either a string or a symbol. Anything else is coerced into a string (e.g. `2` becomes&nbsp;`'2'`):

```javascript
let obj = {
  0: 'test' // JavaScript coerces the 0 into a string '0': 'test'
}

console.log(obj['0']) // test
console.log(obj[0]); // test, same property b/c 0 is coerced to a string
```

If a string property name contains a space it must be quoted:
```javascript
let obj = {
  'multi word key': true
}
```

Symbols are used in property keys to guarantee uniqueness. This is ideal when creating code that others will use and manipulate.

## Creating Objects

There are several ways to create an object:
```javascript
let obj1 = {};
let obj2 = new Object();
let obj3 = Object();
let obj4 = Object.create();
```

### Object Literals

When you immediately define properties inside curly braces (`{...}`) it is called an ***object literal***:

```javascript
let user = {
  name: 'John',
  age: 30
};
```

*In JavaScript*, the coma after the last property of an object is optional:
```javascript
let user = {
  name: 'John',
  age: 29, // This coma is optional!
}
```

### The `Object()` Constructor

The `Object(value)` constructor turns `value` into an object — `new` is optional:
```javascript
new Object(value);
Object(value);
```

## Accessing Properties

There are two methods for accessing object properties:
- dot notation
- bracket notation

Both methods may be used to read, set, or create new properties.

### Dot Notation

***Dot notation*** is the shortest but doesn't work with multi-word keys:
```javascript
let user = {
  name: 'John',
  age: 28
};

console.log(user.name); // John
console.log(user.age); // 28
```

It can be used to create new properties, or overwrite an existing one too:
```javascript
let user = {
  name: 'John',
  age: 27
};

console.log(user.age) // 27

user.age = 26;
console.log(user.age); // 26, it changed!

user.nickname = 'J';
console.log(user.nickname); // J, a new property was created!
```

### Bracket Notation

The ***bracket notation*** uses the `object[expression]` syntax; the `expression` should evaluate to a string or symbol.

An object with a multi-word key must use quotation marks and must be accessed using *bracket notation*:
```javascript
let user = {
  name: 'John',
  age: 25,
  'is online': true
};

console.log(user['is online']); // true

user['is online'] = false;
console.log(user['is online']); // false

user['theme'] = 'dark-mode';
console.log(user['theme']); // dark-mode
```

## Deleting Properties

To remove a property we must use the `delete` operator:
```javascript
delete user['is online'];
```

## Computed properties

The bracket notation is more powerful since it allows you to use an `expression` inside the brackets.

```javascript
let fruit = prompt('What type of fruit?', 'apple');

let bag = {
  [fruit]: 5 // name of property is computed from fruit variable
};

console.log(bag.apple); // 5, if fruit=apple
```

An expression may be used inside square brackets of an object literal too:

```javascript
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5
};

console.log(bag.appleComputers); // 5
```

## Object Methods

Objects are capable of doing more than holding `key: 'value'` pairs. 
Object methods are properties that store a function.

```javascript
let user = {
  name: 'Bob',
  logHello: function() {
    console.log('Hello!');
  }
}

user.logHello(); // Hello!
```

### Object Method Shorthand

There's a shorter way of creating methods in object literals:

```javascript
let user;

user = {
  name: 'Bob',

  logHello: function() {
    console.log('Hello!');
  }
}

// This user does the same thing:
user = {
  name: 'Bob',
  // No function keyword
  logHello() {
    console.log('Hello!');
  }
}

user.logHello(); // Hello!
```

## `this` in Property Methods

Whenever you need to reference an object inside its own method, you should always use `this`.

Do not attempt to reference the object using its outer variable.
Doing so is technically valid JavaScript but is brittle code prone to future error:
```javascript
let user = {
  name: 'John',

  logHello() {
    console.log(`Hello, ${user.name}!`);
  }
};
let admin = user;

user.logHello(); // Hello, John!
user = {}; // If we overwrite user the original reference is broken!
admin.logHello(); // TypeError: Cannot read property 'name' of null
```

Instead, an object method should reference itself using the `this` keyword:
```javascript
let user = {
  name: 'John',

  logHello() {
    console.log(`Hello, ${this.name}!`); // this.name not user.name!
  }
}

let admin = user;

user.logHello(); // Hello, John!
user = {}; // Overwrite user again
admin.logHello() // Hello, John!
```

## Property Value Shorthand

Existing variables are often used for property names:
```javascript
function makeUser(name, age) {
  return {
    name: name,
    age: age,
  };
}

let user = makeUser('John', 24);
console.log(user.name); // John
```

Instead of `name: name` and `age: age` we can use the property value shorthand:

```javascript
function makeUser(name, age) {
  return {
    name,
    age,
  };
}

let user = makeUser('John', 23);
console.log(user.name); // John
```

## Symbols as Object Keys

@TODO

## The `in` Operator

In JavaScript, trying to access a non-existent property on an object does not cause an error. It returns `undefined` instead.

To test for the existence of a property use the `in` operator:

```javascript
"key" in object
```

```javascript
let user = { nickname: 'J' };

console.log('nickname' in user); // true (either true or false)
```

## The `for..in` Loop

To iterate over all an objects *enumerable properties*, JavaScript has the `for..in` loop:

```javascript
let user = {
  name: 'John',
  age: 22,
  isAdmin: true
};

for (const key in user) {
  console.log(`[key]: ${key} [value]: ${user[key]}`);
}
// [key]: name [value]: 'John'
// [key]: age [value]: 22
// [key]: isAdmin [value]: true
```

### Enumerable Properties

What is an ***enumerable property***?

An enumerable property is one that participates in looping methods like `for..in` and `Object.keys()`.

All properties created in object initialization, and those assigned afterward (e.g. using dot or bracket notation,) are enumerable by default:

```javascript
let user = {
  name: 'John',
}

user.age = 21;
user['isAdmin'] = false;

for (const key in user) {
  console.log(user[key]); // 'John', 21, false
}
```

### Inherited Properties

The `for..in` loop will also iterate over inherited enumerable properties (properties defined on the objects' `prototype`.)

If you are creating a simple object literal in your own code, looping over inherited properties is usually not a problem.

If you start using methods that manipulate an objects' prototype, however, you may start getting inherited properties.

To avoid including inherited properties, use `object.hasOwnProperty(key)` in the loop:

```javascript
for (const key in object) {
  if (object.hasOwnProperty(key)) {
    /* ... */
  }
}
```

There is a replacement for `object.hasOwnProperty(key)` that developers are encouraged to use, **however, there is little browser support for it at the time of writing this.**

It is `Object.hasOwn(object, key)` where `object` is the object to test and `key` is the property being checked for. It will return `true` for properties that exist in the object and `false` for non-existent properties or inherited properties:

```javascript
for (const key in object) {
  if (Object.hasOwn(object, key)) {
    /* ... */
  }
}
```

[Core-js](https://github.com/zloirock/core-js#ecmascript-object) has a polyfill enabling you to use `Object.hasOwn()` with more browser support.

## Object Property Ordering

Object properties are ordered. If we loop over an object the properties will be returned in a specific order. What determines this order?

Integer properties are sorted, while others appear in creation order.

```javascript
let obj = {
  2: 'two',
  1: 'one',
  3: 'three'
};

for (const key in obj) {
  console.log(key); // 1, 2, 3 - they're sorted!
}
```

## Constructor Functions

Constructor functions are regular functions. They are reuseable code for creating new objects.

There are two conventions to follow:
1. The first letter in the name is capitalized
2. They should only be executed with the `new` operator

The capitalization of the first letter in the constructor functions name is not required. However, it is a commonly agreed upon convention that indicates the function should be called using `new`.

```javascript
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User('Jacob');

console.log(user.name); // Jacob
console.log(user.isAdmin); // false
```

What's happening inside the constructor function?

1. `new` causes an new empty object to be created and assigned to `this`
2. The function body executes which usually modifies `this` in some way (i.e. adding or changing properties)
3. `this` is returned.

```javascript
function User(name) { // 1. this = {}
  this.name = name; // 2. this.name = 'Jacob'
  this.isAdmin = false; // this.isAdmin = false
  // 3. return this; is implied
}

let user = new User('Jacob'); // new is called and name=Jacob
```

***Arrow functions may not be used as a constructor** because they do not have `this`.*

## `Object.assign()`

Copying an object variable creates another reference to the same object &mdash; it doesn't create a new object:
```javascript
let user = { name: 'John' };
let admin = user; // admin references the same object

admin.name = 'Jacob';
console.log(user.name); // 'Jacob', user.name was changed too!
```

You could manually iterate over each property in a loop and assigning them to a new object that functions as the clone.

```javascript
let user = {
  name: 'John',
  age: 19
};
let clone = {};

for (const key in user) {
  clone.key = user.key;
}
```

This creates code that is far more complex than it needs to be.

Instead, the `Object.assign()` method can simplify things. It takes properties from one or more objects and adds them to a `target` object:

```javascript
Object.assign(target, ...sources);
```
- The `target` object receives the copied properties.
- `..sources` are one or more source objects with the properties you want to copy.

```javascript
const target = { a: 1, c: 3 };
// duplicate props are replaced by the most recently added
const source = { b: 2, c: 1 };
const modifiedTarget = Object.assign(target, source);

console.log(target);         // { a: 1, b: 2, c: 1 }
console.log(modifiedTarget); // { a: 1, b: 2, c: 1 }, same thing
console.log(target === modifiedTarget); // true
```

Notice how `target` and `source` both have a property named `c`.

If the `target` and `source` object use the same key, the `target` property will be overwitten by the `source` property.

Sometimes you will see code where an new empty object is created inside the `Object.assign()` call:

```javascript
let obj = { a: 1, b: 2, c: 3 };
let clone = Object.assign({}, obj);
```

### Shallow vs. Deep Cloning

As mentioned in [Overview](#overview) above, an object property can store many things including another object:

```javascript
let user = {
  name: 'Bob',
  // image is another object with its own properties!
  image: {
    src: 'assets/img/some-icon.png',
    height: 300,
    width: 300
  }
}
```

The `Object.assign()` method is only capable of making a ***shallow clone*** &mdash; it cannot clone *nested objects*:

```javascript
let user = {
  name: 'Bob',
  // image is another object with its own properties!
  image: {
    src: '/assets/img/some-icon.png',
    height: 300,
    width: 300
  }
}

let clone = Object.assign({}, user);

console.log(user.image === clone.image); // true, it's the same object!
clone.image.src = '/uploads/icon.png'; // change the clone
console.log(user.image.src); // '/uploads/icon.png', changes the original
```

#### `structuredClone()` method

The global `structuredClone(object)` method is capable of copying nested properties or creating a ***deep clone*** or ***structured clone***.

```javascript
let user = {
  name: 'Bob',
  image: {
    src: '/assets/img/some-icon.png',
    height: 300,
    width: 300
  }
}

let clone = structuredClone(user);

console.log(user.image === clone.image); // false, it's a new object!
clone.image.src = '/uploads/icon.png'; // change the clone
console.log(user.image.src); // '/assets/img/some-icon.png', unchanged!
```

*Unfortunately, `structuredClone()` does not support function properties and will throw an error!*

```javascript
let user = {
  name: 'Bob',

  sayHello() {
    console.log(`Hello, ${this.name}`);
  }
}

let clone = structuredClone(user); // Error!
/* 
  Uncaught DOMException: 
  Failed to execute 'structuredClone' on 'Window': sayHello() {
    console.log(`Hello, ${this.name}`);
  } could not be cloned.
    at <anonymous>:9:13 
*/
```

To handle complex cases where you have nested objects and function properties you may need to implement your own deep clone.

Or, you can use an existing  implementation like lodash's `_.cloneDeep(object)`.

Unfortunately, JavaScript does not yet have a method for deep cloning that can handle function properties.

-----


