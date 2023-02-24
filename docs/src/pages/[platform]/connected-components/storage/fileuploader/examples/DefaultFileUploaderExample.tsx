import { FileUploader } from '@aws-amplify/ui-react'; // IGNORE
export const DefaultFileUploaderExample = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      provider="fast" // IGNORE
    />
  );
};
