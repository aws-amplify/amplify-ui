import { formatHelpers } from 'style-dictionary';

export const REACT_NATIVE_TOKENS = [
  'colors',
  'fontSizes',
  'fontWeights',
  'opacities',
  'radii',
  'space',
  'time',
];

// TODO: scope to token key (e.g. `space`, 'fontSize`)
const EXCLUDED_TOKENS = ['zero', 'xxxs', 'xxxxl', 'relative', 'hover'];

const buildRNTokens = (obj: object) => {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }
  var retObj = {};
  if (Object.prototype.hasOwnProperty.call(obj, 'value')) {
    return obj['value'];
  } else {
    for (var name in obj) {
      if (
        !EXCLUDED_TOKENS.includes(name) &&
        Object.prototype.hasOwnProperty.call(obj, name)
      ) {
        retObj[name] = buildRNTokens(obj[name]);
      }
    }
  }
  return retObj;
};

const ReactNativeFormat = ({ dictionary, file }): string => {
  const { fileHeader } = formatHelpers;

  return (
    fileHeader({ file }) +
    `import { ReactNativeTokens } from '../types';

const baseTokens: ReactNativeTokens<'default'> = ${JSON.stringify(
      buildRNTokens(dictionary.tokens),
      null,
      2
    )};
export default baseTokens;`
  );
};

// will hide name collision warnings because it is a nested object format
ReactNativeFormat.nested = true;

export { ReactNativeFormat };
