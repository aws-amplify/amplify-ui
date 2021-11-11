---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

Adding support for token style props in React components and moving `createTheme` inside the AmplifyProvider so users don't have to call it directly in React. 

```jsx
const theme: Theme = {
  name: 'my-theme',
  tokens: {
    //...
  }
}

const App = () => {
  return (
    <AmplifyProvider theme={theme}>

    </AmplifyProvider>
  )
}
```

Then using theme tokens in a style prop:

```jsx
import { useTheme, Text } from '@aws-amplify/ui-react';

const MyComponent = () => {
  const { tokens } = useTheme();
  return (
    <Text color={tokens.colors.font.error}>Error!</Text>
  )
}
```

The ui-react package is now exporting the `Theme` type to make it easier to define a theme object outside of the `createTheme` method. 
