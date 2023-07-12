/* eslint-disable no-console */
import dotenv from "dotenv";
import { readFileSync, writeFileSync } from "node:fs";
import { reporter } from "vfile-reporter";
import { remark } from "remark";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import torchLight from "remark-torchlight";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import remarkNumberHeadings from "./remark-number-headings.js";


dotenv.config();

(async function () {
  const md = readFileSync(0, "utf-8");
  const html = await remark()
    .use(remarkPresetLintMarkdownStyleGuide)
    .use(remarkGfm)
    .use(remarkNumberHeadings, { startDepth: 2, skip: ["Contents"] })
    .use(remarkToc, { tight: true, heading: "Contents" })
    .use(torchLight)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(md);

  writeFileSync(1, `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css">
    <style>
      /* Torchlight */
      pre {
        border-radius: 0.25rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        overflow-x: auto;
      }

      pre.torchlight code {
        display: block;
        min-width: -webkit-max-content;
        min-width: -moz-max-content;
        min-width: max-content;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      pre.torchlight code .line {
        padding-left: 1rem;
        padding-right: 1rem;
      }

      pre.torchlight code .line-number,
      pre.torchlight code .summary-caret {
        margin-right: 1rem;
      }
    </style>
  </head>
  <body>
    ${String(html)}
  </body>
</html>`);

  console.error(reporter(html));
}());
