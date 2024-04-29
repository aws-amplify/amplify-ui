import { StorageManager } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*', '.zip', '.mp4']}
      path="public/"
      maxFileCount={10}
      isResumable
    />
  );
};
