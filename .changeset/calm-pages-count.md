---
'@aws-amplify/ui-react-storage': patch
---

fix(storage-browser): show the last item in a location with `pageSize * n + 1` items and no folder object

`LocationDetailView` now reports a next page when loaded items extend past the current page, not only when a `nextToken` is present. Previously the last item was unreachable when the first list request over-fetched by one item and no folder object was filtered out.
