import { Amplify } from 'aws-amplify';
import { FileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  const onSuccess = (event) => {
    console.log('got back', event);
  };
  return (
    <FileUploader
      variation="drop"
      onSuccess={onSuccess}
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      hasMultipleFiles={true}
      maxSize={100000000}
      maxFiles={3}
      isResumable={true}
    />
  );
}
