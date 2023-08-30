---
"@aws-amplify/ui-react-storage": minor
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": minor
---

feat(react): DropZone component

```jsx
export default function DefaultDropZoneExample() {
  const [files, setFiles] = React.useState([]);
  return (
    <>
      <DropZone
        onDropComplete={({ files }) => {
          setFiles(files);
        }}
      >
        Drag images here
      </DropZone>
      {files.map((file) => (
        <Text key={file.name}>{file.name}</Text>
      ))}
    </>
  );
}
```
