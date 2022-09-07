import React from 'react';
import { Button } from 'src/primitives/Button';
import { FileUploaderInputProps } from '../FileUploader/types';
import { getFileName, uploadFile } from '../shared/utils';

export function FileUploaderButton({
  multiple,
  accept,
  fileName,
}: FileUploaderInputProps): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>();
  function handleClick() {
    hiddenInput.current.click();
  }

  function upload(event: React.ChangeEvent<HTMLInputElement>) {
    (async () => {
      if (!event.target.files || event.target.files.length === 0) return;

      const { files } = event.target;

      for (let i = 0; i < files.length; i++) {
        const uploadFileName = getFileName(fileName, files[i], i);
        await uploadFile(files[i], uploadFileName);
      }
      // eslint-disable-next-line no-console
      console.log('uploading', files[0], fileName);
    })();
  }

  return (
    <>
      <Button onClick={handleClick}>Upload file{multiple ? 's' : ''}</Button>
      <input
        type="file"
        ref={hiddenInput}
        onChange={upload}
        style={{ display: 'none' }}
        multiple={multiple}
        accept={accept?.join()}
      />
    </>
  );
}
