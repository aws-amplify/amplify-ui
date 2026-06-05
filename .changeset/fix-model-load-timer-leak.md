---
"@aws-amplify/ui-react-liveness": patch
---

fix(react-liveness): clear model load timeout timer on rejection

The model loading timeout introduced previously only cleared the timer
when `loadModels()` resolved (via `.then()`). If `loadModels()` rejected
(e.g. a fast CDN failure or WASM compile error), the 10s timer was left
running, leaking until it fired. Switched to `.finally()` so the timer is
cleared on both resolve and reject paths.
