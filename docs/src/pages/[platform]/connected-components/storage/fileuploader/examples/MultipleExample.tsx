import { FileUploader } from '@aws-amplify/ui-react';

export const MultipleExample = () => {
  return (
    <FileUploader
      multiple={false}
      acceptedFileTypes={['image/*']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
