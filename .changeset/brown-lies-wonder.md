---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
"@aws-amplify/ui-angular": patch
"@aws-amplify/ui-vue": patch
---

(Internal) Use Amplify JS' new `autoSignIn` flag to do automatic sign in. We were doing this manually previously. 

**BREAKING**: When overriding `Auth.signUp`, update the override function call to include the `autoSignIn` option set to enabled. This is now required.

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
  });
}

```
