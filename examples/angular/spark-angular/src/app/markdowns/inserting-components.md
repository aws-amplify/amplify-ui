## Inserting Components
You can insert your own components with `ng-template`. Simply mark your template with one of our slot names: `#signIn`, `#signedIn`, `#signedInButton`, to do so. We also provide [context](https://angular.io/api/common/NgTemplateOutlet) that you can use to attach Amplify logic.
```html
<spark-context-provider>
  <amplify-authenticator>
    <ng-template #signInButton let-ctx>
      <button mat-fab color="primary" (click)="ctx.signIn()">Submit</button>
    </ng-template>
  </amplify-authenticator>
</spark-context-provider>
```
<br/>