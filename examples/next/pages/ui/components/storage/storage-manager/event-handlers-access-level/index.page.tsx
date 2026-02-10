import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { Field } from '@aws-amplify/ui-react/internal';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export function StorageManagerExample() {
  const [files, setFiles] = React.useState({});
  return (
    <Field
      label="Images"
      isReadOnly={false}
      isRequired={false}
      errorMessage={'error'}
      hasError={false}
    >
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="private"
        maxFileCount={3}
        onFileRemove={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: undefined,
            };
          });
        }}
        onUploadError={(error, { key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'error',
              },
            };
          });
        }}
        onUploadSuccess={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'success',
              },
            };
          });
        }}
        onUploadStart={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'uploading',
              },
            };
          });
        }}
      />
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}
    </Field>
  );
}
export default withAuthenticator(StorageManagerExample);
