import React, { useEffect, useRef, useState } from 'react';
import { getFileName, translate } from '@aws-amplify/ui';
import { FileStatuses, PreviewerProps } from '../types';
import { Button, Card, Flex, Loader, Text, View } from '../../../../primitives';
import { UploadDropZone } from '../UploadDropZone';
import { UploadButton } from '../UploadButton';
import { Tracker } from '../Tracker';
import { uploadFile } from '@aws-amplify/ui';
import { UploadTask } from '@aws-amplify/storage';

export function Previewer({
  files,
  level,
  fileNames,
  inDropZone,
  onClear,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
  onFileCancel,
  onNameChange,
  allFileNames,
  acceptedFileTypes,
  multiple,
  onFileChange,
}: PreviewerProps): JSX.Element {
  const [fileStatuses, setFileStatuses] = useState<FileStatuses>([]);
  const fileStatusesRef = useRef<FileStatuses>([]);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (fileStatuses.length === 0) return;
    const success = fileStatuses.every((status) => status?.percentage === 100);
    setSuccess(success);
    setLoading(!success);

    const percentage =
      fileStatuses.reduce((prev, curr) => prev + (curr?.percentage ?? 0), 0) /
      fileStatuses.length;
    setPercentage(Math.floor(percentage));
  }, [fileStatuses]);

  const progressCallback = (index: number) => {
    return (progress: { loaded: number; total: number }) => {
      const percentage = Math.floor((progress.loaded / progress.total) * 100);
      const status = fileStatusesRef.current[index];
      fileStatusesRef.current[index] =
        percentage !== 100
          ? { ...status, percentage, loading: true }
          : { ...status, percentage, loading: false, success: true };
      const addPercentage = [...fileStatusesRef.current];
      setFileStatuses(addPercentage);
    };
  };

  const onDelete = () => {
    //todo delete
  };

  const onPause = (index: number): (() => void) => {
    return function () {
      fileStatuses[index].uploadTask.pause();
      const statuses = [...fileStatuses];
      const status = fileStatuses[index];

      statuses[index] = { ...status, paused: true };
      setFileStatuses(statuses);
    };
  };

  const onResume = (index: number): (() => void) => {
    return function () {
      fileStatuses[index].uploadTask.resume();
      const statuses = [...fileStatuses];
      const status = fileStatuses[index];

      statuses[index] = { ...status, paused: false };
      setFileStatuses(statuses);
    };
  };
  const onClick = () => {
    // start upload
    setLoading(true);
    const uploadTasksTemp: UploadTask[] = [];
    for (let i = 0; i < files?.length; i++) {
      const uploadFileName = getFileName(fileNames?.[i], allFileNames[i]);

      const uploadTask: UploadTask = uploadFile({
        file: files[i],
        fileName: uploadFileName,
        level,
        progressCallback: progressCallback(i),
      });
      uploadTasksTemp.push(uploadTask);
    }
    fileStatusesRef.current = uploadTasksTemp.map((status, index) => ({
      ...status,
      uploadTask: uploadTasksTemp[index],
    }));

    const uploadTasks = [...fileStatusesRef.current];
    setFileStatuses(uploadTasks);
  };
  return (
    <Card variation="outlined" className="amplify-fileuploader__previewer">
      <Flex className="amplify-fileuploader__previewer__body">
        <UploadDropZone
          inDropZone={inDropZone}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
        >
          <Text className="amplify-fileuploader__dropzone__text">
            {translate('Drop files here or')}
          </Text>
          <UploadButton
            acceptedFileTypes={acceptedFileTypes}
            multiple={multiple}
            onFileChange={onFileChange}
            className={'amplify-fileuploader__dropzone__button'}
          />
        </UploadDropZone>
        <Text fontWeight="bold">
          {files.length} {translate('files selected')}
        </Text>
        {files?.map((file, index) => (
          <Tracker
            percentage={fileStatuses[index]?.percentage}
            file={file}
            hasImage={file?.type.startsWith('image/')}
            url={URL.createObjectURL(file)}
            key={index}
            onChange={(e): void => onNameChange(e, index)}
            onCancel={() => onFileCancel(index)}
            onPause={onPause(index)}
            onResume={onResume(index)}
            onDelete={onDelete}
            name={allFileNames[index]}
            isLoading={fileStatuses[index]?.loading}
            isError={fileStatuses[index]?.error}
            isSuccess={fileStatuses[index]?.success}
            isPaused={fileStatuses[index]?.paused}
          />
        ))}
        <View className="amplify-fileuploader__footer">
          {isLoading && (
            <>
              <Text>Uploading: {percentage}%</Text>
              <Button>Cancel all</Button>
              <Loader
                className="amplify-fileuploader-loader"
                variation="linear"
                percentage={percentage}
                isDeterminate
              />
            </>
          )}
          {!isLoading && !isSuccess && (
            <>
              <View>
                <Button size="small" variation="primary" onClick={onClick}>
                  {translate('Upload')}
                  {` ${files.length} `}
                  {translate('files')}
                </Button>
              </View>
              <Button size="small" variation="link" onClick={onClear}>
                {translate('Clear all')}
              </Button>
            </>
          )}
          {isSuccess && (
            <>
              <Text />
              <Button size="small" onClick={onClear}>
                {translate('Done')}
              </Button>
            </>
          )}
        </View>
      </Flex>
    </Card>
  );
}
