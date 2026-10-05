---
'@aws-amplify/ui-react-storage': patch
---

fix(storage-browser): match the download service worker by scope pathname

The multi-file zip download looked up its service worker with
`getRegistration('/amplify-storage-download/')`, which resolves a scope relative
to the current page. When the host page lives at `/` and registers its own root
service worker, that lookup could match the unrelated root worker even though the
download worker was never registered. The handler treated that as a live download
worker and skipped the in-memory blob fallback, so the download silently failed
instead of falling back. The handler now enumerates registrations and matches the
scope pathname, so a root worker is no longer mistaken for the download worker and
the blob fallback fires whenever the download worker is genuinely absent.
