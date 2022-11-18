import { FileUploader } from '@aws-amplify/ui-react';

export const MaxFilesExample = () => {
  return (
    <FileUploader
      maxFiles={3}
      acceptedFileTypes={['.gif', '.bmp', '.jpg', '.png']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
