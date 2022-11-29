import { FileUploader } from '@aws-amplify/ui-react';

export const AutoProceedExample = () => {
  return (
    <FileUploader
      shouldAutoProceed={true}
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      provider="fast" // IGNORE
    />
  );
};
