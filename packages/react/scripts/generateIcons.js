const glob = require('glob');
const fs = require('fs-extra');
const { pascalCase } = require('change-case');

const dirPath = `./src/primitives/Icon/icons/`;
const iconSetPath = '../ui/src/icons/*.svg';
const iconNames = [];

const template = ({ iconName, source }) => {
  return `import classNames from 'classnames';

  import { ComponentClassNames } from '../../shared';
  import { View } from '../../View';

  /**
   * @internal For internal Amplify UI use only. May be removed in a future release.
   */
  export const ${iconName} = (props) => {
    const { className, ...rest } = props;

    return (
      <View
        as='span'
        width='1em'
        height='1em'
        className={classNames(ComponentClassNames.Icon, className)}
        {...rest}
      >
        ${source.replace('black', 'currentColor')}
      </View>
    );
  }
`;
};

fs.ensureDirSync(dirPath);
glob(iconSetPath, function (error, files) {
  if (error) {
    throw error;
  }
  files.forEach((filePath) => {
    const pathParts = filePath.split('/');
    const iconName = `Icon${pascalCase(
      pathParts[pathParts.length - 1].replace('.svg', '')
    )}`;
    const source = fs.readFileSync(filePath, { encoding: 'utf8' });
    const outputPath = `${dirPath}${iconName}.tsx`;

    const output = template({ iconName, source });
    fs.writeFileSync(outputPath, output);
    iconNames.push(iconName);
  });

  const index = iconNames
    .map((iconName) => {
      return `export * from './${iconName}';`;
    })
    .join('\n');
  fs.writeFileSync(`${dirPath}/index.tsx`, index);
});
