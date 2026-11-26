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

In a landscape viewport under 500px tall the camera area is clamped to the
available height, and the hint and match indicator move into the gutter beside
the oval, which spans nearly the full frame height there.

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

**Rotating the device during a check now ends the attempt with a new
`DEVICE_ROTATION_ERROR`**, which is retryable and shows its own message. The
challenge oval is computed once per session against the frame the stream opened
with, so frames captured after a rotation cannot be evaluated against it. A
check may still *start* in either orientation; only a change after recording
begins ends it. Previously such a rotation was decided by the oval fit timeout,
so the user was told their face did not fit and the stream closed with the
face-fit code.

New display text accompanies it: `deviceRotationHeaderText` and
`deviceRotationMessageText`.

### Behaviour change outside landscape

Every oval dimension is now read from the video element's intrinsic frame
rather than `track.getSettings()`. On devices where the two disagree, which is
Android/Firefox and iOS reporting the `getUserMedia` dimensions flipped by
orientation, this moves the pre-recording face distance threshold: the check
previously sized its oval from the flipped pair, taking the 3:4 recompute
branch and dividing by an oval 33% narrower than intended, so it asked the user
to move further from the camera than the challenge configured. Where the two
sources agree, including desktop, nothing changes.
