const glob = require('glob');
const fs = require('fs-extra');
const { pascalCase } = require('change-case');

const dirPath = `./src/primitives/Icon/icons/`;
const iconSetPath = '../ui/src/icons/*.svg';
const iconNames = [];

const INTERNAL_ICONS = [
  'Icon',
  'IconAdd',
  'IconCheck',
  'IconCheckCircle',
  'IconCheckCircleOutline',
  'IconChevronLeft',
  'IconChevronRight',
  'IconClose',
  'IconError',
  'IconExpandMore',
  'IconFiberManualRecord',
  'IconHighlightOff',
  'IconInfo',
  'IconMenu',
  'IconRemove',
  'IconSearch',
  'IconStar',
  'IconVisibility',
  'IconVisibilityOff',
  'IconWarning',
];

const template = ({ iconName, source }) => {
  const isDeprecatedIcon = !INTERNAL_ICONS.includes(iconName);
  const deprecationJSDoc = `/**
   * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. \`import { ${iconName} } from '@aws-amplify/ui-react';\` → \`import { Md${iconName.replace(
    'Icon',
    ''
  )} } from 'react-icons/md';\`
   */`;
  const importDeprecationWarning = isDeprecatedIcon
    ? `import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';`
    : '';
  const useDeprecationWarningCode = isDeprecatedIcon
    ? `useDeprecationWarning({
    shouldWarn: ${isDeprecatedIcon},
    message: \`Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.\nimport { ${iconName} } from '@aws-amplify/ui-react'; → import { Md${iconName.replace(
        'Icon',
        ''
      )} } from 'react-icons/md';\`,
  });`
    : '';

  return `import classNames from 'classnames';

  import { ComponentClassNames } from '../../shared';
  import { View } from '../../View';
  ${importDeprecationWarning}

  ${isDeprecatedIcon ? deprecationJSDoc : ''}
  export const ${iconName} = (props) => {
    const { className, ...rest } = props;
    ${useDeprecationWarningCode}
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
