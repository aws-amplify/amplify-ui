import { Amplify } from 'aws-amplify';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export function StorageManagerExample() {
  return (
    <StorageManager
      acceptedFileTypes={['*']}
      accessLevel="guest"
      maxFileCount={1}
      showThumbnails
    />
  );
}
export default StorageManagerExample;
