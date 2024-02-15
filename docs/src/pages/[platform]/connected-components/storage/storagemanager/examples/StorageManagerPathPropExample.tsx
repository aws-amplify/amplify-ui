import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerPathPropExample = () => {
  return (
    <StorageManager
      accessLevel="guest"
      // uploaded files can be found in S3 inside `public/images/`
      path="images/"
      acceptedFileTypes={['image/*']}
      maxFileCount={1}
    />
  );
};
