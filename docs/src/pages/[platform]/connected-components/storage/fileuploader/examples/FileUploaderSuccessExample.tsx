import * as React from 'react';
import { FileUploader } from '@aws-amplify/ui-react';

export const FileUploaderSuccessExample = () => {
  const [message, setMessage] = React.useState('');
  const onSuccess = ({ key }) => {
    setMessage(`Key: ${key}`);
  };

  return (
    <>
      <FileUploader
        onSuccess={onSuccess}
        variation="drop"
        acceptedFileTypes={['image/*']}
        level="public"
        provider="fast" // IGNORE
      />
      {message}
    </>
  );
};
