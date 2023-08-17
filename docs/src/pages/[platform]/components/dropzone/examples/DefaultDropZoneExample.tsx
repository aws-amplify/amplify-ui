import { DropZone } from '@aws-amplify/ui-react';

export default function DefaultDropZoneExample() {
  return (
    <DropZone
      maxFileCount={3}
      onDrop={({ files }) => {
        console.log(files);
      }}
    >
      Drag images here
    </DropZone>
  );
}
