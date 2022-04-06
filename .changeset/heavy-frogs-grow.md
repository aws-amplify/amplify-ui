---
"@aws-amplify/ui-react": patch
---

Addresses our use of dangerouslySetInnerHTML within the AmplifyProvider, and prevents server-side XSS by filtering out closing </style> tags. 
