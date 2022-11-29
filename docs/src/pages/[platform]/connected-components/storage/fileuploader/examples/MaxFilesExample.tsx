import { FileUploader } from '@aws-amplify/ui-react';

export const MaxFilesExample = () => {
  return (
    <FileUploader
      maxFiles={3}
      variation="drop"
      acceptedFileTypes={['image/*']}
      storageLevel="public"
      provider="fast" // IGNORE
    />
  );
};
