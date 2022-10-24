import { Amplify } from 'aws-amplify';

import { Button, FileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { useState } from 'react';
import { SwitchField, View, Card } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

function CustomUploaderDrop({ getDropEvents, inDropZone }) {
  // stubbed
}

export default function FileUploaderEmail() {
  return (
    <>
      <FileUploader
        acceptedFileTypes={['.png']}
        level="public"
        multiple={true}
      />
    </>
  );
}
