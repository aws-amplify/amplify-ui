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

```javascript
import { createTheme, defaultTheme } from '@aws-amplify/ui';

export const theme = createTheme({
  tokens: {
    colors: {
      brand: {
        primary: defaultTheme.colors.blue,
      },
    },
  },
  // customize the breakpoints
  breakpoints: {},
  // customize overrides like dark mode or responsive theming
  overrides: [{}],
});

// theme.css returns a string which can be written to a CSS file or placed inline in a <style> tag
```

## Theme Structure

### Tokens

The Amplify UI theme is built with Design Tokens. The structure of the Amplify UI theme tokens follows the [System-UI Theme Specification](https://system-ui.com/theme/). There are global design tokens that are under the top-level namespaces like `colors`, `fontSizes`, `space`, etc. Then there are component design tokens under the `components` namespace.

### Breakpoints

Breakpoints allow you to set media query breakpoints for responsive design. You can then define breakpoint-specific token overrides or use the breakpoints for different layouts in Javascript.

```typescript
export interface Breakpoints {
  values: {
    base: number;
    small: number;
    medium: number;
    large: number;
    xl: number;
    xxl: number;
  };
  unit: string;
  defaultBreakpoint: string;
}
```

You can modify default breakpoints in the `createTheme` method:

```javascript
import { createTheme } from '@aws-amplify/ui';

const myTheme = createTheme({
  name: 'my-theme',
  breakpoints: {
    // createTheme does a deep merge with the default theme
    // so you don't have to override all the breakpoint values
    values: {
      // default unit is 'em'
      medium: 50,
    },
  },
  //...
});
```

### Overrides

An `override` is a collection of design tokens that should take precedence in certain situations, like dark mode. Overrides are built into the theme configuration, but kept separate, so that Amplify UI can use CSS for overriding parts of the theme.

```javascript
import { createTheme } from '@aws-amplify/ui';

export const theme = createTheme({
  name: 'my-theme',
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        colors: {
          neutral: {
            10: { value: defaultTheme.tokens.colors.neutral[100].value },
            20: { value: defaultTheme.tokens.colors.neutral[90].value },
            40: { value: defaultTheme.tokens.colors.neutral[80].value },
            80: { value: defaultTheme.tokens.colors.neutral[40].value },
            90: { value: defaultTheme.tokens.colors.neutral[20].value },
            100: { value: defaultTheme.tokens.colors.neutral[10].value },
          },
          black: { value: '#fff' },
          white: { value: '#000' },
        },
      },
    },
    {
      breakpoint: 'large',
      tokens: {
        space: {
          small: { value: '1rem' },
          medium: { value: '2rem' },
          large: { value: '3rem' },
        },
      },
    },
  ],
});
```

You can override design tokens in CSS by using a media query or adding extra selectors to `[data-amplify-theme="{theme.name}"]`.

```css
@media (prefers-color-scheme: dark) {
  [data-amplify-theme='my-theme'] {
    --amplify-colors-black: #fff;
    --amplify-colors-white: #fff;
  }
}

[data-amplify-theme='my-theme'].disco {
  --amplify-colors-font-primary: pink;
}
```
