/**
 * This is a script that generates a constant, `VERSION` with the version
 * of the package. The version of a package will be used in logging and error messages.
 */
const path = require('path');
const fs = require('fs-extra');

const packages = [
  'packages/angular/projects/ui-angular',
  'packages/react',
  'packages/react-ai',
  'packages/react-auth',
  'packages/react-geo',
  'packages/react-native',
  'packages/react-native-auth',
  'packages/react-notifications',
  'packages/react-liveness',
  'packages/react-storage',
  'packages/vue',
];

packages.forEach((package) => {
  const { version } = require(`../${package}/package.json`);

  fs.writeFileSync(
    path.resolve(`${package}/src/version.ts`),
    `export const VERSION = '${version}';\n`
  );
});
