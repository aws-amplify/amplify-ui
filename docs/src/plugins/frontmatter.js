// See: https://gist.github.com/sudkumar/70834062f9243558846249f2c2f98902
const matter = require("gray-matter");

module.exports = () => (tree, file) => {
  const { data } = matter(file.contents);

  // Clean up the tree, now that frontmatter has been extracted:
  // First `---`
  if (tree.children[0].type === "thematicBreak") {
    // Last `---` has been turned into a "heading" because it looks like a title ¯\_(ツ)_/¯
    const firstHeadingIndex = tree.children.findIndex(
      t => t.type === "heading"
    );

    // Remove frontmatter
    if (firstHeadingIndex !== -1) {
      tree.children.splice(0, firstHeadingIndex + 1);
    }
  }

  const frontmatter = {
    // Default to layout, but this can be set to `null` explicitly
    layout: "index",
    ...data,
  };

  // Add frontmatter, but don't conflict with potential `meta` export
  tree.children.push({
    type: "export",
    value: `export const frontmatter = ${JSON.stringify(frontmatter)}`,
  });

  if (frontmatter.layout) {
    tree.children.splice(0, 0, {
      type: "import",
      value: `import Layout from "@/layouts/${frontmatter.layout}";`,
    });

    tree.children.push({
      default: true,
      type: "export",
      value:
        "export default ({ children }) => <Layout frontmatter={frontmatter}>{children}</Layout>",
    });
  }
};
