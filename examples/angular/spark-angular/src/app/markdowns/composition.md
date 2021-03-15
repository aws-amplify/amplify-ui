## Composition [Not Yet Implemented]

You can compose multiple components. Start by making a `ng-template` marked with `#compose` variable name.

```html
<spark-context-provider>
  <amplify-authenticator>
    <ng-template #compose>
      <amplify-sign-in></amplify-sign-in>
      <hr />
      <amplify-sign-out></amplify-sign-out>
    </ng-template>
  </amplify-authenticator>
</spark-context-provider>
```
