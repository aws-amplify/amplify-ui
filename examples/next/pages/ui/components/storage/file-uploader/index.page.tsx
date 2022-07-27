import { Amplify, Auth, I18n } from 'aws-amplify';

import { View, FileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  return (
    <>
      <View>View</View>
      <FileUploader multiple={true} />
    </>
  );
}
