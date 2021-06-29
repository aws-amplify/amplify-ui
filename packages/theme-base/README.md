# Amplify UI Base Theme

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
import { ThemeProvider, Button } from "@aws-amplify/ui-react";
import { BaseTheme } from "@aws-amplify/ui-theme-base";

const ThemedApp = (
  <ThemeProvider theme={BaseTheme}>
    <Button variant="primary">Click me!</Button>
  </ThemeProvider>
);
```

or using a utility function:

```jsx
import { withTheme, Button } from "@aws-amplify/ui-react";
import { BaseTheme } from "@aws-amplify/ui-theme-base";

const ThemedApp = withTheme(
  BaseTheme,
  <Button variant="primary">Click me!</Button>
);
```

### Other CSS-supported platforms

```jsx
import "@aws-amplify/ui-theme-base/dist/theme.css";

const ThemedApp = (
  <button class="amplify-ui-button" data-size="large" data-variant="primary">
    Click me!
  </button>
);
```
