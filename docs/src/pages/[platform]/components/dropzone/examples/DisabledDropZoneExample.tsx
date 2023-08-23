import { DropZone } from '@aws-amplify/ui-react';

export default function DisabledDropZoneExample() {
  return (
    <DropZone
      isDisabled
      maxFileCount={3}
      onDropComplete={({ files }) => {
        console.log(files);
      }}
    >
      Drag images here
    </DropZone>
  );
}
