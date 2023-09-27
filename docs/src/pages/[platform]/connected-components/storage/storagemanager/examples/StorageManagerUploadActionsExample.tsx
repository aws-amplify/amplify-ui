import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerUploadActionsExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="guest"
      autoUpload={false}
      maxFileCount={1}
      isResumable
      provider="slow" // IGNORE
    />
  );
};
