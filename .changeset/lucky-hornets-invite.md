---
"@aws-amplify/ui-react-storage": minor
---

feat(storage-manager): add `onUploadStart` event handler and add the file key to `onUploadError`

```jsx
export function StorageManagerExample() {
  const [files, setFiles] = React.useState({});
  return (
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="private"
        maxFileCount={3}
        onFileRemove={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: undefined,
            };
          });
        }}
        onUploadError={(error, { key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'error',
              },
            };
          });
        }}
        onUploadSuccess={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'success',
              },
            };
          });
        }}
        onUploadStart={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'uploading',
              },
            };
          });
        }}
      />
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}
  );
}
```
