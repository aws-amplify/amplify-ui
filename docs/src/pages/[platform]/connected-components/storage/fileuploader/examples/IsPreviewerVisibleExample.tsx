import { FileUploader } from '@aws-amplify/ui-react';

export const IsPreviewerVisibleExample = () => {
  return (
    <FileUploader
      isPreviewerVisible={true}
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      // @ts-ignore // IGNORE
      provider="fast" // IGNORE
    />
  );
};
