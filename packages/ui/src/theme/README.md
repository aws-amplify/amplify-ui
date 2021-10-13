# Amplify UI Theme

This package generates the core CSS used by Amplify UI for the web on any framework.

Amplify UI uses CSS to share styling across web frameworks

## Usage

### CSS

Amplify UI exports 2 CSS files:

- `styles.css` contains all the styling needed for Amplify UI
- `theme.css` contains only the

You can

```css
@import '@aws-amplify/ui/styles.css';
```

You can also import the Javascript

```javascript
import '@aws-amplify/ui/styles.css';
```

### Typescript / Javascript

```typescript
import { createTheme, defaultTheme } from '@aws-amplify/ui';

export const theme = createTheme({
  tokens: {
    colors: {
      brand: {
        // You can
        primary: defaultTheme.colors.blue,
      },
    },
  },
});
```

The `createTheme` function

## Design Tokens

The Amplify UI theme is built with Design Tokens.

## Tokens

The structure of the Amplify UI theme tokens follows the [System-UI Theme Specification](https://system-ui.com/theme/). There are global design tokens that are under the top-level namespaces like `colors`, `fontSizes`, `space`, etc. Then there are component design tokens under the `components` namespace.

### Color

The color scale type is based on research into other UI libraries and how they approach building a base color palette. Some libraries ([Tailwind], [Chakra-UI], [Material], [BaseUI]) use the scale: 50, 100, 200, 300, 400, 500, 600, 700, 800 900, for a total of 10 shades of a color. This also maps to font-weights going from 100-900 as well.

#### Semantic colors

Font colors

Background colors

Border colors

## Breakpoints

## Overrides
