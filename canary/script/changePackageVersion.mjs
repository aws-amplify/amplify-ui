import { globbyStream } from 'globby';
import fs from 'fs';
import { pathToFileURL } from 'url';

const args = process.argv.slice(2);
const packageName = args?.length > 0 && args[0];
const distTag = args?.length > 1 && args[1];

if (!packageName) {
  throw new Error('You must specify a package name.');
}

if (!distTag) {
  throw new Error('You must specify dist-tag for the Amplify UI packages.');
}

for await (const path of globbyStream('./apps/*/*/package.json')) {
  const pkgJSON = JSON.parse(fs.readFileSync(path));
  const { dependencies } = pkgJSON;
  if (dependencies) {
    let pkgToUpdate;
    Object.keys(dependencies)
      .filter((dependency) => dependency === packageName)
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
