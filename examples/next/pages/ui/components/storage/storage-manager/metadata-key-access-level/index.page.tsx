import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import {
  StorageManager,
  StorageManagerProps,
} from '@aws-amplify/ui-react-storage';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const processFile: StorageManagerProps['processFile'] = ({ file, key }) => {
  return {
    file,
    key,
    metadata: {
      id: key,
    },
  };
};

export function StorageManagerExample() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="private"
      maxFileCount={3}
      showThumbnails={true}
      processFile={processFile}
    />
  );
}
export default withAuthenticator(StorageManagerExample);
