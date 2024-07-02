---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

fix(authenticator): fixing visual inconsistencies

- Updated all default and english strings to use sentence casing. Did NOT update the keys so this is not a breaking change
- Removing any style props from buttons on authenticator to fix font weight inconsistencies
- Moved the in the Authenticator to be in the same location in the DOM in each view
- Made the link buttons consistent across Authenticator views

Fixes #5156
