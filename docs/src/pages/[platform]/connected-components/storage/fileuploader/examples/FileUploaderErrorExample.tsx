import * as React from 'react';
import { FileUploader } from '@aws-amplify/ui-react';

export const FileUploaderErrorExample = () => {
  const [message, setMessage] = React.useState('');
  const onError = (error) => {
    setMessage(`${error}`);
  };

  return (
    <>
      <FileUploader
        onError={onError}
        isResumable={true}
        variation="drop"
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        provider="error" // IGNORE
      />
      {message}
    </>
  );
};
