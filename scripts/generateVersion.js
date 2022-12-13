/**
 * This is a script that generates a constant, `VERSION` with the version
 * of the package. The version of a package will be used in logging and error messages.
 */
const path = require('path');
const fs = require('fs-extra');

const packages = [
  'packages/angular/projects/ui-angular',
  'packages/react',
  'packages/react-native',
  'packages/vue',
];

packages.forEach((package) => {
  const { version } = require(`../${package}/package.json`);

  fs.writeFileSync(
    path.resolve(`${package}/src/version.ts`),
    `export const VERSION = '${version}';\n`
  );
});
