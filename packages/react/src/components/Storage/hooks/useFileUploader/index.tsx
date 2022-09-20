import React, { useMemo, useState } from 'react';
import { SetFileType } from '../../FileUploader/types';
import { DropZoneInterface } from '../../FileUploader/types';

interface FileHookInterface {
  showPreviewer?: boolean;
  setShowPreviewer?: React.Dispatch<React.SetStateAction<boolean>>;
  files?: SetFileType;
  setFiles?: React.Dispatch<React.SetStateAction<SetFileType>>;
  inDropZone?: boolean;
  setInDropZone?: React.Dispatch<React.SetStateAction<boolean>>;
  getDropEvents?: DropZoneInterface;
}

export const useFileUploader = (): FileHookInterface => {
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<SetFileType>();

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
    (): FileHookInterface => ({
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
};
