import docgen from 'react-docgen-typescript';
import json2md from 'json2md';
import { globbyStream } from 'globby';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getData = (pathToFile) => {
  // Parse a file for docgen info
  const rawData = docgen.parse(pathToFile)[0];

  if (!rawData) return {};

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

const getWantedCategories = (displayName) => [
  `${displayName}Props`,
  'BaseComponentProps',
  'BaseStyleProps',
  'RefAttributes',
];

const categorizeProps = (props, wantedCategories) =>
  Object.entries(props).reduce((acc, [key, val]) => {
    const category = val.declarations[0].name;
    const isCategoryToUse = [...wantedCategories, 'TypeLiteral'].includes(
      category
    );
    const categoryKey =
      category === 'TypeLiteral' ? 'BaseComponentProps' : category;
    return {
      ...acc,
      ...(isCategoryToUse && {
        [categoryKey]: {
          ...acc[categoryKey],
          [key]: val,
        },
      }),
    };
  }, {});

const createPropsTable = (props) => {
  return {
    headers: ['Name', 'Type', 'Default', 'Description'],
    rows: props
      ? Object.values(props).map(
          ({ name, type, defaultValue, description }) => ({
            Name: name.replaceAll(/[{}]/g, '\\$&'),
            Type: type.name.replaceAll(/[{}]/g, '\\$&'),
            Default: defaultValue ? defaultValue.value.toString() : '/',
            Description: description,
          })
        )
      : [{ Name: '/', Type: '/', Default: '/', Description: '/' }],
  };
};

const createPropsTableExpander = (data, wantedCategories) =>
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

json2md.converters.Expander = ({ ExpanderItems, displayName }, json2md) => `
<Expander type="multiple" defaultValue={['${displayName}Props']}>
  ${json2md([...ExpanderItems.map((item) => ({ ...item }))])}
</Expander>
`;

json2md.converters.plainText = (text, json2md) => text;

const getOutput = (displayName, propsTables) =>
  json2md([
    {
      plainText: `
import { Expander, ExpanderItem } from '@aws-amplify/ui-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
`,
    },
    { h2: 'Props' },
    {
      Expander: {
        ExpanderItems: propsTables,
        displayName,
      },
    },
  ]);

for await (const filePath of globbyStream(
  path.join(__dirname, '../../packages/react/src/primitives/**/index.ts')
)) {
  const { props, displayName } = getData(filePath);

  const targetPath = path.resolve(
    __dirname,
    `../src/pages/components/${displayName?.toLowerCase()}`
  );

  if (!existsSync(targetPath)) continue;
  if (!props || !displayName) continue;

  const wantedCategories = getWantedCategories(displayName);
  const categorizedProps = categorizeProps(props, wantedCategories);
  const propsTables = createPropsTableExpander(
    categorizedProps,
    wantedCategories
  );
  const output = getOutput(displayName, propsTables);

  writeFileSync(
    path.resolve(
      targetPath,
      `./react-auto-prop-table-${displayName.toLowerCase()}.mdx`
    ),
    output
  );
  console.log(`✅ ${displayName} Props Tables are updated.`);
}

console.log('🎉 Props Tables are all updated.');
