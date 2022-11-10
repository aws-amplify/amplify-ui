import * as React from 'react';
import { Amplify, Storage } from 'aws-amplify';
import {
  FileUploader,
  Image,
  Authenticator,
  Button,
  Heading,
  Flex,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { Loader } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  // const [img, setImg] = React.useState('');
  const onSuccess = (event) => {
    console.log('Success: ', event);
    Storage.get(event.key).then((result) => console.log(result));
  };

  const onError = (event) => {
    console.log('Error: ', event);
  };

  return (
    <Authenticator>
      <Flex direction="column">
        <Heading level={4}>Not Resumable</Heading>
        <FileUploader
          variation="drop"
          onSuccess={onSuccess}
          acceptedFileTypes={['.png', '.jpg', '.pdf', '.zip']}
          level="public"
          multiple={true}
          maxSize={100000000}
          maxFiles={3}
        />
        <Heading level={4}>Resumable</Heading>
        <FileUploader
          variation="drop"
          onSuccess={onSuccess}
          acceptedFileTypes={['.png', '.jpg', '.zip']}
          level="public"
          multiple={true}
          maxSize={100000000}
          maxFiles={3}
          resumable={true}
        />
      </Flex>
    </Authenticator>
  );
}
