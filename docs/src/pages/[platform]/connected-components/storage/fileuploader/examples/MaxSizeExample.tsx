import { FileUploader } from '@aws-amplify/ui-react';

export const MaxSizeExample = () => {
  return (
    <FileUploader
      maxSize={100000}
      variation="drop"
      acceptedFileTypes={['image/*']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
