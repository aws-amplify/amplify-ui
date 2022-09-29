import { formatHelpers } from 'style-dictionary';

const EXCLUDED_TOKENS = [
  'borderWidths',
  'components',
  'fonts',
  'lineHeights',
  'outlineOffsets',
  'outlineWidths',
  'shadows',
  'relative',
  'transforms',
];

const buildRNTokens = (obj) => {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }
  var retObj = {};
  if (obj.hasOwnProperty('value')) {
    return obj.value;
  } else {
    for (var name in obj) {
      if (!EXCLUDED_TOKENS.includes(name) && obj.hasOwnProperty(name)) {
        retObj[name] = buildRNTokens(obj[name]);
      }
    }
  }
  return retObj;
};

const RNFormat = ({ dictionary, file }): string => {
  const { fileHeader } = formatHelpers;

  return (
    fileHeader({ file }) +
    `const theme = ${JSON.stringify(buildRNTokens(dictionary.tokens), null, 2)};
     export default theme;`
  );
};

// will hide name collision warnings because it is a nested object format
RNFormat.nested = true;

export { RNFormat };
