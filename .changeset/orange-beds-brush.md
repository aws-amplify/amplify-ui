---
"@aws-amplify/ui-react-storage": minor
---

feat(@aws-amplify/ui-react-storage): Add handling for `aws-amplify/storage` improvements:

**Update `StorageManager` to support differing usages of `path` prop**
    - existing: `accessLevel` prop provided with or without optional `path` prop
    - additive: no `accessLevel` prop provided with required `path` as either a `string` or a callback provided the current `identityId`

Migrate from `accessLevel` to `path` as a `string`:

```diff
  <StorageManager
-   accessLevel="guest"
+   path="public/"
    maxFileCount={1}
  />
```

Migrate from `accessLevel` to `path` as a callback:

```diff
  <StorageManager
-   accessLevel="private"
-   path="images/"
+   path={({ identityId }) => `private/${identityId}/images/`}
    maxFileCount={1}
  />
```

**Update `StorageImage` to support `path` prop**

Migrate from `imagKey` and `accessLevel` to `path`:

```diff
  <StorageImage
-   imgKey="cat.jpeg"
-   accessLevel="public"
+   path="public/cat.jpeg"
  />
```