---
'@aws-amplify/ui-angular': major
---

**Breaking**: We replaced following legacy Authenticator texts:
- `Confirmation Code` in confirm sign up screen is replaced by `Enter your Code`
- `Send Code` in reset password screen is replaced by `Send code`.
- `Send Code` in confirm reset password screen is replaced by `Submit`
- `Forgot your password? ` with the trailing space is replaced by `Forgot your password`.


If you were using `I18n` to translate those keys, please update your translations accordingly to match the new strings.
