import { FileUploader } from '@aws-amplify/ui-react';

export const FileUploaderSuccessExample = () => {
  const onSuccess = ({ key }: { key: string }) => {
    console.log('Key:', key);
  };

  return (
    <FileUploader
      onSuccess={onSuccess}
      variation="drop"
      acceptedFileTypes={['.gif', '.bmp', '.jpg', '.jpeg']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
