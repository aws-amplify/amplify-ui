# Amplify UI Design Tokens

## Design Tokens

## Build

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
