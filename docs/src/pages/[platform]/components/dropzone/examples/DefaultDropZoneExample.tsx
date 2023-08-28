import * as React from 'react';
import { DropZone, Text } from '@aws-amplify/ui-react';

export default function DefaultDropZoneExample() {
  const [files, setFiles] = React.useState([]);
  return (
    <>
      <DropZone
        onDropComplete={({ acceptedFiles, rejectedFiles }) => {
          setFiles(acceptedFiles);
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
