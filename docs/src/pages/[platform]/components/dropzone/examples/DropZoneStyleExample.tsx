import { DropZone } from '@aws-amplify/ui-react';

export default function DropZoneStyleExample() {
  return (
    <DropZone
      onDropComplete={({ files }) => {
        console.log(files);
      }}
      borderWidth="4px"
      borderColor="red"
    >
      Drag images here
    </DropZone>
  );
}
