/*
 * This Script change all package.json fils under canary/ .
 * It changes `@aws-amplify/ui-{framework}` version to `next`.
 */

import { globbyStream } from 'globby';
import fs from 'fs';
import { pathToFileURL } from 'url';

for await (const path of globbyStream('canary/apps/**/package.json')) {
  const pkgJSON = JSON.parse(fs.readFileSync(path));
  const { dependencies } = pkgJSON;
  if (dependencies) {
    let pkgToUpdate;
    Object.keys(dependencies)
      .filter((dependency) => dependency.includes('@aws-amplify/ui'))
      .forEach((key) => {
        dependencies[key] = 'next';
        pkgToUpdate = key;
      });
    fs.writeFileSync(path, JSON.stringify(pkgJSON, null, 2) + '\n');
    console.log(
      `✅ Updated ${pkgToUpdate} to "next" for ${pathToFileURL(path)}`
    );
  }
}
