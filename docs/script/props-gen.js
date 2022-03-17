const docgen = require('react-docgen-typescript');
const path = require('path');
const { readFileSync } = require('fs');

const filePath = '../../packages/react/src/primitives/Button/index.ts';

const pathToFile = path.join(__dirname, filePath);

const options = {
  skipChildrenPropWithoutDoc: true,
};

// Parse a file for docgen info
const res = docgen.parse(pathToFile);

const categorized = Object.entries(res[0].props).reduce((acc, curr) => {
  const [key, val] = curr;
  debugger;
  return {
    ...acc,
    [val.declarations[0].name]: {
      ...acc[val.declarations[0].name],
      [key]: val,
    },
  };
}, {});

console.log(categorized);
