---
'@aws-amplify/ui-react-storage': patch
---

fix(storage-browser): route the zip-download trigger by browser engine

The multi-file zip download delivered its stream to the download service worker
with a single mechanism — a top-level `<a download>` navigation — which does not
work the same across engines. Chromium does not route a top-level `<a download>`
navigation to the uncontrolled, narrow-scope download worker (it hangs), and
WebKit (Safari) never routes to it at all.

The handler now detects the browser engine and routes accordingly:

- **Chromium** triggers the download via an in-scope hidden `<iframe>`
  navigation (the worker's `Content-Disposition` supplies the filename), with
  listener- and timeout-based cleanup of the iframe.
- **Firefox** keeps the top-level `<a download>` navigation.
- **Safari and unknown engines** skip the worker entirely and fall back to
  in-memory blob collection.
