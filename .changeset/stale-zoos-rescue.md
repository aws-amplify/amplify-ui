---
"@aws-amplify/ui": patch
"@aws-amplify/ui-vue": patch
"@aws-amplify/ui-angular": patch
---

This implements `AuthenticatorService` that can be used internally and externally to access common Authenticator context and helpers.

*Usage*:

_app.component.ts_
```ts
export class AppComponent {
  constructor(public authenticator: AuthenticatorService) {}
}
```

_app.component.html_
```html
<!-- example of "reset password" button -->
<button (click)="authenticator.toResetPassword()">Reset password</button>

<!-- example of "sign up" submit button -->
<button (click)="authenticator.submitForm()">Sign Up</button>

<!-- disabling the submit button if submission is in progress -->
<button (click)="authenticator.submitForm()" [disabled]="authenticator.isPending">
  Sign Up
</button>
```
