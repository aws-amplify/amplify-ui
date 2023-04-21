/**
 * This is a script that runs before publish latest and sets the `@aws-amplify/ui-react-liveness`
 * package.json private field to true so that it is not published by changesets cli publish.
 */

const fs = require('fs');

// Read the package.json file
const packageJson = require(`../packages/react-liveness/package.json`);

// Set the "private" field to true
packageJson.private = true;

// Write the updated package.json file
fs.writeFileSync(
  './packages/react-liveness/package.json',
  JSON.stringify(packageJson, null, 2)
);
