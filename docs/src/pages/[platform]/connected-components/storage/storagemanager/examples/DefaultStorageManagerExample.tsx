import { StorageManager } from '@aws-amplify/ui-react-storage';

export const DefaultStorageManagerExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="guest"
      maxFileCount={1}
      isResumable
    />
  );
};
