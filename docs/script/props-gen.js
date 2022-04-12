const docgen = require('react-docgen-typescript');
const json2md = require('json2md');
const path = require('path');
const { writeFileSync } = require('fs');

const filePath = '../../packages/react/src/primitives/Button/index.ts';
const pathToFile = path.join(__dirname, filePath);

const getData = (pathToFile) => {
  // Parse a file for docgen info
  const rawData = docgen.parse(pathToFile)[0];

  /**
   * need to treat special characters
   * 1) "|", "<", ">", "`" => replace with character code, "&$<unicode>;"
   * 2) "' + '" => replace with space
   * 3) "\n" => replace with space
   */
  const tobeEncoded = new RegExp(/[|<>`]|'\s\+\s'|\\n/g);
  const getEncoded = (match) =>
    match.match(/[|<>`]/) ? `&#${match.charCodeAt()};` : ' ';
  const enCodedData = JSON.stringify(rawData).replaceAll(
    tobeEncoded,
    getEncoded
  );

  return JSON.parse(enCodedData);
};

const { props, displayName } = getData(pathToFile);

const wantedCategories = [
  `${displayName}Props`,
  'BaseComponentProps',
  'BaseStyleProps',
  'RefAttributes',
  'TypeLiteral',
];

const categorizedProps = Object.entries(props).reduce((acc, [key, val]) => {
  const category = val.declarations[0].name;
  return {
    ...acc,
    ...(wantedCategories.includes(category) && {
      [category]: {
        ...acc[category],
        [key]: val,
      },
    }),
  };
}, {});

writeFileSync(
  path.resolve(
    __dirname,
    `${displayName.toLowerCase()}-react-auto-prop-categorized.json`
  ),
  JSON.stringify(categorizedProps, null, 2)
);

const createPropsTable = (props) => ({
  headers: ['name', 'type', 'default', 'description'],
  rows: Object.values(props).map(
    ({ name, type, defaultValue, description }) => ({
      name: name.replaceAll(/[{}]/g, '\\$&'),
      type: type.name.replaceAll(/[{}]/g, '\\$&'),
      default: defaultValue ? defaultValue.value.toString() : '-',
      description,
    })
  ),
});

const createPropsTableExpander = (data) =>
  wantedCategories.map((category) => ({
    ExpanderItem: {
      title: category,
      value: category,
      children: [
        {
          table: createPropsTable(data[category]),
        },
      ],
    },
  }));

const propsTables = createPropsTableExpander(categorizedProps);

json2md.converters.ExpanderItem = ({ title, value, children }, json2md) => `
<ExpanderItem title="${title}" value="${value}">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      children={\`
${json2md(children)}
      \`}
    />
  </ExpanderItem>
`;

json2md.converters.Expander = ({ ExpanderItems }, json2md) => `
<Expander type="multiple" defaultValue={['${displayName}Props']}>
  ${json2md([...ExpanderItems.map((item) => ({ ...item }))])}
</Expander>
`;

json2md.converters.plainText = (text, json2md) => text;

const output = json2md([
  {
    plainText: `
import { Expander, ExpanderItem } from '@aws-amplify/ui-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
`,
  },
  { h2: `${displayName} Props` },
  {
    Expander: {
      ExpanderItems: propsTables,
    },
  },
]);

writeFileSync(
  path.resolve(
    __dirname,
    `../src/pages/components/${displayName.toLowerCase()}/react-auto-prop-table-${displayName.toLowerCase()}.mdx`
  ),
  output
);
