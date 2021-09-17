/**
 * This shim exists for `esbuild` to `inject` into every .tsx file.
 * Otherwise, `import * as React from 'react'` would need to be added manually
 *
 * See: https://esbuild.github.io/content-types/#auto-import-for-jsx
 * See: https://github.com/egoist/tsup/issues/390
 * See: https://esbuild.github.io/content-types/#using-jsx-without-react
 */

// index.js:43 Uncaught ReferenceError: global is not defined
// at ../../node_modules/amazon-cognito-identity-js/node_modules/buffer/index.js (index.js:43)
// at __require2 (aws-amplify.js?v=05e33967:15)
//
// See: https://docs.amplify.aws/start/getting-started/setup/q/integration/angular/#angular-6-support
window['global'] = window;

import * as React from 'react';
export { React };

// Support direct Preact usage
export { h, Fragment } from 'preact';
