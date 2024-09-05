import { Alert } from '@aws-amplify/ui-react';

export const FileUploaderAlert = () => {
  return (
    <Alert variation="info" role="none">
      StorageManager has been renamed to FileUploader. The FileUploader export
      is available since version 3.3.0, previous versions must still use
      StorageManager.
    </Alert>
  );
};
