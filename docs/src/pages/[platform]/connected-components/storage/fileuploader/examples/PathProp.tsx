import { FileUploader } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <FileUploader
      path="public/images/"
      acceptedFileTypes={['image/*']}
      maxFileCount={1}
    />
  );
};
