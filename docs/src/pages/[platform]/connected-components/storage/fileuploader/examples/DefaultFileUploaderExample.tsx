import { FileUploader } from '@aws-amplify/ui-react';

export const DefaultFileUploaderExample = () => {
  const onSuccess = (event) => {
    console.log('got back', event);
  };

  return (
    <>
      <FileUploader
        variation="drop"
        onSuccess={onSuccess}
        acceptedFileTypes={['.png', '.jpg', '.pdf']}
        level="public"
        multiple={false}
        maxSize={100000000}
        resumable={false}
        provider="fast" // IGNORE
      />
    </>
  );
};
