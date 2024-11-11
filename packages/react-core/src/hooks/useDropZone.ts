import { useState } from 'react';
import { isFunction } from '@aws-amplify/ui';
import { filterAllowedFiles } from '../utils/filterAllowedFiles';

interface DragEvents {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => Promise<void>;
}

export interface UseDropZoneParams extends Partial<DragEvents> {
  onDropComplete?: (props: {
    acceptedFiles: File[];
    rejectedFiles: File[];
  }) => void;
  /**
   * List of accepted File types, values of `['*']` or undefined allow any files
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   */
  acceptedFileTypes?: string[];
}

type DragState = 'accept' | 'reject' | 'inactive';

interface UseDropZoneReturn extends DragEvents {
  dragState: DragState;
}

export default function useDropZone({
  onDropComplete,
  onDragEnter: _onDragEnter,
  onDragLeave: _onDragLeave,
  onDragOver: _onDragOver,
  onDragStart: _onDragStart,
  onDrop: _onDrop,
  acceptedFileTypes = [],
}: UseDropZoneParams): UseDropZoneReturn {
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

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragState('inactive');

    const files: File[] = [];

    // Add any directly dropped files
    if (event.dataTransfer.files.length > 0) {
      files.push(...Array.from(event.dataTransfer.files));
    }

    // Handle items for directory support
    if (event.dataTransfer.items) {
      const { items } = event.dataTransfer;

      for (const item of items) {
        if (item.kind === 'file') {
          const entry = item.webkitGetAsEntry();
          if (entry?.isDirectory) {
            const traverseDirectory = async (
              dirEntry: FileSystemDirectoryEntry
            ): Promise<void> => {
              const dirReader = dirEntry.createReader();
              const entries = await new Promise<FileSystemEntry[]>(
                (resolve) => {
                  dirReader.readEntries((entries) => resolve(entries));
                }
              );

              for (const entry of entries) {
                if (entry.isFile) {
                  const file = await new Promise<File>((resolve) => {
                    (entry as FileSystemFileEntry).file(resolve);
                  });
                  files.push(file);
                } else if (entry.isDirectory) {
                  await traverseDirectory(entry as FileSystemDirectoryEntry);
                }
              }
            };

            await traverseDirectory(entry as FileSystemDirectoryEntry);
          }
        }
      }
    }

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
