[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/web-infra-dev/awesome-rspack)

# rsbuild-plugin-markdown-loader

A custom Markdown loader plugin for [Rsbuild](https://rsbuild.dev) that supports transforming `.md` files using a high-performance [Neon](https://neon-bindings.com/) Rust parser. Supports GitHub-flavored Markdown (GFM).

<p>
  <a href="https://npmjs.com/package/rsbuild-plugin-markdown-loader">
    <img src="https://img.shields.io/npm/v/rsbuild-plugin-markdown-loader?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/rsbuild-plugin-markdown-loader?minimal=true"><img src="https://img.shields.io/npm/dm/rsbuild-plugin-markdown-loader.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## Features

- Parses `.md` files via a fast Rust backend using Neon
- Optional GitHub-flavored Markdown support
- Easily pluggable into any Rsbuild project

---

## Installation

```bash
npm add rsbuild-plugin-markdown-loader -D
```

> **Note:** You must also install the `rs-markdown-parser` native module, which is a Neon-powered Markdown parser.

```bash
npm add rs-markdown-parser
```

---

## Usage

Add the plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginMarkdownLoader } from "rsbuild-plugin-markdown-loader";

export default {
  plugins: [
    pluginMarkdownLoader({
      gfm: true,
    }),
  ],
};
```

---

## Use Case

When this plugin is configured, you can directly import `.md` files into your frontend code and render them as HTML.

### Example: Markdown as Component Content

```ts
// main.ts or playground.ts
import "./index.css";
import Test from "./test.md";

document.querySelector("#root").innerHTML = `
  <div class="content">
    ${Test}
  </div>
`;
```

### Example: `test.md`

```md
# Hello Markdown 👋

This is a **Markdown** file rendered using a custom Rsbuild plugin!

- Fast parsing via Rust (Neon)
- Supports GitHub-flavored markdown (optional)
```

### Example: `index.css`

```css
.content {
  max-width: 600px;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
```

When you build or serve this project using `rsbuild`, the plugin will automatically transform `test.md` into a JavaScript string containing the rendered HTML, which is then injected into the page.

## Options

### `gfm`

Enable GitHub-flavored Markdown extensions.

- **Type**: `boolean`
- **Default**: `false`

#### Example:

```ts
pluginMarkdownLoader({
  gfm: true,
});
```

---

## How It Works

This plugin hooks into Rsbuild's Rspack config to apply a custom loader (`markdown-loader.cjs`) for `.md` files. The loader internally calls a Neon-powered Rust function for fast parsing.

```js
{
  test: /\.md$/,
  use: [
    {
      loader: './markdown-loader.cjs',
      options: {
        gfm: true,
      },
    },
  ],
  type: 'javascript/auto',
}
```

---

## Loader Implementation

```js
// Loader wrapper for the Neon module
const { processMarkdown } = require("rs-markdown-parser");

module.exports = function (content, map, meta) {
  const callback = this.async();
  const options = this.getOptions();
  const filePath = this.resourcePath;

  try {
    // Call the Rust function via Neon
    const result = processMarkdown(filePath, options.gfm || false);
    callback(null, result, map, meta);
  } catch (err) {
    callback(err);
  }
};
```

---

## License

[MIT](./LICENSE)
