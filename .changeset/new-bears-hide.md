---
"@aws-amplify/ui-react-storage": minor
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

feat(storage-manager): add metadata and the rest of the Storage.put params

```jsx
const processFile = ({ file, key }) => {
  return {
    file,
    key,
    metadata: {
      id: key,
    },
  };
};

export function StorageManagerMetadataExample() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="private"
      maxFileCount={3}
      showThumbnails={true}
      processFile={processFile}
    />
  );
}
```
