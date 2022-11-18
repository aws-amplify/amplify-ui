import { FileUploader } from '@aws-amplify/ui-react';

export const AutoProceedExample = () => {
  return (
    <FileUploader
      autoProceed={true}
      acceptedFileTypes={['.gif', '.bmp', '.doc']}
      level="public"
      provider="slow" // IGNORE
    />
  );
};
