---
"@aws-amplify/ui-react": major
---

BREAKING CHANGE: No longer splitting out Flex and Base style props on Field primitives.
Instead, removing all style props to be applied to the wrapper element, the rest will be applied to the input element.
Adding `inputStyles` prop where developers can send style props to the input element (or textarea, select)
For `TextAreaField`, destructuring the `resize` style prop because it makes sense to apply that to the textarea element.


```diff
- <TextField
-   backgroundColor="red"
+ <TextField
+   inputStyles={{backgroundColor: "red"}}
```
