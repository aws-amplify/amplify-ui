import * as React from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerEventExample = () => {
  const [files, setFiles] = React.useState({});

  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        // private uploads will fail intentionally in docs // IGNORE
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
    </>
  );
};
