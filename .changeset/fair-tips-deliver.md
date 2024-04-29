---
"@aws-amplify/ui-react-storage": minor
"@aws-amplify/ui-react": patch
---

feat(storage-manager): update `StorageManager` to support differing usages of `path` prop:
- existing: `accessLevel` prop provided with or without optional `path` prop
- additive: no `accessLevel` prop provided with required `path` as either a `string` or a callback provided the current `identityId`
