import { Amplify } from 'aws-amplify';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import amplifyOutputs from './amplify_outputs';
Amplify.configure(amplifyOutputs);

export function FileUploaderExample() {
  return (
    <FileUploader
      acceptedFileTypes={['*']}
      path="public/"
      maxFileCount={1}
      showThumbnails
    />
  );
}
export default FileUploaderExample;
