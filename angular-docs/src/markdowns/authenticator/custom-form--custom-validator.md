## Passing your own validator

In addition to Angular built-in [validators](https://angular.io/api/forms/Validators), you can define your own validator. Your function should return a map of validation error message if validation fails, otherwise null. This has the same function signature as the usual angular [`ValidatorFn`](https://angular.io/api/forms/ValidatorFn)

Let's write a custom validator that checks if a field has at least one digit.

```javascript
import { AbstractControl } from '@angular/forms';

export class AppComponent {
  public containsNumber(control: AbstractControl) {
    const isValid = /\d/.test(control.value);
    return isValid
      ? null
      : { containsNumber: 'This field should have at least one digit.' };
  }

  public signInValidators = {
    username: [this.containsNumber],
  };
}
```

Then, you can attach `signInValidators` to `<amplify-authenticator>`:

```html
<amplify-context-provider>
  <amplify-authenticator [signInValidators]="signInValidators">
  </amplify-authenticator>
</amplify-context-provider>
```
