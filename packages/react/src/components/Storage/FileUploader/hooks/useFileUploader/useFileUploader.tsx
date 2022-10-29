import { checkMaxSize, setAcceptedFiles } from '@aws-amplify/ui';
import React, { useState } from 'react';
import { Files, FileStatuses } from '../../types';
import { UseFileUploader } from './types';

export default function useFileUploader(
  maxSize: number,
  acceptedFileTypes: string[],
  multiple: number
): UseFileUploader {
  const [fileStatuses, setFileStatuses] = useState<FileStatuses>([]);
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<Files>([]);

  const [inDropZone, setInDropZone] = useState(false);

  const setFileSizeErrors = (files: Files, maxSize: number) => {
    [...files].forEach((file, index) => {
      const errorFile = checkMaxSize(maxSize, file);
      const statuses = [...fileStatuses];
      const status = fileStatuses[index];

      statuses[index] = {
        ...status,
        error: !!errorFile,
        fileErrors: errorFile,
        loading: false,
      };
      setFileStatuses(statuses);
    });
  };

  const checkAndSetFiles = (targets: Files) => {
    setFileSizeErrors(targets, maxSize);
    setFiles(targets);
  };

  const addTargetFiles = (targetFiles: FileList): number => {
    // Only accept accepted files
    const targets = setAcceptedFiles([...targetFiles], acceptedFileTypes);

    // If not multiple and files already selected return
    if (!multiple && files.length > 0) return files.length;

    // if not multiple and only 1 file selected save
    if (!multiple && targets.length == 1) {
      checkAndSetFiles([...targets]);
      return targets.length;
    }

    // if not multiple save just the first target into the array
    if (!multiple && targets.length > 1) {
      checkAndSetFiles([targets[0]]);
      return 1;
    }

    if (files.length > 0) {
      checkAndSetFiles([...targets].concat(files));
    } else {
      checkAndSetFiles([...targets]);
    }
    return targets.length + files.length;
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
    const addedFilesLength = addTargetFiles(files);
    if (addedFilesLength > 0) setShowPreviewer(true);
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
    addTargetFiles,
    showPreviewer,
    fileStatuses,
    setFileStatuses,
    setFileSizeErrors,
  };
}
