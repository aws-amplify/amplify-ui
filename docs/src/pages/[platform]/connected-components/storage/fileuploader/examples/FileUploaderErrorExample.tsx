import { FileUploader } from '@aws-amplify/ui-react';

export const FileUploaderErrorExample = () => {
  const onError = (event) => {
    console.log(event);
  };

  return (
    <FileUploader
      onError={onError}
      resumable={true}
      variation="drop"
      acceptedFileTypes={['image/*']}
      level="public"
      provider="error" // IGNORE
    />
  );
};
