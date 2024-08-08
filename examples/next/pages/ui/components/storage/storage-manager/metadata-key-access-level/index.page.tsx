import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import {
  StorageManager,
  StorageManagerProps,
} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(`@environments/storage/file-uploader/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

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
