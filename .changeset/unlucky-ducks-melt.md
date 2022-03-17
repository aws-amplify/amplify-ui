---
"@aws-amplify/ui-react": patch
---

fix: supress erroneous isMultiline deprecation warnings on TextField component

Deprecation warning messages are showing for users of TextField for the isMultiline prop even though
they are not using the prop. This issue is fixed by making the shouldWarn prop required on the internal
useDeprecationWarning hook.
