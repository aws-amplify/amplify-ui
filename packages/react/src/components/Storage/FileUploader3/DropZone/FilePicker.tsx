import React, { useEffect } from 'react';
import {
  Button,
  ComponentClassNames,
  View,
  VisuallyHidden,
} from '../../../../primitives';

export function FilePicker({
  onFileChange,
}: {
  browseFilesText: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const hiddenInput = React.useRef<HTMLInputElement>();

  // @todo disable dropzone if uploading files?
  return (
    <View style={{ display: 'flex' }}>
      <Button
        className={ComponentClassNames.FileUploaderDropZoneButton}
        // isDisabled={isLoading}
        onClick={() => {
          hiddenInput.current.click();
          hiddenInput.current.value = null;
        }}
        size="small"
      >
        Browse Files
      </Button>
      <VisuallyHidden>
        <input
          type="file"
          tabIndex={-1}
          ref={hiddenInput}
          onChange={onFileChange}
          // multiple={allowMultipleFiles}
          // accept={accept}
        />
      </VisuallyHidden>
    </View>
  );
}
