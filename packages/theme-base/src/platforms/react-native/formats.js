const { formatHelpers } = require('style-dictionary');

function RNFormat({ dictionary, file }) {
  const { fileHeader, minifyDictionary } = formatHelpers;

  return (
    fileHeader({ file }) +
    `const theme = ${JSON.stringify(
      minifyDictionary(dictionary.tokens),
      null,
      2
    )};
export default theme;`
  );
}

// will hide name collision warnings because it is a nested object format
RNFormat.nested = true;

module.exports = {
  RNFormat,
};
