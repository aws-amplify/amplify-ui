---
'@aws-amplify/ui-react-liveness': patch
---

fix(liveness): size the start screen oval from the intrinsic camera frame

Android/Firefox and iOS report the `getUserMedia` width and height flipped by
device orientation, which the component already compensates for when sizing the
video element. The start screen oval was still derived from
`track.getSettings()`, so on those devices it was built from dimensions that
disagree with the frame actually rendered. It now uses the video element's
intrinsic `videoWidth` and `videoHeight`, the same source as the rest of the
geometry.
