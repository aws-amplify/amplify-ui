import { DropZone, Flex, Text } from '@aws-amplify/ui-react';
import { MdCheckCircle, MdFileUpload, MdRemoveCircle } from 'react-icons/md';

export default function DefaultDropZoneExample() {
  return (
    <DropZone
      acceptedFileTypes={['image/*']}
      onDropComplete={({ files }) => {
        console.log(files);
      }}
    >
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
    </DropZone>
  );
}
