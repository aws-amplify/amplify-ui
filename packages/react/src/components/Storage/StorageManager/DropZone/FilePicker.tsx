import React from 'react';
import {
  Button,
  ComponentClassNames,
  View,
  VisuallyHidden,
} from '../../../../primitives';
import { FilePickerProps } from './types';

export function FilePicker({
  acceptedFileTypes,
  allowMultipleFiles,
  displayText,
  onFileChange,
}: FilePickerProps): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>(null);
  const { browseFilesText } = displayText;

  function handleClick() {
    if (hiddenInput.current) {
      hiddenInput.current.click();
      hiddenInput.current.value = '';
    }
  }

  return (
    <View>
      <Button
        className={ComponentClassNames.StorageManagerDropZoneButton}
        onClick={handleClick}
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
          multiple={allowMultipleFiles}
          accept={acceptedFileTypes.join(',')}
        />
      </VisuallyHidden>
    </View>
  );
}
