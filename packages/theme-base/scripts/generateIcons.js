const glob = require('glob');
const fs = require('fs-extra');
const { pascalCase } = require('change-case');

const dirPath = `dist/react-icons/`;
const iconSetPath = '../../material-design-icons/src/**/materialicons/*.svg';
const iconNames = [];

glob(iconSetPath, function (error, files) {
  if (error) {
    throw error;
  }
  files.forEach((filePath) => {
    const iconName = `Icon${pascalCase(filePath.split('/')[5])}`;
    const source = fs.readFileSync(filePath, { encoding: 'utf8' });
    const outputPath = `${dirPath}${iconName}.tsx`;

    // apparently there are some duplicates and we start with the plain ones
    if (iconNames.indexOf(iconName) >= 0) {
      return;
    }

    const reactIconComponent = `import React from 'react';
export const ${iconName} = (props) => {
	const {
		size = "medium",
		fill = "currentColor",
		ariaLabel,
		...rest
	} = props;
	return (
		${source
      .replace('class="st0"', '')
      .replace(/style="fill:none"/g, '')
      .replace('<path d="M0 0h24v24H0z" fill="none"/>', '')
      .replace('width="24"', `className="amplify-ui-icon"`)
      .replace(
        'height="24"',
        'data-size={size} aria-label={ariaLabel} fill={fill} {...rest}'
      )}
	);
};`;
    fs.ensureDirSync(dirPath);
    fs.writeFileSync(outputPath, reactIconComponent);
    iconNames.push(iconName);
  });

  const iconExportsFile = iconNames
    .map((iconName) => {
      return `export * from './${iconName}';`;
    })
    .join(`\n`);
  fs.ensureDirSync(dirPath);
  fs.writeFileSync(`${dirPath}index.tsx`, iconExportsFile);
});
