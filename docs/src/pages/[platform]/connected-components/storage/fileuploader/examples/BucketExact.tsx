import { FileUploader } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      bucket={{
        bucketName: 'my-bucket-xxxxxxxx',
        region: 'us-west-2',
      }}
      path="public/"
      maxFileCount={1}
    />
  );
};
