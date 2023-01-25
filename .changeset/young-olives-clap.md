---
'@aws-amplify/ui': patch
'@aws-amplify/ui-angular': patch
'@aws-amplify/ui-react': patch
'@aws-amplify/ui-vue': patch
---

fix(rwa): improve default behavior handling for custom formFields.

Previously, adding custom formFields for fields that are not in `signUpAttributes` configuration wouldn't get any default values, which could lead to broken UI.

This commit improves default handling by applying defaults to all known auth field (birthdate, first_name, etc) to custom formField options.
