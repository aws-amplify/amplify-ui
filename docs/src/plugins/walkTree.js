// Internal recursive function to walk down an [element tree](https://github.com/syntax-tree/unist#node)
module.exports = function walkTree(tree, predicate, fn) {
  if (tree.children) {
    tree.children.forEach((child) => {
      if (predicate(child)) {
        fn(child, tree);
      } else if (child && child.children) {
        walkTree(child, predicate, fn);
      }
    });
  }
};
