import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {
  StorageManager,
  StorageManagerProps,
} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { ProcessFileErrorParams } from '@aws-amplify/ui-react-storage/src/components/StorageManager/types';
Amplify.configure(awsExports);

const processFile: StorageManagerProps['processFile'] = async ({ file }) => {
  /*
  return Promise.reject({
    error: 'This file should not be uploaded.',
    key: file.name,
  });
  */
  throw new Error('This file should not be uploaded.');
};

const onProcessFileError = (error: ProcessFileErrorParams) => {
  alert(error.error);
};

export function StorageManagerExample() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="private"
      maxFileCount={3}
      showThumbnails={true}
      processFile={processFile}
      onProcessFileError={onProcessFileError}
    />
  );
}
export default withAuthenticator(StorageManagerExample);
