# Custom Form Validation

You can customize your form content using composition and event hooks. For example, let's create a `confirm_password` validation check. This will require the following steps:

1. Add `confirm_password` input field to the form.
1. Listen to `onSignUpSubmit` event and check whether `password` and `confirm_password` matches.
1. Add validation message under `confirm_password` field in DOM.
1. Listen to `onSubmit` event and prevent submitting if we have an error. Otherwise, remove `confirm_password` from data and submit.

_app.component.html_

```html
<!-- Listen to input and submit events -->
<amplify-authenticator
  (onSignUpInput)="onInput($event)"
  (onSignUpSubmit)="onSubmit($event)"
>
  <!-- Override password field. Decorate it with confirm_password field and validation messages -->
  <ng-template amplifyOverride="signUpPassword">
    <amplify-input name="password"></amplify-input>

    <amplify-input
      name="confirm_password"
      type="password"
      label="Confirm Password"
      placeholder="Re-enter your password"
    ></amplify-input>

    <div *ngIf="error.passwordMismatch" class="error">
      Your passwords must match.
    </div>
    <div *ngIf="!error.passwordMismatch" class="no-error">
      Your passwords match ✅
    </div>
  </ng-template>
</amplify-authenticator>
```

`amplify-input` is a component provided by `@aws-amplify/ui-angular` that encapsulates html input and label content. You are free to use your own input element, of course.

_app.compoenent.ts_

```ts
import { Component } from "@angular/core";
import { AmplifyAuthService } from "@aws-amplify/ui-angular";

@Component({
  selector: "app-custom-form-authenticator",
  templateUrl: "./custom-form-authenticator.component.html",
  styleUrls: ["./custom-form-authenticator.component.css"]
})
export class CustomFormAuthenticatorComponent {
  // authService provides helper services like submit event emitters.
  constructor(private authService: AmplifyAuthService) {}

  // we will track whether we have mismatch error in this object
  public passwordMismatch = true;

  public onInput(formData) {
    const { password, confirm_password } = formData;

    if (!password || !confirm_password || password !== confirm_password) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }

  public onSubmit(formData) {
    // get the submit function from `authService`
    const { submit } = this.authService.services;
    delete formData.confirm_password; // We shouldn't send this data to cognito
    if (!this.passwordMismatch) submit(formData); // only submit if no error
  }
}
```

_app.component.css_

```css
.error {
  color: red;
  margin-bottom: 1rem;
}

.no-error {
  color: green;
  margin-bottom: 1rem;
}
```
