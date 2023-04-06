import { Amplify } from 'aws-amplify';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export function StorageManagerExample() {
  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
        showThumbnails
        defaultFiles={[{ key: 'default.jpg' }]}
      />
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
        showThumbnails
        defaultFiles={[{ key: null }, null]}
      />
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
        showThumbnails
        defaultFiles={null}
      />
    </>
  );
}
export default StorageManagerExample;
