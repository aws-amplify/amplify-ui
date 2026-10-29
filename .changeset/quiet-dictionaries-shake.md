---
'@aws-amplify/ui': patch
---

fix(ui): allow Rolldown and esbuild to tree-shake unused Authenticator translation dictionaries

`i18n/dictionaries` now re-exports the per-language dictionaries instead of copying each one with an object spread. Rolldown (the default bundler in Vite 8) and esbuild kept those top-level spreads as possible side effects, so every language dictionary ended up in the bundle even when `translations` was never imported. The exported dictionaries and `translations` are unchanged.
