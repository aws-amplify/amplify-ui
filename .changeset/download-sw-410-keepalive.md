---
'@aws-amplify/ui-react-storage': patch
---

fix(storage-browser): harden the download service worker fetch handling

Three fixes to the zip-download service worker:

- Fail fast with a `410` when no stream is stored for a download id, instead of
  returning and falling through to the network — where the URL 404s and Chrome
  hangs with no error. A miss means the worker restarted and lost the stream, or
  the id is stale.
- Keep the worker alive across the acknowledgement → navigation → fetch gap. The
  message handler now holds the worker via `event.waitUntil` until the matching
  fetch consumes the stream, with a 30s cap that also drops the buffered stream
  so a navigation that never arrives cannot pin the worker or leak the stream.
- Pass through a request for the worker's own script
  (`/amplify-storage-download/download-sw.js`) so only real `<download-id>`
  requests get the stream-or-410 treatment.
