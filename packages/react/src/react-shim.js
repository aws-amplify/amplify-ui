/**
 * This shim exists for `esbuild` to `inject` into every .tsx file.
 * Otherwise, `import * as React from 'react'` would need to be added manually
 *
 * See: https://esbuild.github.io/content-types/#auto-import-for-jsx
 */

import * as React from 'react';
export { React };
