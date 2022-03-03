---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

Fixing nested AmplifyProviders and theming. This fixes issues seen on the docs site if you have nested AmplifyProviders causing weird issues. The provider now cleans itself up properly and only injects CSS if necessary.
