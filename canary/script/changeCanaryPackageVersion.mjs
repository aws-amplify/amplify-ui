/*
 * This Script change all package.json fils under canary/ .
 * It changes `@aws-amplify/ui-{framework}` version to `next`.
 */

import { globbyStream } from 'globby';
import fs from 'fs';
import { pathToFileURL } from 'url';

const args = process.argv.slice(2);
const distTag = args?.length > 0 && args[0];

if (!distTag) {
  throw new Error('You must specify dist-tag for the Amplify UI packages.');
}

for await (const path of globbyStream('./apps/*/*/package.json')) {
  const pkgJSON = JSON.parse(fs.readFileSync(path));
  const { dependencies } = pkgJSON;
  if (dependencies) {
    let pkgToUpdate;
    Object.keys(dependencies)
      .filter((dependency) => dependency.includes('@aws-amplify/ui'))
      .forEach((key) => {
        dependencies[key] = distTag;
        pkgToUpdate = key;
      });
    fs.writeFileSync(path, JSON.stringify(pkgJSON, null, 2) + '\n');
    console.log(
      `✅ Updated ${pkgToUpdate} to ${distTag} for ${pathToFileURL(path)}`
    );
  }
}
