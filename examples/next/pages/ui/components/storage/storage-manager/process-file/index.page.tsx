import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {
  StorageManager,
  StorageManagerProps,
} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
// @todo-migration remove

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const processFile: StorageManagerProps['processFile'] = async ({ file }) => {
  const fileExtension = file.name.split('.').pop();

  return file
    .arrayBuffer()
    .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
    .then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((a) => a.toString(16).padStart(2, '0'))
        .join('');
      return { file, key: `${hashHex}.${fileExtension}` };
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
