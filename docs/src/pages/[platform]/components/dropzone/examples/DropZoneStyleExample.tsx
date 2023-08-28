import { DropZone } from '@aws-amplify/ui-react';

export default function DropZoneStyleExample() {
  return (
    <DropZone
      onDropComplete={({ acceptedFiles }) => {
        console.log(acceptedFiles);
      }}
      borderWidth="4px"
      borderColor="red"
    >
      Drag images here
    </DropZone>
  );
}
