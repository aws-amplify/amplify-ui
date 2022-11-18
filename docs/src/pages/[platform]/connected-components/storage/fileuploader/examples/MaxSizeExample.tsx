import { FileUploader } from '@aws-amplify/ui-react';

export const MaxSizeExample = () => {
  return (
    <FileUploader
      maxSize={100000}
      acceptedFileTypes={['.gif', '.bmp', '.jpg', '.png']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
