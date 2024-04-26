import { StorageImage } from '@aws-amplify/ui-react-storage';

export const DefaultStorageImageExample = () => {
  return (
    <>
      <StorageImage alt="sleepy-cat" path="guest/cat.jpg" />
      <StorageImage
        alt="protected-sleepy-cat"
        path={({ identityId }) => `protected/${identityId}/cat.jpg`}
      />
    </>
  );
};
