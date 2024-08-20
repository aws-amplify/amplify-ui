import { StorageManager } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      bucket="my-bucket"
      path="public/"
      maxFileCount={1}
    />
  );
};
