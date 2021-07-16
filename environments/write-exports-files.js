const fs = require('fs/promises');

(async function writeExportsFiles() {
  if (!process.env.ENVIRONMENT_AWS_EXPORTS)
    throw new Error(
      'aws-exports files must be included in environment variables.'
    );

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
        `${exportsPath}/aws-exports.json`,
        JSON.stringify(process.env.ENVIRONMENT_AWS_EXPORTS[environment])
      );
    } catch (err) {
      throw err;
    }
  }
})();
