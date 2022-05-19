---
'@aws-amplify/ui-vue': patch
---

Turned on ESLint for the Vue.js package. Fixed the following ESLint errors:

* The `alias-control`, `authenticator`, `amplify-button`, `base-select`, `reset-password` and `federated-sign-in-button` all had the improper use of destructuring props, and was fixed.

* Several components had typecasted the `HTMLInputElement` incorrectly, which was fixed.

* Turned off `vue/multi-word-component-names` for the `authenticator` component, since it needs to match other frameworks.

* Turned off `no-explicity-any` in the `useAuth` and `index.ts` file. We'll be adding types to `useAuth` in a future PR.
