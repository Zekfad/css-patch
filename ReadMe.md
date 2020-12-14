# css-patch

[![npm version](https://img.shields.io/npm/v/css-patch?style=for-the-badge)](https://www.npmjs.com/package/css-patch)![node version](https://img.shields.io/node/v/css-patch?style=for-the-badge)[![Build status - Linux/OSX](https://img.shields.io/travis/com/Zekfad/css-patch?style=for-the-badge&logo=linux&logoColor=white)](https://travis-ci.com/github/Zekfad/css-patch)[![Build status - Windows](https://img.shields.io/appveyor/build/Zekfad/css-patch?style=for-the-badge&logo=windows&logoColor=white)](https://ci.appveyor.com/project/Zekfad/css-patch)[![Codecov](https://img.shields.io/codecov/c/gh/Zekfad/css-patch?style=for-the-badge)](https://codecov.io/gh/Zekfad/css-patch)


css-patch module.

## Features

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

## Example

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
