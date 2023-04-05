import { useState } from 'react';

export interface UseDropZoneProps {
  onChange: (event: React.DragEvent<HTMLDivElement>) => void;
}

export interface UseDropZoneReturn {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  inDropZone: boolean;
}

export function useDropZone({ onChange }: UseDropZoneProps): UseDropZoneReturn {
  const [inDropZone, setInDropZone] = useState(false);
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
    event.dataTransfer.dropEffect = 'copy';
    setInDropZone(true);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setInDropZone(false);
    onChange(event);
  };

  return {
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    inDropZone,
  };
}
