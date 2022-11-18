import { FileUploader } from '@aws-amplify/ui-react';

export const ShowImagesExample = () => {
  return (
    <FileUploader
      showImages={false}
      acceptedFileTypes={['.gif', '.bmp', '.jpg', '.png']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
