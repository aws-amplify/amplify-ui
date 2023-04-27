import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {
  StorageManager,
  StorageManagerProps,
} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const processFile: StorageManagerProps['processFile'] = ({
  file,
  key,
  metadata,
}) => {
  return {
    file,
    key,
    metadata: {
      ...metadata,
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
      metadata={{
        test: 'bar',
      }}
      processFile={processFile}
    />
  );
}
export default withAuthenticator(StorageManagerExample);
