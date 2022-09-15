/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import { Card } from 'src/primitives';
import { FileUploaderTransferProps } from '../FileUploader/types';
import { useFileUploader } from '../hooks/useFileUploader';

export function FileUploaderDrop({
  setFiles,
  // setShowPreviewer,
  children,
}: FileUploaderTransferProps): JSX.Element {
  const { setShowPreviewer } = useFileUploader();
  const [inDropZone, setInDropZone] = useState(false);
  // https://www.smashingmagazine.com/2020/02/html-drag-drop-api-react/

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone(true);
    e.dataTransfer.dropEffect = 'copy';
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      setFiles(files);
      setShowPreviewer(true);
    }
    setInDropZone(false);
  };
  return (
    <Card
      data-amplify-file-uploader
      className={
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        inDropZone ? 'inside-drag-area' : ''
      }
      border={'dashed rgb(7,115,152)'}
      onDrop={(e) => handleDrop(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      {children}
    </Card>
  );
}
