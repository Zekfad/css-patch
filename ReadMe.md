# css-patch

[![npm version](https://img.shields.io/npm/v/css-patch?style=for-the-badge)](https://www.npmjs.com/package/css-patch)![node version](https://img.shields.io/node/v/css-patch?style=for-the-badge)[![Build status - Linux/OSX](https://img.shields.io/travis/com/Zekfad/css-patch?style=for-the-badge&logo=linux&logoColor=white)](https://travis-ci.com/github/Zekfad/css-patch)[![Build status - Windows](https://img.shields.io/appveyor/build/Zekfad/css-patch?style=for-the-badge&logo=windows&logoColor=white)](https://ci.appveyor.com/project/Zekfad/css-patch)[![Codecov](https://img.shields.io/codecov/c/gh/Zekfad/css-patch?style=for-the-badge)](https://codecov.io/gh/Zekfad/css-patch)


Generating CSS patches (just like a diff).

## Reasons to use

### Themes generation

The easiest way to make a new theme is just copy the file and change some stuff
or if you use preprocessor (such as SCSS, Less, etc.) you can just change some
variables and get a new style.

But serving files with big amount of literally the same code is not a good idea,
so this is when css-patch can help you.

You can pass 2 stylesheets (`original`/`base` and `expected`) to `generateCSSPatch`
and get a new stylesheet. This new stylesheet is intended to be applied after
`original` one and will have the same effect as if you applied `expected` one.
In other words, the new stylesheet will consist of the resulting "overloads" for
the `original` one.

### Extracting difference

Imagine if you have two versions of the same CSS.

You can use this module to get the "difference" between them.

## Install

Install via yarn:

```
yarn add css-patch
```

Install via npm:

```
npm i css-patch
```

## Docs

[Read the docs on GitHub pages.](https://zekfad.github.io/css-patch/)

For advanced usage see the docs for [`transformCSS`](https://zekfad.github.io/css-patch/global.html#transformCSS) function and [`CSSTransformerBase`](https://zekfad.github.io/css-patch/CSSTransformerBase.html) class.

## Possible caveats

###  `unset`

If something existed in `original` stylesheet missing in `expected` one, 
will result of being transformed to `<something>: unset;`.

### Combined rule orders

Logically the same but with a different order combined rules (e.g. `.a,.b` and `.b,.a`)
will be considered as a different rules.

### Merged rules

If rules have exact the same name their declarations would be merged (later appeared
declarations will be a higher priority).

For example `.a{a:1;c:3;}.a{a:2;b:2;}` will be threat as `.a{a:2;b:2;c;3}`.

### Sorting

Declarations are sorted alphabetically.

## Usage example

### Import

#### CommonJS

```js
const { generateCSSPatch, } = require('css-patch');
```

#### ES6

```js
import { generateCSSPatch, } from 'css-patch';
```

### Use

```js
console.log(
	generateCSSPatch(
		'a{a:1;b:1;}b{b:1;}c{a:1;}d{a:1;}',
		'a{a:1;}b{b:2;}c{a:1;}'
	)
); // 'a{b:unset;}b{b:2;}d{a:unset;}'
```
