import { FileUploader } from '@aws-amplify/ui-react';

export const AutoUploadExample = () => {
  return (
    <FileUploader
      shouldAutoUpload={true}
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      provider="fast" // IGNORE
    />
  );
};
