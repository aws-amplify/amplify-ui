---
"@aws-amplify/ui-react-storage": major
"@aws-amplify/ui-react": minor
---

FileUploader becomes StorageManager!

Creating a new package `@aws-amplify/ui-react-storage` to keep all future Storage related connected components, the first of which is the StorageManager.
The StorageManager is a partial re-write of the FileUploader to address some customer issues and make the component more scalable for the future.

Some notable changes from FileUploader -> StorageManager

* Component slots: You can override each part of the StorageManager with your custom UI
* Pre-upload process files: You can use this to programatically change file names before upload or perform optimizations and validations.
* Easy text updates: The StorageManager component has a `displayText` prop where you can pass in all the text the component uses.

```jsx
import { StorageManager } from '@aws-amplify/ui-react-storage';

export const DefaultStorageManagerExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={1}
    />
  );
};
```

