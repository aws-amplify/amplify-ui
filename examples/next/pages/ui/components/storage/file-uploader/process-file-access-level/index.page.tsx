import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { FileUploader, FileUploaderProps } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const processFile: FileUploaderProps['processFile'] = async ({ file }) => {
  const fileExtension = file.name.split('.').pop();

  const text = 'This is the content of my file';
  const blob = new Blob([text], { type: 'text/plain' });

  return file
    .arrayBuffer()
    .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
    .then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((a) => a.toString(16).padStart(2, '0'))
        .join('');
      return {
        file: new File([blob], `${hashHex}.${fileExtension}`, {
          type: 'text/plain',
        }),
        key: `${hashHex}.${fileExtension}`,
      };
    });
};

export function FileUploaderExample() {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      path={({ identityId }) => `private/${identityId}/`}
      maxFileCount={3}
      showThumbnails={true}
      processFile={processFile}
    />
  );
}
export default withAuthenticator(FileUploaderExample);
