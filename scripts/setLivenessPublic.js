/**
 * This is a script that runs before publish latest and sets the `@aws-amplify/ui-react-liveness`
 * package.json private field to flase so that it is published to the next tag.
 */

const fs = require('fs');

// Read the package.json file
const packageJson = require(`../packages/react-liveness/package.json`);

// Set the "private" field to false
packageJson.private = false;

// Write the updated package.json file
fs.writeFileSync(
  './packages/react-liveness/package.json',
  JSON.stringify(packageJson, null, 2)
);
