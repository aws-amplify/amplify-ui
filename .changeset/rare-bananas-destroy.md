---
'@aws-amplify/ui': patch
---

When first setting up TOTP with MFA the Authenticator is not returning the correct user object. This object did not contain the correct methods, and causes an error if you try to access those methods. This fix will now retrieve the correct user object when a user first sets up MFA TOTP.
