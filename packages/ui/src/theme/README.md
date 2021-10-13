# Amplify UI Theme

This package generates the core CSS used by Amplify UI for the web on any framework.

Amplify UI uses CSS to share styling across web frameworks

## Usage

### CSS

Amplify UI exports 2 CSS files:

- `styles.css` contains all the styling needed for Amplify UI
- `theme.css` contains only the default theme CSS variables

You can import the styles in a CSS file:

```css
@import '@aws-amplify/ui/styles.css';
```

You can also import it in the Javascript:

```javascript
import '@aws-amplify/ui/styles.css';
```

### Typescript / Javascript

In addition to the static CSS, this package exports:

- `defaultTheme`: The default `Theme` object which Amplify UI uses for its default theme.
- `createTheme`: A function that takes theme customizations and returns a `Theme` object which contains the CSS needed to theme Amplify UI components

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
  // customize the breakpoints
  breakpoints: {},
  // customize overrides like dark mode or responsive theming
  overrides: [{}],
});

// theme.css returns a string which can be written to a CSS file or place inline in a <style> tag
```

The `createTheme` function

## Theme Structure

An Amplify UI Theme contains

## Tokens

The Amplify UI theme is built with Design Tokens.

The structure of the Amplify UI theme tokens follows the [System-UI Theme Specification](https://system-ui.com/theme/). There are global design tokens that are under the top-level namespaces like `colors`, `fontSizes`, `space`, etc. Then there are component design tokens under the `components` namespace.

### Color

The color scale type is based on research into other UI libraries and how they approach building a base color palette. Some libraries ([Tailwind], [Chakra-UI], [Material], [BaseUI]) use the scale: 50, 100, 200, 300, 400, 500, 600, 700, 800 900, for a total of 10 shades of a color. This also maps to font-weights going from 100-900 as well.

#### Semantic colors

Font colors

Background colors

Border colors

## Breakpoints

## Overrides
