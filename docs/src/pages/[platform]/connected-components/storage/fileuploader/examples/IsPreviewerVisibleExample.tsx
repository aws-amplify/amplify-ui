import { FileUploader } from '@aws-amplify/ui-react';
export const IsPreviewerVisibleExample = () => {
  return (
    <FileUploader
      isPreviewerVisible={true}
      acceptedFileTypes={['.gif', '.bmp', '.doc']}
      level="public"
      provider="slow" // IGNORE
    />
  );
};
