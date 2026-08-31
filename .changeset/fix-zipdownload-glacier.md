---
'@aws-amplify/ui-react-storage': patch
---

fix(storage): surface non-OK responses (e.g. 403 Glacier) as errors during multi-file download instead of writing the error response body into the zip
