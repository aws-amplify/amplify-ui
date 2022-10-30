import React, { useEffect, useState, useRef } from 'react';
import { UploadTask, Storage } from '@aws-amplify/storage';
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
  maxSize,
  onError,
  onSuccess,
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
    fileStatuses,
    setFileStatuses,
    setFileSizeErrors,
  } = useFileUploader(maxSize, acceptedFileTypes, multiple);

  const [allFileNames, setAllFileNames] = useState<string[]>([]);
  const fileStatusesRef = useRef<FileStatuses>([]);
  // File Previewer global states
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [percentage, setPercentage] = useState(0);
  // Tracker states
  const [isEditingName, setisEditingName] = React.useState<boolean[]>([]);

  useEffect(() => {
    if (fileStatuses.length === 0) return;
    // Sets variable when all downlaods are complete
    const complete = fileStatuses.every((status) => status?.percentage === 100);
    setSuccess(complete);

    // Creates aggregate percentage to show during downloads
    const percentage =
      fileStatuses.reduce((prev, curr) => prev + (curr?.percentage ?? 0), 0) /
      fileStatuses.length;
    setPercentage(Math.floor(percentage));

    // Loading ends when all files are at 100%
    if (Math.floor(percentage) === 100) {
      setLoading(false);
    }
  }, [fileStatuses]);

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  useEffect(() => {
    setAllFileNames((allFileNames) => {
      if (allFileNames.length !== 0) {
        // only add the new files to allFileNames
        const diff = files.length - allFileNames.length;
        const arrayOfNames: string[] = [];

        for (let i = 0; i < diff; i++) {
          arrayOfNames[i] = files[i].name;
        }

        return [...arrayOfNames].concat(allFileNames);
      }
      return files.map((file) => {
        return file.name;
      });
    });
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

  const errorCallback = (index: number) => {
    return (err: string) => {
      const status = fileStatusesRef.current[index];
      fileStatusesRef.current[index] = {
        ...status,
        error: true,
        loading: false,
        success: false,
        fileErrors: translate(err.toString()),
      };

      const addErrors = [...fileStatusesRef.current];
      setFileStatuses(addErrors);
      setLoading(false);
      if (typeof onError === 'function') onError(err);
    };
  };

  const completeCallback = () => {
    return (event: { key: string }) => {
      if (typeof onSuccess === 'function') onSuccess(event);
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
      if (fileStatuses[i]?.success) continue;
      const uploadFileName = getFileName(fileNames?.[i], allFileNames[i]);

      const uploadTask: UploadTask = uploadFile({
        file: files[i],
        fileName: uploadFileName,
        level,
        progressCallback: progressCallback(i),
        errorCallback: errorCallback(i),
        completeCallback: completeCallback(),
      });
      uploadTasksTemp.push(uploadTask);
    }
    let statuses: FileStatuses = [];
    statuses = [...fileStatuses];
    fileStatusesRef.current = statuses.map((status, index) => {
      return { ...status, uploadTask: uploadTasksTemp?.[index] };
    });

    const uploadTasks = [...fileStatusesRef.current];
    setFileStatuses(uploadTasks);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const { files } = event.target;
    const addedFilesLength = addTargetFiles(files);
    if (addedFilesLength > 0) setShowPreviewer(true);
  };

  const onClear = () => {
    setShowPreviewer(false);
    setFiles([]);
    setFileStatuses([]);
    setAllFileNames([]);
  };

  const onFileCancel = (index: number) => {
    if (isLoading) {
      // if downloading use uploadTask and stop download
      Storage.cancel(fileStatuses[index]?.uploadTask);
      setLoading(false);
    }
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedFileStatuses = fileStatuses.filter((_, i) => i !== index);
    const updateAllFileNames = allFileNames.filter((_, i) => i !== index);
    setFileSizeErrors(updatedFiles, updatedFileStatuses);
    setFiles(updatedFiles);
    setAllFileNames(updateAllFileNames);
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

  // Tracker methods

  const onSaveEdit = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    const fileName = allFileNames[index];
    // no empty file names
    if (fileName.trim().length === 0) return;
    const [extension] = fileName.split('.').reverse();
    const validExtension = acceptedFileTypes.includes('.' + extension);
    const statuses = [...fileStatuses];
    const status = fileStatuses[index];
    statuses[index] = {
      ...status,
      error: !validExtension,
      fileErrors: validExtension ? null : translate('Extension not allowed'),
    };

    setFileStatuses(statuses);
    const names = [...isEditingName];
    names[index] = false;
    setisEditingName(names);
  };

  const onCancelEdit = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    const fileName = allFileNames[index];
    if (fileName.trim().length === 0) return;
    const names = [...isEditingName];
    names[index] = false;
    setisEditingName(names);
  };

  const onStartEdit = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    const names = [...isEditingName];
    names[index] = true;
    setisEditingName(names);
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
        isEditingName={isEditingName}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        onStartEdit={onStartEdit}
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
