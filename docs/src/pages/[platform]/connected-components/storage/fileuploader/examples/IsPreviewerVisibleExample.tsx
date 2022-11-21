import { FileUploader } from '@aws-amplify/ui-react';

export const IsPreviewerVisibleExample = () => {
  return (
    <FileUploader
      isPreviewerVisible={true}
      acceptedFileTypes={['image/*']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
