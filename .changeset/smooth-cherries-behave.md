---
'@aws-amplify/ui-angular': patch
'@aws-amplify/ui-react': patch
'@aws-amplify/ui': patch
'@aws-amplify/ui-vue': patch
---

Fixed bug in Angular Authenticator that caused the Setup TOTP page to not show the correct totpIssuer and totpUsername in the QR code when overwritten by formFields. Refactored and added in Jest tests for Angular.
