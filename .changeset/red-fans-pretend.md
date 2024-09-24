---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

feat(theming): add global style ability (experimental)

Adding the ability to create global styles with the experimental theming APIs

```jsx
<GlobalStyle styles={{
  'body': {
    backgroundColor: 'purple'
    // supports design tokens!
    color: theme.tokens.colors.font.primary
  }
}} />
```
