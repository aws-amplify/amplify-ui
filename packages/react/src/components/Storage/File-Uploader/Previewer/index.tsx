/** File Previewer */

import React, { useRef, useState } from 'react';
import { Button, Flex, Card, View } from '../../../../primitives';
import { Tracker } from '../Tracker';
import { FilePreviewerProps } from '../types';
import { getFileName, uploadFile } from '@aws-amplify/ui';
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
    const uploadTasksTemp = [];
    for (let i = 0; i < files?.length; i++) {
      const uploadFileName = getFileName(files[i], fileNames, i);
      const uploadTask = uploadFile({
        file: files[i],
        fileName: uploadFileName,
        level,
        setPercentage,
        percentage: filesRef.current,
        index: i,
      });
      uploadTasksTemp.push(uploadTask);

      setPercentage(filesRef.current);
    }
    setUploadTasks(uploadTasksTemp);
  }

  function onPause(uploadTask: UploadTask, index: number): () => void {
    return function () {
      uploadTask.pause();
      const newPauses = [...pauses];
      newPauses[index] = true;
      setPauses(newPauses);
    };
  }

  function onResume(uploadTask: UploadTask, index: number): () => void {
    return function () {
      uploadTask.resume();
      const newPauses = [...pauses];
      newPauses[index] = false;
      setPauses(newPauses);
    };
  }

  function onCancel(uploadTask: UploadTask, index: number): () => void {
    return function () {
      // Storage.cancel(uploadTask);
      const newPauses = [...pauses];
      newPauses[index] = true;
      setPauses(pauses);
    };
  }

  return (
    <Card data-amplify-file-previewer>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        color="#067398"
      >
        <View>Add more</View>
        <View>{files?.length} selected</View>
        <View
          as={'button'}
          style={{
            border: 'none',
            background: 'none',
            color: '#067398',
            cursor: 'pointer',
          }}
          onClick={() => onClose()}
        >
          Cancel
        </View>
      </Flex>
      <hr style={{ width: '100%' }} />
      <View
        height={'14rem'}
        style={{
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '0 0.8rem',
        }}
      >
        {files?.map((file, index) => (
          <Tracker
            percentage={percentage[index] ?? 0}
            key={index}
            file={file}
            onPause={onPause(uploadTasks[index], index)}
            onResume={onResume(uploadTasks[index], index)}
            onCancel={onCancel(uploadTasks[index], index)}
            isPaused={pauses[index]}
          ></Tracker>
        ))}
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <hr style={{ width: '100%' }} />
        <Button
          color="white"
          style={{ backgroundColor: '#067398', width: '130px' }}
          onClick={upload}
        >
          Upload Files
        </Button>
      </View>
    </Card>
  );
}
