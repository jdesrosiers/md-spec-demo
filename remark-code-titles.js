import { visit } from "unist-util-visit";
import { text } from "mdast-builder";


const titlePattern = /^"(?<title>.*?)"/;

const remarkNumberHeadings = () => (tree) => {
  visit(tree, "code", (codeNode, index, parent) => {
    // Support title without a language
    if (codeNode.lang && codeNode.lang[0] === "\"") {
      codeNode.meta = `${codeNode.lang} ${codeNode.meta}`;
      codeNode.lang = null;
    }

    let title = "";
    const titleClasses = ["remark-code-title"];

    const language = codeNode.lang ?? "";
    if (language.toLowerCase() === "jsonschema") {
      codeNode.lang = "json";
      title = "JSON Schema";
      titleClasses.push("code-title-jsonschema");
    } else if (language.toLowerCase() === "json") {
      title = "JSON";
      titleClasses.push("code-title-json");
    } else {
      titleClasses.push("code-title-unknown");
    }

    if ("meta" in codeNode) {
      const match = titlePattern.exec(codeNode.meta);
      if (match) {
        title = title ? `${title} - ${match.groups.title}` : match.groups.title;
        codeNode.meta = codeNode.meta.slice(match[0].length).trim();
      }
    }

    const containerChildren = [];
    if (title) {
      const titleNode = div([text(title)], { className: titleClasses });
      containerChildren.push(titleNode);
    }
    containerChildren.push(codeNode);

    const wrappedCodeNode = div(containerChildren, { className: ["remark-code-container"] });

    parent.children.splice(index, 1, wrappedCodeNode);
  });
};

const div = (children, properties) => {
  return {
    type: "container",
    children,
    data: {
      hName: "div",
      hProperties: properties
    }
  };
};

export default remarkNumberHeadings;
