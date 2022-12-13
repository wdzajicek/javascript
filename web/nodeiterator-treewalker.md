---
layout: default
title: 'NodeIterator & TreeWalker'
baseurl: ../../
---

# `NodeIterator` & `TreeWalker`

`NodeIterator`s and `TreeWalker`s are very similar in syntax and what they do.
Both represent a document subtree.

A `TreeWalker` object, however, also tracks a position within the subtree.

-----

## Contents

- [`NodeIterator` \& `TreeWalker`](#nodeiterator--treewalker)
  - [Contents](#contents)
  - [`NodeIterator`](#nodeiterator)
    - [`Document.createNodeIterator()`](#documentcreatenodeiterator)
      - [`root`](#root)
      - [`whatToShow` optional](#whattoshow-optional)
      - [`filter` optional](#filter-optional)
      - [Examples](#examples)
  - [`TreeWalker`](#treewalker)

## `NodeIterator`

> The `NodeIterator` interface represents an iterator over a list of nodes in a subtree of the DOM.
>
> <https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator>
{: .blockquote.blockquote--border.mx-5.px-4}

### `Document.createNodeIterator()`

The `Document.createNodeIterator()` method returns a new `NodeIterator` object.

```javascript
createNodeIterator(root);
createNodeIterator(root, whatToShow);
createNodeIterator(root, whatToShow, filter);
```

#### `root`

The root node where the `NodeIterator` traversal starts.

#### `whatToShow` <span class="typography__optional">optional</span>

`whatToShow` filters for the specified node type. It defaults to `SHOW_ALL`

| NodeFilter constant | Description |
|---------------------|-------------|
| `NodeFilter.SHOW_ALL` | Shows all nodes. |
| `NodeFilter.SHOW_COMMENT` | Shows comment nodes. |
| `NodeFilter.SHOW_DOCUMENT` | Shows Document nodes. |
| `NodeFilter.SHOW_DOCUMENT_FRAGMENT` | Shows DocumentFragment nodes. |
| `NodeFilter.SHOW_DOCUMENT_TYPE` | Shows DocumentType nodes. |
| `NodeFilter.SHOW_ELEMENT` | Shows Element nodes. |
| `NodeFilter.SHOW_PROCESSING_INSTRUCTION` | Shows ProcessingInstruction nodes. |
| `NodeFilter.SHOW_TEXT` | Shows Text nodes. |
{: .table.table-striped.table-hover.mx-lg-5}

#### `filter` <span class="typography__optional">optional</span>

`filter` is either a callback function or object with an `acceptNode()` method.
The filter gets called for each node in the subtree (after `whatToShow` has already applied.)
The filter function or method should return one of `NodeFilter.FILTER_ACCEPT`, `NodeFilter.FILTER_REJECT`, or `NodeFilter.FILTER_SKIP`.

#### Examples

Using a callback function as the filter parameter:
```javascript
const nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_TEXT,
  (node) => {
    return ( node.data.search(/--/g) !== -1 ? NodeFilter.FILTER_ACCEPT
    : NodeFilter.FILTER_REJECT )
  }
);

let currentNode;

while (currentNode = nodeIterator.nextNode()) {
  // Do something with currentNode
  console.log(currentNode.data);
}
```

The same thing using an object with an `acceptNode()` method:
```javascript
const nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_TEXT,
  {
    acceptNode(node) {
      return ( node.data.search(/--/g) !== -1 ? NodeFilter.FILTER_ACCEPT
    : NodeFilter.FILTER_REJECT )
    }
  }
);

let currentNode;

while (currentNode = nodeIterator.nextNode()) {
  // Do something with currentNode
  console.log(currentNode.data);
}
```

## `TreeWalker`

