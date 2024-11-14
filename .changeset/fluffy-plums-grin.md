---
"@aws-amplify/ui-react": patch
---

fix(textarea): autoresize textarea resets when value is empty

There was a bug with the autoresize text area where it would not reset the size when a value was cleared. This fixes that bug
