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

console.log('Output: ', JSON.stringify(res[0], null, 2));
