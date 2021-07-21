# Inserting Components

You can insert your own components with `ng-template` and `amplifyOverride` directive.

1. Define a `ng-template` inside `amplify-authenticator`.
1. Mark which component you are replacing with `amplifyOverride=[Component Name]`
1. Finally, fill the content within `ng-template` to whatever you wish!

```html
<amplify-authenticator>
  <ng-template amplifyOverride="signInButton">
    <button mat-fab color="primary">Submit</button>
  </ng-template>
</amplify-authenticator>
```
