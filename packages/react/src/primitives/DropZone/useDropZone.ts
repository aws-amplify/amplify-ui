import { useState } from 'react';
import { UseDropZoneProps, UseDropZoneReturn } from './types';
import { isFunction } from '@aws-amplify/ui';

type DragFile =
  | {
      kind: string;
      type: string;
    }
  | File;

function filterAllowedFiles<FileType extends DragFile = DragFile>(
  files: FileType[],
  acceptedFileTypes: string[]
): { accepted: FileType[]; rejected: FileType[] } {
  // Allow any files if acceptedFileTypes is undefined, empty array, or contains '*'
  if (
    !acceptedFileTypes ||
    acceptedFileTypes.length === 0 ||
    acceptedFileTypes.includes('*')
  ) {
    return { accepted: files, rejected: [] };
  }
  const accepted: FileType[] = [];
  const rejected: FileType[] = [];

  function filterFile({ type = '' }) {
    const mimeType = type.toLowerCase();
    const baseMimeType = mimeType.replace('/*', '');

    return acceptedFileTypes.some((type) => {
      const validType = type.trim().toLowerCase();
      if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace('/*', '');
      }
      return mimeType === validType;
    });
  }

  files.forEach((file) => {
    (filterFile(file) ? accepted : rejected).push(file);
  });

  return { accepted, rejected };
}

export function useDropZone({
  onDropComplete,
  acceptedFileTypes = [],
}: UseDropZoneProps): UseDropZoneReturn {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragAccept, setIsDragAccept] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);
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
    setIsDragActive(false);
    setIsDragAccept(false);
    setIsDragReject(false);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    const files = Array.from(event.dataTransfer.items).map(
      ({ kind, type }) => ({
        kind,
        type,
      })
    );

    const { rejected } = filterAllowedFiles(files, acceptedFileTypes);
    setIsDragActive(true);
    setIsDragAccept(rejected.length === 0);
    setIsDragReject(rejected.length > 0);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    setIsDragAccept(false);
    setIsDragReject(false);
    const files = Array.from(event.dataTransfer.files);
    const { accepted, rejected } = filterAllowedFiles<File>(
      files,
      acceptedFileTypes
    );

    if (isFunction(onDropComplete)) {
      onDropComplete({ files: accepted, rejectedFiles: rejected });
    }
  };

  return {
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    isDragActive,
    isDragAccept,
    isDragReject,
  };
}
