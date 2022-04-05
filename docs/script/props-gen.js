const docgen = require('react-docgen-typescript');
const json2md = require('json2md');
const path = require('path');
const { writeFileSync } = require('fs');

const filePath = '../../packages/react/src/primitives/Button/index.ts';

const pathToFile = path.join(__dirname, filePath);

// Parse a file for docgen info
const rawData = docgen.parse(pathToFile)[0];

const { props, displayName } = JSON.parse(
  JSON.stringify(rawData)
    .replaceAll("' + '", ' ')
    .replaceAll('|', '&#124;')
    .replaceAll('\\n', ' ')
);

const categorizedProps = Object.entries(props).reduce((acc, curr) => {
  const [key, val] = curr;
  return {
    ...acc,
    [val.declarations[0].name]: {
      ...acc[val.declarations[0].name],
      [key]: val,
    },
  };
}, {});

writeFileSync(
  path.resolve(__dirname, `${displayName}-react-auto-prop-categorized.json`),
  JSON.stringify(categorizedProps, null, 2)
);

const createPropsTable = (data) => {
  return Object.entries(data).flatMap(([categoryName, props]) => {
    return [
      { h3: categoryName },
      {
        table: {
          headers: ['name', 'type', 'default', 'description'],
          rows: Object.values(props).map(
            ({ name, type, defaultValue, description }) => ({
              name,
              type: type.name,
              default: defaultValue ? defaultValue.value.toString() : '',
              description,
            })
          ),
        },
      },
    ];
  });
};

const propsTables = createPropsTable(categorizedProps);

const output = json2md([{ h2: `${displayName} Props` }, ...propsTables]);

writeFileSync(
  path.resolve(__dirname, 'react-auto-prop-table-button.md'),
  output
);
