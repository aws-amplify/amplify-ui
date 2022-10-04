---
"@aws-amplify/ui-react": major
"@aws-amplify/ui": major
"@aws-amplify/ui-angular": major
---

**BREAKING**: Changed the function signatures for Authenticator [service overrides](https://ui.docs.amplify.aws/react/connected-components/authenticator/customization#override-function-calls). Rather than returning an `Auth.*` promise, you must now return the function callback passed in the `handle*` signature.

```diff
- async handleSignUp(formData) {
+ async handleSignUp(formData, signUp) {
  let { username, password, attributes } = formData;
  // custom username
  username = username.toLowerCase();
  attributes.email = attributes.email.toLowerCase();
-  return Auth.signUp({
-    username,
-    password,
-    attributes,
-  });
+  return signUp(username, password, attributes);
}
