---
"@aws-amplify/ui-react-storage": patch
"@aws-amplify/ui-react": patch
---

fix(storage): fixing drop handler for file extensions

Previously, adding a file extension for an `acceptedFileTypes` when a customer would drop a file it would show as rejected even if it was a valid file type. This fixes that issue. 
