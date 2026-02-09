import { Amplify } from 'aws-amplify';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import amplifyOutputs from './amplify_outputs';

Amplify.configure(amplifyOutputs);

export function StorageManagerExample() {
  return (
    <StorageManager
      acceptedFileTypes={['*']}
      path="public/"
      maxFileCount={1}
      showThumbnails
    />
  );
}
export default StorageManagerExample;
