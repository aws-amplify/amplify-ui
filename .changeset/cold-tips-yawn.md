---
"@aws-amplify/ui": minor
"@aws-amplify/ui-angular": minor
"@aws-amplify/ui-react": minor
"@aws-amplify/ui-vue": minor
---

## Zero Configuration

As of `@aws-amplify/cli@6.5.0`, `aws-exports.js` includes your backend configuration for the Authenticator to automatically infer `loginMechanisms` and `socialProviders`.

### Before (React)

```js
export default withAuthenticator(App, {
  loginMechanisms: ['email'],
  socialProviders: ['amazon', 'apple', 'facebook', 'google']
})
```

### After (React)

```js
export default withAuthenticator(App)
```


## Sign in with Apple

The Authenticator supports `apple` as one of many `socialProviders`. See: https://docs.amplify.aws/lib/auth/social/q/platform/js/
