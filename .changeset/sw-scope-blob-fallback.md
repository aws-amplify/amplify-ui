---
'@aws-amplify/ui-react-storage': patch
---

fix(storage-browser): match the download service worker by scope pathname

The multi-file zip download looked up its service worker with
`getRegistration('/amplify-storage-download/')`, which returns the registration
whose scope is the longest prefix of the given URL. On an origin that also
registers a root `/` service worker, that root registration is always a prefix,
so when the download worker was never registered the lookup returned the root
worker instead. The handler treated it as a live download worker and skipped the
in-memory blob fallback, so the download silently failed. This affected any page
on such an origin, not only a page served at `/`. The handler now enumerates
registrations and matches the scope pathname exactly, so a root worker is no
longer mistaken for the download worker and the blob fallback fires whenever the
download worker is genuinely absent.
