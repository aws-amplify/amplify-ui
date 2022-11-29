import { FileUploader } from '@aws-amplify/ui-react';
export const VariationExample = () => {
  return (
    <>
      <FileUploader
        variation="drop"
        acceptedFileTypes={['image/*']}
        storageLevel="public"
        provider="fast" // IGNORE
      />
      <FileUploader
        variation="button"
        acceptedFileTypes={['image/*']}
        storageLevel="public"
        provider="fast" // IGNORE
      />
    </>
  );
};
