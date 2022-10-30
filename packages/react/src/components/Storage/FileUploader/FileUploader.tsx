import React, { useEffect, useState, useRef } from 'react';
import { UploadTask } from '@aws-amplify/storage';
import { getFileName, translate, uploadFile } from '@aws-amplify/ui';
import { FileStatuses, FileUploaderProps } from './types';
import { useFileUploader } from './hooks/useFileUploader';
import { Text } from '../../../primitives';
import { UploadButton } from './UploadButton';
import { Previewer } from './Previewer';
import { UploadDropZone } from './UploadDropZone';

export function FileUploader({
  acceptedFileTypes,
  fileNames,
  isPreviewerVisible,
  level,
  components = {},
  multiple = true,
  variation = 'button',
}: FileUploaderProps): JSX.Element {
  const {
    UploadDropZone = FileUploader.UploadDropZone,
    UploadButton = FileUploader.UploadButton,
  } = components;
  const {
    files,
    inDropZone,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    setShowPreviewer,
    addTargetFiles,
    showPreviewer,
    setFiles,
  } = useFileUploader();
  const [allFileNames, setAllFileNames] = useState<string[]>([]);
  const [fileStatuses, setFileStatuses] = useState<FileStatuses>([]);
  const fileStatusesRef = useRef<FileStatuses>([]);
  // File Previewer global states
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

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  useEffect(() => {
    setAllFileNames(files.map((file) => file.name));
  }, [files]);

  // Previewer Methods

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
  const onFileClick = () => {
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

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const { files } = event.target;
    addTargetFiles(files);

    setShowPreviewer(true);
  };

  const onClear = () => {
    setShowPreviewer(false);
    setFiles([]);
  };

  const onFileCancel = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const names = [...allFileNames];
    const name = event.target.value;
    names[index] = name;
    setAllFileNames(names);
  };

  const CommonProps = {
    acceptedFileTypes,
    multiple,
    onFileChange,
  };

  if (showPreviewer) {
    return (
      <Previewer
        acceptedFileTypes={acceptedFileTypes}
        files={files}
        inDropZone={inDropZone}
        multiple={multiple}
        onClear={onClear}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onFileChange={onFileChange}
        onFileCancel={onFileCancel}
        onNameChange={onNameChange}
        allFileNames={allFileNames}
        fileStatuses={fileStatuses}
        onPause={onPause}
        onResume={onResume}
        onDelete={onDelete}
        isLoading={isLoading}
        isSuccess={isSuccess}
        percentage={percentage}
        onFileClick={onFileClick}
      />
    );
  }

  if (variation === 'button') {
    return <UploadButton {...CommonProps} />;
  } else {
    return (
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
          {...CommonProps}
          className={'amplify-fileuploader__dropzone__button'}
        />
      </UploadDropZone>
    );
  }
}

FileUploader.UploadDropZone = UploadDropZone;
FileUploader.UploadButton = UploadButton;
