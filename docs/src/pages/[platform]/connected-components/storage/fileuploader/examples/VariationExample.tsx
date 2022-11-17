import { FileUploader } from '@aws-amplify/ui-react';
export const VariationExample = () => {
  return (
    <FileUploader
      variation="drop"
      acceptedFileTypes={['.gif', '.bmp', '.doc']}
      level="public"
      provider="slow" // IGNORE
    />
  );
};
