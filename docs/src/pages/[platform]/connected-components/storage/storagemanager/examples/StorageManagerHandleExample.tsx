import * as React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerHandleExample = () => {
  const files = React.useRef();

  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={3}
        ref={files}
      />
      <Button onClick={() => files.current.clearFiles()}>
        {'Clear Files'}
      </Button>
    </>
  );
};
