import React, { useMemo, useState } from 'react';
import { SetFileType, UseFileUploader } from './types';

export default function useFileUploader(): UseFileUploader {
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<SetFileType>([]);

  const [inDropZone, setInDropZone] = useState(false);

  const getDropEvents = useMemo(() => {
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
