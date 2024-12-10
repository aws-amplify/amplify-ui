import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Field } from '@aws-amplify/ui-react/internal';

import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export function FileUploaderExample() {
  return (
    <Field
      label="Images"
      isReadOnly={false}
      isRequired={false}
      errorMessage={'error'}
      hasError={false}
    >
      <FileUploader
        acceptedFileTypes={['image/*']}
        accessLevel="private"
        maxFileCount={3}
        isResumable
        showThumbnails={true}
      />
    </Field>
  );
}
export default withAuthenticator(FileUploaderExample);
