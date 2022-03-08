---
"@aws-amplify/ui-react": patch
---

`TextField` and `TextAreaField` - Apply `width` and `height` style props to 
`Flex` container element rather than `input` field to match `SelectField` behavior. 
This will also apply to `PasswordField`, `PhoneNumberField` and `SearchField`
which use the `TextField`.
