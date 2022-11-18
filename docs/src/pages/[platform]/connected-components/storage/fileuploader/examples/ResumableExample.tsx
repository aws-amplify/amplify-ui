import { FileUploader } from '@aws-amplify/ui-react';

export const ResumableExample = () => {
  return (
    <FileUploader
      resumable={true}
      acceptedFileTypes={['.gif', '.bmp', '.jpg', '.png']}
      level="public"
      provider="slow" // IGNORE
    />
  );
};
