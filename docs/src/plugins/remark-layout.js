// See https://astexplorer.net/ for converting JSX to AST

module.exports = () => (ast) => {
  const layoutUrl = '@/components/Layout';

  // import Layout from "@/components/Layout";
  ast.children.unshift({
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
              value: layoutUrl,
              raw: JSON.stringify(layoutUrl),
            },
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: { type: 'Identifier', name: 'Layout' },
              },
            ],
          },
        ],
      },
    },
  });

  // export default ({ children }) => (
  //   <Layout frontmatter={frontmatter}>{children}</Layout>
  // );
  ast.children.push({
    type: 'mdxjsEsm',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      shorthand: true,
                      key: {
                        type: 'Identifier',
                        name: 'children',
                      },
                      kind: 'init',
                      value: {
                        type: 'Identifier',
                        name: 'children',
                      },
                    },
                  ],
                },
              ],
              body: {
                type: 'JSXElement',
                openingElement: {
                  type: 'JSXOpeningElement',
                  attributes: [
                    {
                      type: 'JSXAttribute',
                      name: {
                        type: 'JSXIdentifier',
                        name: 'frontmatter',
                      },
                      value: {
                        type: 'JSXExpressionContainer',
                        expression: {
                          type: 'Identifier',
                          name: 'frontmatter',
                        },
                      },
                    },
                  ],
                  name: {
                    type: 'JSXIdentifier',
                    name: 'Layout',
                  },
                },
                closingElement: {
                  type: 'JSXClosingElement',
                  name: {
                    type: 'JSXIdentifier',
                    name: 'Layout',
                  },
                },
                children: [
                  {
                    type: 'JSXExpressionContainer',
                    expression: {
                      type: 'Identifier',
                      name: 'children',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  });
};
