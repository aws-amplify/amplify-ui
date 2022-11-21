import { FileUploader } from '@aws-amplify/ui-react';

export const ShowImagesExample = () => {
  return (
    <FileUploader
      showImages={false}
      acceptedFileTypes={['image/*']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
