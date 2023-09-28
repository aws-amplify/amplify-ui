---
"@aws-amplify/ui-react": patch
---

refactor(ui): update RadioGroupField to use Fieldset

Update to `RadioGroupField` component props: 
 - `legend` replaces `label`
 - `legendHidden` replaces `labelHidden`
 
Example usage:
``` <RadioGroupField legend="Language" legendHidden /> ```
