# Composing Elements

```html
<amplify-context-provider>
  <amplify-authenticator>
    <ng-template amplifyOverride="compose">
      <amplify-sign-in></amplify-sign-in>
      <amplify-sign-up></amplify-sign-up>
    </ng-template>
  </amplify-authenticator>
</amplify-context-provider>
```
