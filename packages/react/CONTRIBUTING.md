# Contributing

## Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn setup`
1. Run `yarn react dev`

This will start building `@aws-amplify/ui-react` in watch mode. To test your changes, you can utilize [`examples/next`](../../examples/next) to run examples on `next.js`. Please see examples [README](../../examples/README.md) and e2e [README](../e2e/README.md#contributing) to get started.

## Dependencies

`@aws-amplify/ui-react` depends on [`@aws-amplify/ui`](../ui) for theming, state management, and translation logic. If you're looking for change in these, please refer to `@aws-amplify/ui` [README](../ui/README.md).

## Code Standards

### Imports

Separate all imports into organized, alphabetical blocks of `third_party → internal → local` for easier reading.

```js
import { isEmpty } from 'lodash/isEmpty';
import * as React from 'react';

import { Auth } from 'aws-amplify';

import { Button } from './primitives/Button';
import { THIS_ENUM } from './utils/types';
```

Do **NOT** use implicit paths like below. This can lead to circular dependencies unintentionally which is bad for tree shaking.

```js
import { Flex, Heading } from '../../..';
```

Use explicit import paths instead, the more specific the better.

```js
import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
```

### Variable Naming

1. Component names should be capitalized.
2. Boolean props should be prefixed with `is` and default to `false`.

### Others

Do **NOT** introduce any [side effects](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) unless you have to with rational reasons. A "side effect" is defined as code that performs a special behavior when imported, other than exposing one or more exports. An example of this are polyfills, which affect the global scope and usually do not provide an export. For example:

```js
import './polyfill';
```

Any imported file is subject to tree shaking, that means CSS file needs to be added to the side effect list so it will not be unintentionally dropped:

```js
import './style.css';
```

## Testing for Production

After you tested your change, you can run `yarn react build` from monorepo to run build for production.
