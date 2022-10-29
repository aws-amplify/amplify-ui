import { Amplify } from 'aws-amplify';
import { FileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  return (
    <>
      <FileUploader
        variation="drop"
        acceptedFileTypes={['.png', '.jpg', '.pdf']}
        level="public"
        multiple={true}
        maxSize={100000}
      />
    </>
  );
}
