const docgen = require('react-docgen-typescript');
const json2md = require('json2md');
const path = require('path');
const { writeFileSync } = require('fs');

const filePath = '../../packages/react/src/primitives/Button/index.ts';

const pathToFile = path.join(__dirname, filePath);

const options = {
  skipChildrenPropWithoutDoc: true,
};

// Parse a file for docgen info
const res = docgen.parse(pathToFile);

const categorizedProps = Object.entries(res[0].props).reduce((acc, curr) => {
  const [key, val] = curr;
  return {
    ...acc,
    [val.declarations[0].name]: {
      ...acc[val.declarations[0].name],
      [key]: val,
    },
  };
}, {});

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

const output = json2md([{ h3: `${res[0].displayName} Props` }, ...propsTables]);

writeFileSync(
  path.resolve(__dirname, 'react-auto-prop-categorized.json'),
  JSON.stringify(categorizedProps, null, 2)
);
writeFileSync(
  path.resolve(__dirname, 'react-auto-prop-table-button.md'),
  output
);
