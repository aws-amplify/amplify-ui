## Using Template Context

Amplify provides useful [template context](https://angular.io/api/common/NgTemplateOutlet) variables that can use in your component. For example, you can get access the username of the authenticater user by declaring `let-username="username"` on your template:

```html
<amplify-authenticator>
  <ng-template amplifyOverride="authenticated" let-username="username">
    <h1>Welcome, {{username}}!</h1>
    <amplify-sign-out></amplify-sign-out>
  </ng-template>
</amplify-authenticator>
```
