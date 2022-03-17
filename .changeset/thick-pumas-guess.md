---
"@aws-amplify/ui-react": patch
---

fix: update complex field components (TextField, TextAreaField, etc) to apply absolute positioning from Figma

Figma to Studio integration will absolutely position components when autolayout is not enabled in Figma. This causes an issue for field components that were passing position, top, and left, and padding down to the input element, causing the layout not to match Figma. This is fixed by moving the absolute position props and padding up to the container Flex element.
