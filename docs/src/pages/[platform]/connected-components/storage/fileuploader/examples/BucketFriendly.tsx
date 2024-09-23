import { FileUploader } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      bucket="my-bucket"
      path="public/"
      maxFileCount={1}
    />
  );
};
