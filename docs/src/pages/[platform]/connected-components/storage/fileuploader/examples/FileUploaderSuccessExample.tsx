import { FileUploader } from '@aws-amplify/ui-react';

export const FileUploaderSuccessExample = () => {
  const onSuccess = ({ key }) => {
    console.log('Key:', key);
  };

  return (
    <FileUploader
      onSuccess={onSuccess}
      variation="drop"
      acceptedFileTypes={['image/*']}
      level="public"
      provider="fast" // IGNORE
    />
  );
};
