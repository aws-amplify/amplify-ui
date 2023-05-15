---
"@aws-amplify/ui-react-core-notifications": patch
"@aws-amplify/ui-react-core": patch
"@aws-amplify/ui-react-notifications": major
"@aws-amplify/ui-react": patch
---

Add new ui-react-notifications package for components like InAppMessaging.
Specifically, add deprecation messages for InAppMessagingDisplay, InAppMessagingProvider and useInAppMessaging in ui-react package. They have been migrated to `@aws-amplify/ui-react-notifications` and will be removed from this package in a future major release. Please install `@aws-amplify/ui-react-notifications` and update the import paths.
