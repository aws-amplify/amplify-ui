import React, { useState } from 'react';
import { Files } from '../../types';
import { UseFileUploader } from './types';

export default function useFileUploader(): UseFileUploader {
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<Files>([]);

  const [inDropZone, setInDropZone] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
    // stubbed
  };
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // stubbed
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // stubbed
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // stubbed
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    //stubbed
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
    showPreviewer,
  };
}
