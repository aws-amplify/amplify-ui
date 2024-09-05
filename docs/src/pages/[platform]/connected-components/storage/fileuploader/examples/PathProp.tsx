import { StorageManager } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <StorageManager
      path="public/images/"
      acceptedFileTypes={['image/*']}
      maxFileCount={1}
    />
  );
};
