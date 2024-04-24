import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {
  StorageManager,
  StorageManagerProps,
} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const processFile: StorageManagerProps['processFile'] = async ({ file }) => {
  return Promise.reject({
    error: 'This File should not be uploaded.',
    key: file.name,
  });
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
