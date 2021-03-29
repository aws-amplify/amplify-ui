# Custom validator

## Adding Validators

You can add input validators to the Sign In form. For example, you can use the built-in validators from Angular:

1. Define `signInValidators` inside your component class

<!-- todo: why doesn't typescript work? It should be supported: https://stackblitz.com/edit/ngx-markdown -->

```javascript
import { Validators } from '@angular/forms';

export class AppComponent {
  public signInValidators = {
    username: [Validators.minLength(4)],
  };
}
```

2. Pass `signInValidators` to `amplify-authenticator`

```html
<amplify-context-provider>
  <amplify-authenticator [signInValidators]="signInValidators">
  </amplify-authenticator>
</amplify-context-provider>
```
