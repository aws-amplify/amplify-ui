import { StorageManager } from '@aws-amplify/ui-react-storage'; // IGNORE
import * as React from 'react'; // IGNORE

export const StorageManagerEventExample = () => {
  // NOTE: you will need to keep a ref of the files because
  // the StorageManager calls onUploadSuccess and onUploadError asynchronously
  // when each file is uploaded.
  const filesRef = React.useRef([]);
  const [files, setFiles] = React.useState([]);

  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={10}
        onFileRemove={({ key }) => {
          // remove the file from the list
          filesRef.current = filesRef.current.filter(
            (file) => file.key !== key
          );
          setFiles(filesRef.current);
        }}
        onUploadSuccess={({ key }) => {
          filesRef.current = [...filesRef.current, { key }];
          setFiles(filesRef.current);
        }}
        provider="fast" // IGNORE
      />
      {files.map((file) => (
        <div key={file.key}>{file.key}</div>
      ))}
    </>
  );
};
