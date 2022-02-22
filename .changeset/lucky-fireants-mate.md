---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
"@aws-amplify/ui-vue": patch
"@aws-amplify/ui-angular": patch
---

Pass `formData` to `submitForm` event on submit. This will ensure any default form values are submitted to Cognito, without relying on `CHANGE` events.
