import { FileUploader } from '@aws-amplify/ui-react';
export const VariationExample = () => {
  return (
    <>
      <FileUploader
        variation="drop"
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        // @ts-ignore // IGNORE
        provider="fast" // IGNORE
      />
      <FileUploader
        variation="button"
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        // @ts-ignore // IGNORE
        provider="fast" // IGNORE
      />
    </>
  );
};
