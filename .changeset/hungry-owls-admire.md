---
"@aws-amplify/ui-react-storage": minor
---

feat(storage-manager): make processFile async. This allows for reading the file contents and performing async validations or mutations like creating a hash of the file contents. 

```jsx
const processFile = async ({ file }) => {
  const fileExtension = file.name.split('.').pop();

  return file
    .arrayBuffer()
    .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
    .then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((a) => a.toString(16).padStart(2, '0'))
        .join('');
      return { file, key: `${hashHex}.${fileExtension}` };
    });
};

export const StorageManagerHashExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={1}
      processFile={processFile}
    />
  );
};
```
