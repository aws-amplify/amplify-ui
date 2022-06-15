---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

fix: nested theme providers by removing menu's portal. 
Menu primitive no longer renders in a React Portal which means it properly gets the theme from the nearest ThemeProvider.
Removing the document element modifications in the ThemeProvider because it is no longer needed. Now the ThemeProvider is much cleaner!
