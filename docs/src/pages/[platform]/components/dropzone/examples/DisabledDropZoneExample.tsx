import { DropZone } from '@aws-amplify/ui-react';

export default function DisabledDropZoneExample() {
  return (
    <DropZone
      isDisabled
      onDropComplete={({ acceptedFiles }) => {
        console.log(acceptedFiles);
      }}
    >
      Drag images here
    </DropZone>
  );
}
