import React, { useMemo, useState } from 'react';
import { SetFileType, UseFileUploader } from './types';

export default function useFileUploader(): UseFileUploader {
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<SetFileType>([]);

  const [inDropZone, setInDropZone] = useState(false);

  const getDropEvents = useMemo(() => {
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.clearData();
    };
    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setInDropZone(false);
    };
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setInDropZone(true);
      event.dataTransfer.dropEffect = 'copy';
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const files = [...event.dataTransfer.files];
      if (files?.length > 0) {
        setFiles(files);
        setShowPreviewer(true);
      }
      setInDropZone(false);
    };

    return {
      onDragStart: handleDragStart,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onDragOver: handleDragOver,
    };
  }, []);

  const value = React.useMemo(
    (): UseFileUploader => ({
      showPreviewer,
      setShowPreviewer,
      files,
      setFiles,
      getDropEvents,
      inDropZone,
      setInDropZone,
    }),
    [files, getDropEvents, inDropZone, showPreviewer]
  );

  return value;
}
