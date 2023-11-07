---
"@aws-amplify/ui": major
"@aws-amplify/ui-react": major
---

breaking(theme): removing brand namespace from the theme tokens

```diff
- tokens.colors.brand.primary[10]
+ tokens.colors.primary[10]
```


```diff
const theme = createTheme({
  tokens: {
    colors: {
-       brand: {
        primary: {
          //... 
        }
-       }
    }
  }
})
```

We also added the ability to easily set the entire range of primary and secondary colors at the theme level

```ts
const theme = createTheme({
  primaryColor: 'red',
  secondaryColor: 'green'
});
```
