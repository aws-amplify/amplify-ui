# Amplify UI Theme

## Design Tokens

The Amplify UI theme is built with Design Tokens.

## Build

This package generates the core CSS used by Amplify UI for the web on any framework.

## Usage

### React

```jsx
import { createTheme } from '@aws-amplify/ui';

const myTheme = createTheme({});

<>
  <Head>
    {/* for SSR/SSG */}
    <style>{myTheme.css}</style>
  </Head>
</>;
```

## Structure

The structure of the Amplify UI theme object follows the [System-UI Theme Specification](https://system-ui.com/theme/). There are global design tokens that are under the top-level namespaces like `colors`, `fontSizes`, `space`, etc. Then there are component design tokens under the `components` namespace.
