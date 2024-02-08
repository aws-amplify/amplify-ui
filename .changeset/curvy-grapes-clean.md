---
"@aws-amplify/ui-react-storage": patch
---

fix(react-storage): use targetIdentityId instead of identityId to get URL of image

Fixes an issue in `<StorageImage />` where users could not load an image with `accessLevel` of "protected" even when an `identityId` was supplied.
