import { FileUploader } from '@aws-amplify/ui-react';

export const AutoUploadExample = () => {
  return (
    <FileUploader
      shouldAutoProceed={true}
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      // @ts-ignore // IGNORE
      provider="fast" // IGNORE
    />
  );
};
