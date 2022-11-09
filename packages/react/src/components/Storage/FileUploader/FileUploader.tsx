import React, { useEffect, useState, useRef, useCallback } from 'react';
import { UploadTask, Storage } from '@aws-amplify/storage';
import { getFileName, translate, uploadFile } from '@aws-amplify/ui';
import { FileStatuses, FileUploaderProps } from './types';
import { useFileUploader } from './hooks/useFileUploader';
import { ComponentClassNames, Text } from '../../../primitives';
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

  // File Previewer loading state
  const [isLoading, setLoading] = useState(false);

  const fileStatusesRef = useRef<FileStatuses>([]);

  // Tracker state
  const [isEditingName, setisEditingName] = React.useState<boolean[]>([]);

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
  } = useFileUploader({ maxSize, acceptedFileTypes, multiple, isLoading });

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

  const progressCallback = useCallback(
    (index: number) => {
      return (progress: { loaded: number; total: number }) => {
        const percentage = Math.floor((progress.loaded / progress.total) * 100);
        const status = fileStatusesRef.current[index];
        fileStatusesRef.current[index] =
          percentage !== 100
            ? { ...status, percentage, fileState: 'loading' }
            : { ...status, percentage, fileState: 'success' };
        const newFileStatuses = [...fileStatusesRef.current];
        setFileStatuses(newFileStatuses);
      };
    },
    [setFileStatuses]
  );

  const errorCallback = useCallback(
    (index: number) => {
      return (err: string) => {
        const status = fileStatusesRef.current[index];
        fileStatusesRef.current[index] = {
          ...status,
          fileState: 'error',
          fileErrors: translate(err.toString()),
        };

        const newFileStatuses = [...fileStatusesRef.current];
        setFileStatuses(newFileStatuses);
        setLoading(false);
        if (typeof onError === 'function') onError(err);
      };
    },
    [onError, setFileStatuses]
  );

  const completeCallback = useCallback(() => {
    return (event: { key: string }) => {
      if (typeof onSuccess === 'function') onSuccess(event);
    };
  }, [onSuccess]);

  const onDelete = () => {
    //todo delete
  };

  const onPause = useCallback(
    (index: number): (() => void) => {
      return function () {
        fileStatuses[index].uploadTask.pause();
        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];

        newFileStatuses[index] = { ...status, fileState: 'paused' };
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const onResume = useCallback(
    (index: number): (() => void) => {
      return function () {
        fileStatuses[index].uploadTask.resume();
        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];

        newFileStatuses[index] = { ...status, fileState: 'loading' };
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const onFileClick = useCallback(() => {
    // start upload
    setLoading(true);
    const uploadTasksTemp: UploadTask[] = [];
    fileStatuses.forEach((status, i) => {
      if (status?.fileState === 'success') return;

      // remove any filenames that are not accepted from user prop
      const fileNamesFiltered = fileNames?.filter((file: string) => {
        const [extension] = file.split('.').reverse();
        return acceptedFileTypes.includes('.' + extension);
      });
      const uploadFileName = getFileName(fileNamesFiltered?.[i], status.name);

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
    const newFileStatuses = [...fileStatuses];
    fileStatusesRef.current = newFileStatuses.map((status, index) => {
      return {
        ...status,
        uploadTask: uploadTasksTemp?.[index],
        fileState: status.fileState ?? 'loading',
        percentage: 0,
      };
    });
    const uploadTasks = [...fileStatusesRef.current];
    setFileStatuses(uploadTasks);
  }, [
    acceptedFileTypes,
    completeCallback,
    errorCallback,
    fileNames,
    fileStatuses,
    level,
    progressCallback,
    setFileStatuses,
  ]);

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const { files } = event.target;
      const addedFilesLength = addTargetFiles([...files]);
      // only show previewer if the added files are great then 0
      if (addedFilesLength > 0) setShowPreviewer(true);
    },
    [addTargetFiles, setShowPreviewer]
  );

  const onClear = useCallback(() => {
    setShowPreviewer(false);
    setFileStatuses([]);
  }, [setFileStatuses, setShowPreviewer]);

  const onFileCancel = useCallback(
    (index: number) => {
      return () => {
        if (fileStatuses[index].fileState === 'loading') {
          // if downloading use uploadTask and stop download
          Storage.cancel(fileStatuses[index]?.uploadTask);
          setLoading(false);
        }
        const updatedFiles = fileStatuses.filter((_, i) => i !== index);
        setFileStatuses(updatedFiles);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const onNameChange = useCallback(
    (index: number) => {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFileStatuses = [...fileStatuses];
        const name = event.target.value;
        newFileStatuses[index].name = name;
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  // Tracker methods

  const onSaveEdit = useCallback(
    (index: number) => {
      return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const fileName = fileStatuses[index].name;
        // no empty file names
        if (fileName.trim().length === 0) return;
        const [extension] = fileName.split('.').reverse();
        const validExtension = acceptedFileTypes.includes('.' + extension);
        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];
        newFileStatuses[index] = {
          ...status,
          fileState: !validExtension ? 'error' : null,
          fileErrors: validExtension
            ? null
            : translate('Extension not allowed'),
        };

        setFileStatuses(newFileStatuses);
        const names = [...isEditingName];
        names[index] = false;
        setisEditingName(names);
      };
    },
    [acceptedFileTypes, fileStatuses, isEditingName, setFileStatuses]
  );

  const onCancelEdit = useCallback(
    (index: number) => {
      return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const fileName = fileStatuses[index].name;
        if (fileName.trim().length === 0) return;
        const names = [...isEditingName];
        names[index] = false;
        setisEditingName(names);
      };
    },
    [fileStatuses, isEditingName]
  );

  const onStartEdit = useCallback(
    (index: number) => {
      return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const names = [...isEditingName];
        names[index] = true;
        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];
        newFileStatuses[index] = {
          ...status,
          fileState: 'editing',
        };
        setFileStatuses(newFileStatuses);
        setisEditingName(names);
      };
    },
    [isEditingName, fileStatuses, setFileStatuses]
  );

  // UploadButton
  const hiddenInput = React.useRef<HTMLInputElement>();
  const onUploadButtonClick = () => {
    hiddenInput.current.click();
    hiddenInput.current.value = null;
  };

  const CommonProps = {
    acceptedFileTypes,
    multiple,
    onFileChange,
    onClick: onUploadButtonClick,
    hiddenInput,
  };

  if (showPreviewer) {
    return (
      <Previewer
        acceptedFileTypes={acceptedFileTypes}
        fileStatuses={fileStatuses}
        hiddenInput={hiddenInput}
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
        onUploadButtonClick={onUploadButtonClick}
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
        <Text className={ComponentClassNames.FileUploaderDropZoneText}>
          {translate('Drop files here or')}
        </Text>
        <UploadButton
          {...CommonProps}
          className={ComponentClassNames.FileUploaderDropZoneButton}
        />
      </UploadDropZone>
    );
  }
}

FileUploader.UploadDropZone = UploadDropZone;
FileUploader.UploadButton = UploadButton;
