---
'@aws-amplify/ui-react': patch
---

fix(autocomplete): let elements in the menu `Header` and `Footer` slots receive clicks

Pressing an element in the `Header` or `Footer` menu slot moved focus away from the input. The menu then closed on blur and was removed before the `click` event fired, so the element's `onClick` never ran. The menu now prevents the default `mousedown` behavior, as options already did, so the input keeps focus and the click reaches the element.
