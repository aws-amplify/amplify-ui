# Amplify UI Design Tokens

## Design Tokens

- Colors
- Spacing
- Sizes
- Typography: font sizes & weights
- Borders: radius
- Components: Button

## Build

```bash
yarn run build # or npm run build
```

Output:

```
> style-dictionary build

css
✔︎ dist/variables.css

js
✔︎ dist/theme.js

json
✔︎ dist/theme.json

✨  Done in 0.45s.
```

## Usage

### React

```jsx
import { ThemeProvider, Button } from '@aws-amplify/ui-react';
import { theme } from '@aws-amplify/ui';

const ThemedApp = (
  <ThemeProvider theme={BaseTheme}>
    <Button variation="primary">Click me!</Button>
  </ThemeProvider>
);
```

or using a utility function:

```jsx
import { withTheme, Button } from '@aws-amplify/ui-react';
import { theme } from '@aws-amplify/ui';

const ThemedApp = withTheme(
  BaseTheme,
  <Button variation="primary">Click me!</Button>
);
```

### Other CSS-supported platforms

```jsx
import '@aws-amplify/ui/dist/theme.css';

const ThemedApp = (
  <button class="amplify-ui-button" data-size="large" data-variation="primary">
    Click me!
  </button>
);
```

## Structure

The structure of the Amplify UI theme object follows the [System-UI Theme Specification](https://system-ui.com/theme/). There are global design tokens that are under the top-level namespaces like `colors`, `fontSizes`, `space`, etc. Then there are component design tokens under the `components` namespace.
