import { FileUploader } from '@aws-amplify/ui-react'; // IGNORE
export const DefaultFileUploaderExample = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      storageLevel="public"
      provider="fast" // IGNORE
    />
  );
};
