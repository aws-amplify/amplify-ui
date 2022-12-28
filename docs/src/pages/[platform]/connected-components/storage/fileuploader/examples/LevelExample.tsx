import { FileUploader } from '@aws-amplify/ui-react';

export const LevelExample = () => {
  return (
    <FileUploader
      variation="drop"
      acceptedFileTypes={['image/*']}
      level="private"
      provider="fast" // IGNORE
    />
  );
};
