/**
 * This is a script that generates a constant, `VERSION` with the version
 * of the package. The version of a package will be used in logging and error messages.
 */
const { resolve, join } = require('path');
const fs = require('fs-extra');

const packages = [
  'packages/angular/projects/ui-angular',
  'packages/react',
  'packages/react-ai',
  'packages/react-geo',
  'packages/react-native',
  'packages/react-notifications',
  'packages/react-liveness',
  'packages/react-storage',
  'packages/svelte',
  'packages/vue',
];

packages.forEach((package) => {
  const { version } = require(`../${package}/package.json`);
  const srcDir = package.includes('svelte') ? join('src', 'lib') : 'src';
  const targetFile = resolve(join(package, srcDir, 'version.ts'));
  fs.writeFileSync(targetFile, `export const VERSION = '${version}';\n`);
});
