const fs = require("fs/promises");

(async function writeExportsFiles() {
  if (!process.env.ENVIRONMENT_AWS_EXPORTS)
    throw new Error(
      "aws-exports files must be included in environment variables."
    );

  const environmentExports = JSON.parse(
    Buffer.from(process.env.ENVIRONMENT_AWS_EXPORTS, "base64")
  );

  const environments = [
    ...(await fs.readdir(__dirname, { withFileTypes: true })),
  ]
    .filter(dirent => dirent.isDirectory())
    .map(({ name }) => name);

  for (const environment of environments) {
    try {
      await fs.mkdir(`${environment}/src`, { recursive: true });
      await fs.writeFile(
        `${__dirname}/${environment}/src/aws-exports.json`,
        JSON.stringify(environmentExports[environment])
      );
    } catch (err) {
      throw err;
    }
  }
})();
