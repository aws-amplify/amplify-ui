---
'@aws-amplify/ui': patch
---

fix(authenticator): keep UI provided `config` and `services` when signing out before the Authenticator is rendered

Signing out while the machine is still waiting for the UI to send `INIT` moved it to `setup.getConfig`, skipping `setup.initConfig` and the `configure` action. The machine then settled on `signIn`, so `useAuthenticatorInitMachine` never initialized it and every prop passed to the `Authenticator` was ignored. The machine now returns to `setup.initConfig` when setup has not completed.
