---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
"@aws-amplify/ui-vue": patch
"@aws-amplify/ui-angular": patch
---

This PR adds additional safeguards to hub event listeners we use. Now, we will only pass hub events to the auth machine if it is in the correct state.
