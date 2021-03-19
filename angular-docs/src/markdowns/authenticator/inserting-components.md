# Inserting Components

You can insert your own components with `ng-template` and `amplifyOverride` directive.

1. Define a `ng-template` inside `amplify-authenticator`.
1. Mark which component you are replacing with `amplifyOverride=[Component Name]`
1. You can define `let-ctx` inside your `ng-template` opening tag. This will provide you with useful [template context](https://angular.io/api/common/NgTemplateOutlet) related to the component you are overriding.
1. Finally, fill the content within `ng-template` to whatever you wish!

```html
<amplify-context-provider>
  <amplify-authenticator>
    <ng-template amplifyOverride="signInButton" let-ctx>
      <button mat-fab color="primary" (click)="ctx.signIn()">Submit</button>
    </ng-template>
  </amplify-authenticator>
</amplify-context-provider>
```


