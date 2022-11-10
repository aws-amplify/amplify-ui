import { FileUploader } from '@aws-amplify/ui-react';

export const AcceptedFileTypesExample = () => {
  const onSuccess = (event) => {
    console.log('got back', event);
  };

  return (
    <FileUploader
      variation="drop"
      onSuccess={onSuccess}
      acceptedFileTypes={['.png', '.jpg', '.pdf']}
      level="public"
      multiple={true}
      maxSize={100000000}
      provider="slow" // IGNORE
    />
  );
};
