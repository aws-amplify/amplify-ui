import { FileUploader } from '@aws-amplify/ui-react';

export const IsPreviewerVisibleExample = () => {
  return (
    <FileUploader
      isPreviewerVisible={true}
      acceptedFileTypes={['image/*']}
      storageLevel="public"
      provider="fast" // IGNORE
    />
  );
};
