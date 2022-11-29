import { FileUploader } from '@aws-amplify/ui-react';

export const MultipleExample = () => {
  return (
    <FileUploader
      hasMultipleFiles={false}
      variation="drop"
      acceptedFileTypes={['image/*']}
      storageLevel="public"
      provider="fast" // IGNORE
    />
  );
};
