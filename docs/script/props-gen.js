const docgen = require('react-docgen-typescript');
const path = require('path');
const { readFileSync } = require('fs');

// const filePath = '../../packages/react/src/primitives/types/test-component.tsx'; // works!! ✅
// const filePath = '../../packages/react/src/primitives/types/test-component-index.tsx'; // works!! ✅
const filePath = '../../packages/react/src/primitives/Button/index.ts';
// const filePath = '../test-component.tsx';
// const {
//   ButtonProps,
// } = require('@aws-amplify/ui-react/src/primitives/types/button');

const pathToFile = path.join(__dirname, filePath);
const file = readFileSync(pathToFile);

// Parse a file for docgen info
const res = docgen.parse(pathToFile);

console.log('1111111111111', res);
console.log('2222222222222', file);
