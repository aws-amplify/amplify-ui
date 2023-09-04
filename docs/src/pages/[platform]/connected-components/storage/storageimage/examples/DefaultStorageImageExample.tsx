import { StorageImage } from '@aws-amplify/ui-react-storage';

export const DefaultStorageImageExample = () => {
  return <StorageImage alt="cat" imgKey="cat.jpg" accessLevel="public" />;
};
