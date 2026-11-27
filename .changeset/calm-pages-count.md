---
'@aws-amplify/ui-react-storage': patch
---

fix(storage-browser): allow paging to loaded items past the current page, such as search results and the last item of a `pageSize * n + 1` location

`LocationDetailView`, `LocationsView` and the Copy destination folder picker now report a next page when loaded items extend past the current page, not only when a `nextToken` is present. Previously the last item in a location was unreachable when the first list request over-fetched by one item and no folder object was filtered out, and search results past the first page were unreachable because a search loads every match and returns no `nextToken`.
