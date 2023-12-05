---
"@aws-amplify/ui-react-liveness": patch
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

fix(liveness): adding aria attributes for photosensitivity warning

Use a button for photosensitivity warning toggle instead of div to it make keyboard navigable.
Add aria roles to make the warning accessible for screen readers.
