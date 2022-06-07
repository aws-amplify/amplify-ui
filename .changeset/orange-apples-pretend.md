---
"@aws-amplify/ui-angular": minor
---

This migrates `@aws-amplify/ui-angular` from view engine to ivy engine. This will affect:

- Customers on Angular 8 or before. They will need to [upgrade](https://update.angular.io/) to Angular 9+ for ivy support.
- Customers on Angular 9+, who opted out of ivy. They will need to enable ivy in your `tsconfig.app.json`:

```js
{
  // ...
  "angularCompilerOptions": {
    "enableIvy": false
  }
}
```

This will **not** affect:

- Customers on Angular 9+ who did not opt out of ivy.
- Any new customers
