import React, { useState } from 'react';
import { Files } from '../../types';
import { UseFileUploader } from './types';

export default function useFileUploader(): UseFileUploader {
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<Files>([]);

  const [inDropZone, setInDropZone] = useState(false);

  const setTargetFiles = (targetFiles: FileList) => {
    if (files.length > 0) {
      setFiles([...targetFiles].concat(files));
    } else {
      setFiles([...targetFiles]);
    }
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
  };
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setInDropZone(false);
  };
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setInDropZone(true);
    event.dataTransfer.dropEffect = 'copy';
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { files } = event.dataTransfer;
    setTargetFiles(files);
    setShowPreviewer(true);
    setInDropZone(false);
  };

  return {
    files,
    inDropZone,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    setFiles,
    setInDropZone,
    setShowPreviewer,
    setTargetFiles,
    showPreviewer,
  };
}
