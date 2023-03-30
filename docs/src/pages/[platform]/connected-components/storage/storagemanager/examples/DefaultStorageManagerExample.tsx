import { StorageManager } from '@aws-amplify/ui-react-storage'; // IGNORE
export const DefaultStorageManagerExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={1}
      isResumable
      provider="slow" // IGNORE
    />
  );
};
