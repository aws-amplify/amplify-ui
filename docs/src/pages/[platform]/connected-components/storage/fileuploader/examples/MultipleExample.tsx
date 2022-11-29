import { FileUploader } from '@aws-amplify/ui-react';

export const MultipleExample = () => {
  return (
    <FileUploader
      hasMultipleFiles={false}
      variation="drop"
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      provider="fast" // IGNORE
    />
  );
};
