import * as React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerHandleExample = () => {
  const ref = React.useRef(null);

  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={3}
        ref={ref}
      />
      <Button onClick={() => ref.current.clearFiles()}>Clear Files</Button>
    </>
  );
};
