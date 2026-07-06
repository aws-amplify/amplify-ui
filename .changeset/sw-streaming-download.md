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

Note: per-file progress is now reported download-only by design — it reflects
bytes read from S3, not zip finalization. Because entries are stored without
compression (`level: 0`), the write/finalization phase is near-instant, so
progress transitions directly from downloading to complete without a separate
"zipping"/finishing phase.
