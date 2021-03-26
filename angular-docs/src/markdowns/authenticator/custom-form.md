# Inserting Components

## Adding custom Validator

You can add your own custom validator through two steps.

1. Define `signInValidators` inside your component class

<!-- todo: why doesn't typescript work? It should be supported: https://stackblitz.com/edit/ngx-markdown -->

```javascript
export class AppComponent {
  public signInValidators = {
    username: [Validators.minLength(4)],
  };

  constructor() {}
}
```

2. Pass `signInValidators` to `amplify-authenticator`

```html
<amplify-context-provider>
  <amplify-authenticator [signInValidators]="signInValidators">
  </amplify-authenticator>
</amplify-context-provider>
```
