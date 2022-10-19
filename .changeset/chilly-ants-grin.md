---
"@aws-amplify/ui-react": major
---

BREAKING CHANGE: `isMultiline` prop removed from `TextField`. Replace any `TextField` components 
using the `isMultiline` prop with the `TextAreaField` component.

```diff
- <TextField
-  isMultiline
+ <TextAreaField
```
