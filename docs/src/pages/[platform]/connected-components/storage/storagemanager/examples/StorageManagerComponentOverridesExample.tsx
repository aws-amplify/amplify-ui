import { StorageManager } from '@aws-amplify/ui-react';

export const StorageManagerComponentOverridesExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      components={{
        Container({ children }) {
          return <div>{children}</div>;
        },
      }}
    />
  );
};
