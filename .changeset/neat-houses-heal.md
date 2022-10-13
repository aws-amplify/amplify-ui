---
"@aws-amplify/ui-react": major
"@aws-amplify/ui": major
"@aws-amplify/ui-angular": major
---

**BREAKING**: Changed the function signatures for Authenticator [service overrides](https://ui.docs.amplify.aws/react/connected-components/authenticator/customization#override-function-calls).  When overriding `signUp` you must include the `autoSignIn` key and set `enabled` to true.

```diff
async handleSignUp(formData) {
  let { username, password, attributes } = formData;
  // custom username
  username = username.toLowerCase();
  attributes.email = attributes.email.toLowerCase();
  return Auth.signUp({
    username,
    password,
    attributes,
+   autoSignIn: {
+     enabled: true
+   }
  })
}
```
