---
"@aws-amplify/ui-react-storage": patch
---

fix(react-storage): StorageImage now fires onStorageGetError when an object is not found

StorageImage now has a prop called `validateObjectExistence` which is default to `true`. This checks if there is a file at the given path before adding it as the `src` on an image. 
