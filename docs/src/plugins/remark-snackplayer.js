const walkTree = require('./walkTree');
const { defaultOptions, exportsCode } = require('./snack-options');

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
      const params = parseParams(node.meta);

      const {
        name,
        description,
        platform,
        supportedPlatforms,
        preview,
        loading,
        dependencies,
      } = {
        ...defaultOptions,
        ...params,
      };

      // Generate AST Node for SnackPlayer
      // See https://github.com/expo/snack/blob/main/docs/embedding-snacks.md
      const elem = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'className',
            value: 'snack-player',
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-name',
            value: name,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-description',
            value: description,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-dependencies',
            value: dependencies.join(','),
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-platform',
            value: platform,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-supported-platforms',
            value: supportedPlatforms,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-preview',
            value: preview,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-loading',
            value: loading,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-sdk-version',
            value: '45.0.0',
          },
          {
            type: 'mdxJsxAttribute',
            name: 'data-snack-files',
            value: encodeURIComponent(
              JSON.stringify({
                'App.tsx': {
                  type: 'CODE',
                  contents: node.value,
                },
                'aws-exports.js': {
                  type: 'CODE',
                  contents: exportsCode,
                },
              })
            ),
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

      // Wait for all promises to be resolved
      Promise.all(nodesToProcess).then(resolve()).catch(reject());
    });
};

module.exports = SnackPlayer;
