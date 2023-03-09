import { FileUploader } from '@aws-amplify/ui-react';

export const ResumableExample = () => {
  return (
    <FileUploader
      isResumable={true}
      variation="drop"
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      // @ts-ignore // IGNORE
      provider="slow" // IGNORE
    />
  );
};
