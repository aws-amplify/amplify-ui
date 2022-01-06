/**
 * This shim exists for `esbuild` to `inject` into every .tsx file.
 * Otherwise, `import * as React from 'react'` would need to be added manually
 *
 * See: https://esbuild.github.io/content-types/#auto-import-for-jsx
 * See: https://github.com/egoist/tsup/issues/390
 */

window['global'] = window;

import * as React from 'react';
export { React };
