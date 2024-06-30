---
"@aws-amplify/ui-react-storage": patch
---

react-storage ability to cancel uploads from ProcessFile
  This allows a user to return a rejected promise from `ProcessFile()` to cancel an in process upload,
  before any data is sent to S3.

