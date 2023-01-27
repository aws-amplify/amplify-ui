import { FileUploader, Text } from '@aws-amplify/ui-react'; // IGNORE

export const OnBeforeUploadExample = () => {
  return (
    <>
      <Text>Change file name to add a unix timestamp</Text>
      <FileUploader
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        onSuccess={(event) => {
          console.log(event);
        }}
        onBeforeUpload={(file) => {
          // we might want to do this for customers
          const [extension, filename] = [
            file.name.substring(file.name.lastIndexOf('.')),
            file.name.substring(0, file.name.lastIndexOf('.')),
          ];
          return {
            ...file,
            name: `${filename}-${Date.now().toString()}${extension}`,
          };
        }}
        provider="fast" // IGNORE
      />
      <Text>Return a Promise for a long-running task</Text>
      <FileUploader
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        path="foo/"
        onSuccess={(event) => {
          console.log(event);
        }}
        onBeforeUpload={(file) => {
          return new Promise((resolve) => {
            setTimeout(() => resolve(file), 5000);
          });
        }}
        provider="fast" // IGNORE
      />
    </>
  );
};
