import { StorageManager } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <StorageManager
      path="images/public/"
      acceptedFileTypes={['image/*']}
      maxFileCount={1}
    />
  );
};
