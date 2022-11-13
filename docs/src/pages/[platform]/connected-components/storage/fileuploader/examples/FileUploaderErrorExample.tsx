import { FileUploader, View, useTheme } from '@aws-amplify/ui-react';

export const FileUploaderErrorExample = () => {
  const { tokens } = useTheme();

  const onSuccess = (event) => {
    console.log('got back', event);
  };

  const onError = (event) => {
    console.log(event);
  };

  return (
    <FileUploader
      variation="drop"
      onSuccess={onSuccess}
      onError={onError}
      acceptedFileTypes={['image/*']}
      level="public"
      multiple={true}
      maxSize={100000000}
      maxFiles={3}
      resumable={true}
      provider="error" // IGNORE
    />
  );
};
