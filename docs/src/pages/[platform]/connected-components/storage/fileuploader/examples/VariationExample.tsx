import { FileUploader } from '@aws-amplify/ui-react';
export const VariationExample = () => {
  return (
    <>
      <FileUploader
        acceptedFileTypes={['image/*']}
        level="public"
        provider="fast" // IGNORE
      />
      <FileUploader
        variation="drop"
        acceptedFileTypes={['image/*']}
        level="public"
        provider="fast" // IGNORE
      />
    </>
  );
};
