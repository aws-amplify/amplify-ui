---
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": minor
---

Add default dark mode theme override for React

```jsx
  const theme: Theme = {
    name: 'my-theme',
    overrides: [defaultDarkMode],
  };
  
  // ...
  <AmplifyProvider theme={theme} colorMode="system">
  
  // or
  <AmplifyProvider theme={theme} colorMode={colorMode}>
```
