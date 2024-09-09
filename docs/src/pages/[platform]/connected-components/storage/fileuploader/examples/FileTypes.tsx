import { FileUploader } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <FileUploader
      acceptedFileTypes={[
        // you can list file extensions:
        '.gif',
        '.bmp',
        '.doc',
        '.jpeg',
        '.jpg',
        // or MIME types:
        'image/png',
        'video/*',
      ]}
      path="public/"
      maxFileCount={5}
      // Size is in bytes
      maxFileSize={10000}
    />
  );
};
