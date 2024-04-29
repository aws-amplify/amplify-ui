import { Amplify } from 'aws-amplify';
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export const App = () => {
  return (
    <>
      <StorageImage alt="sleepy-cat" path="public/cat.jpeg" />
      <StorageManager path="my_prefix/public" maxFileCount={3} />
    </>
  );
};
