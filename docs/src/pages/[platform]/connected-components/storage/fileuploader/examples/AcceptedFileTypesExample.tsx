import { FileUploader } from '@aws-amplify/ui-react';

export const AcceptedFileTypesExample = () => {
  return (
    <FileUploader
      acceptedFileTypes={['.gif', '.bmp', '.doc', '.jpeg', '.jpg']}
      variation="drop"
      level="public"
      provider="fast" // IGNORE
    />
  );
};
