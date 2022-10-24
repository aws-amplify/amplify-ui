import React, { useMemo, useState } from 'react';
import { SetFileType, UseFileUploader } from './types';

export default function useFileUploader(): UseFileUploader {
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<SetFileType>([]);

  const [inDropZone, setInDropZone] = useState(false);

  const getDropEvents = useMemo(() => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.clearData();
      // stubbed
    };
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // stubbed
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // stubbed
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // stubbed
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      //stubbed
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
