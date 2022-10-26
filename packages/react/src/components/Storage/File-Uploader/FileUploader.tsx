import React, { useEffect } from 'react';
import { FileUploaderProps } from './types';
import { Previewer } from './Previewer';
import { UploadDropZone } from './UploadDropZone';
import { useFileUploader } from './hooks/useFileUploader';

export function FileUploader({
  fileNames,
  level,
}: FileUploaderProps): JSX.Element {
  const { files, setShowPreviewer } = useFileUploader();

  useEffect(() => {
    // stubbed
  }, [setShowPreviewer]);

  function onClose() {
    // stubbed
    return;
  }

  return (
    <Previewer
      fileNames={fileNames}
      files={files}
      level={level}
      onClose={onClose}
    />
  );
}

FileUploader.UploadDropZone = UploadDropZone;
