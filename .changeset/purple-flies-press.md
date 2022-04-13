---
"@aws-amplify/ui-react": patch
---

chore(ui-react): updates to allow eslint react-hooks/rules-of-hooks set to error
- update eslint 'rules-of-hooks/exhaustive-deps' from 'warning' to 'error'
- turn linting on for entire ui-react package
- add missing or update dep arrays as needed to satisfy 'rules-of-hooks/exhaustive-deps'
- add DefaultFooter component in SignIn
- add DefaultHeader component in ConfirmSignUp
- add DefaultComponents interface and remove PartialDeep and related files
- add useAuthenticatorService and error throw in useAuthenticator to prevent conditional hook calls
