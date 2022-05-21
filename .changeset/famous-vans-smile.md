---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

On userpools with sms mfa required, authenticator will now automatically redirect user to sms mfa page after successful sign up.

Previously, end users needed to sign in again to go to the sms mfa page ([#1660](https://github.com/aws-amplify/amplify-ui/issues/1660)).
