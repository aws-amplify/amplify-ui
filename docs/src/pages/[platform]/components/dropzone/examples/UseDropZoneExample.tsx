import * as React from 'react';
import { Text, View, useDropZone } from '@aws-amplify/ui-react';

export default function UseDropZoneExample() {
  const [files, setFiles] = React.useState([]);
  const { isDragAccept, isDragActive, isDragReject, ...props } = useDropZone({
    acceptedFileTypes: ['image/*'],
    onDropComplete: ({ files }) => {
      setFiles(files);
    },
  });
  return (
    <>
      <View
        {...props}
        padding="large"
        borderStyle="solid"
        borderWidth="2px"
        borderColor={
          isDragAccept ? 'green.60' : isDragReject ? 'red.60' : 'blue.60'
        }
      >
        <Text>Drag images here</Text>
      </View>
      {files.map((file) => (
        <Text key={file.name}>{file.name}</Text>
      ))}
    </>
  );
}
