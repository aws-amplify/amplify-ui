---
"@aws-amplify/ui-react-liveness": patch
---

fix(react-liveness): add onError handlers and model load timeout to prevent silent stuck state

Previously, if the BlazeFace model or WASM backend failed to load, the
`detectFace` service would throw but the state machine had no `onError`
handler for the `detectFaceBeforeStart`, `detectFaceDistanceBeforeRecording`,
or `initializeLivenessStream` states. XState would silently stay stuck in that
state forever without firing the `onError` callback.

Additionally, if the CDN request for model assets stalled without rejecting,
`modelLoadingPromise` would hang indefinitely with no timeout.

This change:
- Adds `onError` transitions to `detectFaceBeforeStart`,
  `detectFaceDistanceBeforeRecording`, and `initializeLivenessStream` states
- Removes the silent catch around `modelLoadingPromise` so model load failures
  properly propagate as errors instead of causing a downstream TypeError
- Adds a 10s timeout to `triggerModelLoading()` so stalled network requests
  reject instead of hanging forever
