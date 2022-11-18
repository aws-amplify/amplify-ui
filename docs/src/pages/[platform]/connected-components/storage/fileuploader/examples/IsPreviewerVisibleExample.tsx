import { FileUploader } from '@aws-amplify/ui-react';

export const IsPreviewerVisibleExample = () => {
  return (
    <FileUploader
      isPreviewerVisible={true}
      acceptedFileTypes={['.gif', '.bmp', '.jpg', '.png']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
