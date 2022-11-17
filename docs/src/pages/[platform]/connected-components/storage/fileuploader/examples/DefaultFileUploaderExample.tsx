import { FileUploader } from '@aws-amplify/ui-react'; // IGNORE
export const DefaultFileUploaderExample = () => {
  return (
    <>
      <FileUploader
        acceptedFileTypes={['.png', '.jpg', '.pdf']}
        level="public"
        provider="fast" // IGNORE
      />
    </>
  );
};
