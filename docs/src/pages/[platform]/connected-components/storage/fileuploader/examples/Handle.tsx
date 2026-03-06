import * as React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { FileUploader } from '@aws-amplify/ui-react-storage';

export const App = () => {
  const ref = React.useRef(null);

  return (
    <>
      <FileUploader
        acceptedFileTypes={['image/*']}
        path="public/"
        maxFileCount={3}
        ref={ref}
      />
      <Button onClick={() => ref.current.clearFiles()}>Clear Files</Button>
    </>
  );
};
