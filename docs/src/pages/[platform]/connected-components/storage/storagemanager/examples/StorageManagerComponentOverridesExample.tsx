import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerComponentOverridesExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={5}
      components={{
        Container({ children }) {
          return <div>{children}</div>;
        },
      }}
    />
  );
};
