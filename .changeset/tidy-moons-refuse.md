---
'@aws-amplify/ui': patch
---

fix(authenticator): handle SIGN_OUT while resolving the current user

The `idle` and `getCurrentUser` states only handled their invoke result, so a `SIGN_OUT` arriving while `handleGetCurrentUser` was in flight was silently dropped. Signing out during startup could leave the machine `authenticated` with a stale user, and `useAuthenticator().signOut()` was a no-op until the machine left `idle`. Both states now transition to `signOut`, which cancels the in-flight invoke so a stale user cannot be applied.
