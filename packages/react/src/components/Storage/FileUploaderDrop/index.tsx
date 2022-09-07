/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Card } from 'src/primitives';
import { FileUploaderInputProps } from '../FileUploader/types';
import { FileUploaderButton } from '../FileUploaderButton';
import { getFileName, uploadFile } from '../shared/utils';

export function FileUploaderDrop({
  multiple,
  accept,
  fileName,
}: FileUploaderInputProps): JSX.Element {
  // https://www.smashingmagazine.com/2020/02/html-drag-drop-api-react/
  const reducer = (
    state,
    action: {
      type: string;
      dropDepth?: number;
      inDropZone?: boolean;
      files?: File[];
    }
  ): any => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      default:
        return state;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      (async () => {
        for (let i = 0; i < files.length; i++) {
          const uploadFileName = getFileName(fileName, files[i], i);
          await uploadFile(files[i], uploadFileName);
        }
      })();

      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  };
  return (
    <Card
      data-amplify-file-uploader
      className={
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        data.inDropZone ? 'inside-drag-area' : ''
      }
      border={'dashed rgb(7,115,152)'}
      onDrop={(e) => handleDrop(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <FileUploaderButton
        multiple={multiple}
        accept={accept}
        fileName={fileName}
      />{' '}
      or drag file{multiple ? 's' : ''} here
    </Card>
  );
}
