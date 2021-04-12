# Custom Form

You can customize your form content using `ngTemplate` and `onSignUp` hooks. For example, let's create a `confirm_password` field to the sign up form.

## Modifying the Form Field

First step is to add a `confirm_password` field to the sign up form. `amplify-sign-up` provides `signUpFieldset` template slot to override the whole form field, and individual slots for each of the input field. Because we're only loooking to append `confirm_password` to the existing form, let's use `signUpPassword` template slot. We compose the `password` and `confirm_password` together:

_app.component.html_

```html
<amplify-context-provider>
  <amplify-authenticator [onSignUp]="onSignUp">
    <ng-template amplifyOverride="signUpPassword">
      <amplify-input name="password"></amplify-input>
      <amplify-input
        name="confirm_password"
        type="password"
        label="Confirm Password"
        placeholder="Re-enter your password"
      ></amplify-input>
    </ng-template>
  </amplify-authenticator>
</amplify-context-provider>
```

`amplify-input` is a component provided by `@aws-amplify/ui-angular` that encapsulates html input, label, and validation errors (if any). You are free to use native `input` too, if you wish.

## Implementing `onSignUp` hook

When `password` and `confirm_password` field do not match, we want to throw an error saying your passwords must match. When these fields match, we want to remove `confirm_password` from `formData` before the form is submitted. This is because `confirm_password` is no longer needed and is not a known attribute to Cognito.

_app.component.ts_

```ts
import { AuthFormData, OnSubmitHookResponse } from '@aws-amplify/ui-angular';

public onSignUp(formData: AuthFormData): OnSubmitHookResponse {
  const { password, confirm_password } = formData;

  if (password !== confirm_password) {
    // passwords do not match, send a validation error
    const error = { confirm_password: ['Your passwords must match'] };
    return { error };
  } else {
    // passwords match, remove confirm_password
    delete formData['confirm_password'];
    return { data: formData };
  }
}
```
