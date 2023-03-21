import React from 'react';
import {
  Button,
  ComponentClassNames,
  View,
  VisuallyHidden,
} from '../../../../primitives';

export function FilePicker({
  browseFilesText,
  onFileChange,
  acceptedFileTypes,
}: {
  acceptedFileTypes: string[];
  browseFilesText: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>();

  // @todo disable dropzone if uploading files?
  return (
    <View style={{ display: 'flex' }}>
      <Button
        className={ComponentClassNames.StorageManagerDropZoneButton}
        // isDisabled={isLoading}
        onClick={() => {
          hiddenInput.current.click();
          hiddenInput.current.value = null;
        }}
        size="small"
      >
        {browseFilesText}
      </Button>
      <VisuallyHidden>
        <input
          type="file"
          tabIndex={-1}
          ref={hiddenInput}
          onChange={onFileChange}
          // multiple={allowMultipleFiles}
          accept={acceptedFileTypes.join(',')}
        />
      </VisuallyHidden>
    </View>
  );
}
