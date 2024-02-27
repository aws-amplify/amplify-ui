---
"@aws-amplify/ui": patch
"@aws-amplify/ui-angular": patch
"@aws-amplify/ui-react": patch
"@aws-amplify/ui-react-native": patch
"@aws-amplify/ui-vue": patch
---

fix(web/react-native/ui): use translated strings for VerifyUser screen and use censoredContactInformation util 

**ui/Angular/React/Vue/ReactNative:** adds a `censoredContactInformation()` utility to the `ui` package and refactors the VerifyUser screen in Angular, React, Vue, and ReactNative packages to use this utility.

**Vue:** Fixes an issue where translated strings were not being properly used for the VerifyUser screen. Additionally, removes duplicate "verify" id that was on multiple elements.
