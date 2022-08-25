---
"amplify-ui-angular-mono": patch
"@aws-amplify/ui-react": minor
"@aws-amplify/ui-angular": patch
---

Angular: Add `amplify-dialcodeselect` class which contains the previous countrycodeselect styles
Vue: Add `amplify-dialcodeselect` class which contains the previous countrycodeselect styles
React: Added 'dialCode' versions of all 'countryCode' props so that users can begin migrating away from the deprecated `countryCode`.

```
countryCodeLabel => dialCodeLabel
countryCodeName => dialCodeName
onCountryCodeChange => onDialCodeChange
countryCodeRef => dialCodeRef
defaultCountryCode => defaultDialCode
```
