import React, { useEffect } from 'react';
import { Previewer } from './Previewer';
import { UploadDropZone } from './UploadDropZone';
import { useFileUploader } from './hooks/useFileUploader';

export function FileUploader(): JSX.Element {
  const { setShowPreviewer } = useFileUploader();

  useEffect(() => {
    // stubbed
  }, [setShowPreviewer]);

  return <Previewer />;
}

FileUploader.UploadDropZone = UploadDropZone;
