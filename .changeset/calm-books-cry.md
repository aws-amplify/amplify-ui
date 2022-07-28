---
"@aws-amplify/ui": patch
---

fix(ui): update types for ColorModeOverride and BreakpointOverride to allow generic strings

Previously, Typescript would show a type error on the theme prop of ThemeProvider (`<ThemeProvider theme={myTheme}>`) if you didn't cast your theme object as a Theme (i.e. `const theme: Theme = {}`). This squashes that error.
