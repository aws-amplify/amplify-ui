---
'@aws-amplify/ui-react-storage': minor
---

feat(storage-browser): support S3 Access Grants cross-account sharing

`createManagedAuthAdapter` accepts a new optional `instanceScope` (`'SELF'` |
`'ALL'`). It is threaded into `listLocations` and `getLocationCredentials`, so
passing `'ALL'` surfaces locations from S3 Access Grants instances shared with
the caller's account, in addition to its own. Each surfaced location now carries
the owning account id, which Storage Browser sends as the per-location
`expectedBucketOwner` on every S3 call, so cross-account buckets no longer 403.
Default behavior is unchanged when `instanceScope` is omitted.
