## Inserting Components

```html
<spark-context-provider>
  <amplify-authenticator>
    <ng-template #signInButton let-ctx>
      <button
        (click)="ctx.signIn()"
        [ngStyle]="{
          'background-color': 'floralwhite',
          padding: '1rem',
          'border-style': 'dashed'
        }"
      >
        Custom Button
      </button>
    </ng-template>
  </amplify-authenticator>
</spark-context-provider>
```
<br/>