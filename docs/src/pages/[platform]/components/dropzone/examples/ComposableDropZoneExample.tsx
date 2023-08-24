import * as React from 'react';
import { DropZone, Flex, Text, useDropZone } from '@aws-amplify/ui-react';
import { MdCheckCircle, MdFileUpload, MdRemoveCircle } from 'react-icons/md';

export default function ComposableDropZoneExample() {
  const [files, setFiles] = React.useState([]);
  const { isDragAccept, isDragActive, isDragReject, ...props } = useDropZone({
    acceptedFileTypes: ['image/*'],
    onDropComplete: ({ files }) => {
      setFiles(files);
    },
  });
  const value = { isDragAccept, isDragActive, isDragReject };

  return (
    <>
      <DropZone.Provider value={value}>
        <DropZone.Container {...props}>
          <Flex direction="row" justifyContent="center" alignItems="center">
            <DropZone.Accepted>
              <MdCheckCircle fontSize="2rem" />
            </DropZone.Accepted>
            <DropZone.Rejected>
              <MdRemoveCircle fontSize="2rem" />
            </DropZone.Rejected>
            <DropZone.Default>
              <MdFileUpload fontSize="2rem" />
            </DropZone.Default>
            <Text>Drag images here</Text>
          </Flex>
        </DropZone.Container>
      </DropZone.Provider>
      {files.map((file) => (
        <Text key={file.name}>{file.name}</Text>
      ))}
    </>
  );
}
