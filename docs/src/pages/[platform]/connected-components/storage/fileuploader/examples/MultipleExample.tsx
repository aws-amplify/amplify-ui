import { FileUploader } from '@aws-amplify/ui-react';

export const MultipleExample = () => {
  return (
    <FileUploader
      hasMultipleFiles={false}
      acceptedFileTypes={['image/*']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
