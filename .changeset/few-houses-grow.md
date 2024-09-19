---
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": minor
---

feat(theming) add custom component style rendering

```jsx
const customComponentTheme = defineComponentTheme({
  name: 'custom-component',
  theme(tokens) {
    return {
      color: tokens.colors.red[10]
    }
  }
});

export function CustomComponent() {
  return (
    <>
      <View className={customComponentTheme.className()}>
      </View>
      // This will create a style tag with only the styles in the component theme
      // the styles are scoped to the global theme
      <ComponentStyle theme={theme} componentThemes=[customComponentTheme] />
    </>
  )
}
```
