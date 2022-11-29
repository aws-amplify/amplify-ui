import { FileUploader } from '@aws-amplify/ui-react';

export const ResumableExample = () => {
  return (
    <FileUploader
      isResumable={true}
      variation="drop"
      acceptedFileTypes={['image/*']}
      storageLevel="public"
      provider="slow" // IGNORE
    />
  );
};
