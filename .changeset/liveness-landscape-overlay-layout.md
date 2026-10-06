---
'@aws-amplify/ui-react-liveness': patch
'@aws-amplify/ui': patch
---

fix(liveness): lay the camera overlay out for short landscape viewports

- Clamp the camera area to the available height in landscape viewports under
  500px tall, so a 4:3 frame no longer resolves taller than the viewport. The
  aspect ratio is set as an inline style, so the height is clamped rather than
  the ratio unset.
- Move the hint and the match indicator into the gutter beside the oval in
  those viewports. The oval spans nearly the full frame height there, leaving
  no room above or below it, while the frame is letterboxed horizontally.
- Capture the frame dimensions at `loadedmetadata` rather than on mount. The
  intrinsic dimensions do not exist until then, so the video element was
  briefly given a zero width and height and the camera area an invalid aspect
  ratio.
- Position the cancel button, recording indicator, popover and figure badges
  with logical properties, so they mirror under `dir="rtl"`.
