import { FileUploader } from '@aws-amplify/ui-react';

export const MaxFileCountExample = () => {
  return (
    <FileUploader
      maxFileCount={3}
      variation="drop"
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      provider="fast" // IGNORE
    />
  );
};
