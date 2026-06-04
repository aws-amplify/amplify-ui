---
"@aws-amplify/ui-react-liveness": patch
---

fix(react-liveness): add onError handlers for face detection and stream initialization invocations

Previously, if the BlazeFace model or WASM backend failed to load, the
`detectFace` service would throw but the state machine had no `onError`
handler for the `detectFaceBeforeStart`, `detectFaceDistanceBeforeRecording`,
or `initializeLivenessStream` states. XState would silently stay stuck in that
state forever without firing the `onError` callback.

This change:
- Adds `onError` transitions to `detectFaceBeforeStart`,
  `detectFaceDistanceBeforeRecording`, and `initializeLivenessStream` states
- Removes the silent catch around `modelLoadingPromise` so model load failures
  properly propagate as errors instead of causing a downstream TypeError
