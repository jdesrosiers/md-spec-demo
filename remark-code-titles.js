import { visit } from "unist-util-visit";
import { text } from "mdast-builder";


const titlePattern = /^"(?<title>.*?)"/;

const remarkNumberHeadings = () => (tree) => {
  visit(tree, "code", (codeNode, index, parent) => {
    let title = "";
    const titleClasses = ["remark-code-title"];

    titleClasses.push(`code-title-${codeNode.lang}`);

    if (codeNode.lang.toLowerCase() === "jsonschema") {
      codeNode.lang = "json";
      title = "JSON Schema";
    } else if (codeNode.lang.toLowerCase() === "json") {
      title = "JSON";
    } else {
      title = codeNode.lang;
    }

    if ("meta" in codeNode) {
      const match = titlePattern.exec(codeNode.meta);
      if (match) {
        title = match.groups.title;
        codeNode.meta = codeNode.meta.slice(match[0].length).trim();
      }
    }

    const titleNode = div([text(title)], { className: titleClasses });
    const wrappedCodeNode = div([titleNode, codeNode], { className: ["remark-code-container"] });

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
