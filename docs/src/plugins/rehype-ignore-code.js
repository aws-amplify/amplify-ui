// Internal recursive function to walk down an [element tree](https://github.com/syntax-tree/unist#node)
function walkTree(tree, predicate, fn) {
  if (tree.children) {
    tree.children.forEach((child) => {
      if (predicate(child)) {
        fn(child);
      } else if (child.children) {
        walkTree(child, predicate, fn);
      }
    });
  }
}

/**
 * This is a [rehype plugin](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md)
 * This plugin removes any line in a code block that ends in `// IGNORE`
 * It needs to be run *before* any syntax highlighter plugin because it assumes
 * that everything inside a `<code>` block is plain text.
 */
module.exports = () => {
  return (tree, file) => {
    walkTree(
      tree,
      (tree) => tree.tagName && tree.tagName === `code`,
      (tree) => {
        tree.children.forEach((child) => {
          if (child.type === 'text') {
            const lines = child.value.split(`\n`);
            child.value = lines
              .filter((line) => !line.endsWith('// IGNORE'))
              .join(`\n`);
          }
        });
      }
    );
  };
};
