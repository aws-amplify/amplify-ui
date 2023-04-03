import * as React from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerEventExample = () => {
  const [files, setFiles] = React.useState([]);

  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={10}
        onFileRemove={({ key }) => {
          setFiles((prevFiles) => prevFiles.filter((file) => file.key !== key));
        }}
        onUploadSuccess={({ key }) => {
          setFiles((prevFiles) => [...prevFiles, { key }]);
        }}
        provider="fast" // IGNORE
      />
      {files.map((file) => (
        <div key={file.key}>{file.key}</div>
      ))}
    </>
  );
};
