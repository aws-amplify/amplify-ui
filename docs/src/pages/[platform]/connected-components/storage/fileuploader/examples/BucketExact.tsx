import { FileUploader } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      bucket={{
        bucketName: 'my-bucket-96e87892835c413e9963f3004a44e1ff',
        region: 'us-west-2',
      }}
      path="public/"
      maxFileCount={1}
    />
  );
};
