---
"@aws-amplify/ui-docs": patch
"@aws-amplify/ui-next-example": patch
"@aws-amplify/ui-react": patch
---

refactor(ui): update radiogroupfield to use fieldset

Update to `RadioGroupField` component props: 
 - `legend` replaces `label`
 - `legendHidden` replaces `labelHidden`

Example usage:
``` <RadioGroupField legend="Language" legendHidden /> ```
