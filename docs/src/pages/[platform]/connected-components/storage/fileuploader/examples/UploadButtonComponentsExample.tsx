import {
  FileUploader,
  Button,
  Text,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import React from 'react';

export const UploadButtonComponentsExample = () => {
  const acceptedFileTypes = ['image/*'];
  return (
    <FileUploader
      acceptedFileTypes={acceptedFileTypes}
      accessLevel="public"
      // components={{
      //   UploadButton: ({ onClick }) => {
      //     return (
      //       <Button backgroundColor={'brand.primary.20'} onClick={onClick}>
      //         <Text textAlign="center">Click Button Here</Text>
      //       </Button>
      //     );
      //   },
      // }}
      provider="fast" // IGNORE
    />
  );
};
