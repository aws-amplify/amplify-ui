# On Submit Hook

`@aws-amplify/ui-angular` provides OnSubmit hooks for each form. Currently, we support `onSignIn` and `onSignUp`. This will execute before the form data are submitted to Cognito service. You can use these hooks to add custom validation messages or modify the form data.

## Defining `onSubmit` hook

`onSubmit` hooks have the following shape:

```typescript
type OnSubmitHook = (
  formData: AuthFormData
) => {
  data?: AuthFormData;
  error?: FormError;
};
```

### Input

`formData` is an `object` mapping each input name to its value in the form. For example, `formData` of default `signIn` component would be

```ts
const formData = {
  username: "amplify",
  password: "myPassword"
};
```

Any custom input fields that you have added will be reflected here as well.

### Output

Your `onSubmit` hook can output either `error` or `data` object based on your needs.

- If you have any validation errors you want to report, you should return an object with `error` field. This is a map of each input name to its error messages. For example, let's create a validation hook that checks whether username has at least one digit.

```typescript
import { OnSubmitHook, AuthFormData } from '@aws-amplify/ui-angular`

const onSignUp: OnSubmitHook = (formData: AuthFormData) => {
  const { username } = formData;
  const error: FormError = {}

  const containsDigit = /\d/.test(username);
  if (!containsDigit) {
    error.username = ['This field should contain at least one digit.'];
  }

  return { error };
};
```

_app.component.html_

```html
<amplify-context-provider>
  <amplify-authenticator [onSignUp]="onSignUp"> </amplify-authenticator>
</amplify-context-provider>
```

Now, try signing up with a username that has an invalid username. You should see an error message under the username input.
