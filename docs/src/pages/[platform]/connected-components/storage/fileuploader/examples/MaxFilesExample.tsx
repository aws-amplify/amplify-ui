import { FileUploader } from '@aws-amplify/ui-react';

export const MaxFilesExample = () => {
  return (
    <FileUploader
      maxFileCount={3}
      variation="drop"
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      // @ts-ignore // IGNORE
      provider="fast" // IGNORE
    />
  );
};
