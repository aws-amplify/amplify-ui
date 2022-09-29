---
"@aws-amplify/ui-angular": major
---

**BREAKING**: Migrate Angular compiler to IVY, and drop support for View Engine. Please migrate to Angular 12+, and make sure you did not disable ivy in your `tsconfig.json`:

```json
{
  ...,
  "angularCompilerOption": {
    // REMOVE this line if you have it in your tsconfig.json
    "enableIvy": false
  }
}
```


*Note:* View Engine has already been [deprecated](https://blog.angular.io/angular-v12-is-now-available-32ed51fbfd49) in v12, and [fully removed](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296) in v13.

