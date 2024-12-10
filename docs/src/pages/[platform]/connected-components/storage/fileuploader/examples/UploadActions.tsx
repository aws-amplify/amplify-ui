import { FileUploader } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/"
      autoUpload={false}
      maxFileCount={1}
      isResumable
    />
  );
};
