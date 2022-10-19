/** File Previewer */

import React, { useRef, useState } from 'react';
import { Button, Flex } from 'src/primitives';
import { Card } from 'src/primitives/Card';
import { View } from 'src/primitives/View';
import { FileTracker, SetPause } from '../FileTracker';
import { FilePreviewerProps } from '../FileUploader/types';
import { getFileName, uploadFile } from '@aws-amplify/ui';
import { UploadTask } from '@aws-amplify/storage';

export function FilePreviewer({
  fileName,
  level,
  setShowPreviewer,
  files,
}: FilePreviewerProps): JSX.Element {
  const [percentage, setPercentage] = useState<number[]>([]);
  const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);
  const filesRef = useRef([]);
  function upload() {
    const uploadTasksTemp = [];
    for (let i = 0; i < files?.length; i++) {
      const uploadFileName = getFileName(files[i], fileName, i);
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

  function pauseResumeUpload(
    uploadTask: UploadTask
  ): (boolean, SetPause) => void {
    // eslint-disable-next-line no-console
    // console.log('pausing upload for', file.name);
    return function (pause: boolean, setPause: SetPause) {
      if (pause) {
        uploadTask.resume();
      } else {
        uploadTask.pause();
      }
      setPause(!pause);
    };
  }

  // eslint-disable-next-line no-console
  console.log(files);
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
          onClick={() => setShowPreviewer(false)}
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
          <FileTracker
            percentage={percentage[index] ?? 0}
            key={index}
            file={file}
            // uploadTask={uploadTasks[index]}
            pauseResumeUpload={pauseResumeUpload(uploadTasks[index])}
          ></FileTracker>
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
