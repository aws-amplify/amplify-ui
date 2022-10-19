import React from 'react';
import { Button } from 'src/primitives/Button';
import { UploaderButtonProps } from '../FileUploader/types';

export function UploaderButton({
  multiple,
  acceptedFileTypes,
  fileNames,
  setShowPreviewer,
  setFiles,
}: UploaderButtonProps): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>();
  function handleClick() {
    hiddenInput.current.click();
  }

  function upload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;

    const { files } = event.target;
    setFiles([...files]);
    setShowPreviewer(true);

    // eslint-disable-next-line no-console
    console.log('uploading', files[0], fileNames);
  }

  return (
    <>
      <Button
        color="white"
        style={{ backgroundColor: '#067398' }}
        onClick={handleClick}
      >
        Upload file{multiple ? 's' : ''}
      </Button>
      <input
        type="file"
        ref={hiddenInput}
        onChange={upload}
        style={{ display: 'none' }}
        multiple={multiple}
        accept={acceptedFileTypes?.join()}
      />
    </>
  );
}
