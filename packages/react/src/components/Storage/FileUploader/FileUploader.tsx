import React, { useEffect, useState } from 'react';
import { translate } from '@aws-amplify/ui';
import { FileUploaderProps } from './types';
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

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  useEffect(() => {
    setAllFileNames(files.map((file) => file.name));
  }, [files]);

  // Previewer Methods

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
        fileNames={fileNames}
        files={files}
        inDropZone={inDropZone}
        level={level}
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
