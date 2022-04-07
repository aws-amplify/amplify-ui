const docgen = require('react-docgen-typescript');
const json2md = require('json2md');
const path = require('path');
const { writeFileSync } = require('fs');

const filePath = '../../packages/react/src/primitives/Button/index.ts';

const pathToFile = path.join(__dirname, filePath);

// Parse a file for docgen info
const rawData = docgen.parse(pathToFile)[0];

/**
 * need to treat special characters
 * 1) "|", "<", ">" => replace with unicode "&$<unicode>;"
 * 2) "' + '" => replace with space
 * 3) "\n" => replace with space
 */
const tobeEncoded = new RegExp(/[|<>]|'\s\+\s'|\\n/g);
const getEncoded = (match) =>
  match.match(/[|<>]/) ? `&#${match.charCodeAt()};` : ' ';
const enCodedData = JSON.stringify(rawData).replaceAll(tobeEncoded, getEncoded);

const { props, displayName } = JSON.parse(enCodedData);

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
              name: name.replaceAll(/[{}]/g, '\\$&'),
              type: type.name.replaceAll(/[{}]/g, '\\$&'),
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
  path.resolve(
    __dirname,
    `../src/pages/components/${displayName.toLowerCase()}/react-auto-prop-table-button.mdx`
  ),
  output
);
