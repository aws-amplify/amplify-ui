/* eslint-disable @typescript-eslint/no-unused-vars */
/** File Previewer */

import React from 'react';
import { Button, Card } from '../../../../primitives';
import { FilePreviewerProps } from '../types';
import { UploadTask } from '@aws-amplify/storage';

export function Previewer({
  fileNames,
  level,
  files,
  onClose,
}: FilePreviewerProps): JSX.Element {
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

  return (
    <Card data-amplify-file-previewer>
      <Button onClick={upload}>Upload Files</Button>
    </Card>
  );
}
