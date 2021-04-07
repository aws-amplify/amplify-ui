- If you need to modify form data prior to submit, you should return an object with `data` field. A common case would be to add a custom attribute that is not covered by the form.

```typescript
import { OnSubmitHook, AuthFormData } from '@aws-amplify/ui-angular`

const onSignUp: OnSubmitHook = (formData: AuthFormData) => {
  const data: AuthFormData = {
    ...formData,
    user_level: 'admin'
  };

  return { data };
};
```

- If you do not return `data` or `error`, the submit flow will continue as normal with the existing form data.
