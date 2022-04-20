import docgen from 'react-docgen-typescript';
import json2md from 'json2md';
import { globbyStream } from 'globby';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, writeFileSync } from 'fs';

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

const TARGETED_CATEGORIES = ['Props', 'Layout', 'Styling'];
const EXCLUDED_CATEGORIES = [
  'AnchorHTMLAttributes',
  'AriaAttributes',
  'Attributes',
  'ButtonHTMLAttributes',
  'DOMAttributes',
  'HTMLAttributes',
  'ImgHTMLAttributes',
  'InputHTMLAttributes',
  'SelectHTMLAttributes',
  'SVGAttributes',
  'TableHTMLAttributes',
  'TextareaHTMLAttributes',
];

const CATEGORY_MAP = {
  AriaProps: 'Props',
  BaseComponentProps: 'Props',
  BasePaginationProps: 'Props',
  BaseStyleProps: 'Styling',
  ButtonProps: 'Props',
  CheckboxProps: 'Props',
  CollectionBaseProps: 'Props',
  CollectionWrapperProps: 'Props',
  CSSLayoutStyleProps: 'Layout',
  DividerOptions: 'Props',
  FieldProps: 'Props',
  FlexContainerStyleProps: 'Layout',
  FlexItemStyleProps: 'Layout',
  GridContainerStyleProps: 'Props',
  GridContainerStyleProps: 'Props',
  GridItemStyleProps: 'Layout',
  ImageOptions: 'Props',
  ImageStyleProps: 'Props',
  InputProps: 'Props',
  LinkOptions: 'Props',
  RatingOptions: 'Props',
  RefAttributes: 'Props',
  SelectProps: 'Props',
  SliderProps: 'Props',
  TextAreaProps: 'Props',
  TextAreaStyleProps: 'Props',
  TextFieldOptions: 'Props',
  TextFieldOptions: 'Props',
  TextProps: 'Props',
  TypeLiteral: 'Props',
  ViewProps: 'Props',
};

const categorizeProps = (displayName, props, wantedCategories) =>
  Object.entries(props).reduce((acc, [key, val]) => {
    const category = val.declarations[0].name;
    const isCategoryToUse = wantedCategories.includes(category);
    const categoryKey =
      `${displayName}Props` === category ? 'Props' : CATEGORY_MAP[category];
    if (categoryKey) {
      return {
        ...acc,
        ...(isCategoryToUse && {
          [categoryKey]: {
            ...acc[categoryKey],
            [key]: val,
          },
        }),
      };
    } else if (!EXCLUDED_CATEGORIES.includes(category)) {
      console.log(
        `${category} is excluded, but it's not in the excludedCategories Array. Are you sure to exclude it?`
      );
      return acc;
    } else {
      return acc;
    }
  }, {});

const createPropsTable = (props) => {
  return {
    headers: ['Name', 'Type', 'Default', 'Description'],
    rows: props
      ? Object.values(props)
          .map(({ name, type, defaultValue, description }) => ({
            Name: name.replaceAll(/[{}]/g, '\\$&'),
            Type: type.name.replaceAll(/[{}]/g, '\\$&'),
            Default: defaultValue ? defaultValue.value.toString() : '/',
            Description: description,
          }))
          .sort(({ Name: a }, { Name: b }) => a.localeCompare(b))
      : [{ Name: '/', Type: '/', Default: '/', Description: '/' }],
  };
};

const createPropsTableExpander = (data, targetedCategories) =>
  targetedCategories.reduce(
    (acc, category) => [
      ...acc,
      {
        ExpanderItem: {
          title: category === 'Props' ? 'Amplify UI Props' : category,
          value: category,
          children: [
            {
              table: createPropsTable(data[category]),
            },
          ],
        },
      },
    ],
    []
  );

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
<Expander type="multiple" defaultValue={['Props']}>
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

  // const wantedCategories = getWantedCategories(displayName);
  const wantedCategories = Object.keys(
    Object.values(props).reduce((acc, curr) => {
      const category = curr.declarations
        ? curr.declarations[0].name
        : undefined;
      return {
        ...acc,
        ...(category &&
          `${displayName}Props` !== category && {
            [category]: [category],
          }),
      };
    }, {})
  ).sort();

  wantedCategories.unshift(`${displayName}Props`);

  const categorizedProps = categorizeProps(
    displayName,
    props,
    wantedCategories
  );

  const propsTables = createPropsTableExpander(
    categorizedProps,
    TARGETED_CATEGORIES
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
