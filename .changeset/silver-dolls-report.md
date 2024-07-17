---
"@aws-amplify/ui-react": patch
---

fix(authenticator): fixing visual inconsistencies

- Removing any style props from buttons on authenticator to fix font weight inconsistencies
- Moved the in the Authenticator to be in the same location in the DOM in each view
- Made the link buttons consistent across Authenticator views

Fixes #5156
