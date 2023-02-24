import { Button, FileUploader } from '@aws-amplify/ui-react'; // IGNORE
import { useState } from 'react';

const es = {
  dropFilesText: 'yoink filez',
  uploadButtonText: (count) => `YOINK ${count} filez`,
};

const en = {
  dropFilesText: 'yeet filez',
  uploadButtonText: (count) => `yeet ${count} filez`,
};

export const DefaultFileUploaderExample = () => {
  const [text, setText] = useState(en);

  return (
    <>
      <Button
        onClick={() => {
          setText(en);
        }}
      >
        En
      </Button>
      <Button
        onClick={() => {
          setText(es);
        }}
      >
        Es
      </Button>
      <FileUploader
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        displayText={{
          dropFilesText: text.dropFilesText,
        }}
        provider="fast" // IGNORE
      />
    </>
  );
};
