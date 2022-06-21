---
"@aws-amplify/ui": patch
---

fix(ui): Fixes max call stack issue on `createTheme` when passing a theme object with non-design-token nodes.

```javascript
const theme = createTheme({
  name: 'my-theme',
  tokens: {
    colors: {
      background: {
        // this should be primary: { value: '#f90' }
        primary: '#f90',
      },
    },
  },
});
```
