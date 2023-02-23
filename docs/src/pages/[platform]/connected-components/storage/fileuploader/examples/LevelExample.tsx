import { FileUploader } from '@aws-amplify/ui-react';

export const LevelExample = () => {
  return (
    <FileUploader
      variation="drop"
      acceptedFileTypes={['image/*']}
      accessLevel="private"
      // @ts-ignore
      provider="fast" // IGNORE
    />
  );
};
