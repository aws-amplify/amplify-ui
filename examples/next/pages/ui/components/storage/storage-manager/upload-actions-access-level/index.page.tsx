import { Amplify } from 'aws-amplify';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export function FileUploaderExample() {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      accessLevel="guest"
      autoUpload={false}
      maxFileCount={10}
      showThumbnails
    />
  );
}
export default FileUploaderExample;
