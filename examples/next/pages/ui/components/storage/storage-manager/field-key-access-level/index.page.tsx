import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Field } from '@aws-amplify/ui-react/internal';

import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(`@environments/storage/file-uploader/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export function StorageManagerExample() {
  return (
    <Field
      label="Images"
      isReadOnly={false}
      isRequired={false}
      errorMessage={'error'}
      hasError={false}
    >
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="private"
        maxFileCount={3}
        isResumable
        showThumbnails={true}
      />
    </Field>
  );
}
export default withAuthenticator(StorageManagerExample);
