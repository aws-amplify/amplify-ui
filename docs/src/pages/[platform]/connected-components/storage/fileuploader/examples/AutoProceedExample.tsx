import { FileUploader } from '@aws-amplify/ui-react';

export const AutoProceedExample = () => {
  return (
    <FileUploader
      shouldAutoProceed={true}
      acceptedFileTypes={['image/*']}
      storageLevel="public"
      provider="fast" // IGNORE
    />
  );
};
