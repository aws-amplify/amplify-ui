---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

Fix broken references in default theme and changing `defaultTheme` to be exported as `BaseTheme` type rather than `WebTheme` because we don't need to be using a `WebTheme` as it has extra stuff only the provider needs. If you want to get a defaultTheme of `WebTheme` type you can run `createTheme()`
