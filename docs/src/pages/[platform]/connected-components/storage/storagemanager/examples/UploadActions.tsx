import { StorageManager } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      path="public/"
      autoUpload={false}
      maxFileCount={1}
      isResumable
    />
  );
};
