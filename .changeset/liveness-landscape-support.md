---
'@aws-amplify/ui-react-liveness': major
'@aws-amplify/ui': patch
---

feat(liveness): support mobile landscape orientation

`FaceLivenessDetector` no longer blocks a check on a mobile device held in
landscape. It previously replaced the camera with an error modal before the
check started, which left foldables whose cover screen defaults to landscape,
and cannot rotate to portrait, with no way through. The portrait requirement
was never a Rekognition constraint: desktop browsers have always streamed
landscape frames to the same model.

### Migration

**`MOBILE_LANDSCAPE_ERROR` is no longer emitted.** The member is retained on
`LivenessErrorState` and in the `ErrorState` union, and is marked deprecated,
so code that switches on it keeps compiling. Code that *relies* on receiving
it, for instance to show a rotate-your-device prompt of its own, will no
longer be called:

```ts
onError={(error) => {
  // never runs any more
  if (error.state === 'MOBILE_LANDSCAPE_ERROR') { promptToRotate(); }
}}
```

The `landscapeHeaderText`, `landscapeMessageText` and `portraitMessageText`
display-text fields are likewise retained and deprecated, but nothing renders
them.

Rotating the device *during* a check now shows a non-fatal prompt rather than
failing, so an orientation change is no longer a terminal condition at any
point in the flow.

Portrait rendering is unchanged, verified against a snapshot captured from the
previous implementation.
