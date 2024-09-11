import { Amplify } from 'aws-amplify';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import amplifyOutputs from './amplify_outputs';
Amplify.configure(amplifyOutputs);

export function FileUploaderExample() {
  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={3}
      isResumable
      showThumbnails
    />
  );
}
export default FileUploaderExample;
