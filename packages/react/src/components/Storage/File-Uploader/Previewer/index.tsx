/* eslint-disable @typescript-eslint/no-unused-vars */
/** File Previewer */

import React, { useRef, useState } from 'react';
import { Button, Flex, Card, View } from '../../../../primitives';
import { Tracker } from '../Tracker';
import { FilePreviewerProps } from '../types';
import { UploadTask } from '@aws-amplify/storage';

export function Previewer({
  fileNames,
  level,
  files,
  onClose,
}: FilePreviewerProps): JSX.Element {
  const [percentage, setPercentage] = useState<number[]>([]);
  const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);
  const [pauses, setPauses] = useState<boolean[]>([]);
  const filesRef = useRef([]);
  function upload() {
    // stubbed
  }

  function onPause(uploadTask: UploadTask, index: number): () => void {
    // stubbed
    return;
  }

  function onResume(uploadTask: UploadTask, index: number): () => void {
    // stubbed
    return;
  }

  function onCancel(uploadTask: UploadTask, index: number): () => void {
    // stubbed
    return;
  }

  return <Card data-amplify-file-previewer>Previewer</Card>;
}
