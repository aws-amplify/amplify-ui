import React, { useEffect, useState, useRef } from 'react';
import { UploadTask, Storage } from '@aws-amplify/storage';
import { getFileName, translate, uploadFile } from '@aws-amplify/ui';
import { FileStatuses, FileUploaderProps } from './types';
import { useFileUploader } from './hooks/useFileUploader';
import { Text } from '../../../primitives';
import { UploadButton } from './UploadButton';
import { Previewer } from './Previewer';
import { UploadDropZone } from './UploadDropZone';
import { Tracker } from './Tracker';

export function FileUploader({
  acceptedFileTypes,
  components = {},
  fileNames,
  isPreviewerVisible,
  level,
  maxFiles,
  maxSize,
  multiple = true,
  onError,
  onSuccess,
  variation = 'button',
}: FileUploaderProps): JSX.Element {
  const {
    UploadDropZone = FileUploader.UploadDropZone,
    UploadButton = FileUploader.UploadButton,
  } = components;
  const {
    addTargetFiles,
    fileStatuses,
    inDropZone,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    setFileStatuses,
    setShowPreviewer,
    showPreviewer,
  } = useFileUploader(maxSize, acceptedFileTypes, multiple);

  const fileStatusesRef = useRef<FileStatuses>([]);

  // File Previewer loading state
  const [isLoading, setLoading] = useState(false);

  // Tracker state
  const [isEditingName, setisEditingName] = React.useState<boolean[]>([]);

  // Creates aggregate percentage to show during downloads
  const percentage = Math.floor(
    fileStatuses.reduce((prev, curr) => prev + (curr?.percentage ?? 0), 0) /
      fileStatuses.length
  );

  // checks if all downloads completed to 100%
  const isSuccess = () => {
    if (fileStatuses.length === 0) return;

    return fileStatuses.every((status) => status?.percentage === 100);
  };

  // Displays if over max files
  const maxFilesError = fileStatuses.length > maxFiles;

  useEffect(() => {
    // Loading ends when all files are at 100%
    if (Math.floor(percentage) === 100) {
      setLoading(false);
    }
  }, [fileStatuses, percentage]);

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  // Previewer Methods

  const progressCallback = (index: number) => {
    return (progress: { loaded: number; total: number }) => {
      const percentage = Math.floor((progress.loaded / progress.total) * 100);
      const status = fileStatusesRef.current[index];
      fileStatusesRef.current[index] =
        percentage !== 100
          ? { ...status, percentage, fileState: null, isLoading: true }
          : { ...status, percentage, fileState: 'success', isLoading: false };
      const addPercentage = [...fileStatusesRef.current];
      setFileStatuses(addPercentage);
    };
  };

  const errorCallback = (index: number) => {
    return (err: string) => {
      const status = fileStatusesRef.current[index];
      fileStatusesRef.current[index] = {
        ...status,
        fileState: 'error',
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

      statuses[index] = { ...status, fileState: 'paused' };
      setFileStatuses(statuses);
    };
  };

  const onResume = (index: number): (() => void) => {
    return function () {
      fileStatuses[index].uploadTask.resume();
      const statuses = [...fileStatuses];
      const status = fileStatuses[index];

      statuses[index] = { ...status, fileState: null, isLoading: true };
      setFileStatuses(statuses);
    };
  };

  const onFileClick = () => {
    // start upload
    setLoading(true);
    const uploadTasksTemp: UploadTask[] = [];
    fileStatuses.forEach((status, i) => {
      if (status?.fileState === 'success') return;

      // remove any filenames that are not accepted from user prop
      fileNames = fileNames?.filter((file: string) => {
        const [extension] = file.split('.').reverse();
        return acceptedFileTypes.includes('.' + extension);
      });
      const uploadFileName = getFileName(fileNames?.[i], status.name);

      const uploadTask: UploadTask = uploadFile({
        file: status.file,
        fileName: uploadFileName,
        level,
        progressCallback: progressCallback(i),
        errorCallback: errorCallback(i),
        completeCallback: completeCallback(),
      });
      uploadTasksTemp.push(uploadTask);
    });
    let statuses: FileStatuses = [];
    statuses = [...fileStatuses];
    fileStatusesRef.current = statuses.map((status, index) => {
      return {
        ...status,
        uploadTask: uploadTasksTemp?.[index],
        isLoading: true,
      };
    });

    const uploadTasks = [...fileStatusesRef.current];
    setFileStatuses(uploadTasks);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const { files } = event.target;
    const addedFilesLength = addTargetFiles([...files]);
    // only show previewer if the added files are great then 0
    if (addedFilesLength > 0) setShowPreviewer(true);
  };

  const onClear = () => {
    setShowPreviewer(false);
    setFileStatuses([]);
  };

  const onFileCancel = (index: number) => {
    return () => {
      if (isLoading) {
        // if downloading use uploadTask and stop download
        Storage.cancel(fileStatuses[index]?.uploadTask);
        setLoading(false);
      }
      const updatedFiles = fileStatuses.filter((_, i) => i !== index);
      setFileStatuses(updatedFiles);
    };
  };

  const onNameChange = (index: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const names = [...fileStatuses];
      const name = event.target.value;
      names[index].name = name;
      setFileStatuses(names);
    };
  };

  // Tracker methods

  const onSaveEdit = (index: number) => {
    return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const fileName = fileStatuses[index].name;
      // no empty file names
      if (fileName.trim().length === 0) return;
      const [extension] = fileName.split('.').reverse();
      const validExtension = acceptedFileTypes.includes('.' + extension);
      const statuses = [...fileStatuses];
      const status = fileStatuses[index];
      statuses[index] = {
        ...status,
        fileState: !validExtension ? 'error' : null,
        fileErrors: validExtension ? null : translate('Extension not allowed'),
      };

      setFileStatuses(statuses);
      const names = [...isEditingName];
      names[index] = false;
      setisEditingName(names);
    };
  };

  const onCancelEdit = (index: number) => {
    return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const fileName = fileStatuses[index].name;
      if (fileName.trim().length === 0) return;
      const names = [...isEditingName];
      names[index] = false;
      setisEditingName(names);
    };
  };

  const onStartEdit = (index: number) => {
    return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const names = [...isEditingName];
      names[index] = true;
      setisEditingName(names);
    };
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
        fileStatuses={fileStatuses}
        inDropZone={inDropZone}
        isEditingName={isEditingName}
        isLoading={isLoading}
        isSuccess={isSuccess()}
        maxFilesError={maxFilesError}
        multiple={multiple}
        onClear={onClear}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onFileChange={onFileChange}
        onFileClick={onFileClick}
        percentage={percentage}
      >
        {fileStatuses?.map((status, index) => (
          <Tracker
            percentage={status.percentage}
            file={status.file}
            hasImage={status.file?.type.startsWith('image/')}
            url={URL.createObjectURL(status.file)}
            key={index}
            onChange={onNameChange(index)}
            onCancel={onFileCancel(index)}
            onPause={onPause(index)}
            onResume={onResume(index)}
            onDelete={onDelete}
            name={status.name}
            fileState={status?.fileState}
            isLoading={status?.isLoading}
            errorMessage={status?.fileErrors}
            isEditing={isEditingName[index]}
            onSaveEdit={onSaveEdit(index)}
            onCancelEdit={onCancelEdit(index)}
            onStartEdit={onStartEdit(index)}
          />
        ))}
      </Previewer>
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
