import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { FileUploader, FileUploaderProps } from '@aws-amplify/ui-react-storage';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const processFile: FileUploaderProps['processFile'] = async ({ file }) => {
  const fileExtension = file.name.split('.').pop();

  // pretend the input `file` has been compressed:
  const blob = new Blob(['Compressed data'], { type: 'text/plain' });
  const compressedFile = new File([blob], undefined, {
    type: 'text/plain',
  });

  return compressedFile
    .arrayBuffer()
    .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
    .then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((a) => a.toString(16).padStart(2, '0'))
        .join('');
      return {
        file: compressedFile,
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
