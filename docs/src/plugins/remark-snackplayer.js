const walkTree = require('./walkTree');

const parseParams = (paramString = '') => {
  const parts = paramString.split(' ');
  return parts.reduce((acc, part) => {
    let key, value;
    if (part.includes('=')) {
      [key, value] = part.split('=');
    } else {
      key = part;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};

const processNode = (node, parent) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, description, preview } = parseParams(node.meta);

      // Generate AST Node for SnackPlayer
      // See https://github.com/expo/snack/blob/main/docs/embedding-snacks.md
      const elem = {
        type: 'mdxJsxFlowElement',
        name: 'ExpoSnackWithExports',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'description',
            value: description,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'name',
            value: name,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'preview',
            value: preview,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'code',
            value: node.value,
          },
        ],
      };

      // Replace code block with SnackPlayer Node
      const index = parent.children.indexOf(node);
      parent.children.splice(index, 1, elem);
    } catch (e) {
      return reject(e);
    }
    resolve();
  });
};

const SnackPlayer = () => {
  return (tree) =>
    new Promise(async (resolve, reject) => {
      const nodesToProcess = [];
      walkTree(
        tree,
        (node) =>
          node.type === 'code' && node.meta && node.meta.includes('expoSnack'),
        (node, parent) => {
          nodesToProcess.push(processNode(node, parent));
        }
      );

      // If there are expo snack nodes,
      // add the import to the main AST
      if (nodesToProcess.length) {
        const snackUrl = '@/components/ExpoSnack';
        // https://astexplorer.net/
        tree.children.unshift({
          type: 'mdxjsEsm',
          data: {
            estree: {
              type: 'Program',
              sourceType: 'module',
              body: [
                {
                  type: 'ImportDeclaration',
                  source: {
                    type: 'Literal',
                    value: snackUrl,
                    raw: JSON.stringify(snackUrl),
                  },
                  specifiers: [
                    {
                      type: 'ImportSpecifier',
                      imported: {
                        type: 'Identifier',
                        name: 'ExpoSnackWithExports',
                      },
                      local: {
                        type: 'Identifier',
                        name: 'ExpoSnackWithExports',
                      },
                    },
                  ],
                },
              ],
            },
          },
        });
      }

      // Wait for all promises to be resolved
      Promise.all(nodesToProcess).then(resolve()).catch(reject());
    });
};

module.exports = SnackPlayer;
