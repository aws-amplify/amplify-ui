---
"@aws-amplify/ui-react-native": patch
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

fix(react-native): border widths, spacing, font sizes, opacities in the theme don't throw runtime errors.

These are all valid in a theme now:

```typescript
const theme: Theme = {
  tokens: {
    borderWidths: {
      small: '4',
      medium: '1rem',
      large: 6,
    },
    opacities: {
      '10': '0.2',
    },
    space: {
      small: 4,
      medium: '6',
      large: '{space.small.value}',
    },
    fontSizes: {
      small: '1rem',
    },
  },
}
```
