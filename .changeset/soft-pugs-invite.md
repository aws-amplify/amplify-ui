---
'@aws-amplify/ui-react-core': patch
'@aws-amplify/ui': patch
---

fix(authenticator): apply UI provided `config` and `services` when signing out before the Authenticator is rendered

`setup.initConfig` handles `SIGN_OUT`, so signing out before the UI sends `INIT` moved the machine past setup configured with defaults, and it settled on `signIn`. `useAuthenticatorInitMachine` only sent `INIT` on the `setup` route, so every prop passed to the `Authenticator` was ignored. The machine now accepts `INIT` until the UI has configured it, and the UI sends `INIT` on any route other than `idle`.
