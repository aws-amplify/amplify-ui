---
'@aws-amplify/ui-react-storage': minor
---

feat(storage-browser): add custom file validation and options config

**Add custom file validation**

```tsx
import React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';

const MAX_FILE_SIZE = 1000 * 1000; // 1 MB

const customValidateFile = (file: File) => {
  const isValidSize = file.size <= MAX_FILE_SIZE;
  const isValidType = file.type.includes('image');
  return isValidSize && isValidType;
};

const { StorageBrowser } = createStorageBrowser({
  // ...config goes here...
  options: {
    validateFile: customValidateFile,
  },
});

export default function Example() {
  return (
    <StorageBrowser
      displayText={{
        UploadView: {
          getFilesValidationMessage: (data) => {
            const invalidFileNames = data?.invalidFiles?.map(
              ({ file }) => file.name
            );
            return {
              content: `Only image files that are 1 MB or smaller are accepted. Invalid files: ${invalidFileNames}`,
              type: 'error',
            };
          },
        },
      }}
    />
  );
}
```