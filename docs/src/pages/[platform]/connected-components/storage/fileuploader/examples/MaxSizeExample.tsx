import { FileUploader } from '@aws-amplify/ui-react';

export const MaxSizeExample = () => {
  return (
    <FileUploader
      maxSize={100000}
      variation="drop"
      acceptedFileTypes={['image/*']}
      storageLevel="public"
      provider="fast" // IGNORE
    />
  );
};
