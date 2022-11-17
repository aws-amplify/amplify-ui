import { FileUploader } from '@aws-amplify/ui-react';
export const LevelExample = () => {
  return (
    <FileUploader
      variation="drop"
      acceptedFileTypes={['.gif']}
      level="private"
      provider="slow" // IGNORE
    />
  );
};
