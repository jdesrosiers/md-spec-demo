# Markdown Spec Demo

A proof-of-concept of using Remark for the JSON Schema specification.

## Usage

Running `npm run build` creates `spec.html`;

## Features

Built using [Remark](https://remark.js.org/), a markdown engine with good
support for plugins and lots of existing plugins we can use.

### Plugins

#### Lint
Repo: https://github.com/remarkjs/remark-lint

Enforce markdown styles guide

#### Github Flavored Markdown
Repo: https://github.com/remarkjs/remark-gfm

Adds support for GFM specific markdown features such as autolink literals,
footnotes, strikethrough, tables, and tasklists.

#### Number Headings
Repo: <self>

Add hierarchical section numbers to headings.

#### Table of Contents
Repo: https://github.com/remarkjs/remark-toc

Add a table of contents.

#### TorchLight
Repo: https://github.com/torchlight-api/remark-torchlight

Syntax highlighting and more using https://torchlight.dev. Additional features
include line numbers and line highlighting.

#### Slug
Repo: Add `id` anchors to headers.

#### Autolink Headings
Repo: https://github.com/rehypejs/rehype-autolink-headings

Makes headings clickable.

#### Flexible Containers
Repo: https://github.com/ipikuka/remark-flexible-containers

Add a callout box using the following syntax. Supported container types are
`warning`, `note`, `experimental`.

```
::: {type} {title}
{content}
:::
```
