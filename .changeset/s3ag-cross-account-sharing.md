---
'@aws-amplify/ui-react-storage': minor
---

feat(storage-browser): support S3 Access Grants cross-account sharing

`createManagedAuthAdapter` accepts a new optional `instanceScope` (`'SELF'` |
`'ALL'`). It is threaded into `listLocations` and `getLocationCredentials`, so
passing `'ALL'` surfaces locations from S3 Access Grants instances shared with
the caller's account, in addition to its own. Each surfaced location now carries
an optional `ownerAccountId`, which Storage Browser sends as the per-location
`expectedBucketOwner` on every S3 call, so cross-account buckets no longer 403.
Customer-managed `listLocations` handlers can also set `ownerAccountId` on a
location, and it is kept through controlled mode and `defaultValue`. The
`InstanceScope` type is exported. Default behavior is unchanged when
`instanceScope` is omitted.
