const fs = require('fs/promises');

(async function writeExportsFiles() {
  if (process.env.NODE_ENV !== 'test' || !process.env.ENVIRONMENT_AWS_EXPORTS)
    throw new Error(
      'This script should only be run in the continuous integration environment.'
    );

  const environmentExports = JSON.parse(process.env.ENVIRONMENT_AWS_EXPORTS);

  const environments = [
    ...(await fs.readdir(__dirname, { withFileTypes: true })),
  ]
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);

  for (const environment of environments) {
    const exportsPath = `${__dirname}/${environment}/src`;

    try {
      await fs.mkdir(exportsPath, { recursive: true });
      await fs.writeFile(
        `${exportsPath}/aws-exports.js`,
        `export default ${JSON.stringify(environmentExports[environment])}`
      );
    } catch (err) {
      throw err;
    }
  }
})();
