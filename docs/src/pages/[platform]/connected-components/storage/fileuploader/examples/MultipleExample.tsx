import { FileUploader } from '@aws-amplify/ui-react';

export const MultipleExample = () => {
  return (
    <FileUploader
      multiple={false}
      acceptedFileTypes={['.gif', '.bmp', '.jpg', '.png']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
