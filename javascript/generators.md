---
layout: default
title: Generators
baseurl: ../../
---

# Generators

-----

## Contents

- [Generators](#generators)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Generator Functions](#generator-functions)
  - [The `Generator` Object](#the-generator-object)
    - [Constructor](#constructor)
    - [Generator Methods](#generator-methods)
      - [`Generator.prototype.next()`](#generatorprototypenext)
      - [`Generator.prototype.return()`](#generatorprototypereturn)
  - [Iterating Over Generators](#iterating-over-generators)

## Overview

A normal JS function can return a single value, or nothing at all.

But what if we need to return multiple values?

Generators can return (or `yield`) multiple values, one after another, and on-demand (i.e. jump out and back into the loop.)

## Generator Functions

Generator functions have a special syntax: `function*` (i.e. the `function` keyword followed by an asterisk [`*`].)

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

## The `Generator` Object

Generator functions do not execute their code like a normal function. When called, they return a **Generator object**:

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator" function creates "generator object"
let generator = generateSequence();
console.log(generator.toString()); // [object Generator]
```

### Constructor

There is no globally available `Generator` object.
The only way to create an instance of one is by calling a generator function.

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// instance of Generator object is created
let generator = generateSequence();
```

### Generator Methods

#### `Generator.prototype.next()`

Calling `next()` on a generator function does the following:
1. Execution runs until the nearest `yield` statement.
2. The yielded value is returned to the outer code (where `.next()` was called.)

The `yield` statement may return a `value` (`yield <value>`,) or
if omitted, returns `undefined`.

`next()` will always returns an object with two values:
- `value`: which is set to the yielded value (or undefined)
- `done`: which is either `true` (indicating the function has finished,) or `false` indicating that there is more to yield.

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();
let one = generator.next();
let two = generator.next();
let three = generator.next();

console.log(JSON.stringify(one)); // { value: 1, done: false }
console.log(JSON.stringify(two)); // { value: 2, done: false }
console.log(JSON.stringify(three)); // { value: 3, done: true }
```

If an argument is supplied to `.next()` it becomes the yielded value returned by the generator.

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();
let one = generator.next();
let next = generator.next('newValue');

console.log(JSON.stringify(one)); // { value: 1, done: false }
console.log(JSON.stringify(next)); // { value: 'newValue' , done: false }
```

#### `Generator.prototype.return()`

The `Generator.prototype.return()` method causes the generator to act as if 
a `return` statement were inserted into the generator function's current position.

If an argument is supplied (`.return(<value>)`,) it becomes the value returned by the generator.

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();
let one = generator.next();
let stop = generator.return('stop');
let three = generator.next();

console.log(JSON.stringify(one)); // { value: 1, done: false }
console.log(JSON.stringify(stop)); // { value: 'stop' , done: true }
console.log(JSON.stringify(three)); // { value: undefined, done: true }
```

## Iterating Over Generators

Use `for..of` to iterate over a generator:

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  console.log(value); // 1, then 2
}
```

The `for..of` method ignores the value when `done: true`.
To show all the results you must use `yield`.

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for(let value of generator) {
  console.log(value); // 1, 2, 3
}
```
