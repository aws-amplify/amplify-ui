---
'@aws-amplify/ui-react-storage': minor
---

feat(storage): service worker streaming zip download

Replace the in-memory blob-based zip download with a service worker streaming
architecture for `StorageBrowser` multi-file downloads. Files are streamed
sequentially into a zip archive delivered via a service worker, removing the
memory ceiling of the previous blob approach. Falls back to blob collection
when the service worker is unavailable (unsupported browser, missing file, or
insecure context).
