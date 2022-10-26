/**
 * This is a script that generates a constant, `VERSION` with the version
 * of the package. The version of a package will be used in logging and error messages.
 */
const path = require('path');
const fs = require('fs-extra');
const pkg = require(path.resolve('./package.json'));

const { version } = pkg;

const outputPath = process.argv[2] || `./src/version.ts`;

fs.writeFileSync(
  path.resolve(outputPath),
  `export const VERSION = '${version}';`
);
