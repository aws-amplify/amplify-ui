---
"@aws-amplify/ui-react": patch
---

fix(tabs): `null` and `undefined` children of `Tabs` will no longer show a Typescript error.
Also `null` children will no longer mess up the index of the tab array which affects the `defaultIndex` uncontrolled behavior. 
