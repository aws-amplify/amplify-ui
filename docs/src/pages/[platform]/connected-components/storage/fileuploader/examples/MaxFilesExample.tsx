import { FileUploader } from '@aws-amplify/ui-react';

export const MaxFilesExample = () => {
  return (
    <FileUploader
      maxFiles={3}
      acceptedFileTypes={['image/*']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
