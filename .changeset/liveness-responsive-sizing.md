---
'@aws-amplify/ui-react-liveness': patch
'@aws-amplify/ui': patch
---

fix(liveness): size FaceLivenessDetector to fill its host container

- Redraw the liveness oval when the video element resizes (e.g. modal open animations, responsive layouts)
- Fill the width and height of a host container with a definite height (e.g. a modal body); the camera is scaled to fill and cropped on the sides by at most 30% so the oval stays visible
- Do not reserve space for the hidden photosensitivity warning when the start screen is disabled
- Position the freshness color overlay relative to its own box so it renders correctly inside transformed modal dialogs
- Keep the camera area at least 200px tall in hosts shorter than the detector's content
