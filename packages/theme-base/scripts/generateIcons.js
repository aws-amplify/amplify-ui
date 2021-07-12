const glob = require('glob');
const fs = require('fs-extra');
const {pascalCase} = require('change-case');

const dirPath = `dist/react/`;
fs.removeSync(dirPath); // we could also do this in an npm script with rimraf

const iconNames = [];

// we should probably use path.resolve and __dirname here I think
// in case we run the npm from the root or this package
glob("../../material-design-icons/src/**/materialicons/*.svg", function (er, files) {
  
  files.forEach(filePath => {
    const iconName = `Icon${pascalCase(filePath.split('/')[5])}`;
    const source = fs.readFileSync(filePath, {encoding:'utf8'});
    const outputPath = `${dirPath}${iconName}.jsx`;

    // apparently there are some duplicates?
    if (iconNames.indexOf(iconName) >= 0) {
      return;
    }
    
    const reactCode = `import React from 'react';
export const ${iconName} = () => {
  return (
    ${source.replace('<path d="M0 0h24v24H0V0z" fill="none"/>','')}
  )
};`
    fs.ensureDirSync(dirPath);
    fs.writeFileSync(outputPath, reactCode);
    iconNames.push(iconName);
  });
  
  const reactCode = iconNames.map(iconName => {
    return `export * from './${iconName}'`;
  }).join(`\n`);
  
  fs.writeFileSync(`${dirPath}index.js`, reactCode);
});