import { Amplify } from 'aws-amplify';
import { FileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  return (
    <>
      <FileUploader
        variation="button"
        acceptedFileTypes={['.png']}
        level="public"
        multiple={true}
      />
    </>
  );
}
