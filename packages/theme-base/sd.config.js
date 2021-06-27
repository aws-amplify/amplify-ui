/*
 * Style Dictionary config
 */

const { formatHelpers } = require("style-dictionary");

const THEME_NAME = "BaseTheme";
const CSS_VARIABLE_PREFIX = "amplify-ui";
const CSS_VARIABLE_SCOPE = ":root";

module.exports = {
  source: ["src/tokens/**/*.json"],
  platforms: {
    css: {
      transforms: ["attribute/cti", "name/cti/kebab"],
      prefix: CSS_VARIABLE_PREFIX,
      files: [
        {
          destination: "dist/variables.css",
          format: "css/variables",
          options: {
            selector: CSS_VARIABLE_SCOPE,
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: "js",
      files: [
        {
          destination: "dist/theme.js",
          format: "javascript/cjs-nested",
          options: { name: THEME_NAME },
        },
      ],
    },
    json: {
      files: [
        {
          destination: "dist/theme.json",
          format: "json/nested",
        },
      ],
    },
  },
  format: {
    "javascript/cjs-nested": CommonJSNestedFormatter,
  },
};

/*
 * CommonJS + Nested formatter
 * Exports a theme (minified) as a named export
 */
function CommonJSNestedFormatter({ dictionary, options, file }) {
  const { fileHeader, minifyDictionary } = formatHelpers;
  const themeName = options.name;

  const moduleExports = {
    [themeName]: minifyDictionary(dictionary.tokens),
  };

  return (
    fileHeader({ file }) +
    `module.exports = ${JSON.stringify(moduleExports, null, 2)};`
  );
}
