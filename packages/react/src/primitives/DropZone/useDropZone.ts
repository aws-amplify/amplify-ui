import { useState } from 'react';
import { UseDropZoneProps, UseDropZoneReturn, DragState } from './types';
import { isFunction } from '@aws-amplify/ui';
import { filterAllowedFiles } from './filterAllowedFiles';

export function useDropZone({
  onDropComplete,
  onDragEnter: _onDragEnter,
  onDragLeave: _onDragLeave,
  onDragOver: _onDragOver,
  onDragStart: _onDragStart,
  onDrop: _onDrop,
  acceptedFileTypes = [],
}: UseDropZoneProps): UseDropZoneReturn {
  const [dragState, setDragState] = useState<DragState>('inactive');

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
    if (isFunction(_onDragStart)) {
      _onDragStart(event);
    }
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFunction(_onDragEnter)) {
      _onDragEnter(event);
    }
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragState('inactive');
    if (isFunction(_onDragLeave)) {
      _onDragLeave(event);
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    if (isFunction(_onDragOver)) {
      _onDragOver(event);
    }
    const files = Array.from(event.dataTransfer.items).map(
      ({ kind, type }) => ({
        kind,
        type,
      })
    );

    const { rejectedFiles } = filterAllowedFiles(files, acceptedFileTypes);
    setDragState(rejectedFiles.length > 0 ? 'reject' : 'accept');
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragState('inactive');
    const files = Array.from(event.dataTransfer.files);
    const { acceptedFiles, rejectedFiles } = filterAllowedFiles<File>(
      files,
      acceptedFileTypes
    );

    if (isFunction(_onDrop)) {
      _onDrop(event);
    }
    if (isFunction(onDropComplete)) {
      onDropComplete({ acceptedFiles, rejectedFiles });
    }
  };

  return {
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    dragState,
  };
}
