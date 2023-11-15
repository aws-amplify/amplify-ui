import { StorageImage } from '@aws-amplify/ui-react-storage';

export const StorageImageErrorHandlingExample = () => {
  return (
    <StorageImage
      alt="fallback cat"
      imgKey="cat.jpg"
      accessLevel="guest"
      fallbackSrc="/fallback_cat.jpg"
      onStorageGetError={(error) => console.error(error)}
    />
  );
};
