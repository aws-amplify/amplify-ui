import { formatHelpers } from 'style-dictionary';

/*
  minifyDictionary helper is missing from FormatHelpers interface in style-dictionary
  TODO: remove once https://github.com/amzn/style-dictionary/pull/834/files# is merged
*/
function minifyDictionary(obj) {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }
  var toRet = {};
  // eslint-disable-next-line no-prototype-builtins
  if (obj.hasOwnProperty('value')) {
    return obj.value;
  } else {
    for (var name in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(name)) {
        toRet[name] = minifyDictionary(obj[name]);
      }
    }
  }
  return toRet;
}

const RNFormat = ({ dictionary, file }): string => {
  const { fileHeader } = formatHelpers;

  return (
    fileHeader({ file }) +
    `const theme = ${JSON.stringify(
      minifyDictionary(dictionary.tokens),
      null,
      2
    )};
    export default theme;`
  );
};

// will hide name collision warnings because it is a nested object format
RNFormat.nested = true;

export { RNFormat };
